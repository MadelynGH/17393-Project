
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

            const compositionContainer = document.getElementById("composition-container");
            const compositionDisplay = document.getElementById("composition");
            let composition = [];
            
            const addNote = function(note) {
                new Audio("audio/note-" + note +
                 ".wav?raw=true").play();

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
            
            // add event listeners for each note to call the playNote function with the note as the paramater when the button is clicked
            noteC4.addEventListener("click", function() {addNote("c4")});
            noteD4.addEventListener("click", function() {addNote("d4")});
            noteE4.addEventListener("click", function() {addNote("e4")});
            noteF4.addEventListener("click", function() {addNote("f4")});
            noteG4.addEventListener("click", function() {addNote("g4")});
            noteA5.addEventListener("click", function() {addNote("a5")});
            noteB5.addEventListener("click", function() {addNote("b5")});

            quartrest.addEventListener("click", function() {addNote("quartrest")})

            playButton.addEventListener("click", function() {playComposition()});
            clearButton.addEventListener("click", function() {clearComposition()});

