const body = document.querySelector("body");

const loaderContainer = document.querySelector("#LoaderContainer");
const loader = loaderContainer.querySelector("#Loader");

const mainSlide = document.querySelector("#MainSlide");
let slides = document.querySelectorAll(".Slide");
let currentIndex = 0;

let score = 0;

const NQS = 2;  // Non Question Slides

let timerId = null;

const clockSection = document.querySelector("#ClockSection");
const clock = document.querySelector("#Clock");

let timeLeft = 30;

let questions = [];
let answers = [];

function decoded(text){
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html").body.textContent;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function hideClock(){
    clockSection.style.display = "none";
}

function startClock(){
    timeLeft = 30;

    clockSection.style.display = "flex";

    timerId = setInterval(() => {
        clock.innerHTML = `Time Left: ${timeLeft}`;
        timeLeft --;

        if (timeLeft < 0){
            clock.innerHTML = `Time's up!`;
            nextSlide();
        } 

    }, 1000);
}

function restart(){
    window.location.reload();
}

window.addEventListener("load", ()=>{

    //void slides[0].offsetHeight;
    //
    //slides[0].scrollIntoView({
    //    behavior: "smooth",
    //    block: "start"
    //});
    //
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 250);
});

function nextSlide(){
    clearInterval(timerId);

    // Check for correct answer
    if (currentIndex >= NQS){
        const radios = slides[currentIndex].querySelectorAll("input[type='radio']");
 
        for (let radio of radios){
            if (radio.checked){
                let selectedAnswer = radio.nextElementSibling.textContent.trim();

                if (selectedAnswer == decoded(questions[currentIndex-NQS].correct_answer)){
                    score++;
                }

                break;
            }
        }
    }

    currentIndex = (currentIndex + 1) % slides.length;

    let nextSlide = slides[currentIndex];

    if (nextSlide.id == "ScoreSlide"){
        let scoreDiv = nextSlide.querySelector("#Score");
        let remarks = nextSlide.querySelector("#Remarks");

        scoreDiv.innerHTML = `You Scored: ${score}/${questions.length}`;
        
        let s = score/questions.length;

        if(s <= 0.33){
            remarks.innerHTML = "Better luck next time!"
        } else if(s <= 0.66){
            remarks.innerHTML = "Not bad!";
        } else{
            remarks.innerHTML = "Excellent job!"
        }
    }

    nextSlide.scrollIntoView({
        behavior : "smooth",
    });

    // Handle clock
    if (currentIndex >= NQS && currentIndex != slides.length-1){
        startClock();
    } else{
        hideClock();
    }
}

const nextButtons = document.querySelectorAll(".NextButton");

nextButtons.forEach(button => {
    button.addEventListener("click", nextSlide); 
});

function generateSlides(amount){
    const lastElement = document.querySelector("script");

    for (let i=0; i < amount; i++){
        let slide = document.createElement("div");
        slide.className = "Slide";

        let section = document.createElement("div");
        section.className = "QuestionSection";

        slide.appendChild(section);

        let container = document.createElement("div");
        container.className = "QuestionContainer";

        let button = document.createElement("button");
        button.className = "NextButton";
        button.innerText = "Next";
        button.addEventListener("click", nextSlide); 

        section.appendChild(container);
        section.appendChild(button);

        let question = document.createElement("div");
        question.className = "Question";
        question.innerText = decoded(questions[i].question);

        let line = document.createElement("hr");

        let options = document.createElement("div");
        options.className = "QuestionOptions";

        let qOptions = [...questions[i].incorrect_answers, questions[i].correct_answer];

        qOptions = shuffleArray(qOptions);

        let j = 0;

        qOptions.forEach(qOption => {
            let option = document.createElement("div");
            option.className = "Option";
            
            let radio = document.createElement("input");
            radio.id = `slide${i}radio${j}`;
            radio.type = "radio";
            radio.name = `${i}`;

            let label = document.createElement("label");
            label.htmlFor = radio.id;
            label.innerText = decoded(qOption);
            
            option.appendChild(radio);
            option.appendChild(label);

            options.appendChild(option);

            j++;
        });

        container.appendChild(question);
        container.appendChild(line);
        container.appendChild(options);

        body.insertBefore(slide, lastElement);
    }
}

function generateScoreSlide(){
    let scoreSlide = document.createElement("div");
    scoreSlide.className = "Slide";
    scoreSlide.id = "ScoreSlide";

    let scoreSection = document.createElement("div");
    scoreSection.id = "ScoreSection";

    let scoreContainer = document.createElement("div");
    scoreContainer.id = "ScoreContainer";

    let scoreDiv = document.createElement("div");
    scoreDiv.id = "Score";

    let hr = document.createElement("hr");

    let scoreRemarks = document.createElement("div");
    scoreRemarks.id = "Remarks";

    scoreContainer.appendChild(scoreDiv);
    scoreContainer.appendChild(hr);
    scoreContainer.appendChild(scoreRemarks);

    let button = document.createElement("button");
    button.id = "RetryButton";
    button.innerText = "Retry";
    button.addEventListener("click", restart); 

    scoreSection.appendChild(scoreContainer);
    scoreSection.appendChild(button);

    scoreSlide.appendChild(scoreSection);

    body.insertBefore(scoreSlide, slides[0]);

    return scoreSlide;
}

async function generateQuestions(){
    loader.style.animationPlayState = "running";
    loaderContainer.classList.remove("Loader--hidden");

    // Retrieve quiz settings
    const amount = document.querySelector("#QuestionCount").value; 
    const category = document.querySelector("#Category").value; 
    const difficulty = document.querySelector("#Difficulty").value; 

    const API_URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        questions = data.results;
    } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions! Please try again.")
        return;
    }

    generateSlides(amount);

    slides = [...document.querySelectorAll(".Slide"), generateScoreSlide()];
    
    loaderContainer.classList.add("Loader--hidden");
    loader.style.animationPlayState = "paused";
    nextSlide();
}

const generateButton = document.querySelector("#GenerateButton");
generateButton.addEventListener("click", generateQuestions);
