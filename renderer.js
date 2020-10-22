// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function newOption() {
    let inputValue = document.getElementById("new-option-value").value;
    console.log(inputValue);

    if (inputValue !== '') {
        document.getElementById("no-option-information").style.display = "none";
        let newOption = document.createElement("p");
        newOption.append(document.createTextNode(inputValue));

        document.getElementById("options").appendChild(newOption);
        storeOptions(newOption);
    }

}

function storeOptions(data) {
    //const remote = require('electron').remote;
    //const fs = remote.require('fs');
    //fs.writeFile('test.txt', 'Hello, I was written by the renderer process!');

    const { ipcRenderer } = require('electron');
    JSON.parse(ipcRenderer.sendSync('storeData', data));
}

function getOptions() {
    const { ipcRenderer } = require('electron');
    var data = JSON.parse(ipcRenderer.sendSync('getData', ''));
    console.log(data);
}

document.querySelector('#new-option-button').addEventListener('click', () => {
    newOption()
});