location.replace("music-maker.html"); // Only because I'm disabling this for now.

import db from "./firebase.js";

let submitButton = document.getElementById("submit-button");

if (!(document.cookie.indexOf("loggedIn=true") === -1)) { // If that condition is true, that means the user IS logged in.
    location.replace("/music-maker.html");
};

const logIn = function() {
    document.cookie = "loggedIn=true; path=/";
    location.replace("/music-maker.html");
};

const accountAlreadyExists = function() {
    document.getElementById("text-container").innerHTML = '<p class="luckiest-guy" id="account-already-exists">Good news -- you already have an account! <a href="login.html" style="text-decoration: none; color: rgb(4, 255, 0);">Log in</a></p>';
};

const submitInfo = function() {
    
    let submittedUsername = document.getElementById("username-textbox").value;
    let submittedPassword = document.getElementById("password-textbox").value;
    let submittedPasswordConformation = document.getElementById("password-conformation-textbox").value;

    const usersRef = db.collection("users");

    usersRef.where("username", "==", submittedUsername.toLowerCase()).where("password", "==", submittedPassword)
    .get()
    .then((results) => {
        if (!(results.size == 0)) {
            accountAlreadyExists();
        } else {
            if (submittedPassword == submittedPasswordConformation) {
                db.collection("users").doc().set({
                    username: submittedUsername.toLowerCase(),
                    password: submittedPassword
                })
                .then(() => {
                    logIn();
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            } else if (!(submittedPassword == submittedPasswordConformation)) {
                document.getElementById("text-container").innerHTML = '<p class="luckiest-guy" id="incorrect-message">The passwords do not match.</p>';
            }
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
}

submitButton.addEventListener("click", function() {submitInfo();})