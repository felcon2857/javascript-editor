
//variable decleration
var codeEditor = document.getElementById('codeEditor');
var outputField = document.getElementById('outputField');
var btnPlay = document.querySelector('.btn-play');

//for element counting in editor
function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
    var countChar = element.value.length;
    document.querySelector('.charView').innerHTML = "Character: " + countChar;
    var text = element.value;
    var lines = text.split(/\r|\r\n|\n/);
    var countLines = lines.length;
    document.querySelector('.lineCount').innerHTML = "Line: " + countLines;
    onEmpty();
}

//command for excuting code program in editor
function evalInput() {
    if (codeEditor.value != window.g_lastInput) {
        var theResult, evalSucceeded;
        try {
            theResult = eval(codeEditor.value);
            evalSucceeded = true;
        }
        catch (e) {
            outputField.innerHTML = e;
            outputField.style.backgroundColor = "#F5E4E6";
            outputField.style.margin = "0 28px";
            outputField.style.padding = "10px 5px";
            outputField.style.borderLeft = "3px solid #AA0D20";
            outputField.style.borderRadius = "2px";
            outputField.style.color = "#AA0D20";
        }
        if (evalSucceeded) {
            outputField.innerHTML = (theResult + "").replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r\n|\r|\n/g, '<br>');
            outputField.style.color = "#de8cff";
            outputField.style.backgroundColor = "";
            outputField.style.margin = "";
            outputField.style.padding = "";
            outputField.style.borderLeft = "";
            outputField.style.borderRadius = "";

        }
        window.g_lastInput = codeEditor.value;
    }
}
//disable run button on empty state
function onEmpty() {
    if (codeEditor.value == "") {
        btnPlay.setAttribute('disabled', 'disabled')
    } else {
        btnPlay.removeAttribute('disabled', 'disabled')
    }
}
btnPlay.addEventListener('click', evalInput);
onEmpty();