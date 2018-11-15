# Worldly Written Words
## A multiple-choice writing-themed trivia game created for the UA Coding Bootcamp.

The core code can be found in assets/javascript/game.js.

First, I define an array of **questions**. Each is an object containing a *question*, a *trueAnswer*, three *decoy*s, and an *image* URL.

Next, I set up my global variables. *intervalID* and *timeoutID* will hold my interval and delay. *timeLimit* lets me change the question timelimit globally, which was handy for testing.

Next, I define a helper function, **randomize**, which takes one array as a parameter and returns a copy of that array with the contents "shuffled" into a random order.

Next, I define my **Quiz** object template. *Quiz* begins with five properties:

* **Quiz.questionBank** contains a randomized deep copy of *questions*.
* **Quiz.timeLeft** begins at the value of the global *timeLeft* variable and will decriment with the timer.
* **Quiz.correctGuess**, **Quiz.incorrectGuess**, and **Quiz.skippedGuess** count the number of correct, incorrect, and skipped answers, respectively.

I then add 8 methods to the *Quiz* object:

* **Quiz.setQuestion** picks the current question from *Quiz.questionBank* based on the index supplied. It also sets the following properties:
  * **Quiz.currentQuestion** tracks the current question.
  * **Quiz.nextIndex** is set to the following index, allowing the quiz to progress through the question bank.
  * **Quiz.allAnswers** is set to a randomized array of the question's answers.
* **Quiz.displayQuestion** updates the DOM during the question stage based on the current question.
* **Quiz.displayResult** updates the DOM during the result stage based on the current question and the player's response.
* **Quiz.displayFinalResult** updates the DOM during the final result stage based on the player's total score.
* **Quiz.countDown** decriments *Quiz.timeLeft* and updates the display.
* **Quiz.startTimer** runs *Quiz.countDown* on a 1 second interval and checks to see if time has run out. If time has run out, it moves the player to the result stage and increments *Quiz.skippedGuesses*.
* **Quiz.toNext** moves the player to either the result or final result stage, depending on whether further questions remain in the question bank.
* **Quiz.newGame** wraps *Quiz.setQuestion(0)*, *Quiz.displayQuestion()*, and *Quiz.startTimer()* together, as all three are used when starting a new game.

### Gameplay

The core game loop can be found on lines 207-235.

The new game is definined on lines 206 and 209.

On clicking an answer, the timer interval is cleared (214). 

If the answer's `data-is-correct` attribute is `true`, the answer is correct. A success message is displayed, *Quiz.correctGuesses* is incremented, and the player moves to the next question (217-220).

If `data-is-correct` is false, a failure message is displayed, *Quiz.incorrectGuesses* is incremented, and the player moves to the next question (222-226).

The restart button is available in the final result stage. On clicking the restart button (231-233), the quiz is reset and the game starts over.

## TODO

* Fix footer
