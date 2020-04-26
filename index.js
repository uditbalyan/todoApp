const express = require('express');
const path = require('path');
const port = 7786;


const db = require('./config/mongoose');
const TodoDB = require('./models/todoSchema');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
app.use(express.urlencoded());
app.use(express.static('assets'));


// home page route, default route . Displays the list of todos present
app.get('/', function (req, res) {

    TodoDB.find({}, function (err, todos) {
        if (err) {
            console.log("error in fetching todos from db");
            return;
        }
        return res.render('home', {
            title: "TODO APP",
            todo_list: todos
        });

    });
});

// route to add a todo field to mongoDB database
app.post('/create-todo', function (req, res) {

    console.log(req);

    TodoDB.create({
        desc: req.body.desc,
        dueDate: req.body.dueDate,
        cat: req.body.cat
    }, function (err, newTodo) {
        if (err) {
            console.log('Error in creating a todo!')
            return;
        }

        console.log('******', newTodo);
        return res.redirect('back');
    });
});

// route to facilitate the removal of database and then redirecting back to home route(Default)
app.get('/delete-todo/', function (req, res) {
    console.log(req.query);
    let id = req.query.id


    TodoDB.findOneAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })



});


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});


