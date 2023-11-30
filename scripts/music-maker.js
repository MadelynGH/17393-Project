/* if (document.cookie.indexOf("loggedIn=true") === -1) { // If that condition is true, that means the user is NOT logged in.
    location.replace("/");
}; Only because I'm disabling this for now. */

import db from "./firebase.js";

let compositionCurrentlyPlaying = false;

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
const loadInput = document.getElementById("load-input");
const compositionSaveText = document.getElementById("composition-save-text");

const startEyeTracking = document.getElementById("start-eye-tracking");

const clickableButtons = [startEyeTracking, noteC4, noteD4, noteE4, noteF4, noteG4, noteA5, noteB5, quartrest, playButton, clearButton, saveButton, loadButton];

const compositionContainer = document.getElementById("composition-container");
const compositionDisplay = document.getElementById("composition");
let composition = [];

const replacePlainQuarterRestWithSymbol = function() {
    compositionDisplay.innerHTML = compositionDisplay.innerHTML.replaceAll("quartrest", `<img src="/images/rest-black.svg" style="height: 0.8em;"><span style='font-size: 0.5em; margin-left: -1.5vw;'>REST</span>`);
}

const addNote = function(note) {
    new Audio("audio/note-" + note +
     ".wav?raw=true").play();

    compositionDisplay.innerHTML += note + " ";
    replacePlainQuarterRestWithSymbol();

    composition.push(note);
}

const addNoteWithoutSound = function(note) {
    compositionDisplay.innerHTML += note + " ";

    composition.push(note);
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
    compositionDisplay.innerHTML = "Composition: ";
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
                callAddNote(clickableButtons[i]);

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
const callAddNote = function(noteOrRest) {
    if (noteOrRest.id.includes("note")) { // If this returns true, the given parameter is a note.
        soundToPlay = noteOrRest.id.replace("-note", "");
        if (compositionCurrentlyPlaying) {
            addNoteWithoutSound(soundToPlay);
        } else {
            addNote(soundToPlay);
        }
    } else if (noteOrRest.id.includes("rest")) { // If this returns true, the given parameter is a rest.
        soundToPlay = noteOrRest.id;
        if (compositionCurrentlyPlaying) {
            addNoteWithoutSound(soundToPlay);
        } else {
            addNote(soundToPlay);
        }
    } else if (noteOrRest.id == "play-button") {
        playComposition();
    } else if (noteOrRest.id == "clear-button") {
        clearComposition();
    }

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

            compositionDisplay.innerHTML = "Composition: ";

            for (let i = 0; i < composition.length; i++) {
                compositionDisplay.innerHTML += composition[i] + " ";
            }

            compositionDisplay.innerHTML = compositionDisplay.innerHTML.replaceAll("quartrest", "&#x1D13D;")
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


    // add event listeners for each note to call the playNote function with the note as the paramater when the button is clicked
    noteC4.addEventListener("click", function() {callAddNote(noteC4);});
    noteD4.addEventListener("click", function() {callAddNote(noteD4);});
    noteE4.addEventListener("click", function() {callAddNote(noteE4);});
    noteF4.addEventListener("click", function() {callAddNote(noteF4);});
    noteG4.addEventListener("click", function() {callAddNote(noteG4);});
    noteA5.addEventListener("click", function() {callAddNote(noteA5);});
    noteB5.addEventListener("click", function() {callAddNote(noteB5);});

    quartrest.addEventListener("click", function() {callAddNote(quartrest);})

    playButton.addEventListener("click", function() {playComposition()});
    clearButton.addEventListener("click", function() {clearComposition()});
    saveButton.addEventListener("click", function() {saveComposition()});
    loadButton.addEventListener("click", function() {loadComposition()});

    startEyeTracking.addEventListener("click", function() {eyeTracking()});
});