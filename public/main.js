// Load user profile details
function loadUserProfile() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (user) {
        // Display the user's name in the welcome message
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileEmail").textContent = user.email;
    } else {
        alert("No user logged in. Redirecting to login page.");
        window.location.href = "registration.html";
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
    }, 2000); // Delay for the second pop-up
    
    setTimeout(function() {
      document.getElementById('popUpLearn').style.display = 'block';
      document.getElementById('popUpLearn').classList.add('slide-in');
    }, 3500); // Delay for the third pop-up
  }
  
  // Toggle between registration and login forms
  function toggleForms() {
    const regForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");
    const existingAccount = document.getElementById("existingAccountOption");
    
    if (regForm.style.display === "none") {
      regForm.style.display = "block";
      loginForm.style.display = "none";
      existingAccount.style.display = "none";
    } else {
      regForm.style.display = "none";
      loginForm.style.display = "block";
      existingAccount.style.display = "none";
    }
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
        toggleForms(); // Show login form after successful registration
    } else {
        alert("Please fill in all fields.");
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
  
  // Function to schedule a session
  function scheduleSession(event) {
    event.preventDefault();
    const sessionTopic = document.getElementById("sessionTopic").value;
    const sessionDate = document.getElementById("sessionDate").value;
    const sessionTime = document.getElementById("sessionTime").value;
    const videoURL = document.getElementById("videoURL").value;
  
    // Display the scheduled session details
    document.getElementById("scheduledTopic").textContent = sessionTopic;
    document.getElementById("scheduledDate").textContent = sessionDate;
    document.getElementById("scheduledTime").textContent = sessionTime;
  
    // Set the video link
    const videoLinkElement = document.getElementById("scheduledVideoLink");
    videoLinkElement.href = videoURL;
    videoLinkElement.textContent = "Watch Video";
  
    // Show the session details section
    document.getElementById("sessionDetails").style.display = "block";
  
    // Save the scheduled session to localStorage
    localStorage.setItem("scheduledSession", JSON.stringify({ topic: sessionTopic, date: sessionDate, time: sessionTime, videoURL: videoURL }));
  }
  
  // Display scheduled session details from localStorage
  function displayScheduledSession() {
    const session = JSON.parse(localStorage.getItem("scheduledSession"));
    if (session) {
        document.getElementById("scheduledTopic").textContent = session.topic;
        document.getElementById("scheduledDate").textContent = session.date;
        document.getElementById("scheduledTime").textContent = session.time;
        document.getElementById("sessionDetails").style.display = "block";
    }
  }
  
  // Load session details when the page loads
  document.addEventListener("DOMContentLoaded", displayScheduledSession);
  
  // Function to post a message
  function postMessage(event) {
    event.preventDefault();
  
    // Get user input
    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();
  
    if (message) {
        // Retrieve existing messages from localStorage
        let messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
  
        // Add new message
        messages.push(message);
        localStorage.setItem("forumMessages", JSON.stringify(messages));
  
        // Display updated messages
        displayMessages();
  
        // Clear input field
        messageInput.value = "";
    } else {
        alert("Please enter a message.");
    }
  }
  
  // Function to display messages
  function displayMessages() {
    const postList = document.getElementById("postList");
    postList.innerHTML = ""; // Clear the list before reloading messages
  
    // Retrieve messages from localStorage
    let messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
  
    // Append each message to the list
    messages.forEach(msg => {
        const newPost = document.createElement("li");
        newPost.textContent = msg;
        postList.appendChild(newPost);
    });
  }
  
  // Load messages when the page loads
  document.addEventListener("DOMContentLoaded", displayMessages);
  
  // Function to handle category selection
  function selectCategory(category) {
    const categoryNameElement = document.getElementById("categoryName");
    categoryNameElement.textContent = `You have selected the ${category} category`;
  
    document.getElementById("selectedCategory").style.display = "block";
  }
  
  // Function to filter categories based on the user's input
  function filterCategories() {
    const searchInput = document.getElementById("skillSearch").value.toLowerCase();
    const categories = document.querySelectorAll("#categoryList li");
  
    categories.forEach((category) => {
        const categoryName = category.textContent.toLowerCase();
        if (categoryName.includes(searchInput)) {
            category.style.display = "block"; // Show the category if it matches
        } else {
            category.style.display = "none"; // Hide the category if it doesn't match
        }
    });
  }