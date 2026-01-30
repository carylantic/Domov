import { useState, useEffect, useRef } from 'react';
import './TextType.css';

const TextType = ({
  text = [],
  typingSpeed = 65,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '|',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const currentText = text[currentTextIndex];
    let timeout;

    if (!isDeleting && currentCharIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && currentCharIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentCharIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
        setCurrentCharIndex(prev => prev - 1);
      }, typingSpeed);
    } else if (isDeleting && currentCharIndex === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % text.length);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, text, currentTextIndex, typingSpeed, pauseDuration]);

  return (
    <div ref={containerRef} className="text-type">
      {displayedText}
      {showCursor && <span className="text-type__cursor">{cursorCharacter}</span>}
    </div>
  );
};

export default TextType;
