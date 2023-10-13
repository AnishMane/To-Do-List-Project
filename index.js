import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let newItems =[];

app.get("/", (req,res)=>{
    var today  = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    var mainDate = today.toLocaleDateString("en-US", options);
    res.render("index.ejs", {newDate : mainDate, newItem: newItems});
});

app.post("/add", (req,res)=>{
    let item = req.body["input"];
    newItems.push(item);
    res.redirect("/");
});

app.post("/delete", (req,res)=>{
    const itemID = req.body.itemID;
  newItems.splice(itemID, 1);
  res.redirect('/');
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});