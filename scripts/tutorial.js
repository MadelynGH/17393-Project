const copyLinkToClipboard = function() {
    navigator.clipboard.writeText(document.getElementById("link").querySelector("pre").innerHTML); 
    document.getElementById("copy-link-button").innerHTML = "Copied!"; 
    setTimeout(function() {document.getElementById("copy-link-button").innerHTML = "&#10697; Copy"}, 800);
}

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("copy-link-button").addEventListener("click", copyLinkToClipboard);
});