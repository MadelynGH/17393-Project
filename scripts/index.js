location.replace("music-maker.html"); // Only because I'm disabling this for now.

if (!(document.cookie.indexOf("loggedIn=true") === -1)) { // If that condition is true, that means the user IS logged in.
    location.replace("music-maker.html");
};