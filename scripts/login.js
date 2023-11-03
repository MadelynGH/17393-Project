import db from "./firebase.js";

let submitButton = document.getElementById("submit-button");

if (!(document.cookie.indexOf("loggedIn=true") === -1)) { // If that condition is true, that means the user IS logged in.
    location.replace("music-maker.html");
};

const logIn = function() {
    document.cookie = "loggedIn=true; path=/";
    location.replace("music-maker.html");
};

const infoIsWrong = function() {
    document.getElementById("password-textbox").value = "";
    document.getElementById("username-textbox").value = "";
    
    document.getElementById("text-container").innerHTML = '<p class="luckiest-guy" id="incorrect-message">The username/password you entered is incorrect.</p>';
};

const submitInfo = function() {
    
    let submittedUsername = document.getElementById("username-textbox").value;
    let submittedPassword = document.getElementById("password-textbox").value;

    const usersRef = db.collection("users");

    usersRef.where("username", "==", submittedUsername.toLowerCase()).where("password", "==", submittedPassword)
        .get()
        .then((results) => {
            if (results.size == 0) {
                infoIsWrong();
            }

            results.forEach((doc) => {
                logIn();
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


    
}

submitButton.addEventListener("click", function() {submitInfo();})