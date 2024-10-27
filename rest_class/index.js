const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');



app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'))   

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


let posts = [
    {   id : uuidv4(),
        username : "MunmunGorai",
        content : "I love to code"
    },
    {   id : uuidv4(),
        username : "surjaGorai",
        content : "I love to read"
    },
    {   id : uuidv4(),
        username : "VikramadityaGorai",
        content : "I love to code with most of the time"
    },

]






app.get('/posts', (req, res) => {
    res.render("index.ejs" , {posts});
})
app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
});
app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id , username, content });
    console.log(req.body);
    res.redirect('/posts');
    
});
app.get('/posts/:id', (req, res) => {
      let { id } = req.params;
      let post = posts.find(p => p.id === id);
      res.render("show.ejs", {post});     
});

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find(p => p.id === id);
    post.content = newContent;
    res.redirect('/posts');
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    // posts = posts.filter(p => p.id !== id);
    let new_posts = posts.filter(p => p.id !== id);
    console.log(new_posts)
    posts = new_posts
    res.redirect('/posts');
});


app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    // console.log(id)
    // console.log(posts)
    let post = posts.find(p => p.id == id);
    console.log(post);
    
    res.render("edit.ejs", {post});
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) ;