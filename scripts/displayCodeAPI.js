export default class codeBlock {
    constructor(placeToAddTo, code) {
        this.placeToAddTo = placeToAddTo;
        this.code = code;

        this.generate();
    }

    copyCodeToClipboard() {
        navigator.clipboard.writeText(this.code); 
        document.getElementsByClassName("copy-link-button").innerHTML = "Copied!"; 
        setTimeout(function() {this.placeToAddTo.getElementsByClassName("copy-link-button").innerHTML = "&#10697; Copy code"}, 800);
    }
    
    generate() {
        this.placeToAddTo.innerHTML += `
            <code class="link-code-block">
                <span class="code-block-header"><span class="copy-link-button">&#10697; Copy code</span></span>
                <br>
                <span class="link">
                    <pre>` + this.code + `</pre>
                </span>
            </code>
        `

        document.getElementsByClassName("copy-link-button").addEventListener("click", copyCodeToClipboard);
    }
}