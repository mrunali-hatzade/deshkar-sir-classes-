import Navbar from '@/components/Navbar';
import TopScorersPopup from '@/components/TopScorersPopup';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Courses from '@/components/Courses';
import Results from '@/components/Results';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Atom3D from '@/components/Atom3D';

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '10%', right: '-10%', opacity: 0.15, zIndex: -1, pointerEvents: 'none', transform: 'scale(0.8)' }}>
        <Atom3D />
      </div>
      <div style={{ position: 'fixed', bottom: '-5%', left: '-5%', opacity: 0.1, zIndex: -1, pointerEvents: 'none', transform: 'scale(1.2)' }}>
        <Atom3D />
      </div>
      <TopScorersPopup />
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Results />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
