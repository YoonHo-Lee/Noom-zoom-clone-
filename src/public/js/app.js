/**
 * Frontend Code Part
 */
const socket = new WebSocket(`ws://${window.location.host}`)

// Connect 이벤트 리스너
socket.addEventListener("open", () => {
    console.log("Connect to Server ✅");
})

// Message를 받을때 이벤트 리스너
socket.addEventListener("message", (message) => {
    console.log("New message : ", message.data);
})

// Disconnect 이벤트 리스너
socket.addEventListener("close", () => {
    console.log("Disconnect from Server ❌");
})

setTimeout( () => {
    socket.send("Hello from the Browser")
}, 5000)