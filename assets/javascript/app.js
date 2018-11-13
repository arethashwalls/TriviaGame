$(document).ready(function () {

    $('.result-box').hide();

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
            trueAnswer: '3',
            decoy1: '5',
            decoy2: '9',
            decoy3: '9000'
        },
        {
            question: 'What number is nine?',
            trueAnswer: '3',
            decoy1: '5',
            decoy2: '9',
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
        for (let i = 0; i < this.allAnswers.length; i++) {
            // var $answer = $('<li>').text(this.allAnswers[i]).attr('id', ('answer-' + i));
            var $answer = $('<li>').text(this.allAnswers[i]).attr({
                'data-is-correct' : (this.allAnswers[i] === this.correctAnswer ? true : false),
                'class' : 'answer'
            });
            $('.answers').append($answer);
        }
    }

    //This method updates the DOM with the current result:
    Quiz.prototype.displayResult = function (str) {
        $('.question-box').hide();
        $('.timer-box').hide();
        $('.result-box').show();
        $('.result').text(str);
        $('.correct').text(this.correctAnswer);
    }

    Quiz.prototype.countDown = function () {
        this.timeLeft--;
        $('#timer').text(this.timeLeft);
    }


    /************************** The core loop begins below:***********************/

    var quiz = new Quiz;

    quiz.setQuestion(0);
    quiz.displayQuestion();

    intervalID = setInterval(function(){
        quiz.countDown();
        $('.answer')

        if(quiz.timeLeft <= 0) {
            quiz.displayResult("Time's up...")
        }
    }, 1000);



    //     function Quiz() {
    //         this.questionBank = $.extend(true, [], questions);
    //         this.currentQuestion = this.questionBank[0];
    //         this.nextQuestion = 1;
    //         this.allAnswers = [
    //                 this.currentQuestion.trueAnswer, 
    //                 this.currentQuestion.decoy1, 
    //                 this.currentQuestion.decoy2, 
    //                 this.currentQuestion.decoy3
    //             ];
    //         this.timeLeft = 10;
    //         this.correctAnswer = this.currentQuestion.trueAnswer;
    //         this.currentGuess = '';
    //         this.correctGuesses = 0;
    //         this.incorrectGuesses = 0;
    //         this.skippedGuesses = 0;
    //     }

    //     Quiz.prototype.countDown = function() {
    //         this.timeLeft--;
    //         $('#timer').text(this.timeLeft);
    //         if(this.timeLeft <= 0) {
    //             clearInterval(intervalID);
    //             this.showResult('Too late...');
    //             var that = this;
    //             timeoutID = window.setTimeout(function() {
    //                 that.showQuestion();
    //             }, 5000);
    //         }
    //     }

    //     Quiz.prototype.askQuest = function() {
    //         // var that = this;
    //         // intervalID = setInterval(function() {
    //         //     that.countDown();
    //         // }, 1000);
    //         this.showQuestion();
    //         var that = this;
    //         intervalID = setInterval( function() {
    //             that.timeLeft--;
    //             $('#timer').text(that.timeLeft);
    //             if(that.timeLeft <= 0) {
    //                 clearInterval(intervalID);
    //                 that.showResult('Too late...');
    //                 that.currentQuestion
    //                 timeoutID = window.setTimeout()
    //             }
    //         }, 1000);
    //     }

    //     Quiz.prototype.showQuestion = function() {
    //         $('.question-box').show();
    //         $('.timer-box').show();
    //         $('.result-box').hide();
    //         $('.question').text(this.currentQuestion.question);
    //         for(let i = 0; i < this.allAnswers.length; i++){
    //             var $answer = $('<li>').text(this.allAnswers[i]).attr('id', ('answer-' + i));
    //             $('.answers').append($answer);
    //         }
    //     }

    //     Quiz.prototype.showResult = function(str) {
    //         $('.question-box').hide();
    //         $('.timer-box').hide();
    //         $('.result-box').show();
    //         $('.result').text(str);
    //         $('.correct').text(this.correctAnswer);
    //     }




    //     var quiz = new Quiz;

    //     // quiz.askQuest();


    //     console.log(quiz.allAnswers)

});