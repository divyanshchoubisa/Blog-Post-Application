const express = require('express');
const bodyParser = require('body-parser');
const ld = require('lodash');

app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
const homeStartContent = "Welcome To The Blog";

app.get('/', (req, res) => {
    res.render('home', {
        homeContent:homeStartContent,
        posts:posts
    });
})

app.get('/new', function(req, res){
    res.render("newPost");
})

app.get('/new', function(req, res){
    res.render("newPost");
})

app.post("/new",function(req,res){
    //object
    const post={
      title:req.body.title,
      categories:req.body.categories,
      content:req.body.content
    };
    posts.push(post);
    res.redirect("/");
  });

app.get("/posts/:title", function(req, res){
    const requestedTitle = ld.lowerCase(req.params.title)
    posts.forEach(function(post){
        const storedTitle = ld.lowerCase(post.title);
        if(storedTitle==requestedTitle){
            res.render("postDetails",{
                title:post.title,
                categories:post.categories,
                content:post.content
            })
        }
    })
})

app.get("/edit/:ttt", function(req, res){
    const requestedTitle= ld.lowerCase(req.params.ttt); //ttt == title
    posts.forEach(function(posts){
        const storedTitle= ld.lowerCase(posts.title);
        if(storedTitle==requestedTitle){
            res.render("edit",{
                title:posts.title,
                categories:posts.categories,
                content:posts.content
            })
        }
    })
})

app.post("/edit/:title",function(req,res){
    const requestedTitle= ld.lowerCase(req.params.title);
    //check valid titles
    posts.forEach(function(post) {
      const storedTitle= ld.lowerCase(post.title);
      if(storedTitle === requestedTitle){
          post.title=req.body.title,
          post.categories=req.body.categories,
          post.content=req.body.content
          res.redirect("/");
      }
    });
  });

app.get("/delete/:title", function(req, res){
    const requestedTitle= ld.lowerCase(req.params.title);
    posts.forEach(function(post){
        const storedTitle= ld.lowerCase(post.title);
        if(storedTitle === requestedTitle){
        posts.pop(post);
        res.redirect("/");
    }
})
})


app.listen(3000,function(){
    console.log("Server started on port 3000");
  });


