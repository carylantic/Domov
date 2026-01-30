import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Landing from "./components/Landing";
import About from "./components/About";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import StartProject from "./pages/StartProject";
import Technic from "./pages/Technic";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Landing />
              <Services />
              <FAQ />
              <Footer />
            </>
          }
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/zacat-projekt" element={<StartProject />} />
        <Route path="/technic" element={<Technic />} />
      </Routes>
    </>
  );
}

export default App;
