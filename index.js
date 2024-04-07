let timerInterval = 0

// To not take the quiz
const prepareMore = () => {
  document.getElementById('response').style.display = 'block'
}

// To take the Quiz
const startQuiz = async () => {
  document.getElementById('readyPrompt').style.display = 'none'
  document.getElementById('quiz').style.display = 'block'
  document.getElementById('submitBtn').style.display = 'block'
  document.getElementById('response').style.display = 'none'
  document.getElementById('timer').style.display = 'block'
  startTimer()
  await loadQuestions()
}

// To start the timer
const startTimer = () => {
  let startTime = Date.now()

  timerInterval = setInterval(() => {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000)

    let hours = Math.floor(elapsedTime / 3600)
    let minutes = Math.floor((elapsedTime % 3600) / 60)
    let seconds = elapsedTime % 60

    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    document.getElementById(
      'timer'
    ).textContent = `Time Elapsed - ${formattedTime}`
  }, 1000)
}

// To stop the timer
const stopTimer = () => {
  clearInterval(timerInterval) // Stop the timer interval
}

// To get questions from server
const loadQuestions = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/questions')
    if (!response.ok) {
      throw new Error('Failed to fetch questions')
    }
    const data = await response.json()
    const quizDiv = document.getElementById('quiz')
    data.forEach((question, index) => {
      const questionContainer = document.createElement('div')
      questionContainer.classList.add('question-container')
      questionContainer.innerHTML = `
        <h3>${index + 1}. ${question.question}</h3>
        <ul>
          <li>
            <label>
              <input type="radio" name="answer${index}" value="A">
              ${question.options.A}
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="answer${index}" value="B">
              ${question.options.B}
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="answer${index}" value="C">
              ${question.options.C}
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="answer${index}" value="D">
              ${question.options.D}
            </label>
          </li>
        </ul>
        <div class="result" style="display: none;"></div>
      `
      quizDiv.appendChild(questionContainer)
    })
  } catch (error) {
    console.log('Failed to load questions')
    console.error(error)
  }
}

// To submit the Selected Options to server
const submitAnswers = async (event) => {
  event.preventDefault()
  stopTimer()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  let answers = []
  const quizDiv = document.getElementById('quiz')
  for (let i = 0; i < quizDiv.children.length; i++) {
    const questionDiv = quizDiv.children[i]
    const selectedOption = questionDiv.querySelector('input:checked')
    answers.push(selectedOption ? selectedOption.value : '')
  }

  if (answers.some((answer) => answer === '')) {
    alert('Please answer all the questions to complete the quiz')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit answers')
    }

    const data = await response.json()
    displayResult(data)
    document.getElementById('retake').style.display = 'block'
  } catch (error) {
    console.error(error)
    console.log('Failed to submit answers')
  }
}

// To display Correct and Selected Options
const displayResult = (data) => {
  const scoreDiv = document.getElementById('score')
  scoreDiv.style.display = 'block'
  scoreDiv.textContent = `Your Score: ${data.score}/${data.responseData.length}`

  const resultDiv = document.createElement('div')
  resultDiv.id = 'result'
  resultDiv.style.display = 'block'
  document.body.appendChild(resultDiv)

  const quizDiv = document.getElementById('quiz')
  const questionContainers = quizDiv.querySelectorAll('.question-container')

  data.responseData.forEach((questionData, index) => {
    const resultContainer = questionContainers[index].querySelector('.result')
    resultContainer.style.display = 'block'
    resultContainer.innerHTML = `
      <p>Your Option: ${questionData.selectedOption}</p>
      <p>Correct Option: ${questionData.correctOption}</p>
    `
  })
}

// To retake the quiz
const retakeQuiz = async () => {
  document.getElementById('timer').style.display = 'none'
  document.getElementById('score').style.display = 'none'
  document.getElementById('result').style.display = 'none'
  document.getElementById('quiz').innerHTML = ''
  document.getElementById('retake').style.display = 'none'
  await startQuiz()
}
