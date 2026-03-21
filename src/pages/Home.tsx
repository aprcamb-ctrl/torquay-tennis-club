import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import Facilities from '../components/Facilities';
import OtherSports from '../components/OtherSports';
import Membership from '../components/Membership';
import Testimonials from '../components/Testimonials';
import SportSelector from '../components/SportSelector';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <SportSelector />
      <Facilities />
      <OtherSports />
      <Membership />
      <Testimonials />
    </>
  );
}
