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
            Feel free to contact us for any inquiries or questions. We’re here to help!
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
                  <input type="text" id="phone" placeholder="+375 29 123 45 67" />
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
              Reach out to us through the following contact methods or visit us at our office.
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
                  autostop@gmail.com
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📞</span>
                <div>
                  <strong>Phone</strong><br/>
                  +375 29 988 72 16
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
