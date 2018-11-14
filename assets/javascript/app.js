$(document).ready(function () {

    //An array containing all question objects:
    var questions = [
        {
            question: 'Examples of syllabic writing systems include:',
            trueAnswer: 'Cherokee, Japanese, and Vai.',
            decoy1: 'Japanese, Arabic, and Nahuatl.',
            decoy2: 'Cherokee, Cree, and Devanagari.',
            decoy3: 'Thai, Vai, and Cyrillic.'
        },
        {
            question: 'Hangeul is:',
            trueAnswer: 'A featural alphabet.',
            decoy1: 'A partial syllabary.',
            decoy2: 'A set of logograms.',
            decoy3: 'A delicious barbeque dish.'
        },
        {
            question: 'Identify the following sample: ស្វាគមន៍មកកាន់ប្រទេសកម្ពុជា',
            trueAnswer: 'Khmer.',
            decoy1: 'Lao.',
            decoy2: 'Cyrillic.',
            decoy3: 'Tamil.'
        },
        {
            question: 'The first alphabetic writing system with fully represented vowels was:',
            trueAnswer: 'Greek.',
            decoy1: 'Chinese.',
            decoy2: 'Latin.',
            decoy3: 'Syriac.'
        },
        {
            question: 'Identify the following sample: როგორ გრძნობ თავს დღეს',
            trueAnswer: 'Georgian.',
            decoy1: 'Virginian.',
            decoy2: 'Lao.',
            decoy3: 'Armenian.'
        },
        {
            question: 'Which of the following scripts is written from left to right?',
            trueAnswer: "Ge'ez.",
            decoy1: 'Arabic.',
            decoy2: 'Hebrew.',
            decoy3: "N'Ko."
        },
        {
            question: 'Identify the following sample: তোমার সাথে দেখা করে ভালো লাগলো',
            trueAnswer: 'Bengali.',
            decoy1: 'Devanagari.',
            decoy2: 'Gujarati.',
            decoy3: 'Armenian.'
        },
        {
            question: 'Which of the following scripts is NOT constructed?',
            trueAnswer: 'Arabic.',
            decoy1: 'Hangeul.',
            decoy2: 'Tengwar.',
            decoy3: 'Cherokee.'
        },
        {
            question: 'Tifinagh is:',
            trueAnswer: 'An abjad.',
            decoy1: 'An abugida.',
            decoy2: 'An alphabet.',
            decoy3: 'A syllabary.'
        },
        {
            question: 'Symbols such as "&", "6", or "@" are examples of:',
            trueAnswer: 'Logograms.',
            decoy1: 'Phonograms.',
            decoy2: 'Graphics.',
            decoy3: 'Sonograms.'
        },
    ];

    //Global variables:
    var intervalID, timeoutID;
    var timeLimit = 10;

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
        this.questionBank = randomize($.extend(true, [], questions));
        this.timeLeft = timeLimit;
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
        $('.final-result-box').hide();
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

    //This method updates the DOM to show the final result:
    Quiz.prototype.displayFinalResult = function () {
        $('.result-box').hide();
        $('.final-result-box').show();
        $('#total-correct').text(this.correctGuesses);
        $('#total-incorrect').text(this.incorrectGuesses);
        $('#total-skipped').text(this.skippedGuesses);
    }

    //This method contains the countdown that will be used in the interval later:
    Quiz.prototype.countDown = function () {
        this.timeLeft--;
        $('#timer').text(this.timeLeft);

    }

    //This method begins the countdown and 
    Quiz.prototype.startTimer = function () {
        this.timeLeft = timeLimit;
        $('#timer').text(this.timeLeft);
        var that = this;
        intervalID = setInterval(function () {
            that.countDown();
            if (that.timeLeft < 0) {
                clearInterval(intervalID);
                that.displayResult("Time's up...");
                that.skippedGuesses++;
                that.toNext();
            }
        }, 1000);
    }

    //This method displays the next question or, if there are no more questions, the final result:
    Quiz.prototype.toNext = function () {
        var that = this;
        timeoutID = setTimeout(function () {
            if (that.nextIndex === that.questionBank.length) {
                that.displayFinalResult();
            } else {
                that.setQuestion(that.nextIndex);
                that.displayQuestion();
                that.startTimer();
            }
        }, 5000);
    }

    //This method wraps three cooccuring methods together for DRYness.
    Quiz.prototype.newGame = function () {
        this.setQuestion(0);
        this.displayQuestion();
        this.startTimer();
    }

    /************************** The core loop begins below:***********************/

    //First, initialize a new Quiz object:
    var quiz = new Quiz;

    //Set a new game to begin:
    quiz.newGame();

    //If an answer is clicked:
    $('.answers').on('click', '.answer', function () {
        //Stop the timer:
        clearInterval(intervalID);
        //If it's the correct answer:
        if ($(this).attr('data-is-correct') === 'true') {
            //Tell the user, increment correctGuesses, and move on.
            quiz.displayResult('You got it!');
            quiz.correctGuesses++;
            quiz.toNext();
            //If it's not:
        } else {
            //Tell the user, increment incorrectGuesses, and move on.
            quiz.displayResult('Not quite...');
            quiz.incorrectGuesses++;
            quiz.toNext();
        }
    });

    //The restart button begins the quiz anew:
    $('#restart').on('click', function () {
        quiz = new Quiz;
        quiz.newGame();
    });

});