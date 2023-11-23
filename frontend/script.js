//post data for user
const contentDiv = document.getElementById("content");
const adminBtn = document.getElementById("adminBtn");
const userBtn = document.getElementById("userBtn");

adminBtn.addEventListener("click", () => loadSection("admin"));
userBtn.addEventListener("click", () => loadSection("user"));

function loadSection(section) {
  fetch(`${section}.html`)
    .then((response) => response.text())
    .then((html) => {
      contentDiv.innerHTML = html;
      if (section === "user") {
        setupUserSection();
      }
    });
}

function setupUserSection() {
  const userForm = document.getElementById("userForm");

  userForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("https://backendfreelancer.onrender.com/freelancers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Successfully registered.");
        // You may want to redirect the user or perform other actions here.
      })
      .catch((error) => console.error("Error:", error));
  });
}
