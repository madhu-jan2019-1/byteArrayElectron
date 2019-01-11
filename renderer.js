// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc      = require('electron').ipcRenderer,

syncBtn  = document.querySelector('#syncBtn'),
asyncBtn = document.querySelector('#asyncBtn');

let replyDiv = document.querySelector('#reply');

syncBtn.addEventListener('click', () => {
 let
 reply = ipc.sendSync('synMessage','A sync message to main');
 replyDiv.innerHTML = reply;
});

asyncBtn.addEventListener('click', () => {
 ipc.send('aSynMessage','A async message to main')
});

ipc.on('asynReply', (event, args) => {
 replyDiv.innerHTML = args;
});

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];

        var reader = new FileReader();

        reader.onload = function(e) {
            var arrayBuffer = reader.result;
            const Buffer = require('buffer').Buffer;
            ipc.sendSync('buffer',{
                data: Buffer.from(arrayBuffer)
             });
            //fileDisplayArea.innerText = reader.result;
        }

        reader.readAsArrayBuffer(file);	

        // var textType = /pdf.*/;

        // if (file.type.match(textType)) {
           
        // } else {
        //     fileDisplayArea.innerText = "File not supported!"
        // }
    });
}

