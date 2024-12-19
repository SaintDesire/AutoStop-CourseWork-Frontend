import Layout from '@/components/ui/layout';
import Image from 'next/image';
import Link from 'next/link';

import Salesman from "@/../public/about/Salesman.png";
import Handshake_1 from "@/../public/about/Handshake.png";
import Handshake_2 from "@/../public/about/Handshake-2.png";
import Cars_1 from "@/../public/about/Cars.png";
import Cars_2 from "@/../public/about/Cars-2.png";

export default function AboutPage() {
  return (
    <Layout>
      <div className="about-page-container">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <span>About Us</span>
        </div>
        <h1 className="about-title">About Us</h1>
        
        <div className="hero-section">
          {/* Сначала блок с изображениями и highlight-box */}
          <div className="hero-images">
            <div className="highlight-box">
              <span className="highlight-number">45</span><br/>
              <span className="highlight-text">Years in Business</span>
            </div>
            <div className="main-image">
              <Image src={Salesman} alt="Salesman" />
            </div>
            <div className="sub-images">
              <Image src={Handshake_1} alt="Handshake" />
              <Image src={Handshake_2} alt="Showroom" />
              <Image src={Cars_1} alt="Service" />   
              <Image src={Cars_2} alt="Car Key" />
            </div>
          </div>

          {/* Затем текстовый блок */}
          <div className="hero-text">
            <h2 className="hero-subtitle">We Value Our Clients And Want Them To Have A Nice Experience</h2>
            <p className="hero-description">
              Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget sit urna. 
              Eu duis lectus amet vestibulum varius. Nibh tellus sit sit at lorem facilisis. 
              Nunc vulputate ac interdum aliquet vestibulum in tellus.
            </p>
            <p className="hero-description">
              Sit convallis rhoncus dolor purus amet orci urna. Lobortis vulputate vestibulum 
              consectetur donec ipsum egestas siet luctus justo. Eu dignissim egestas egestas ipsum. 
              Sit sit nunc pellentesque at a aliquam ultrices consequat. Velit dui velit nec amet eget eu morbi. 
              Libero non diam sit viverra dignissim. Aliquam tincidunt in cursus euismod enim.
            </p>
            <p className="hero-description">
              Magna odio sed ornare ultrices. Id lectus mi amet sit at arcu nisi. Mauris egestas arcu mauris.
            </p>
          </div>
        </div>

        <div className="why-choose-us-section">
          <h2>Why Choose Us?</h2>
          <div className="why-choose-us-cards">
            <div className="choose-card">
              <div className="choose-icon">💸</div>
              <h3>Special Financing Offers</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
            <div className="choose-card">
              <div className="choose-icon">🏆</div>
              <h3>Trusted Car Dealership</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
            <div className="choose-card">
              <div className="choose-icon">💎</div>
              <h3>Transparent Pricing</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
            <div className="choose-card">
              <div className="choose-icon">🔧</div>
              <h3>Expert Car Service</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
