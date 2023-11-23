document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.getElementById("content");
  const freelancersLink = document.getElementById("freelancers-link");
  const reportsLink = document.getElementById("reports-link");

  const isAdminLoggedIn = () => {
    return sessionStorage.getItem("adminToken") !== null;
  };

  
  const showContent = () => {
    if (isAdminLoggedIn()) {
      contentDiv.innerHTML = "<h2>Welcome Admin!</h2>";
      freelancersLink.style.display = "block";
      reportsLink.style.display = "block";
    } else {
      contentDiv.innerHTML =
        "<p>Please log in to access the admin section.</p>";
      freelancersLink.style.display = "none";
      reportsLink.style.display = "none";
    }
  };


  showContent();

  // Login page
  if (window.location.pathname.includes("login.html")) {
    const loginForm = document.createElement("div");
    loginForm.innerHTML = `
            <h2>Login</h2>
            <form id="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" required>
                <label for="password">Password:</label>
                <input type="password" id="password" required>
                <button type="submit">Login</button>
            </form>
            <div id="loading" style="display: none;">Logging in...</div>
            <div id="error" style="color: red; display: none;"></div>
        `;
    contentDiv.appendChild(loginForm);

    const loginFormElement = document.getElementById("login-form");
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");

  
    loginFormElement.addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      loadingDiv.style.display = "block";

      try {
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Save token to session storage
          sessionStorage.setItem("adminToken", data.token);

          // Move to the freelancers page
          window.location.href = "freelancers.html";
        } else {
          errorDiv.innerHTML = "Invalid username or password.";
          errorDiv.style.display = "block";
        }
      } catch (error) {
        errorDiv.innerHTML = "An error occurred. Please try again later.";
        errorDiv.style.display = "block";
      } finally {
        loadingDiv.style.display = "none";
      }
    });
  }
});
