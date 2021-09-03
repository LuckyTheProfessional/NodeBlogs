const express = require('express');
const  morgan  = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { response } = require('express');
const { render } = require('ejs');

const app = express();
// MONGO DATABASE
const dbURI = `mongodb+srv://netninja:netninja@nodetuts.8krqo.mongodb.net/nodeTuts?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
 
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));
app.use(morgan('dev'));


app.get('/', function (req, res) {
    res.redirect('/blogs');
});

app.get('/about', function (req, res) {
    res.render('about', { title: 'About' })
});

app.get('/blogs', (req, res) => {
    Blog.find().sort( {createdAt: -1} )
     .then(response => {
        res.render('index', { title: 'All Blogs', blogs: response })
    })
})

app.post('/blogs', (req, res) => {
    const data = new Blog(req.body);
    
    data.save().then(response => {
        res.redirect('/blogs');
    })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    if (Blog.findById(id)) {
        Blog.findById(id).then(response => {
            res.render('details', { title: 'Details Page', blog: response })
        })
    }
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
     .then(result => {
         res.json( { redirect: '/blogs' } )
     })
})

app.use(function(req, res) {
    res.status(404).render('404', { title: '404' })
});



