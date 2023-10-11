//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
}

let startTime;
// if continueQuiz button clicked
continue_btn.onclick = () => {
    startTime = new Date().getTime(); // Record the start time when the quiz starts
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer('06'); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue = '5';
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter = 0;
let counterLine = 0;
let widthValue = 0;

const quit_quiz = result_box.querySelector(".buttons .quit");

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
// if Next Que button clicked
next_btn.onclick = () => {
    clearInterval(counter); // Clear the current question's timer
    clearInterval(counterLine); // Clear the current question's timer line
    timeText.textContent = "Time Left"; // Reset the time text

    if (que_count < questions.length - 1) { // If there are more questions
        que_count++; // Increment the question count
        que_numb++; // Increment the question number
        showQuetions(que_count); // Show the next question
        queCounter(que_numb); // Update the question counter
        startTimer('06'); // Start the timer for the next question (6 seconds)
        startTimerLine(0); // Reset the timer line
        next_btn.classList.remove("show"); // Hide the next button
    } else {
        clearInterval(counter); // Clear the current question's timer
        clearInterval(counterLine); // Clear the current question's timer line
        showResult(); // Show the result for the last question
    }

}

// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");

    let feedback = "";
    const scorePercentage = (userScore / questions.length) * 100;

    if (scorePercentage > 80) {
        feedback = `
            <style> .feedbackP {color: #01016b; font-weight: bold} </style>
            <p class="feedbackP"> Great job! Yoy have won 40% discount. </p>
        `;
    } else if (scorePercentage > 60) {
        feedback = `
            <style> .feedbackP {color: #01016b; font-weight: bold} </style>
            <p class="feedbackP"> Great job! Yoy have won 30% discount. </p>
        `;
    } else if (scorePercentage > 40) {
        feedback = `
            <style> .feedbackP {color: #01016b; font-weight: bold} </style>
            <p class="feedbackP"> Great job! Yoy have won 20% discount.`
    } else {
        feedback = `
            <style> .feedbackP {color: #9d0044; font-weight: bold} </style>
            <p class="feedbackP"> Sorry Try again! </p>
        `;
    }

    // Calculate the time difference (total time - time taken)
    const totalTime = 5; // Total time in seconds
    const endTime = new Date().getTime(); // Record the end time when the quiz ends
    const timeDifference = Math.round((endTime - startTime) / 1000); // Calculate the time difference in seconds

    let resultContent = `
        <div class="feedbackContainer"><br>
            <p> Questions: ${questions.length} </p>
            <p> Wrong Answers: ${questions.length - userScore} </p>
            <p> Score: ${userScore} / ${questions.length} </p>
            <p> Grade: ${scorePercentage} %</p>
            <p> Time taken: ${timeDifference} sec </p><br>
            ${feedback}
        </div>
    `;
    scoreText.innerHTML = resultContent;
}

// Updated startTimer function
function startTimer() {
    clearInterval(counter); // Clear any existing interval
    timeValue = 5; // Set the timeValue to 6 seconds

    timeCount.textContent = timeValue; // Update the timeCount display

    counter = setInterval(timer, 1000); // Start the timer interval

    function timer() {
        timeValue--; // Decrement the time value
        timeCount.textContent = timeValue; // Update the timeCount display

        if (timeValue < 10) { // Add leading zero if the time value is less than 10
            timeCount.textContent = "0" + timeValue;
        }

        if (timeValue === 0) { // If the time reaches 0 seconds
            clearInterval(counter); // Clear the interval
            timeText.textContent = "Time Off"; // Update the timeText display

            const allOptions = option_list.children.length; // Get all option items
            let correcAns = questions[que_count].answer; // Get the correct answer from the array

            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    // If there is an option that matches the correct answer
                    option_list.children[i].setAttribute("class", "option correct"); // Add green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }

            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // Disable all options
            }

            next_btn.classList.add("show"); // Show the next button if the user selected any option

            if (que_count < questions.length - 1) { // If there are more questions
                setTimeout(() => {
                    next_btn.onclick(); // Simulate a click on the next button to move to the next question
                }, 1000); // Delay for 1 second before moving to the next question
            } else {
                setTimeout(() => {
                    submitQuiz(); // Automatically submit the quiz after the last question when time is up
                }, 1000); // Delay for 1 second before submitting the quiz
            }
        }
    }
}

// if Next Que button clicked
next_btn.onclick = () => {
    clearInterval(counter); // Clear the current question's timer
    clearInterval(counterLine); // Clear the current question's timer line
    timeText.textContent = "Time Left"; // Reset the time text

    if (que_count < questions.length - 1) { // If there are more questions
        que_count++; // Increment the question count
        que_numb++; // Increment the question number
        showQuetions(que_count); // Show the next question
        queCounter(que_numb); // Update the question counter
        startTimer('06'); // Start the timer for the next question (6 seconds)
        startTimerLine(0); // Reset the timer line
        next_btn.classList.remove("show"); // Hide the next button
    } else {
        clearInterval(counter); // Clear the current question's timer
        clearInterval(counterLine); // Clear the current question's timer line
        submitQuiz(); // Submit the quiz after the last question
    }
}

// Submit the quiz
function submitQuiz() {
    clearInterval(counter); // Clear the timer
    clearInterval(counterLine); // Clear the timer line
    showResult(); // Show the quiz result
}


function startTimerLine(time) {
    counterLine = setInterval(timer, 10);
    const maxTime = 550; // Maximum width for 6 seconds (assuming 10 milliseconds interval)

    function timer() {
        time += 1; // Increment the time value by 1
        time_line.style.width = time + "px"; // Update the width of the time_line element based on the time value

        if (time > maxTime) { // If the time value is greater than the maximum time (6 seconds)
            clearInterval(counterLine); // Clear the counterLine interval to stop the timer
        }
    }
}


function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
