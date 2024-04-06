const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
const quizData = [
  {
    question: 'What is the main purpose of Node.js?',
    options: {
      A: 'Frontend development',
      B: 'Backend development',
      C: 'Mobile app development',
      D: 'Game development',
    },
    correctAnswer: 'B',
  },
  {
    question:
      'Which core module in Node.js is used for handling file system operations?',
    options: {
      A: 'http',
      B: 'fs',
      C: 'path',
      D: 'util',
    },
    correctAnswer: 'B',
  },
  {
    question: 'What is the event-driven architecture in Node.js based on?',
    options: {
      A: 'Callbacks',
      B: 'Promises',
      C: 'Observables',
      D: 'Async/Await',
    },
    correctAnswer: 'A',
  },
  {
    question: 'Which method is used to include external modules in Node.js?',
    options: {
      A: 'require()',
      B: 'import()',
      C: 'include()',
      D: 'use()',
    },
    correctAnswer: 'A',
  },
  {
    question: "What is the purpose of the Node.js 'process' object?",
    options: {
      A: 'Managing user authentication',
      B: 'Interacting with the file system',
      C: 'Managing server-side routing',
      D: 'Providing information about the current Node.js process',
    },
    correctAnswer: 'D',
  },
  {
    question:
      'Which event is emitted when an uncaught JavaScript exception occurs in Node.js?',
    options: {
      A: 'error',
      B: 'exception',
      C: 'crash',
      D: 'uncaughtException',
    },
    correctAnswer: 'A',
  },
  {
    question: "What is the role of the 'util' module in Node.js?",
    options: {
      A: 'Creating custom error classes',
      B: 'Parsing JSON data',
      C: 'Managing HTTP requests',
      D: 'Generating random numbers',
    },
    correctAnswer: 'A',
  },
  {
    question: 'Which of the following is NOT a core module in Node.js?',
    options: {
      A: 'fs',
      B: 'http',
      C: 'url',
      D: 'express',
    },
    correctAnswer: 'D',
  },
  {
    question: 'What is a callback function in Node.js?',
    options: {
      A: 'A function passed as an argument to another function, to be executed later',
      B: 'A function that executes immediately after being defined',
      C: 'A function used to handle HTTP requests',
      D: 'A function used to define custom middleware in Express.js',
    },
    correctAnswer: 'A',
  },
  {
    question: 'What is the Node.js Event Loop?',
    options: {
      A: 'A loop that iterates over the elements of an array',
      B: 'A loop that waits for user input from the command line',
      C: 'A loop that handles asynchronous operations and events',
      D: 'A loop that runs JavaScript code synchronously',
    },
    correctAnswer: 'C',
  },
  {
    question: 'Which module in Node.js is used to create web servers?',
    options: {
      A: 'fs',
      B: 'http',
      C: 'path',
      D: 'os',
    },
    correctAnswer: 'B',
  },
  {
    question: "What is the purpose of the 'os' module in Node.js?",
    options: {
      A: "Interacting with the operating system's file system",
      B: 'Managing HTTP requests and responses',
      C: 'Providing information about the operating system',
      D: 'Parsing and formatting URL strings',
    },
    correctAnswer: 'C',
  },
  {
    question: 'What is the purpose of the Node.js module.exports?',
    options: {
      A: 'To import modules from other files',
      B: 'To define a new module',
      C: 'To export functions, objects, or primitive values from a module',
      D: 'To handle HTTP requests',
    },
    correctAnswer: 'C',
  },
  {
    question:
      'Which npm command is used to install dependencies listed in package.json?',
    options: {
      A: 'npm update',
      B: 'npm install',
      C: 'npm start',
      D: 'npm init',
    },
    correctAnswer: 'B',
  },
  {
    question: 'What does the Node.js process.argv property contain?',
    options: {
      A: 'The arguments passed to the Node.js process',
      B: 'The list of installed npm packages',
      C: 'The file paths of all JavaScript files in the current directory',
      D: 'The environment variables of the Node.js process',
    },
    correctAnswer: 'A',
  },
]

// Endpoint to get quiz questions
app.get('/api/questions', (req, res) => {
  const questions = quizData.map(
    ({ correctAnswer, ...question }) => question
  )
  res.json(questions)
})

// Endpoint to submit quiz answers
app.post('/api/submit', (req, res) => {
  const answers = req.body.answers
  const score = quiz.calculateScore(answers)
  res.json({ score })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
