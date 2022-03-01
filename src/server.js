/**
 * Backend Code Part
 */
import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");                              // view engine을 pug로 설정
app.set("views", __dirname+"/views");                       // 
app.use("/public", express.static(__dirname+"/public"));    // express에 template 위치 알려줌.
app.get("/", (req, res) => res.render("home"));             // home.pug를 render해주는 route handler
app.get("/*", (req, res) => res.redirect("/"))              // home 페이지만 쓸꺼라 주소 뒤에 다른게 붙으면 무조건 첫 페이지로 이동

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server }) 
// * http를 사용하는 express와 ws를 같이 사용하기 위해서, 
//  app으로 server를 만들고, 
//  server에 wss를 넣음.
// * ws만 쓰려면 express쪽 코드가 필요 없음. 

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connect to Browser ✅");    
    socket.on("close", () => { console.log("Disconnect from the Browser ❌"); })    // Disconnect 이벤트 리스너
    socket.on("message", (message) => {                                             // Message를 받을때 이벤트 리스너
        // console.log("New message : ", message.toString('utf8'));
        sockets.forEach(aSocket => aSocket.send(message.toString()))
    })
})
server.listen(3000, handleListen)