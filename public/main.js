// Load user profile details
function loadUserProfile() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileFullName").textContent = user.name;
        document.getElementById("profileEmail").textContent = user.email;

        const profilePic = localStorage.getItem("profilePic");
        if (profilePic) {
            document.getElementById("profilePic").src = profilePic;
        }

        const profileBio = localStorage.getItem("profileBio");
        if (profileBio) {
            document.getElementById("profileBio").textContent = profileBio;
        }
    } else {
        alert("No user logged in. Redirecting to login page.");
        window.location.href = "registration.html";
    }
}

// Upload profile picture
function uploadProfilePic(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const profilePic = reader.result;
        document.getElementById("profilePic").src = profilePic;
        localStorage.setItem("profilePic", profilePic);
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Update user bio
function updateBio() {
    const bio = document.getElementById("bioInput").value;
    document.getElementById("profileBio").textContent = bio;
    localStorage.setItem("profileBio", bio);
}

function showUsernameinProfile() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileEmail").textContent = user.email;
    } else {
        alert("No user logged in");
    }
}
// Function to display pop-up messages
window.onload = function() {
    setTimeout(function() {
      document.getElementById('popUpWelcome').style.display = 'block';
      document.getElementById('popUpWelcome').classList.add('slide-in');
    }, 500); // Delay for the first pop-up
  
    setTimeout(function() {
      document.getElementById('popUpDiscover').style.display = 'block';
      document.getElementById('popUpDiscover').classList.add('slide-in');
    }, 550); // Delay for the second pop-up
    
    setTimeout(function() {
      document.getElementById('popUpLearn').style.display = 'block';
      document.getElementById('popUpLearn').classList.add('slide-in');
    }, 650); // Delay for the third pop-up
  }

// Toggle between registration and login forms
function toggleForms() {
    document.getElementById("registrationForm").classList.toggle("hidden");
    document.getElementById("loginForm").classList.toggle("hidden");
    document.getElementById("existingAccountOption").classList.toggle("hidden");
}

// Handle user registration
function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (name && email && password) {
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        alert("Registration successful! You can now log in.");
        toggleForms();
    } else {
        alert("Please fill in all fields.");
    }
}
// Forgot Password Feature
function forgotPassword() {
    const email = prompt("Enter your registered email to reset your password:");
    if (!email) return;
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email) {
        alert("A password reset link has been sent to your email (simulated). Check your inbox.");
    } else {
        alert("Email not found. Please check your email or register.");
    }
}
// Handle user login
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        alert("Login successful!");
        window.location.href = "profile.html";
    } else {
        alert("Invalid email or password.");
    }
}


// Log in as an existing user without filling the form
function loginAsExistingUser() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        alert("Logged in as existing user!");
        window.location.href = "profile.html";
    } else {
        alert("No existing account found. Please register first.");
    }
}

// Logout user
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Schedule a session
function scheduleSession(event) {
    event.preventDefault();
    const sessionData = {
        topic: document.getElementById("sessionTopic").value,
        date: document.getElementById("sessionDate").value,
        time: document.getElementById("sessionTime").value,
        videoURL: document.getElementById("videoURL").value
    };
    localStorage.setItem("scheduledSession", JSON.stringify(sessionData));
    displayScheduledSession();
}

// Display scheduled session details from localStorage
function displayScheduledSession() {
    const session = JSON.parse(localStorage.getItem("scheduledSession"));
    if (session) {
        document.getElementById("scheduledTopic").textContent = session.topic;
        document.getElementById("scheduledDate").textContent = session.date;
        document.getElementById("scheduledTime").textContent = session.time;
        document.getElementById("scheduledVideoLink").href = session.videoURL;
        document.getElementById("scheduledVideoLink").textContent = "Watch Video";
        document.getElementById("sessionDetails").style.display = "block";
    }
}

// Load session details on page load
document.addEventListener("DOMContentLoaded", displayScheduledSession);

// Post a message in the forum
function postMessage(event) {
    event.preventDefault();
    const message = document.getElementById("message").value.trim();
    if (message) {
        let messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
        messages.push(message);
        localStorage.setItem("forumMessages", JSON.stringify(messages));
        displayMessages();
        document.getElementById("message").value = "";
    } else {
        alert("Please enter a message.");
    }
}

// Display forum messages
function displayMessages() {
    const postList = document.getElementById("postList");
    postList.innerHTML = "";
    (JSON.parse(localStorage.getItem("forumMessages")) || []).forEach(msg => {
        const newPost = document.createElement("li");
        newPost.textContent = msg;
        postList.appendChild(newPost);
    });
}

document.addEventListener("DOMContentLoaded", displayMessages);

// Category selection
function selectCategory(category) {
    document.getElementById("categoryName").textContent = `You have selected the ${category} category.`;
    document.getElementById("selectedCategory").style.display = "block";
}

// Filter categories based on input
function filterCategories() {
    const searchInput = document.getElementById("skillSearch").value.toLowerCase();
    document.querySelectorAll("#categoryList li").forEach(category => {
        category.style.display = category.textContent.toLowerCase().includes(searchInput) ? "block" : "none";
    });
}

