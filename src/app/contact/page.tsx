import Layout from '@/components/ui/layout';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <Layout>
      <div className="contact-page-container">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <span>Contact us</span>
        </div>
        <h1 className="contact-title">Contact Us</h1>
        <hr className="title-underline" />

        <div className="contact-content">
          <div className="contact-form-section">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-description">
              Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum egestas quam egestas nulla.
            </p>

            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name*</label>
                  <input type="text" id="firstName" placeholder="Ali" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name*</label>
                  <input type="text" id="lastName" placeholder="Tufan" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" placeholder="example@gmail.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" placeholder="+90 123 456 789" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Your message..."></textarea>
                </div>
              </div>

              <button type="submit" className="send-message-btn">Send Message</button>
            </form>
          </div>
          <div className="contact-details-section">
            <div className="details-card">
              <h3>Contact details</h3>
              <p className="details-description">
                Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum egestas quam egestas nulla.
              </p>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <strong>Address</strong><br/>
                  123 Queensberry Street, North Melbourne VIC3051, Australia.
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">✉️</span>
                <div>
                  <strong>Email</strong><br/>
                  ali@boxcars.com
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📞</span>
                <div>
                  <strong>Phone</strong><br/>
                  +76 956 123 456
                </div>
              </div>

              <div className="follow-us">
                <strong>Follow us</strong><br/>
                <div className="social-icons">
                  <a href="#" aria-label="Facebook">f</a>
                  <a href="#" aria-label="Twitter">t</a>
                  <a href="#" aria-label="Instagram">i</a>
                  <a href="#" aria-label="LinkedIn">in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
