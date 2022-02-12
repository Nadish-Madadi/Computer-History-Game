// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create multiple choice quiz questions
let questions = [{
    question: "What does RAM stand for?",
    imgSrc: "https://images-na.ssl-images-amazon.com/images/I/71JOuGEq0xL._AC_SL1500_.jpg",
    choiceA: "Random Access Memory",
    choiceB: "Random Arithmetic Memory",
    choiceC: "Random Access Motherboard",
    correct: "A"
}, {
    question: "Which component is correctly associated with its function?",
    imgSrc: "https://imgaz1.staticbg.com/thumb/large/oaupload/banggood/images/83/A2/c3aa6b23-a2cd-4fce-9374-7c583f3b8490.JPG",
    choiceA: "RAM: processing",
    choiceB: "Monitor: output",
    choiceC: "Optical drive: input",
    correct: "B"
}, {
    question: "Which of the following statements is correct?",
    imgSrc: "https://hackaday.com/wp-content/uploads/2016/11/1kb-thumb.png?w=600&h=600",
    choiceA: "1MB = 1000 kilobytes",
    choiceB: "1KB = 1024 bytes",
    choiceC: "1KB = 1000 bytes",
    correct: "B"
}, {
    question: "The first hard disks, created in the 1950s, could be up to 20 inches in diameter. Which company invented the hard disk?",
    imgSrc: "https://www.bhphotovideo.com/images/images2500x2500/hp_lq036aa_500gb_sata_3_5_1023417.jpg",
    choiceA: "Intel",
    choiceB: "HP",
    choiceC: "IBM",
    correct: "C"
}, {
    question: "What does virus stand for?",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_pl6ExECexMMj05P9-IR-_P9YmBN-mahvOUXD2j3VwU2PGX9H&usqp=CAU",
    choiceA: "Vital Information Requirements Under Siege",
    choiceB: "Very Important Resource Under Siege",
    choiceC: "Vital Information Resources Under Siege ",
    correct: "C"
}, {
    question: "Both email atachments and downloaded files can spread malware",
    imgSrc: "https://askleo.com/wp-content/uploads/2017/01/attachment-300x158.png",
    choiceA: "True",
    choiceB: "False",
    choiceC: "Maybe",
    correct: "A"
}, {
    question: "German Konrad Zuse invented the first ever programmable computer in 1936. What was the name of that computer?",
    imgSrc: "https://external-preview.redd.it/CuFz6ETpoqgOpcZNVEtgOyhoR66ghXiOYZhNtdAUGfs.jpg?auto=webp&s=8ae426aaefe17c693e3625b328ec9edcd3be2bfc",
    choiceA: "Analytical Engine",
    choiceB: "Z1",
    choiceC: "P1",
    correct: "B"
}, {
    question: "He invented the first computer mouse in 1964, changing the way we interact with computers. What is his name?",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/2/22/3-Tasten-Maus_Microsoft.jpg",
    choiceA: "Edumund Berkeley",
    choiceB: "Douglas Engelbart",
    choiceC: "Steve Jobs",
    correct: "B"
}, {
    question: "Which combination of 3 items contains flash memory?",
    imgSrc: "https://cdn.ttgtmedia.com/rms/onlineImages/GC5A444272_nand_flash_memory.jpg",
    choiceA: "Solid State Drive, Car Radios, and Microwaves",
    choiceB: "Priniters, Flashlights, and Light Bulbs",
    choiceC: "USB Flash Drives, MP3 Players, and Phones",
    correct: "C"
}, {
    question: "What is the difference between CD and DVD?",
    imgSrc: "https://www.p4p.uk.com/wp-content/uploads/2017/09/cd-dvd-blu-ray-discs.jpg",
    choiceA: "A DVD's storage space is larger",
    choiceB: "A CD's storage space is larger",
    choiceC: "There is no difference",
    correct: "A"
}, {
    question: "IP ____________ sends a message with an IP address disguised as a message from a trusted source. ",
    imgSrc: "https://nordvpn.com/wp-content/uploads/2019/12/IP-Spoofing-JPEG-Featured.jpg",
    choiceA: "Address",
    choiceB: "Spoofing",
    choiceC: "Protocol",
    correct: "B"
}, {
    question: "The motherboard is essential to any computer. Which of the following answers below is not a function of the motherboard.",
    imgSrc: "https://c1.neweggimages.com/ProductImage/13-183-652-V02.jpg",
    choiceA: "Connects all computer components",
    choiceB: "Holds the RAM and CPU",
    choiceC: "Inputs but doesn't output",
    correct: "C"
}];

// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 15s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    hide.style.display = "none"
    renderQuestion();
    hide1.style.display = "none"
    renderQuestion();
    hide2.style.display = "none"
    renderQuestion();
    hide3.style.display = "none"
    renderQuestion();
    hide4.style.display = "none"
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();

        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// render user's score
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    //the following conditional statement is used to direct the user to another page (results page) based on the percentage he/she gets in the quiz
    if (scorePerCent >= 100) {
        document.location.href = "Middle Page1.html";
    } else if (scorePerCent == 92) {
        document.location.href = "Middle Page2.html"
    } else if (scorePerCent == 83) {
        document.location.href = "Middle Page3.html"
    } else if (scorePerCent == 75) {
        document.location.href = "Middle Page4.html"
    } else if (scorePerCent == 67) {
        document.location.href = "Middle Page5.html"
    } else if (scorePerCent == 58) {
        document.location.href = "Middle Page6.html"
    } else if (scorePerCent == 50) {
        document.location.href = "Middle Page7.html"
    } else if (scorePerCent == 42) {
        document.location.href = "Middle Page8.html"
    } else if (scorePerCent == 33) {
        document.location.href = "Middle Page9.html"
    } else if (scorePerCent == 25) {
        document.location.href = "Middle Page10.html"
    } else if (scorePerCent == 17) {
        document.location.href = "Middle Page11.html"
    } else if (scorePerCent == 8) {
        document.location.href = "Middle Page12.html"
    } else {
        document.location.href = "Middle Page13.html"
    }

}