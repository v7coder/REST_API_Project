const express = require("express");
const app = express();
const port = 8080;
//To use Views and public folder we need to aquire first
const path = require("path");
const{ v4: uuidv4 } = require('uuid');
//defining methiod overriding
const methodOverride = require("method-override");

//method of post overriding for html form
//use->
app.use(methodOverride('_method'));


//parsing data we use middelware, uderstand the data comming from user by express
app.use(express.urlencoded({extended: true}));

//aquiring folders to use
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


// Posts Data Created:
let posts = [{
               id : uuidv4(),
              username : "Vinay7",
              content : "Position SDE-I Selected "
               },
               {
                id : uuidv4(),
                username: "NirajBora02",
                content : "Position SWE Selected"
               },
               {
                id : uuidv4(),
                username:"RahulPal011",
                content:"Position SDE Selected"
               },

];
// POSt Operation 2 api used
//path creation or route 1st api
app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

//Creating 2nd api post 
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");

});

app.post("/posts", (req,res) => {
let{username, content} = req.body;
let id = uuidv4();
posts.push({id, username, content});
    res.redirect("/posts");// redirect to connect pages
});

//****** Id-retrive/find and create views page to display the single content of that id
app.get("/posts/:id", (req,res) => {
    let{id} = req.params;
    console.log(id); 
       let post = posts.find((p)  => id === p.id);
    
    res.render("show.ejs", {post});
    });


 //**Patch request for updating a specific post */   
 app.patch("/posts/:id",(req,res) => {
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
 })

//delete Post 
app.delete("/posts/:id",(req,res) =>{
    let{id} = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})




 //New route to edit specific post
 app.get("/posts/:id/edit",(req,res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});

 })



app.listen(port, () => {
    console.log("Listening to port : 8080");
});
