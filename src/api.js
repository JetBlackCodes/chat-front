import io from "socket.io-client";
const socket = io("http://localhost:3000");

// function subscribeToNewMessage(cb) {
//   //Check for connection
//   if (socket !== undefined) {
//     console.log("Connected to socket...");

//     socket.on("output", function(data) {
//       console.log("111", data);
//       // if (data.length) {
//       //   for (var x = 0; x < data.length; x++) {
//       //     // Build out message div
//       //     // var message = document.createElement("div");
//       //     // message.setAttribute("class", "chat-message");
//       //     // message.textContent = data[x].name + ": " + data[x].message;
//       //     // messages.appendChild(message);
//       //     // messages.insertBefore(message, messages.firstChild);
//       //     messages.
//       //   }
//       // }
//     });
//   }
// }

function subscribeToNewMessage(cb, login, message) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}

export { subscribeToNewMessage };
