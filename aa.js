document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.classList.contains('resume-btn')) return; // Don't close for resume link
      
      navLinks.classList.remove('active');
      mobileMenuToggle.querySelector('i').classList.add('fa-bars');
      mobileMenuToggle.querySelector('i').classList.remove('fa-times');
    });
  });

  // Smooth scrolling for all links except resume
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.classList.contains('resume-btn')) return;
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMessage = document.getElementById('formMessage');
      
      // Validate form
      if (!name || !email || !mobile || !message) {
        formMessage.textContent = 'All fields are required!';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Validate mobile number (Indian format)
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(mobile)) {
        formMessage.textContent = 'Please enter a valid 10-digit Indian mobile number';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Prepare SMS content
      const smsBody = `New message from ${name} (${email}): ${message}`;
      
      // Create SMS link (will open default SMS app on mobile devices)
      const smsLink = `sms:6305365633?body=${encodeURIComponent(smsBody)}`;
      
      // Open SMS app
      window.location.href = smsLink;
      
      // Show success message
      formMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
      formMessage.className = 'form-message success';
      
      // Reset form
      contactForm.reset();
    });
  }

  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.education-card, .project-card, .skill-category, .about-stats');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.education-card, .project-card, .skill-category, .about-stats').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Current year for footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Add active class to current section in navigation
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});