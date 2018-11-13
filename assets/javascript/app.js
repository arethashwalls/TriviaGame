$(document).ready(function () {
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
        
        this.timeLeft = 30;

        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.skippedAnswers = 0;
    }

    Quiz.prototype.countDown = function() {
        this.timeLeft--;
        console.log(this.timeLeft)
        $('#timer').text(this.timeLeft);
    }

    Quiz.prototype.startTimer = function() {
        var that = this;
        intervalID = setInterval(function() {
            that.countDown();
        }, 1000);
    }

    var quiz = new Quiz;
    
    quiz.startTimer();



});