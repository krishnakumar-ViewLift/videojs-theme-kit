# videojs-quiz
Interactive quiz for video.js player.<br/> <br/>
This plugin brings interactive quizzes to videos, allowing users to answer multiple-choice questions directly within the player.<br/>
It ensures active participation by requiring users to complete the quiz before continuing playback, making it ideal for e-learning, training, and interactive engagement.

## Installation
`npm i videojs-quiz`


## Getting Started

Post installation, import and use the package like shown below:-
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video.js Quiz Example</title>
    <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet">
    <script src="https://unpkg.com/video.js/dist/video.js"></script>
    <script src="https://unpkg.com/videojs-quiz"></script>
</head>
<body>
    <h1>Video.js Quiz Example</h1>

    <div data-vjs-player>
        <video id="my-video" class="video-js" controls width="800" height="400">
            <source src="video.mp4" type="video/mp4">
        </video>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            var player = videojs("my-video");
            var quizData = [
                {
                    questionId: "1",
                    time: 5, // Time (in seconds) to pause for the quiz
                    question: "What is 2 + 2?",
                    answers: ["3", "4", "5"],
                    correctAnswer: 1, // Index of the correct answer
                }
            ];
            player.ready(function () {
                player.quiz({ quizData: quizData });
                player.on("quizAnswer", function (e) {
                    console.log("Selection:", e.detail);
                });
            });
        });
    </script>
</body>
</html>
```



