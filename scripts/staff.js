const staffHTML = `
    <div id="staff">
        <hr>
        <hr>
        <hr>
        <hr>
        <hr>
    </div>

`;

const noteHTML = `
    <button class="note-for-staff"></button>
`;

const allCSS = `
    hr {
        margin-bottom: 19px;
        margin-top: 19px;
        border-width: 1px;
        color: black;
    }
    
    .note-for-staff {
        position: absolute;
        border-style: none;
        
        border-radius: 100%;
        background-color: black;
        width: 20px; 
        height: 20px
    }
    
    #staff {
        position: absolute;
        z-index: -1;
        width: 100%;        
    }
`

const notePositions = {
    "c4": -10,
    "d4": 0,
    "e4": 10,
    "f4": 20,
    "g4": 30,
    "a5": 40,
    "b5": 50
}

let staffNoteIndex = 0;

export const createStaff = function(parentElement) {
    parentElement.innerHTML += staffHTML;
    document.head.innerHTML += `<style>` + allCSS + `</style>`;
}

export const renderNote = function(note) {
    document.getElementById("staff").innerHTML += `<div class="staff-note-` + staffNoteIndex + `" style="padding: 0; bottom: ` + notePositions.toString(note) + `;">` + noteHTML + `</div>`;
    staffNoteIndex ++;
}