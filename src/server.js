/**
 * Backend Code Part
 */
import express from "express";

const app = express();

app.set("view engine", "pug");                              // view engine을 pug로 설정
app.set("views", __dirname+"/views");                       // 
app.use("/public", express.static(__dirname+"/public"));    // express에 template 위치 알려줌.
app.get("/", (req, res) => res.render("home"));             // home.pug를 render해주는 route handler
app.get("/*", (req, res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen)