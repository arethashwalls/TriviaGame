$(document).ready(function () {

    $('.result-box').hide();
    $('.final-result-box').hide();

    var questions = [
        {
            question: 'What number is three?',
            trueAnswer: '3',
            decoy1: '5',
            decoy2: '9',
            decoy3: '9000'
        },
        {
            question: 'What number is five?',
            trueAnswer: '5',
            decoy1: '3',
            decoy2: '9',
            decoy3: '9000'
        },
        {
            question: 'What number is nine?',
            trueAnswer: '9',
            decoy1: '5',
            decoy2: '3',
            decoy3: '9000'
        }
    ];

    var intervalID, timeoutID;

    //This helper function takes an array and returns a new array with the same contents in a randomized order:
    function randomize(arr) {
        var unrandomized = arr.slice();
        var randomized = [];
        while (unrandomized.length > 0) {
            randomized.push(unrandomized.splice(Math.floor(Math.random() * unrandomized.length), 1)[0]);
        }
        return randomized;
    }

    //This constructor defines the Quiz prototype:
    function Quiz() {
        this.questionBank = $.extend(true, [], questions);
        this.timeLeft = 10;
        this.currentGuess = '';
        this.correctGuesses = 0;
        this.incorrectGuesses = 0;
        this.skippedGuesses = 0;
    }

    //This method sets the current question and answers based on the index provided:
    Quiz.prototype.setQuestion = function (index) {
        this.currentQuestion = this.questionBank[index];
        console.log(this.currentQuestion)
        this.nextIndex = index + 1;
        this.allAnswers = randomize([
            this.currentQuestion.trueAnswer,
            this.currentQuestion.decoy1,
            this.currentQuestion.decoy2,
            this.currentQuestion.decoy3
        ]);
        this.correctAnswer = this.currentQuestion.trueAnswer;
    }

    //This method updates the DOM with the current question:
    Quiz.prototype.displayQuestion = function () {
        $('.question-box').show();
        $('.timer-box').show();
        $('.result-box').hide();
        $('.question').text(this.currentQuestion.question);
        $('.answers').empty();
        for (let i = 0; i < this.allAnswers.length; i++) {
            // var $answer = $('<li>').text(this.allAnswers[i]).attr('id', ('answer-' + i));
            var $answer = $('<li>').text(this.allAnswers[i]).attr({
                'data-is-correct': (this.allAnswers[i] === this.correctAnswer ? true : false),
                'class': 'answer'
            });
            $('.answers').append($answer);
        }
    }

    //This method updates the DOM with the current result:
    Quiz.prototype.displayResult = function (str) {
        $('.question-box').hide();
        $('.timer-box').hide();
        $('.result-box').show();
        $('#result').text(str);
        $('#correct').text(this.correctAnswer);
    }

    Quiz.prototype.displayFinalResult = function () {
        $('.result-box').hide();
        $('.final-result-box').show();
        $('#total-correct').text(this.correctGuesses);
        $('#total-incorrect').text(this.incorrectGuesses);
        $('#total-skipped').text(this.skippedGuesses);
    }

    Quiz.prototype.countDown = function () {
        this.timeLeft--;
        $('#timer').text(this.timeLeft);
    }

    Quiz.prototype.startTimer = function() {
        var that = this;
        intervalID = setInterval(function() {
            that.countDown();
            if(that.timeLeft <= 0) {
                clearInterval(intervalID);
                that.displayResult("Time's up...");
                that.timeLeft = 10;
                that.skippedGuesses++;
            }
        }, 1000);
    }


    /************************** The core loop begins below:***********************/

    var quiz = new Quiz;

    quiz.setQuestion(0);
    quiz.displayQuestion();
    quiz.startTimer();

    $('.answers').on('click', '.answer', function () {
        clearInterval(intervalID);
        if ($(this).attr('data-is-correct') === 'true') {
            quiz.displayResult('You got it!');
            quiz.correctGuesses++;
            timeoutID = setTimeout(function () {
                if (quiz.nextIndex === quiz.questionBank.length) {
                    quiz.displayFinalResult();
                } else {
                    quiz.setQuestion(quiz.nextIndex);
                    quiz.displayQuestion();
                    quiz.startTimer();
                }
            }, 5000);
        } else {
            quiz.displayResult('Not quite...');
            quiz.incorrectGuesses++;
            timeoutID = setTimeout(function () {
                if (quiz.nextIndex === quiz.questionBank.length) {
                    quiz.displayFinalResult();
                } else {
                    quiz.setQuestion(quiz.nextIndex);
                    quiz.displayQuestion();
                    quiz.startTimer();
                }
            }, 5000);
        }
    });

});