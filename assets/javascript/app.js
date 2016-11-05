var triviaTimer;
var timeLeft = 15;
var userAnswer = 'null';
var currentQuestion = 0;
var correctAnsCounter = 0;
var clickOff = true;
var triviaQandA = {
    q0: {
        q: "1. What ringtone song played repeatedly on Andy's cell phone when Jim hid it in the ceiling at the office?",
        a1: "A. &quot;Another Brick in the Wall&quot;",
        a2: "B. &quot;867-5309/Jenny&quot;",
        a3: "C. &quot;Can't Touch This&quot;",
        a4: "D. &quot;Rockin' Robin&quot;"
    },
    q1: {
        q: "2. Who was the only character to successfully run barefoot across hot coals in &quot;Beach Games&quot;, a third-season episode where Michael takes the office gang to Lake Scranton?",
        a1: "A. Pam",
        a2: "B. Michael",
        a3: "C. Creed",
        a4: "D. Phyllis"
    },
    q2: {
        q: "3. What was the name of Angela's sick cat that Dwight killed?",
        a1: "A. Angel Tail",
        a2: "B. Sprinkles",
        a3: "C. Mr. Longwhiskers",
        a4: "D. Princess Puss"
    },
    q3: {
        q: "4. What disappointing homemade Secret Santa gift did Michael receive from Phyllis that prompted &quot;Yankee Swap,&quot; a game which enabled characters on &quot;The Office&quot; to steal someone else's gift?",
        a1: "A. Oven mitt",
        a2: "B. Fruit cake",
        a3: "C. Dunder-Mifflin aluminum foil sculpture",
        a4: "D. Babe Ruth photo tree ornament"
    },
    q4: {
        q: "5. Employees from &quot;The Office&quot; took turns racing in front of a radar speed sign to see who could run the fastest. What did Michael claim was his speed?",
        a1: "A. 13 m.p.h.",
        a2: "B. 22 m.p.h.",
        a3: "C. 31 m.p.h.",
        a4: "D. 52 m.p.h."
    },
    q5: {
        q: "6. When a new manager was installed to oversee the Dunder Mifflin Scranton office, Michael quit and opened his own paper company. What was the name of this enterprise?",
        a1: "A. Scranton Paper Plus",
        a2: "B. Scraples",
        a3: "C. Michael Scott Paper Company",
        a4: "D. Paper R Us"
    },
    q6: {
        q: "7. When Dwight was brutally pummelling Jim with snowballs indoors, he warned Jim that he had a _____ for everybody in the office.",
        a1: "A. Snow cone",
        a2: "B. Bottle of beet juice",
        a3: "C. Pen",
        a4: "D. Wig"
    },
    q7: {
        q: "8. When Andy was inviting everyone at the office to see him perform in the live show &quot;Sweeney Todd,&quot; Dwight declined by saying:",
        a1: "A. &quot;I'll be busy washing my hair.&quot;",
        a2: "B. &quot;The beets are ripe at Schrute Farms, and beets wait for no man.&quot;",
        a3: "C. &quot;Last time I went to the theater a man dressed as a cat sat on my lap.&quot;",
        a4: "D. &quot;It is illogical to observe humans attempt to dance and sing with merriment.&quot;"
    },
    q8: {
        q: "9. What gift did Angela give Creed in &quot;Classy Christmas,&quot; which aired in December 2010?",
        a1: "A. A kitty calendar",
        a2: "B. A multi-pack of underarm deodorant",
        a3: "C. Two tickets to see the band Creed perform",
        a4: "D. A $20 gift certificate to the Scranton Skillet"
    },
    q9: {
        q: "10. The fictional Scranton street address of &quot;The Office&quot; is 1725 Slough Road. What is the significance of &quot;Slough?&quot;",
        a1: "A. It's the name of the street where Steve Carell grew up",
        a2: "B. The word describes a state of moral degradation",
        a3: "C. Slough is the location of the original British show, &quot;The Office&quot;",
        a4: "D. It was Phyllis' maiden name"
    },
    ans: ["d", "a", "b", "a", "c", "c", "d", "c", "b", "c"]
}


// these two lines hide the answer divs and reset button so the user cannot click on them before the game starts
$('#answer1, #answer2, #answer3, #answer4').toggle();
$('#reset-button').hide();




//
// CLICK EVENTS ----------------------------------------------------------------------------------------------------------
//


// the code in this block runs when the user clicks the start button
// when the button is clicked, it hides itself, removes the text-center class from the element with an ID of question
// toggles the answer divs on, and calls the triviaDOM and resetTimer functions
$("#start-button").click(function() {
    $('#start-button').hide();
    $('#question').removeClass('text-center');
    $('#answer1, #answer2, #answer3, #answer4').toggle();
    triviaDOM();
    resetTimer();
});

// this button appears after the game has ended and when clicked, resets the game to be played again
$("#reset-button").click(function() {
    $('#reset-button').hide();
    userAnswer = 'null';
    currentQuestion = 0;
    correctAnsCounter = 0;
    $('#answer2, #answer3, #answer4, .time-remain-margins, .ans').toggle();
    triviaDOM();
    resetTimer();
});


// the next four on click functions set the clickOff boolean to false so that extra clicks or click on other answers when
// the timer is running wont be registered, clear the setInterval() timer, take the users guess depending on what anwser 
// they picked and pass it to the anwserChecker() function

$("#answer1").on('click', function() {
    if (clickOff === true) {
        clickOff = false;
        clearInterval(triviaTimer);
        userAnswer = 'a';
        answerChecker(userAnswer);
    }
});

$("#answer2").on('click', function() {
    if (clickOff === true) {
        clickOff = false;
        clearInterval(triviaTimer);
        userAnswer = 'b';
        answerChecker(userAnswer);
    }
});

$("#answer3").on('click', function() {
    if (clickOff === true) {
        clickOff = false;
        clearInterval(triviaTimer);
        userAnswer = 'c';
        answerChecker(userAnswer);
    }
});

$("#answer4").on('click', function() {
    if (clickOff === true) {
        clickOff = false;
        clearInterval(triviaTimer);
        userAnswer = 'd';
        answerChecker(userAnswer);
    }
});





//
// FUNCTIONS --------------------------------------------------------------------------------------------------------------------
//


// these next two functions are the countdown timer for the trivia game, it resets itself to 15 everytime it is called so the user will
// always have 15 seconds to complete the question
function resetTimer() {
    timeLeft = 15;
    $('#time-remaining').html(timeLeft);
    triviaTimer = setInterval(timer, 1000);
}

function timer() {
    if (timeLeft < 1) {
        clearInterval(triviaTimer);
        timesUp();
    } else {
        timeLeft--;
        $('#time-remaining').html(timeLeft);
    }
}

// this function checks if the users guess is equal to the correct answer found in the triviaQandA object and if it is, incriments
// the correct answer counter, displays to the user they were correct and calls the pauseClear function. If the user guess does not
// equal the correct answer, it displays that the user was wrong and calls the pauseClear() function
function answerChecker(userGuess) {
    if (userGuess === triviaQandA.ans[currentQuestion]) {
        correctAnsCounter++;
        $('#answer-indicator').html('Correct!');
        pauseClear();
    } else {
        $('#answer-indicator').html('Your guess was incorrect. The correct answer was ' + triviaQandA.ans[currentQuestion].toUpperCase() + '.');
        pauseClear();
    }
}

// this function is called when the timer for the question reaches zero and the user has not chosen a guess. It will tell the user
// that time is up and call the pauseClear() function
function timesUp() {
    $('#answer-indicator').html('Times up! The correct answer was ' + triviaQandA.ans[currentQuestion].toUpperCase() + '.');
    pauseClear();
}

// this function updates the DOM with a new question and answer to pick from if there are still questions to use, if not the game
// ends and displays the results to the user
function triviaDOM() {
    if (currentQuestion <= 9) {
        $('#question').html(triviaQandA["q" + currentQuestion].q);
        $('#answer1').html(triviaQandA["q" + currentQuestion].a1);
        $('#answer2').html(triviaQandA["q" + currentQuestion].a2);
        $('#answer3').html(triviaQandA["q" + currentQuestion].a3);
        $('#answer4').html(triviaQandA["q" + currentQuestion].a4);
        clickOff = true;
    } else {
        displayResults();
    }
}

// this function is used when the game ends to displays the end results to the user and an corresponding .GIF based on how the did
// it will also show the reset button to restart the game if they want to
function displayResults() {
    $('#answer2, #answer3, #answer4, .time-remain-margins, .ans').toggle();
    $('#reset-button').show().html('Reset');
    if (correctAnsCounter < 4) {
        $('#question').html('You answered ' + correctAnsCounter + ' out of 10 questions correctly <br>').addClass('text-center');
        $('#question').append('<img src="assets/images/lowScore.gif">');
    } else if (correctAnsCounter < 8) {
        $('#question').html('You answered ' + correctAnsCounter + ' out of 10 questions correctly <br>').addClass('text-center');
        $('#question').append('<img src="assets/images/medScore.gif">');
    } else {
        $('#question').html('You answered ' + correctAnsCounter + ' out of 10 questions correctly <br>').addClass('text-center');
        $('#question').append('<img src="assets/images/highScore.gif">');
    }
}

// these next two functions are used to pause the game while the correct answer or "correct" is displayed to the user
function pauseClear() {
    var pauseTimer = setTimeout(pause, 5000)
    clearTimeout(pause);

}

function pause() {
    $('#answer-indicator').html('');
    currentQuestion++;
    triviaDOM();
    if (currentQuestion < 10) {
        resetTimer();
    }
}
