let timerInterval = 0

const startQuiz = async () => {
  document.getElementById('readyPrompt').style.display = 'none'
  document.getElementById('quiz').style.display = 'block'
  document.getElementById('submitBtn').style.display = 'block'
  document.getElementById('response').style.display = 'none'
  startTimer()
  await loadQuestions()
}
const prepareMore = () => {
  document.getElementById('response').style.display = 'block'
}
const startTimer = () => {
  let startTime = Date.now() // Get the current time when the timer starts

  // Update the timer display every second
  timerInterval = setInterval(() => {
    // Calculate the elapsed time since the timer started
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000) // Convert milliseconds to seconds

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(elapsedTime / 3600)
    let minutes = Math.floor((elapsedTime % 3600) / 60)
    let seconds = elapsedTime % 60

    // Format the time components to ensure leading zeros if needed
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    // Update the content of the timer div
    document.getElementById('timer').textContent = formattedTime
  }, 1000) // Update every second (1000 milliseconds)
}
const stopTimer = () => {
  clearInterval(timerInterval) // Stop the timer interval
}

const clearSelection = (questionIndex) => {
  const questionDiv = document.getElementById('quiz').children[questionIndex]
  console.log(questionDiv)
  const options = questionDiv.querySelectorAll('input[type="radio"]')
  options.forEach((option) => {
    option.checked = false
  })
}

const loadQuestions = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/questions')
    if (!response.ok) {
      throw new Error('Failed to fetch questions')
    }
    const data = await response.json()
    const quizDiv = document.getElementById('quiz')
    data.forEach((question, index) => {
      quizDiv.innerHTML += `
                        <div>
                            <h3>${index + 1}. ${question.question}</h3>
                        <ul>
                            <li><input type="radio" name="answer${
                              index + 1
                            }" value="A">${question.options.A}</li>
                            <li><input type="radio" name="answer${
                              index + 1
                            }" value="B">${question.options.B}</li>
                            <li><input type="radio" name="answer${
                              index + 1
                            }" value="C">${question.options.C}</li>
                            <li><input type="radio" name="answer${
                              index + 1
                            }" value="D">${question.options.D}</li>
                        </ul>
                        <button
                        class="clear"
                        type="button"
                        onclick="clearSelection(${index + 1})">Clear</button>
                            </div>
                    `
    })
  } catch (error) {
    console.log('Failed to load questions')
    console.error(error)
  }
}

const submitAnswers = async (event) => {
  event.preventDefault()
  stopTimer()
  const answers = []
  const quizDiv = document.getElementById('quiz')
  //   console.log(quizDiv.children)
  for (let i = 0; i < quizDiv.children.length; i++) {
    const questionDiv = quizDiv.children[i]
    const selectedOption = questionDiv.querySelector('input:checked')
    answers.push({
      [`${i + 1}`]: selectedOption ? selectedOption.value : '',
    })
  }
  console.log(answers)
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
    alert(`Your score: ${data.score}`)
  } catch (error) {
    console.error(error)
    console.log('Failed to submit answers')
  }
}
