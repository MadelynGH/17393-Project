/* if (document.cookie.indexOf("loggedIn=true") === -1) { // If that condition is true, that means the user is NOT logged in.
    location.replace("/");
}; Only because I'm disabling this for now. */

import db from "./firebase.js";

let compositionCurrentlyPlaying = false;

const tutorialLink = document.getElementById("tutorial-link");
const logoLink = document.getElementById("logo-link");

// define the note buttons class as a whole
const noteButtons = document.getElementsByClassName("note-button");

// define each note button in the document
const noteC4 = document.getElementById("c4-note");
const noteD4 = document.getElementById("d4-note");
const noteE4 = document.getElementById("e4-note");
const noteF4 = document.getElementById("f4-note");
const noteG4 = document.getElementById("g4-note");
const noteA5 = document.getElementById("a5-note");
const noteB5 = document.getElementById("b5-note");

const quartrest = document.getElementById("quartrest");

const playButton = document.getElementById("play-button");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");
const shareButton = document.getElementById("share-button");
const loadInput = document.getElementById("load-input");
const compositionSaveText = document.getElementById("composition-save-text");

const startEyeTracking = document.getElementById("start-eye-tracking");

const clickableButtons = [logoLink, tutorialLink, noteC4, noteD4, noteE4, noteF4, noteG4, noteA5, noteB5, quartrest, playButton, clearButton, saveButton, loadButton, shareButton];

const compositionContainer = document.getElementById("composition-container");
const compositionDisplay = document.getElementById("composition");
let url = new URL(window.location);
let composition = JSON.parse(url.searchParams.get("composition"));
if (!composition) {
    composition = [];
}

const beginningOfCompositionDisplay = "<span class='beginning-of-composition-display'>Composition: </span>";

const setURL = function() {
    url.searchParams.set("composition", JSON.stringify(composition));
    history.pushState({}, "", url.href);
}

const shareComposition = function() {
    new Audio("audio/share-sound.wav").play();

    navigator.share({
        url: decodeURI(window.location)
    })
    
    /*navigator.clipboard.writeText(decodeURI(window.location));
    compositionSaveText.innerHTML = "Link copied to your clipboard!";
    setTimeout(function() {compositionSaveText.innerHTML = "";}, 1000)*/
}

const replacePlainQuarterRestWithSymbol = function() {
    compositionDisplay.innerHTML = compositionDisplay.innerHTML.replaceAll("quartrest", `<img src="images/rest-black.svg" style="height: 0.8em;"><span style='font-size: 0.5em; margin-left: -10px;'>REST</span>`);
}

const addNote = function(note) {
    new Audio("audio/note-" + note +
    ".wav?raw=true").play();

    compositionDisplay.innerHTML += note + " ";
    replacePlainQuarterRestWithSymbol();

    composition.push(note);
    setURL();
}

const addNoteWithoutSound = function(note) {
    compositionDisplay.innerHTML += note + " ";
    replacePlainQuarterRestWithSymbol();

    composition.push(note);
    setURL();
}

const delay = 300;
const playComposition = function() {
    if (!compositionCurrentlyPlaying) {
        compositionCurrentlyPlaying = true;

        for (let i = 0; i < composition.length; i++) {
            setTimeout(function() {
                new Audio("audio/note-" + composition[i] +
                ".wav?raw=true").play();
            }, i * delay)
        }
        setTimeout(function() {compositionCurrentlyPlaying = false;}, composition.length * delay);
    }
}

 const clearComposition = function() {
    new Audio("audio/clear-sound.wav").play();

    composition.length = 0;
    compositionDisplay.innerHTML = beginningOfCompositionDisplay;
    setURL();
}

let buttonRect;
let topSide;
let bottomSide;
let leftSide;
let rightSide;
const findNoteAtCoordinates = async function (x, y) {
    for (let i = 0; i < clickableButtons.length; i++) {
        buttonRect = clickableButtons[i].getBoundingClientRect();
        topSide = buttonRect.top;
        bottomSide = buttonRect.bottom;
        leftSide = buttonRect.left;
        rightSide = buttonRect.right;
        
        console.log(clickableButtons[i].innerHTML + "'s coordinates are: top side: " + topSide + ", left side: " + leftSide);

        if (y > topSide & y < bottomSide & x > leftSide & x < rightSide) {

            if (y > topSide & y < bottomSide & x > leftSide & x < rightSide) {
                clickButton(clickableButtons[i]);
            /* new Promise ((resolve) => {
                setTimeout(function() {             

                }, 1000); 
            }); */
            }
        }
    }
}

// Gaze Eye Tracking
const eyeTracking = function() {
        
    GazeCloudAPI.OnCalibrationComplete = function(){ShowHeatMap(); 
        console.log('gaze Calibration Complete')  ;
    }

    GazeCloudAPI.OnCamDenied =  function(){ console.log('camera  access denied')  }
    GazeCloudAPI.OnError =  function(msg){ console.log('err: ' + msg)  }
    GazeCloudAPI.UseClickRecalibration = true;
            
    GazeCloudAPI.OnResult = function (GazeData) { 
        if (GazeData.state === 0) {
            GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze data uncalibrated 
            //GazeData.docX // gaze x in document coordinates 
            //GazeData.docY // gaze y in document coordinates 
            GazeData.time // timestamp
            console.log("x: " + GazeData.GazeX + "y: " + GazeData.GazeY);
    
            findNoteAtCoordinates(GazeData.docX, GazeData.docY);
        }
    }

    GazeCloudAPI.StartEyeTracking();
}

let soundToPlay;
let clickRef;
let clicks;
const clickButton = function(button) {
    clickRef = db.collection("clickcount").doc("YVukjRekniSDSGEpmOlX");
    clickRef.get().then((doc) => {
        clicks = doc.data().clicks + 1;
        console.log(clicks);

        db.collection("clickcount").doc("YVukjRekniSDSGEpmOlX").set({
            clicks: clicks
        })
        .then(() => {
            if (button.id.includes("note")) { // If this returns true, the given parameter is a note.
                soundToPlay = button.id.replace("-note", "");
                if (compositionCurrentlyPlaying) {
                    addNoteWithoutSound(soundToPlay);
                } else {
                    addNote(soundToPlay);
                }
            } else if (button.id.includes("rest")) { // If this returns true, the given parameter is a rest.
                soundToPlay = button.id;
                if (compositionCurrentlyPlaying) {
                    addNoteWithoutSound(soundToPlay);
                } else {
                    addNote(soundToPlay);
                }
            } else if (button.id == "play-button") {
                playComposition();
            } else if (button.id == "clear-button") {
                clearComposition();
            } else if (button.id == "save-button" ) {
                saveComposition();
            } else if (button.id == "load-button" ) {
                loadComposition();
            } else if (button.id == "share-button" ) {
                shareComposition();
            } else if (button.id == "start-eye-tracking" ) {
                eyeTracking();
            } else if (button.id == "logo-link") {
                location.href = "music-maker.html";
            } else if (button.id == "tutorial-link") {
                location.href = "tutorial.html";
            }
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

const saveComposition = function() {
    new Audio("audio/save-sound.mp3").play();

    navigator.clipboard.writeText(JSON.stringify(composition));

    compositionSaveText.innerHTML = "Composition copied to your clipboard!";
    setTimeout(function() {compositionSaveText.innerHTML = "";}, 1000)
}

const loadComposition = function() {
    new Audio("audio/load-sound.mp3").play();

    navigator.clipboard.readText()
        .then((text) => {
            composition = JSON.parse(text);

            compositionDisplay.innerHTML = beginningOfCompositionDisplay;

            for (let i = 0; i < composition.length; i++) {
                compositionDisplay.innerHTML += composition[i] + " ";
            }

            replacePlainQuarterRestWithSymbol();
            setURL();
        })
        .catch((error) => {
            console.log("Loading unsucessful because: " + error);
        });

    /*loadInput.value = "";

    db.collection("compositions")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data().composition);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    }); */

}

window.addEventListener("load", function() {
    console.log(composition);
    console.log(composition.length);
    let hasURLBeenCheckedYet = false;
    if (composition && !hasURLBeenCheckedYet) {
        for (let i = 0; i < composition.length; i++) {
            compositionDisplay.innerHTML += composition[i] + " ";
            replacePlainQuarterRestWithSymbol();
            hasURLBeenCheckedYet = true;
        }
    }

    // add event listeners for each note to call the playNote function with the note as the paramater when the button is clicked
    noteC4.addEventListener("click", function() {clickButton(noteC4);});
    noteD4.addEventListener("click", function() {clickButton(noteD4);});
    noteE4.addEventListener("click", function() {clickButton(noteE4);});
    noteF4.addEventListener("click", function() {clickButton(noteF4);});
    noteG4.addEventListener("click", function() {clickButton(noteG4);});
    noteA5.addEventListener("click", function() {clickButton(noteA5);});
    noteB5.addEventListener("click", function() {clickButton(noteB5);});

    quartrest.addEventListener("click", function() {clickButton(quartrest);})

    playButton.addEventListener("click", function() {clickButton(playButton)});
    clearButton.addEventListener("click", function() {clickButton(clearButton)});
    saveButton.addEventListener("click", function() {clickButton(saveButton)});
    loadButton.addEventListener("click", function() {clickButton(loadButton)});
    shareButton.addEventListener("click", function() {clickButton(shareButton)});

    startEyeTracking.addEventListener("click", function() {clickButton(startEyeTracking)});
});