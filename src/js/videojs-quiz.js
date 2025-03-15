import videojs from "video.js";
(function(videojs) {

  var InteractiveQuizPlugin = function(options) {

    var player = this; // This refers to the Video.js player instance
    var quizData = options.quizData || []; // The quiz data passed into the plugin options
    var currentQuizIndex = 0; // Keep track of the current quiz question
    var answeredQuizzes = new Set(); // Track answered questions (to avoid repeating)

    // Create the quiz popup and make it part of the Video.js player container
    var quizPopup = document.createElement('div');
    quizPopup.className = 'quiz-popup';
    quizPopup.style.display = 'none';


    var quizContents = document.createElement('div');
    quizContents.className='quiz-contents'


    // Create a question element inside the popup
    var questionElement = document.createElement('div');
    questionElement.className='quiz-question'
    quizContents.appendChild(questionElement);

    var answerContainer = document.createElement('div');
    answerContainer.className = 'quiz-answers';
    
    // Create answer buttons inside the container
    var answerButtons = [];
    for (var i = 0; i < 4; i++) {
      var button = document.createElement('button');
      button.className = 'quiz-answer-btn';
      answerContainer.appendChild(button);
      answerButtons.push(button);
    }
    
    // Append answer container inside quiz popup
    quizContents.appendChild(answerContainer);
    



    quizPopup.appendChild(quizContents)
    // Append the quiz popup to the player's element (inside the player container)
    player.el().appendChild(quizPopup);

    // Function to show quiz and pause video
// Function to show quiz and pause video
function showQuizPopup(quiz) {
  questionElement.textContent = quiz.question;

  answerButtons.forEach((button, index) => {
    console.log(quiz.answers[index]);
    
    if (quiz.answers[index] !== undefined) {
      button.textContent = quiz.answers[index];
      button.style.display = 'block'; // Ensure visible if needed
      button.onclick = function () {
        checkAnswer(index, quiz.correctAnswer, quiz.questionId, quiz);
      };
    } else {
      
      button.style.display = 'none'; // Hide unused buttons properly
    }
  });

  quizPopup.style.display = 'block'; // Show the quiz popup
  player.pause(); // Pause the video
}


    // Function to check the answer and send data to the backend
    function checkAnswer(selectedIndex, correctIndex, questionId, quiz) {
      var isCorrect = selectedIndex === correctIndex;

      quizPopup.style.display = 'none'; // Hide the quiz popup
      player.play(); // Resume the video

      // Mark this quiz as answered
      answeredQuizzes.add(questionId);

      // Trigger a custom event to capture user info and answer selection
      triggerUserAnswerEvent(questionId, selectedIndex, isCorrect, quiz);
    }

    // Function to trigger a custom event when the user answers a question
    function triggerUserAnswerEvent(questionId, selectedIndex, isCorrect, quiz) {
      var userAnswerData = {
        questionId: questionId,
        answer: quiz.answers[selectedIndex],
        isCorrect: isCorrect,
        timestamp: player.currentTime()
      };

      // Custom event for answering questions
      var event = new CustomEvent('quizAnswer', {
        detail: userAnswerData
      });

      // Dispatch the event globally or on a specific element
      player.el().dispatchEvent(event);
    }

    let lastTriggeredTime = -1; // Prevents multiple triggers within the same second

    player.on('timeupdate', function () {
      var currentTime = Math.floor(player.currentTime()); // Round time to whole seconds
    
      // Prevent multiple triggers within the same second
      if (currentTime === lastTriggeredTime) return;
      lastTriggeredTime = currentTime;
    
      quizData.forEach((quiz) => {
        if (quiz.time === currentTime && !answeredQuizzes.has(quiz.time)) {
          showQuizPopup(quiz); // Show the quiz
          answeredQuizzes.add(quiz.time); // Mark this timestamp as answered
        }
      });
    });
    
    

    // Handle user skipping to a timestamp
    player.on('seeked', function() {
      var currentTime = player.currentTime();
      for (var i = 0; i < quizData.length; i++) {
        if (quizData[i].time <= currentTime && !answeredQuizzes.has(quizData[i].questionId)) {
          showQuizPopup(quizData[i]);
          currentQuizIndex = i + 1; // Ensure we only show the first missed quiz
        }
      }
    });

  };

  // Register the plugin with Video.js
  videojs.registerPlugin('interactiveQuiz', InteractiveQuizPlugin);

})(videojs);