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
app.use(express.urlencoded({ extended: true}));

// use view engine
app.set('view engine', 'ejs')

// Home Page route
app.get('/', (req,res)=> {
    res.redirect('/blogs');
});

app.get('/about', (req,res)=> {
    res.render('about', {title: 'About'});
});

app.get('/contact', (req,res)=> {
    res.render('contact', {title: 'Contact'});
});

// Routes to manipulate data on the DB or Blog routes
app.get('/blogs', (req,res)=> {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'Home', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });
    });


app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});
    
app.get('/blogs/create', (req,res)=> {
    res.render('create', {title: 'Create New Blog'});
});

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', {blog: result, title: 'Blog Detail'});
        })
        .catch((err)=> {
            res.status(404).render('404', { title: 'Blog Not Found'});
        });
});

// Return Error page for invalid path
app.use((req, res) => {
    res.render('404', {title: 'Error'})
})
