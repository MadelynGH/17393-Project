document.head.innerHTML += `<link rel="stylesheet" type="text/css" href="styles/header.css">`;

document.body.innerHTML = `
    <div id="header">
        <a id="logo-link" href="music-maker.html"><img src="images/FLLC 17393 Logo.png" id="logo"></a>

        <a href="tutorial.html" class="link" id="tutorial-link">Tutorial</a>
    </div>

    <div class="break"></div>
` + document.body.innerHTML;