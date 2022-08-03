const express = require('express');
// create Express app
const app = express();

app.use(express.static('public'));
// use view engine
app.set('view engine', 'ejs')

app.listen(3000);

// Routes
app.get('/', (req,res)=> {
    const blogs = [];
    res.render('index', {title: 'Home', blogs: blogs});
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
