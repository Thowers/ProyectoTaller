var username;
var websocket = new WebSocket("ws://localhost:8080/minimal-chat/chatroom");

websocket.onmessage = function(evt) {
    if (evt.data instanceof Blob) {
        // Convertir el Blob a texto
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById("chatRoomField").innerHTML += reader.result + "\n";
        };
        reader.readAsText(evt.data);
    } else {
        // Si no es Blob, mostrar directamente
        document.getElementById("chatRoomField").innerHTML += evt.data + "\n";
    }
};

websocket.onopen = function(evt) { 
	document.getElementById("chatRoomField").innerHTML += "digite usuario" + "\n";
};



function join() {
    username = document.getElementById("newUserField").value;
    websocket.send("*** " + username + " se ha unido!!");
    document.getElementById("newUserField").disabled = true;
    document.getElementById("newUserButton").disabled = true;
    document.getElementById("chatRoomField").disabled = false;
    document.getElementById("sendField").disabled = false;
    document.getElementById("sendButton").disabled = false;
}

function send_message() {
    websocket.send(username + ": " + document.getElementById("sendField").value);
}