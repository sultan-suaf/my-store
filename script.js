// script.js

// Google Sign-In function
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

// Load the Google API client
function loadGoogleAPI() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '140751697388-4joov14ha8av1dcv68q46ko3pj278ecv.apps.googleusercontent.com', // Your Client ID
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email' // Add your scopes here
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
