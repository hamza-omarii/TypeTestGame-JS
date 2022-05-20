// Array Of Words
const words = [
    "Hello",
    "Code",
    "Programming",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
];




/* 
=======================
==      Selectors    ==
=======================
*/

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let lvl_select = document.querySelector(".level-select");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let result = document.querySelector(".result");
let tbody = document.querySelector(".tbody");
let dataArray;

const lvls = {
    "Easy": 7,
    "Normal": 5,
    "Hard": 3,
};


// Default Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];


/* 
=======================
==      Events       ==
=======================
*/

window.onload = showResult;


// check level if change
lvl_select.onchange = function() {
    defaultLevelName = lvl_select.value;
    defaultLevelSeconds = lvls[lvl_select.value];
    lvlNameSpan.innerText = defaultLevelName;
    secondsSpan.innerText = defaultLevelSeconds;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("try_btn") || e.target.classList.contains("play_agin")) {
        window.location.reload();
    }
});

lvlNameSpan.innerText = defaultLevelName;
secondsSpan.innerText = defaultLevelSeconds;


startButton.onclick = function() {
    startButton.classList.remove("animate");
    input.focus();
    generateWord();
    showAllWords();
    startPlay();
}


/* 
=======================
==      Functions    ==
=======================
*/

function generateWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    let randomWord = words[randomIndex];

    theWord.innerText = randomWord;
    words.splice(randomIndex, 1);
}

function showAllWords() {

    upcomingWords.innerText = "";

    words.forEach(element => {
        let div = document.createElement("div");
        let txt = document.createTextNode(element);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    });
}

function startPlay() {
    theWord.style.display = "flex";
    upcomingWords.style.display = "flex";
    timeLeftSpan.innerText = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerText--;

        if (timeLeftSpan.innerText == 0) {
            clearInterval(start);
            checkifSuccessOrFail();
        }

    }, 1000);
}


handleWithLocalStorage();

function checkifSuccessOrFail() {
    if (input.value.toLowerCase() == (theWord.innerText).toLowerCase()) {
        scoreGot.innerText++;

        if (words.length > 0) {
            input.value = "";
            generateWord();
            showAllWords();
            startPlay();
        } else {
            let span = document.createElement("div");
            let spanOfText = document.createTextNode("Congratulations You Won");

            span.className = 'good';
            span.appendChild(spanOfText);

            let play_btn = document.createElement("button");
            play_btn.classList.add("play_agin");
            let play_again_txt = document.createTextNode("Play again at a harder level");

            play_btn.appendChild(play_again_txt);

            finishMessage.appendChild(span);
            finishMessage.append(play_btn);

            let today = new Date();
            let data = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " " + defaultLevelName;

            finishMessage.style.display = "flex";
            saveInLocalStorage(data);
        }
    } else {

        let span = document.createElement("span");
        let spanOfText = document.createTextNode(`Game Over ..`);

        let try_again_btn = document.createElement("button");
        try_again_btn.classList.add("try_btn");
        let try_txt = document.createTextNode("Try Again");

        try_again_btn.appendChild(try_txt);

        span.className = 'bad';
        span.appendChild(spanOfText);
        finishMessage.style.display = "flex";
        finishMessage.append(span);
        finishMessage.append(try_again_btn);
    }
}


function handleWithLocalStorage() {

    if (window.localStorage.getItem("win")) {
        dataArray = JSON.parse(localStorage.getItem("win"))
    } else {
        dataArray = [];
    }

}

function saveInLocalStorage(data) {
    dataArray.push(data);
    window.localStorage.setItem("win", JSON.stringify(dataArray));
}

function showResult() {

    if (window.localStorage.getItem("win")) {

        data = JSON.parse(localStorage.getItem("win"));

        data.forEach(element => {

            let tr = document.createElement("tr");

            let divided_value = element.split(" ");

            for (let i = 0; i <= 2; i++) {
                let td = document.createElement("td");
                td.append(divided_value[i]);
                tr.append(td);
            }
            tbody.append(tr);
        });
    }
}