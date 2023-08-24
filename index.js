import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Arrays to store todos
let todos = []; // Regular todos
let workTodos = []; // Work-related todos

// Home route
app.get("/", (req, res) => {
  res.render("index.ejs"); // Render the index page
});

// Handle POST requests to add regular todos
app.post("/", (req, res) => {
  const todoContent = req.body.content; // Get todo content from the form
  todos.push(todoContent); // Add the todo to the regular todos array
  res.redirect("/today"); // Redirect to the "today" page
});

// Work route
app.get("/work", (req, res) => {
  res.render("work.ejs", { workTodos }); // Render the work page and pass workTodos
});

// Handle POST requests to add work todos
app.post("/work", (req, res) => {
  const todoContent = req.body.content; // Get todo content from the form
  workTodos.push(todoContent); // Add the todo to the work todos array
  res.redirect("/work"); // Redirect to the "work" page
});

// Today route
app.get("/today", (req, res) => {
  res.render("today.ejs", { todos }); // Render the today page and pass todos
});

// Start the server
app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
