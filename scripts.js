document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const toggleText = document.querySelector(".toggle-text");

  // Check for saved theme preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleText.textContent = "Dark Mode";
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleText.textContent = "Dark Mode";
    } else {
      localStorage.setItem("darkMode", null);
      toggleText.textContent = "Light Mode";
    }
  });

  // Counter Game Functionality
  const counterValue = document.getElementById("counterValue");
  const incrementBtn = document.getElementById("incrementBtn");
  const decrementBtn = document.getElementById("decrementBtn");
  const resetBtn = document.getElementById("resetBtn");

  let count = 0;

  function updateCounter() {
    counterValue.textContent = count;

    // Bonus every 10 clicks
    if (count > 0 && count % 10 === 0) {
      counterValue.style.color = "#e74c3c";
      counterValue.style.transform = "scale(1.2)";
      setTimeout(() => {
        counterValue.style.color = "";
        counterValue.style.transform = "";
      }, 300);
    }
  }

  incrementBtn.addEventListener("click", function () {
    count++;
    updateCounter();
  });

  decrementBtn.addEventListener("click", function () {
    if (count > 0) {
      count--;
      updateCounter();
    }
  });

  resetBtn.addEventListener("click", function () {
    count = 0;
    updateCounter();
  });

  // FAQ Section Functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector(".faq-icon");

      // Toggle the 'show' class on the answer
      answer.classList.toggle("show");

      // Change the icon
      if (answer.classList.contains("show")) {
        icon.textContent = "-";
      } else {
        icon.textContent = "+";
      }
    });
  });

  // Form Validation Functionality
  const form = document.getElementById("validationForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  // Validate name field
  nameInput.addEventListener("input", function () {
    if (validateName(this.value)) {
      this.style.borderColor = "#2ecc71";
      nameError.style.display = "none";
    } else {
      this.style.borderColor = "#e74c3c";
      nameError.style.display = "block";
    }
  });

  // Validate email field
  emailInput.addEventListener("input", function () {
    if (validateEmail(this.value)) {
      this.style.borderColor = "#2ecc71";
      emailError.style.display = "none";
    } else {
      this.style.borderColor = "#e74c3c";
      emailError.style.display = "block";
    }
  });

  // Validate password field
  passwordInput.addEventListener("input", function () {
    if (validatePassword(this.value)) {
      this.style.borderColor = "#2ecc71";
      passwordError.style.display = "none";
    } else {
      this.style.borderColor = "#e74c3c";
      passwordError.style.display = "block";
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate all fields
    if (!validateName(nameInput.value)) {
      nameError.style.display = "block";
      isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
      emailError.style.display = "block";
      isValid = false;
    }

    if (!validatePassword(passwordInput.value)) {
      passwordError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      successMessage.style.display = "block";
      form.reset();

      // Reset border colors
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => {
        input.style.borderColor = "#ddd";
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    }
  });

  // Validation functions
  function validateName(name) {
    return name.length >= 2;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    // At least 8 characters, 1 letter and 1 number
    const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return re.test(password);
  }
});
