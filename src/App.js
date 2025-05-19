import React, { useState } from 'react';
import './App.css';
import logoImage from './assets/logo.svg';
import video from './assets/nexus.mp4';
import backg from './assets/backg.png';
import { X, Facebook, Instagram, Linkedin, Check } from 'lucide-react';
import './successModal.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">X</button>
        <div className="checkmark-circle">
          <Check className="checkmark" size={28} strokeWidth={2.5} />
        </div>
        <h2 className="modal-title">You are on the wishlist</h2>
        <p className="modal-description">
          Thanks for joining. We will notify you as soon as the product becomes
          available. Follow our social channels to stay tuned
        </p>
        <div className="modal-icons">
          <a href="https://x.com/wealthnxai" target="_blank" rel="noreferrer" aria-label="X" className="social-circle">
            <X size={18} />
          </a>
          <a href="https://facebook.com/profile.php?id=61575062621759" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-circle">
            <Facebook size={18} />
          </a>
          <a href="https://instagram.com/wealthnx.ai" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-circle">
            <Instagram size={18} />
          </a>
          <a href="https://linkedin.com/company/wealthnxai/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-circle">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', description: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.description.trim()) newErrors.description = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('Submitting...');

    try {
      const response = await fetch('http://182.191.94.19:81/api/users/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok || response.status === 207) {
        setStatus('');
        setFormData({ name: '', email: '', description: '' });
        setShowModal(true);

        if (response.status === 207) {
          console.log('Note: Form saved but email confirmation may be delayed');
        }
      } else {
        setStatus(result.message || 'Submission failed.');
      }

    } catch (error) {
      console.error('Error submitting:', error);
      setStatus('Submission failed. Please try again.');
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqItems = [
    {
      question: "What is WealthNX?",
      answer: "WealthNX is your hyper-personalized AI powered financial co-pilot. that connects all your finances including your personal finance and investments into one centralized platform with our proprietary finance based AI Wealth Genie. Our specialized AI expert agents work 24/7 to guide your unique wealth journey, turning financial chaos into clarity."
    },
    {
      question: "Who is WealthNX built for, and how can I use it?",
      answer: "WealthNX is for anyone seeking smarter, AI-powered control over their money, whether you're starting out or growing wealth.Connect all your accounts, set goals, and let our WealthNX do the work: Track spending, net worth & investments in real-time Get personalized insights, reminders & growth tips Make confident financial decisions, all in one place Your finances. Your future. Made smarter."
    },
    {
      question: "What makes WealthNX different from other finance apps?",
      answer: "WealthNX is your hyper-personalized financial co-pilot. It doesn’t just track your money, it understands it. From your spending to your investments, our AI delivers tailored insights, reminders, and smarter decisions to help you grow your wealth"
    },
    {
      question: "How much will it cost?",
      answer: "During beta, it’s 100% free for early users.You help us shape it, we thank you by giving you first access.Final pricing will come later, but flexible, affordable plans are part of the plan."
    },
    {
      question: "How will WealthNx keep my financial data secure?",
      answer: "We implement bank-level 256-bit encryption with read-only account access through Plaid. Our security is verified through SOC Type 2, GDPR, and ISO certifications with strict data ownership policies. "
    },
    {
      question: "When will the platform launch, and how will I know?",
      answer: "We’re rolling out in private beta waves, starting with waitlist members.If you’re on the list, you’re already in line for early access!You’ll receive an email notification when it’s your turn, plus sneak peeks, updates, and feature previews as we get closer to the full launch."
    }
  ];

  return (
    <div className="app">
      <header>
        <div className="logo-container">
          <img src={logoImage} alt="WealthNx Logo" className="logo" />
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Your Hyper-Personalized Financial Co-Pilot</h1>
          <p>Build, Manage & Grow your wealth effortlessly.<br />Your Personal Finance Dream Team - One Tap Away</p>
          <button className="join-button" onClick={scrollToContact}>Join Wishlist</button>
        </div>
        <div className="hero-image">
          <div className="glowing-circle">
            <div className="logo-large">
              <video autoPlay loop muted playsInline className="enhanced-video" width="100%" height="100%">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-label">FAQ'S</div>
        <h2>Frequently Asked Questions</h2>
        <p className="faq-intro">Feel free to reach out to us if you have more questions for us.</p>
        <div className="faq-container">
          {faqItems.map((faq, index) => (
            <div key={index} className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="faq-icon">{expandedFaq === index ? '-' : '+'}</span>
              </div>
              {expandedFaq === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact-section">
        <div className="section-label">Contact Us</div>
        <h2>Get in touch</h2>
        <p className="contact-intro">We'd love to hear from you. Please fill out this form.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="enter your name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your-email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Message</label>
            <input
              type="text"
              id="description"
              placeholder="Write your message"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>
          <button type="submit" className="join-button full-width">Join Wishlist</button>
        </form>
        {status && <p className="form-status">{status}</p>}
        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      </section>

      <footer style={{
        backgroundImage: `url(${backg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        padding: "2rem 0",
        position: "relative"
      }}>
        <div className="footer-logo">
          <img src={logoImage} alt="WealthNx Logo" className="logo" />
        </div>
        <div className="social-icons">
          <a href="https://x.com/wealthnxai" className="social-icon"><X size={18} /></a>
          <a href="https://www.facebook.com/profile.php?id=61575062621759" className="social-icon"><Facebook size={18} /></a>
          <a href="https://www.linkedin.com/company/wealthnxai/" className="social-icon"><Linkedin size={18} /></a>
          <a href="https://www.instagram.com/wealthnx.ai" className="social-icon"><Instagram size={18} /></a>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a><span className="separator">|</span>
          <a href="#">Terms & Condition</a><span className="separator">|</span>
          <a href="#">Cookie Notice</a><span className="separator">|</span>
          <a href="#">Copyright Policy</a><span className="separator">|</span>
          <a href="#">Data Policy</a>
        </div>
        <div className="copyright">
          © 2025 WealthNx All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
