//Service cards animation
const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    const aiCard = document.getElementById('aiCard-service1');
    observer.observe(aiCard);
    const aiCard2 = document.getElementById('aiCard-service2');
    observer.observe(aiCard2);
    const aiCard3 = document.getElementById('aiCard-service3');
    observer.observe(aiCard3);

//Home header animation
window.addEventListener('load', () => {
  const bigHeader = document.querySelector('.bigheader-text');
  const smallHeader = document.querySelector('.smallheader-text');

  bigHeader.classList.add('visible');
  setTimeout(() => {
    smallHeader.classList.add('visible');
  }, 400); // delay for staggered entrance
});

//Services header animation
document.addEventListener('DOMContentLoaded', () => {
  const servicesHeader = document.querySelector('.services-header-text');
  const circle = document.querySelector('.circle');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        servicesHeader.classList.add('visible');
        circle.classList.add('visible');
        observer.unobserve(servicesHeader); // Optional: stop observing after animation
      }
    });
  }, { threshold: 0.4 }); // Trigger a bit earlier

  observer.observe(servicesHeader);
});

//Serice footer animation
document.addEventListener('DOMContentLoaded', () => {
  const footerBiggerText = document.querySelector('.services-footer-biggertext');
  const footerSmallerText = document.querySelector('.services-footer-smallertext');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footerBiggerText.classList.add('visible');
        footerSmallerText.classList.add('visible');
        
        // Start pulsing effect on bigger text after fade-in
        setTimeout(() => {
          footerBiggerText.classList.add('pulsing');
        }, 900); // after the fade/slide animation duration

        observer.unobserve(footerBiggerText);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(footerBiggerText);
});

//Contact me header animation
document.addEventListener('DOMContentLoaded', () => {
  const contactHeader = document.querySelector('.contactme-header-text');
  const roundedRect = document.querySelector('.rounded-rectangle');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactHeader.classList.add('visible');
        roundedRect.classList.add('visible');
        observer.unobserve(contactHeader);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(contactHeader);
});

//Contact me contents animation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contactme-form-wrapper');
  const otherContact = document.querySelector('.Other-Contact-Info');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === form) {
          form.classList.add('animate-in');
        } else if (entry.target === otherContact) {
          otherContact.classList.add('animate-in');
        }
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(form);
  observer.observe(otherContact);
});

//About me header animation
document.addEventListener('DOMContentLoaded', () => {
  const targets = [
    document.querySelector('.aboutme-header'),
    document.querySelector('.aboutme-rounded-rectangle')
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.3
  });

  targets.forEach(el => observer.observe(el));
});

//About me content animation
document.addEventListener('DOMContentLoaded', () => {
  const aboutMeContent = document.querySelector('.aboutme-content-wrapper');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // optional: stop observing after first trigger
      }
    });
  }, {
    threshold: 0.2
  });

  if (aboutMeContent) observer.observe(aboutMeContent);
});

//Footer animation
document.addEventListener("DOMContentLoaded", () => {
  const footerWrapper = document.querySelector('.footer-wrapper');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footerWrapper.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  if (footerWrapper) observer.observe(footerWrapper);
});

//Backend Actions 

//Contact form submission
document.querySelector(".contactme-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.querySelector(".name-input").value;
  const email = document.querySelector(".email-input").value;
  const message = document.querySelector(".message-input").value;

  document.querySelector(".contactme-form").reset();
  document.querySelector(".response-message").textContent = "Sending...";
  document.querySelector(".submit-message").disabled = true;
  
  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    const messageDiv = document.querySelector(".response-message");
    if (response.ok) {
      messageDiv.textContent = "✅ Message sent successfully!";
      messageDiv.style.color = "green";
      
      document.querySelector(".submit-message").disabled = false;
      document.querySelector(".contactme-form").reset();

    } else {
      messageDiv.textContent = "❌ " + (result.error || "Something went wrong.");
      messageDiv.style.color = "red";
    }
  } catch (err) {
    document.querySelector(".response-message").textContent =
      "❌ Failed to send message. Check your connection.";
    document.querySelector(".response-message").style.color = "red";
  }
});
