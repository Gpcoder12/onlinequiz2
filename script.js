// array of questons
const quizQuestions = [
  {
      question: "Which HTML attribute is used to specify the width of an image?",
      options: [//
          {text:"width", correct: true},
          {text:"size", correct: false},
          {text:"scale",correct: false},
          {text:"length", correct: false}
      ],
      answer:0
  
  },
  {
      question: "What is the concept of inheritance in JavaScript?",
      options: [
          {text:"Inheritance is the process of creating a new object from an existing object", correct: false},
          {text:".Inheritance is a way to implement multiple interfaces in JavaScript", correct: false},
          {text:"Inheritance is the process of extending the functionality of a class by inheriting properties and methods from a parent class",correct: true},
          {text:"Inheritance is a way to encapsulate data and behavior into a single entity in JavaScript", correct: false}
      ],
      answer: 2
  },
  {
      question: "What is the purpose of the command 'git clone'?",
      options: [
          {text:"To create a new Git repository", correct: false},
          {text:"To create a new branch in the current repository", correct: false},
          {text:"To download a copy of a remote repository to your local machine",correct: true},
          {text:"To merge changes from one branch into another branch", correct: false}
      ],
      answer: 2
  },
  {
      question: "What is the purpose of the JavaScript method 'setTimeout()'?",
      options: [
          {text:"To pause the execution of the script for a specific time", correct: true},
          {text:"To set a recurring timer for executing a function", correct: false},
          {text:"To measure the time taken by a function to execute",correct: false},
          {text:"To stop the execution of a JavaScript program", correct: false}
      ],
      answer: 0
  },
  {
      question: "What does the term 'pull request' mean in the context of Github?",
      options: [
          {text:"A request to retrieve the latest changes from a remote repository", correct: true},
          {text:"A request to merge changes from one branch to another", correct: false},
          {text:"A request to revert a commit in a Git repository",correct: false},
          {text:"A request to delete a repository", correct: false}
      ],
      answer: 0
  },
  {
      question: "What is the significance of the JavaScript keyword 'this'?",
      options: [
          {text:"It refers to the current HTML document", correct: false},
          {text:"It refers to the object on which the method is invoked", correct: true},
          {text:"It refers to the global object in which the function is executed",correct: false},
          {text:"It refers to the parent object of the current object", correct: false}
      ],
      answer: 1
  },
  {
      question: "Which HTML attribote is used to specify width of an image?",
      options: [
          {text:"width", correct: true},
          {text:"size", correct: false},
          {text:"scale",correct: false},
          {text:"length", correct: false}
      ],
      answer: 0
  },
  {
      question: "Which HTML tag is used to create a dropdown list in a form?",
      options: [
          {text:"<option>", correct: false},
          {text:"<select>", correct: true},
          {text:"<form>",correct: false},
          {text:"<input>", correct: false}
      ],
      answer: 1
  },
  {
      question: "Which type of CSS is included in a separate file with a .css extension and linked to the HTML file using the <link> tag?",
      options: [
          {text:"Internal CSS", correct: false},
          {text:"Inline CSS", correct: false},
          {text:"External CSS",correct: true},
          {text:"Import CSS", correct: false}
      ],
      answer : 2
  },
  {
      question: "What is Git used for?",
      options: [
          {text:"To manage databases", correct: false},
          {text:"To create websites", correct: false},
          {text:"To design user interfaces",correct: false},
          {text:"To track changes in files", correct: true}
      ],
      answer: 3
  }
];
class Quiz {
  constructor(questions, timer) {
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.timer = timer;
      this.timerInterval = null;
  }

  startQuiz() {
      this.displayQuestion();
      this.startTimer();
      const nextButton = document.getElementById('nextButton');
      nextButton.addEventListener('click', () => this.showNextQuestion());
  }

  displayQuestion() {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const questionText = document.getElementById('questionText');
      questionText.textContent = currentQuestion.question;

      const optionElements = document.querySelectorAll('input[name="option"]');
      currentQuestion.options.forEach((option, index) => {
          const optionElement = optionElements[index];
          optionElement.value = index;
          optionElement.nextElementSibling.textContent = option.text;
          optionElement.checked = false;
          optionElement.parentElement.classList.remove('correct', 'incorrect');
          optionElement.disabled = false;
      });

      const scoreElement = document.getElementById('score');
      scoreElement.textContent = this.score;
  }

  showNextQuestion() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (!selectedOption) {
          // User has not selected any option, show an alert or handle the case
          return;
      }

      const selectedIndex = parseInt(selectedOption.value);
      if (this.checkAnswer(selectedIndex)) {
          selectedOption.parentElement.classList.add('correct');
          this.score++;
      } else {
          selectedOption.parentElement.classList.add('incorrect');
      }
      selectedOption.disabled = true;

      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
          setTimeout(() => this.displayQuestion(), 1000); // Show next question after 1 second
      } else {
          this.showResults();
      }
  }

  checkAnswer(selectedIndex) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      return selectedIndex === currentQuestion.answer;
  }

  showResults() {
      clearInterval(this.timerInterval);
      const resultButton = document.getElementById('showResultButton');
      resultButton.style.display = 'block';
      const nextButton = document.getElementById('nextButton');
      nextButton.style.display = 'none';
      const timerElement = document.getElementById('timer');
      timerElement.textContent = "00:00"; // Set timer to 00:00 when the quiz is completed
      alert(`Quiz completed. Your score is ${this.score} out of ${this.questions.length}.`);
  }

  startTimer() {
      let timeRemaining = this.timer;
      const timerElement = document.getElementById('timer');

      function formatTime(seconds) {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      }

      timerElement.textContent = formatTime(timeRemaining);

      this.timerInterval = setInterval(() => {
          timeRemaining--;
          timerElement.textContent = formatTime(timeRemaining);

          if (timeRemaining <= 0) {
              clearInterval(this.timerInterval);
              this.showResults();
          }
      }, 1000);
  }
}

const quiz = new Quiz(quizQuestions, 180);
quiz.startQuiz();

