$(document).ready(function () {
  // Show/hide password toggle
  $("#togglePassword").click(function () {
    const passwordInput = $("#password");
    const type = passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);
    $(this).text(type === "password" ? "👁️" : "🙈");
  });

  // Form submission handler
  $("#registrationForm").submit(function (e) {
    e.preventDefault(); // Prevent form from submitting

    // Clear any previous messages
    const messageBox = $("#messageBox").removeClass("error success").hide();

    // Get input values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val();

    // Validate fields
    if (!name || !email || !phone || !password) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Phone number: must be 10 digits
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits.", "error");
      return;
    }

    // Password validation: min 8 chars, uppercase, lowercase, number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      showMessage("Password must be at least 8 characters long and include uppercase, lowercase, and a number.", "error");
      return;
    }

    // If everything is valid
    showMessage("Registration successful!", "success");

    // Optional: Reset form after success
    $("#registrationForm")[0].reset();
    $("#togglePassword").text("👁️");
  });

  // Function to display message
  function showMessage(message, type) {
    const box = $("#messageBox");
    box.text(message).removeClass("error success").addClass(type).fadeIn();
  }
});
