/* if (document.cookie.indexOf("loggedIn=true") === -1) { // If that condition is true, that means the user is NOT logged in.
    location.replace("/");
}; Only because I'm disabling this for now. */


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

const startEyeTracking = document.getElementById("start-eye-tracking");

const clickableButtons = [noteC4, noteD4, noteE4, noteF4, noteG4, noteA5, noteB5, quartrest, playButton, clearButton];

const compositionContainer = document.getElementById("composition-container");
const compositionDisplay = document.getElementById("composition");
let composition = [];

const addNote = function(note) {
    new Audio("audio/note-" + note +
     ".wav?raw=true").play();

    compositionDisplay.innerHTML += note + " ";
    composition.push(note);
}

const addNoteWithoutSound = function(note) {
    compositionDisplay.innerHTML += note + " ";
    composition.push(note);
}

 const playComposition = function() {
    for (let i = 0; i < composition.length; i++) {
        var delay = 300;

         setTimeout(function() {
            new Audio("audio/note-" + composition[i] +
            ".wav?raw=true").play();
        }, i * delay)

     }
}

 const clearComposition = function() {
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
        addNote(soundToPlay);
    } else if (noteOrRest.id.includes("rest")) { // If this returns true, the given parameter is a rest.
        soundToPlay = noteOrRest.id;
        addNote(soundToPlay);
    } else if (noteOrRest.id == "play-button") {
        playComposition();
    } else if (noteOrRest.id == "clear-button") {
        clearComposition();
    }

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

    startEyeTracking.addEventListener("click", function() {eyeTracking()});
});