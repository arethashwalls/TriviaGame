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

    var intervalID;

    function Quiz() {
        this.questionBank =  $.extend(true, [], questions);
        this.currentQuestion = this.questionBank[0];
        this.timeLeft = 10;
        this.correctAnswer = this.currentQuestion.trueAnswer;
        this.currentGuess = '';
        this.correctGuesses = 0;
        this.incorrectGuesses = 0;
        this.skippedGuesses = 0;
    }

    Quiz.prototype.countDown = function() {
        this.timeLeft--;
        $('#timer').text(this.timeLeft);
        if(this.timeLeft <= 0) {
            clearInterval(intervalID);
            this.showResult();
        }
    }

    Quiz.prototype.startTimer = function() {
        var that = this;
        intervalID = setInterval(function() {
            that.countDown();
        }, 1000);
    }

    Quiz.prototype.showResult = function(str) {
        $('.question-box').hide();
        $('.timer-box').hide();
        $('.result-box').show();
        $('.result').text(str);
        $('.correct').text(this.correctAnswer);
    }

  

    var quiz = new Quiz;
    
    quiz.startTimer();




});