$(document).ready(function () {
  // 👁️ Show/hide password
  $("#togglePassword").click(function () {
    const passwordInput = $("#password");
    const type = passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);
    $(this).text(type === "password" ? "👁️" : "🙈");
  });

  // 📞 Live phone input: only digits and max 10
  $("#phone").on("input", function () {
    let value = $(this).val().replace(/\D/g, ""); // Remove non-digits
    if (value.length > 10) value = value.substring(0, 10);
    $(this).val(value);
  });

  // ✅ Form submission
  $("#registrationForm").submit(function (e) {
    e.preventDefault();

    const messageBox = $("#messageBox").removeClass("error success").hide();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val();

    // 🔍 Field empty check
    if (!name || !email || !phone || !password) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // 📧 Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // ☎️ Phone: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits.", "error");
      return;
    }

    // 🔐 Password: 8+ chars, one uppercase, one lowercase, one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      showMessage("Password must be at least 8 characters long and include uppercase, lowercase, and a number.", "error");
      return;
    }

    // 🎉 Success
    showMessage("Registration successful!", "success");
    $("#registrationForm")[0].reset();
    $("#togglePassword").text("👁️");
  });

  // 🔁 Reusable message function
  function showMessage(message, type) {
    $("#messageBox").text(message).removeClass("error success").addClass(type).fadeIn();
  }
});
