var triviaTimer;
var timeLeft = 15;
var userAnswer = 'null';
var currentQuestion = 0;
var correctAnsCounter = 0;
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

//
// CLICK EVENTS ----------------------------------------------------------------------------------------------------------
//


$("#start-button").click(function() {
    $('#start-button').hide();
    triviaDOM();
    resetTimer();

});




$("#answer1").click(function() {
    clearInterval(triviaTimer);
    userAnswer = 'a';
    answerChecker(userAnswer);
});

$("#answer2").click(function() {
    clearInterval(triviaTimer);
    userAnswer = 'b';
    answerChecker(userAnswer);
});

$("#answer3").click(function() {
    clearInterval(triviaTimer);
    userAnswer = 'c';
    answerChecker(userAnswer);
});

$("#answer4").click(function() {
    clearInterval(triviaTimer);
    userAnswer = 'd';
    answerChecker(userAnswer);
});



//
// FUNCTIONS --------------------------------------------------------------------------------------------------------------------
//


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

function answerChecker(userGuess) {
    if (userGuess === triviaQandA.ans[currentQuestion]) {
        correctAnsCounter++;
        correct();
    } else {
        incorrect();
    }
}

function triviaDOM() {
    if (currentQuestion < 9) {
        $('#question').html(triviaQandA["q" + currentQuestion].q);
        $('#answer1').html(triviaQandA["q" + currentQuestion].a1);
        $('#answer2').html(triviaQandA["q" + currentQuestion].a2);
        $('#answer3').html(triviaQandA["q" + currentQuestion].a3);
        $('#answer4').html(triviaQandA["q" + currentQuestion].a4);
    } else {
        displayResults();
    }
}

function timesUp() {
    $('#answer-indicator').html('Times up! The correct answer was ' + triviaQandA.ans[currentQuestion].toUpperCase() + '.');
    pauseClear();
}

function correct() {
    $('#answer-indicator').html('Correct!');
    pauseClear();
}

function incorrect() {
    $('#answer-indicator').html('Your guess was incorrect. The correct answer was ' + triviaQandA.ans[currentQuestion].toUpperCase() + '.');
    pauseClear();
}

function displayResults() {
    $('.time-remain-margins').html('');
    $('.ans').html('');
    $('#question').html('You answered ' + correctAnsCounter + ' questions out of 10 correctly').addClass('text-center')
}

function pauseClear() {
    var pauseTimer = setTimeout(pause, 6000)

    function pause() {
        $('#answer-indicator').html('');
        currentQuestion++;
        triviaDOM();
        resetTimer();
    }
    clearTimeout(pause);

}
