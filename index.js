
            // define the note buttons class as a whole
            var noteButtons = document.getElementsByClassName("note-button");

            // define each note button in the document
            var noteC4 = document.getElementById("c4-note");
            var noteD4 = document.getElementById("d4-note");
            var noteE4 = document.getElementById("e4-note");
            var noteF4 = document.getElementById("f4-note");
            var noteG4 = document.getElementById("g4-note");
            var noteA5 = document.getElementById("a5-note");
            var noteB5 = document.getElementById("b5-note");

            var quartrest = document.getElementById("quartrest");

            var compositionContainer = document.getElementById("composition-container");
            var compositionDisplay = document.getElementById("composition");
            var composition = [];
            
            var addNote = function(note) {
                new Audio("https://github.com/MadelynGH/17393-Project/blob/main/note-" + note +
                 ".wav?raw=true").play();

                compositionDisplay.innerHTML += note + " ";
                composition.push(note);
            }

            var playComposition = function() {
                for (let i = 0; i < composition.length; i++) {
                    var delay = 300;

                    setTimeout(function() {
                        new Audio("https://github.com/MadelynGH/17393-Project/blob/main/note-" + composition[i] +
                        ".wav?raw=true").play();
                    }, i * delay)

                }
            }

            var clearComposition = function() {
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