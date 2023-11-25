import db from "./firebase.js";

let i = 0;
db.collection("compositions")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.body.innerHTML = document.body.innerHTML + `<p id="` + i + `">hi</p>`;
            document.getElementById(i).addEventListener("click", function() {location.href = `/music-maker.html?composition=` + doc.data().composition;});
            i++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });