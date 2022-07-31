const express = require('express');
// create Express app
const app = express();

app.use(express.static('public'));

app.listen(3000);

// routing to pages

// Navigate to index webpage
app.get("/", (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
});
// Navigate to about webpage

app.get("/about", (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
});
// Navigate to register webpage

app.get("/write", (req, res) => {
    res.sendFile('./views/write.html', {root: __dirname});
});

// Return Error page for invalid path

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})
