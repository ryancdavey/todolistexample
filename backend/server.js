const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
const secret = 'testtoken';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
//const withAuth = require('./middleware');

let Todo = require('./Todo');
let User = require('./User');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//use sessions for tracking logins
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false
// }));

mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// app.get('/checkToken', withAuth, function(req, res) {
//   res.sendStatus(200);
// });

// POST route to register a user
todoRoutes.route('/register').post((req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

todoRoutes.post('/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});


//POST route for updating data
todoRoutes.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
todoRoutes.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
todoRoutes.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});





todoRoutes.route('/').get(function(req, res) {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
    Todo.find({},{},{skip: offset, limit: limit }, function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/login').get(function(req, res) {
  User.findById(id, function(err, user) {
    if (err) {
      return res.status(404).json({
        error: `User with id: ${id} does not exist`
      });
    }
  });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
      if (err) {
        return res.status(404).json({ 
          error: `Task with id: ${id} does not exist`
        });
      } 
      res.json(todo);
    });
});

todoRoutes.route('/update/:id').put(function(req, res) {
  let updates = req.body;
  console.log(updates);
  Todo.findOneAndUpdate({ _id: req.params.id }, updates, (err, foundTodo) => {
    if (!foundTodo) {
      return res.status(404).send("data is not found");
    }

    res.json(foundTodo);
  })
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/:id').delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(todo => {
      res.status(200).json({'todo': 'todo deleted.'});
    })
    .catch(err => {
        res.status(400).send('deleting todo failed');
    });
});

app.use('/todos', todoRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


 // // create a user a new user
// var testUser = new User({
//   email: 'test1@aol.com',
//   password: 'Password123'
// });

// // save user to database
// testUser.save(function(err) {
//   if (err) throw err;

//   // fetch user and test password verification
//   User.findOne({ email: 'test@aol.com' }, function(err, user) {
//       if (err) throw err;

//       // test a matching password
//       user.comparePassword('Password123', function(err, isMatch) {
//           if (err) throw err;
//           console.log('Password123:', isMatch); // -> Password123: true
//       });

//       // test a failing password
//       user.comparePassword('123Password', function(err, isMatch) {
//           if (err) throw err;
//           console.log('123Password:', isMatch); // -> 123Password: false
//       });
//   });
// });