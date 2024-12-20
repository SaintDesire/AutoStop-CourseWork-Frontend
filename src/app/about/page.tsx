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
