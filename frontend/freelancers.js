document.addEventListener("DOMContentLoaded", () => {
  loadFreelancers();
});

async function loadFreelancers() {
  const freelancersContainer = document.getElementById("freelancersContainer");
  freelancersContainer.innerHTML = "";

  try {
    const response = await fetch(
      "https://backendfreelancer.onrender.com/freelancers"
    );
    const freelancers = await response.json();

    freelancers.forEach((freelancer) => {
      const card = createFreelancerCard(freelancer);
      freelancersContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading freelancers:", error);
  }
}

function createFreelancerCard(freelancer) {
  const card = document.createElement("div");
  card.classList.add("freelancer-card");

  card.innerHTML = `
          <img src="${freelancer.profile_picture}" alt="Profile Picture">
          <h3>${freelancer.name}</h3>
          <p>Email: ${freelancer.email}</p>
          <p>Profession: ${freelancer.profession}</p>
          <p>Skills: ${freelancer.skills.join(", ")}</p>
          <p>Hourly Rate: $${freelancer.hourlyRate}</p>
          <p>Booking Status: ${
            freelancer.bookingStatus ? "Booked" : "Available"
          }</p>
          <button onclick="hireFreelancer(${freelancer.id})" ${
    freelancer.bookingStatus ? "disabled" : ""
  }>Hire</button>
          <span class="delete-icon" onclick="deleteFreelancer(${
            freelancer.id
          })">🗑️</span>
          <span class="edit-icon" onclick="editFreelancer(${
            freelancer.id
          })">✏️</span>
      `;

  return card;
}

async function hireFreelancer(freelancerId) {
  try {
    const response = await fetch(
      `https://backendfreelancer.onrender.com/freelancers/${freelancerId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingStatus: true }),
      }
    );

    if (response.ok) {
      loadFreelancers();
    } else {
      console.error("Error hiring freelancer");
    }
  } catch (error) {
    console.error("Error hiring freelancer:", error);
  }
}

async function deleteFreelancer(freelancerId) {
  try {
    const response = await fetch(
      `https://backendfreelancer.onrender.com/freelancers/${freelancerId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      loadFreelancers();
    } else {
      console.error("Error deleting freelancer");
    }
  } catch (error) {
    console.error("Error deleting freelancer:", error);
  }
}

function editFreelancer(freelancerId) {
  // Implement edit functionality based on your requirements
}

async function loadFreelancers(queryParams = "") {
  const freelancersContainer = document.getElementById("freelancersContainer");
  freelancersContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://backendfreelancer.onrender.com/freelancers${queryParams}`
    );
    const freelancers = await response.json();

    freelancers.forEach((freelancer) => {
      const card = createFreelancerCard(freelancer);
      freelancersContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading freelancers:", error);
  }
}

document.getElementById("sortHourlyRate").addEventListener("change", () => {
  const selectedProfession = document.getElementById("sortHourlyRate").value;
  if (selectedProfession === "Low") {
    loadFreelancers("?_sort=hourlyRate&_order=asc");
  } else if (selectedProfession === "High") {
    loadFreelancers("?_sort=hourlyRate&_order=desc");
  } else {
    loadFreelancers();
  }
});

document.getElementById("filterProfession").addEventListener("change", () => {
  const selectedProfession = document.getElementById("filterProfession").value;
  if (selectedProfession !== "all") {
    loadFreelancers(`?profession=${selectedProfession}`);
  } else {
    loadFreelancers();
  }
});

document.getElementById("searchName").addEventListener("input", () => {
  const searchValue = document.getElementById("searchName").value;
  if (searchValue.trim() !== "") {
    loadFreelancers(`?q=${searchValue}`);
  } else {
    loadFreelancers();
  }
});
