const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
// create Express app
const app = express();

// connect to MongoDB
const dbURI = "mongodb+srv://bamjam101:randomAccess@quimzz.r3fab.mongodb.net/bloggie-db?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// declare public scope using express static
app.use(express.static('public'));

// use view engine
app.set('view engine', 'ejs')

// Routes
app.get('/', (req,res)=> {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'Home', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/about', (req,res)=> {
    res.render('about', {title: 'About'});
});

app.get('/contact', (req,res)=> {
    res.render('contact', {title: 'Contact'});
});

app.get('/create', (req,res)=> {
    res.render('create', {title: 'Create New Blog'});
});

// Return Error page for invalid path
app.use((req, res) => {
    res.render('404', {title: 'Error'})
})
