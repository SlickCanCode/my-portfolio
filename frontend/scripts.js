document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });

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

//chatbot-tooltip animation
  window.addEventListener('load', () => {
  setTimeout(() => {
    const tooltip = document.querySelector('.chat-tooltip');
    if (tooltip) {
      tooltip.classList.add('show'); // fade in

      setTimeout(() => {
        tooltip.classList.remove('show'); // fade out
      }, 10000); // visible for 10 seconds
    }
  }, 2000); // show after 2 seconds
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
    const response = await fetch("https://slickcancode-backend.onrender.com/contact", {
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

const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector("#file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

const initialInputHeight = messageInput.scrollHeight;

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Bot response from Flask backend
const generateBotResponse = async (incomingMessageDiv, messageText) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  try {
    const response = await fetch("https://slickcancode-backend.onrender.com/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    const reply = data.response || JSON.stringify(data);
    messageElement.innerText = reply;
  } catch (error) {
    console.error(error);
    messageElement.innerText = "i'm unavailable at the moment... pls try again later";
    messageElement.style.color = "#200030";
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
};

// Handle sending message
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));

  if (!userData.message) return;

  const messageContent = `<div class="message-text"></div>
    ${userData.file.data
      ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />`
      : ""
    }`;

  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Simulate bot thinking
  setTimeout(() => {
  const botMessageHTML = `
    <div class="bot-avatar-wrapper">
      <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024">
        <path
          d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
        ></path>
      </svg>
    </div>
    <div class="message-text">
      <div class="thinking-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  `;
  const incomingMessageDiv = createMessageElement(
    botMessageHTML,
    "bot-message",
    "thinking"
  );

  chatBody.appendChild(incomingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Send the actual request to backend
  generateBotResponse(incomingMessageDiv, userData.message);
}, 600);
};

// Handle Enter key to send
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
    handleOutgoingMessage(e);
  }
});

// Auto resize input field
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle file upload
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = e.target.result.split(",")[1];
    userData.file = {
      data: base64String,
      mime_type: file.type,
    };
    fileInput.value = "";
  };
  reader.readAsDataURL(file);
});

// Emoji picker setup (if you're using EmojiMart)
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  preview: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  },
});
document.querySelector(".chat-form").appendChild(picker);

// Button + toggler logic
sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});
closeChatbot.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});

