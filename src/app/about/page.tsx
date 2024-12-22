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
        <div className="about-main-block">
          <div className="hero-section">
            <div className="hero-subtitle-container">
              <h2 className="hero-subtitle">
                We Value Our Clients And Want Them To Have A Nice Experience
              </h2>
            </div>
            <div className="hero-descriptions-container">
              <div className="hero-descriptions">
                <p className="hero-description">
                Our company has been providing top-notch automotive services for over four decades. 
                We strive to ensure a seamless and pleasant experience for every client, 
                with personalized attention to meet your needs.
                </p>
                <p className="hero-description">
                From helping you choose the perfect car to offering tailored financing options, 
                we’re here to make your journey smooth and hassle-free. Our team is dedicated 
                to delivering reliable, transparent, and professional service every step of the way.
                </p>
                <p className="hero-description">
                With a deep understanding of the automotive market, we have built a legacy of trust and excellence. 
                Let us help you find the perfect car that matches your style and needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{width: 1398.39, height: 540, position: 'relative'}}>
        <div style={{width: 198.80, height: 307.59, paddingTop: 30, paddingBottom: 126, paddingLeft: 30, paddingRight: 30, background: '#405FF2', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
        <div className="highlight-box">
              <span className="highlight-number">45</span>
              <br />
              <span className="highlight-text">Years in Business</span>
            </div>
        </div>
          <div style={{width: 198.80, height: 198.80, left: 0, top: 337.59, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <Image className="sub-image" src={Handshake_1} alt="Handshake" />
          </div>
          <div style={{width: 567, height: 540, left: 230.59, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <Image src={Salesman} alt="Salesman" />
          </div>
          <div style={{width: 567, height: 300, left: 831.19, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <Image className="sub-image" src={Cars_1} alt="Service" />
          </div>
          <div style={{width: 198.80, height: 198.80, left: 831.19, top: 337.59, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <Image className="sub-image" src={Cars_2} alt="Car Key" />
          </div>
          <div style={{width: 329, height: 210, left: 1069.39, top: 330, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <Image className="sub-image" src={Handshake_2} alt="Showroom" />
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
