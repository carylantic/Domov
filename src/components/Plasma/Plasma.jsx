import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Plasma.css';



const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [1, 0.5, 0.2]
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ]
}

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;

out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  vec2 mouseOffset = (uMouse - center) * 0.00025;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O = vec3(0.0), p, S;

  // ⚡ menej iterácií = viac FPS
  for (vec2 r = iResolution.xy, Q; ++i < 28.; O += o.w / d * o.xyz) {
    p = z * normalize(vec3(C - .5 * r, r.y));
    p.z -= 3.6;
    S = p;
    d = p.y - T;

    p.x += .5 * (1. + p.y) * sin(d + p.x * 0.12) * cos(.38 * d + p.x * 0.07);
    Q = p.xz *= mat2(cos(p.y + vec4(0,11,33,0) - T));
    z += d = abs(sqrt(length(Q * Q)) - .3 * (5. + S.y)) / 3. + 9e-4;
    o = 1. + sin(S.y + p.z * .55 + S.z - length(S - p) + vec4(2,1,0,8));
  }

  // 🌈 silnejšia plasma bez prepálenia GPU
  o.xyz = tanh(O / 7000.0);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);

  vec3 plasma = clamp(o.rgb, 0.0, 1.5);

  // kontrast
  plasma = pow(plasma, vec3(0.75));

  float energy = dot(plasma, vec3(0.333));

  // farba ako násobič energie
  vec3 colored = mix(
    plasma,
    plasma * uCustomColor * 2.0,
    step(0.5, uUseCustomColor)
  );

  colored *= 1.25 + energy;

  float alpha = clamp(energy * 1.4, 0.0, 1.0) * uOpacity;

  fragColor = vec4(colored, alpha);
}
`

export const Plasma = ({
  color = '#1139b1',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const containerEl = containerRef.current

    const useCustomColor = color ? 1.0 : 0.0
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1]
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0

    const renderer = new Renderer({
  webgl: 2,
  alpha: true,
  antialias: false,
  dpr: 1
});


    const gl = renderer.gl
    const canvas = gl.canvas
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    containerEl.appendChild(canvas)

    const geometry = new Triangle(gl)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
      }
    })

    const mesh = new Mesh(gl, { geometry, program })

    const handleMouseMove = e => {
      if (!mouseInteractive) return
      const rect = containerEl.getBoundingClientRect()
      const mouseUniform = program.uniforms.uMouse.value
      mouseUniform[0] = e.clientX - rect.left
      mouseUniform[1] = e.clientY - rect.top
    }

    if (mouseInteractive) {
      containerEl.addEventListener('mousemove', handleMouseMove)
    }

    const setSize = () => {
      const rect = containerEl.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))
      renderer.setSize(width, height)
      const res = program.uniforms.iResolution.value
      res[0] = gl.drawingBufferWidth
      res[1] = gl.drawingBufferHeight
    }

    const ro = new ResizeObserver(setSize)
    ro.observe(containerEl)
    setSize()

    let raf = 0
    const t0 = performance.now()

    const loop = t => {
      const timeValue = (t - t0) * 0.001

      if (direction === 'pingpong') {
        const pingpongDuration = 10
        const segmentTime = timeValue % pingpongDuration
        const isForward = Math.floor(timeValue / pingpongDuration) % 2 === 0
        const u = segmentTime / pingpongDuration
        const smooth = u * u * (3 - 2 * u)
        const pingpongTime = isForward
          ? smooth * pingpongDuration
          : (1 - smooth) * pingpongDuration

        program.uniforms.uDirection.value = 1.0
        program.uniforms.iTime.value = pingpongTime
      } else {
        program.uniforms.iTime.value = timeValue
      }

      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (mouseInteractive) {
        containerEl.removeEventListener('mousemove', handleMouseMove)
      }
      try {
        containerEl.removeChild(canvas)
      } catch {}
    }
  }, [color, speed, direction, scale, opacity, mouseInteractive])

  return <div ref={containerRef} className="plasma-container" />
}

export default Plasma
