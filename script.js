// script.js

// Google Sign-In function
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;

    // Send the ID token to your backend for verification
    fetch('http://localhost:5000/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
    })
    .then(response => response.json())
    .then(data => {
        // Store user data in local storage
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userImage', data.user.picture);

        // Redirect to the home page
        window.location.href = 'home.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Load the Google API client
function loadGoogleAPI() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '140751697388-4joov14ha8av1dcv68q46ko3pj278ecv.apps.googleusercontent.com'
        });
    });
}

// Add event listener for manual login button
document.getElementById('manualLoginBtn').addEventListener('click', function() {
    document.getElementById('manualLoginForm').style.display = 'block';
});

// Add event listener for manual login
document.getElementById('loginBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Implement your manual login logic here
    console.log(`Email: ${email}, Password: ${password}`);
});

// Initial load
loadGoogleAPI();
