import AboutContent from "../companent/aboutcontent";
import SwiperSlider from "../companent/swiperslider";
import Certificalogos from "../companent/certificalogos";
import Footer from "../companent/footer";
export default function AboutPage() {
  return (
   <main className="flex flex-col items-center min-h-screen text-center p-8">
      <AboutContent />
      <SwiperSlider/>
      <Certificalogos/>
      <Footer/>    
    </main>
  );
}
