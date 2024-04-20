//Function to preload MBTI images asynchronously
function preloadImages(imageURLs) {
    const promises = [];
    imageURLs.forEach(url => {
        const img = new Image();
        const promise = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        img.src = url;
        promises.push(promise);
    });
    return Promise.all(promises);
}

//Function to display the quiz and collect user input
function displayQuiz() {
    // Array containing URLs of MBTI images
    const mbtiImageURLs = [
        "Lemon.svg", "Pomegranate.svg", "Dragon Fruit.svg", "Grape.svg", 
        "Peach.svg", "Fig.svg", "Watermelon.svg", "Cherry.svg", 
        "Orange.svg", "Apple.svg", "Banana.svg", "Pear.svg", 
        "Pineapple.svg", "Coconut.svg", "Mango.svg", "Strawberry.svg"
    ];
    
    // Preload MBTI images asynchronously when the quiz starts
    preloadImages(mbtiImageURLs)
        .then(() => {
            // Display the first question when preloading is done
            displayCurrentQuestion();
        })
        .catch(error => {
            console.error('Error preloading images:', error);
            // Handle errors, e.g., show an error message to the user
        });

    const questions = [
        {
            question: "You've been mysteriously invited to an unfamiliar realm known as Fruitville, accessible only within your dreams. The invitation expires tonight.",
            choices: ["I don't know, seems risky", "Sounds fun, let's go on an adventure"],
            weights: [
                {judgingScore: +3, perceivingScore: 0 }, // Weight for first choice
                {perceivingScore: +1, judgingScore:0 }, // Weight for second choice
            ]
        },
        {
            question: "You drift into a deep slumber after a long day. All of a sudden, the sweet scent of fruits start to fill the air.",
            choices: ["Where is the smell coming from?", "Am I in Fruitville"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 }, // Weight for first choice
                {feelingScore: +3, thinkingScore: 0 } // Weight for second choice
            ]
        },
        {
            question: "You open your eyes and see that you’re in Fruitville. It’s a sunny morning in Fruitville and fruits are getting ready to start their day. An apple approaches you...",
            choices: ["This is crazy, I’m dreaming for sure!", "I wonder if there will be any new fruits"],
            weights: [
                {intuitionScore: +3, sensingScore: 0 } , // Weight for first choice
                {sensingScore: +1, intuitionScore: 0 } , // Weight for second choice
            ]
        },
        {
            question: "The apple introduces itself as the Mayor of Fruitville.  “Will you be joining us for the FruitFest at noon? It’s an event meant to welcome newcomers and tourists. And yes, there will be plenty of food!",
            choices: ["“Of course!”", "“I’ll think about it..”"],
            weights: [
                {perceivingScore: +1, judgingScore: 0 } , // Weight for first choice
                {judgingScore: +3, perceivingScore: 0 }, // Weight for second choice
            ]
        },
        {
            question: "As you finish your conversation with the Mayor, you can't help but wonder..",
            choices: ["What food will there be?", "Do fruits eat fruits?"],
            weights: [
                {sensingScore: +1, intuitionScore: 0 } , // Weight for first choice
                {intuitionScore: +3, sensingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"While wandering Fruitville, you notice nobody questioning a human among the fruits. Looking down, you see your limbs, but realize fruits also have their own…",
            choices: ["Am I still a human?", "Am I a fruit?"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 } , // Weight for first choice
                {feelingScore: +3, thinkingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"As you stroll along,  your stomach starts to rumble. At that moment, the town clock rings for noon and you decide to head for the FruitFest",
            choices: ["I’ll make sure to bring some cash for the food stalls", "I can’t wait to explore the culture of Fruitville"],
            weights: [
                {sensingScore: +1, intuitionScore: 0 } , // Weight for first choice
                {intuitionScore: +3, sensingScore: 0 } , // Weight for intuition 
            ]
        },
        {
            question:"You’ve enjoyed your time at the FruitFest, but your time at Fruitville is coming to an end. How do you want to spend your last few minutes at Fruitville?",
            choices: ["I need some time alone to process", "I want to socialize and make the most of my visit"],
            weights: [
                {introvertScore: +1, extrovertScore: 0 } , // Weight for first choice
                {extrovertScore: +3, introvertScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"As you prepare to leave Fruitville, the Mayor expresses gratitude for visiting and tells you that your FruitCard will arrive in the mail soon.",
            choices: ["Finally! That was a strange experience", "Was I a fruit the entire? I feel so confused"],
            weights: [
                {thinkingScore: +3, feelingScore: 0 } , // Weight for first choice
                {feelingScore: +1, thinkingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"While you slowly drift back to reality, memories of your time in Fruitville flood your mind.",
            choices: ["I can’t stop thinking about the details of what happened", "I feel bittersweet and reminisce about my experience"],
            weights: [
                {thinkingScore: +3, feelingScore: 0 } , // Weight for first choice
                {feelingScore: +1, thinkingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"You awaken from your nap on the couch and see that it’s almost time for dinner. Just then, you get a message from a friend asking you to join them for dinner.",
            choices: ["Let’s go! I need to tell a friend about my dream", "Have dinner at home and relax instead"],
            weights: [
                {extrovertScore: +3, introvertScore: 0 } , // Weight for first choice
                {introvertScore: +1, extrovertScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"The next day you hear a ring at your door, your FruitCard has arrived with a letter that says I’m welcome to visit again.",
            choices: ["I’m already ready to visit again!", "I’ll think about visiting again"],
            weights: [
                {perceivingScore: +3, judgingScore: 0 } , // Weight for first choice
                {judgingScore: +1, perceivingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question: "Processing your FruitCard...",
            choices: ["Collect my Fruitcard!"],
            weights: [
                {extrovertScore: 0, introvertScore: 0 }, // laceholder
                {introvertScore: 0, extrovertScore: 0}, //Placeholder
            ]
        },
    ]


    //Variables for scores 
    let currentQuestionIndex = 0;
    let introvertScore = 0;
    let extrovertScore = 0;
    let judgingScore = 0;
    let perceivingScore = 0;
    let sensingScore = 0;
    let intuitionScore = 0;
    let thinkingScore = 0;
    let feelingScore = 0;


    function displayQuestionImage(questionIndex) {
        const imageURLs = [
            "Q1image.svg",
            "Q2image.svg",
            "Q3image.svg",
            "Q4image.svg",
            "Q5image.svg",
            "Q6image.svg",
            "Q7image.svg",
            "Q8image.svg",
            "Q9image.svg",
            "Q10image.svg",
            "Q11image.svg",
            "Q12image.svg",
            "IMG_2127.GIF",
        ];
        const questionImageElement = document.getElementById('question-image');
        questionImageElement.src = imageURLs[questionIndex];
    }

    document.getElementById('begin-quiz').addEventListener('click', function() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('quiz-page').style.display = 'block';
    });

    //Function to display the current question and choices
    function displayCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const progressImageElement = document.getElementById('question-progress-image');
        const choiceContainers = document.getElementById('choices');
        
        choiceContainers.innerHTML = '';
        
        questionElement.textContent = currentQuestion.question;
        progressImageElement.src = getQuestionProgressImage(currentQuestionIndex);
        
        displayQuestionImage(currentQuestionIndex);

        currentQuestion.choices.forEach((choice, index) => {
                //Buttons for choices
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choiceContainers.appendChild(button);
        });
        }

    //Function to get progress bar image URL for the current question 
    function getQuestionProgressImage(questionIndex) {
        const progressImageURLs = [
            "Q1 progress.svg",
            "Q2 progress.svg",
            "Q3 progress.svg",
            "Q4 progress.svg",
            "Q5 progress.svg",
            "Q6 progress.svg",
            "Q7 progress.svg",
            "Q8 progress.svg",
            "Q9 progress.svg",
            "Q10 progress.svg",
            "Q11 progress.svg",
            "Q12 progress.svg",
        ];
        return progressImageURLs[questionIndex] || "";
    }

    //Function to handle choice click
    function handleChoiceClick(choiceIndex) {
        // Update scores based on user response
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];
        console.log("Selected choice weight:", selectedChoiceWeight);

                //Update scores based on weight of selected choice
                if (selectedChoiceWeight.hasOwnProperty('introvertScore')) {
                    introvertScore += selectedChoiceWeight.introvertScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('extrovertScore')) {
                    extrovertScore += selectedChoiceWeight.extrovertScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('judgingScore')) {
                    judgingScore += selectedChoiceWeight.judgingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('perceivingScore')) {
                    perceivingScore += selectedChoiceWeight.perceivingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('sensingScore')) {
                    sensingScore += selectedChoiceWeight.sensingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('intuitionScore')) {
                    intuitionScore += selectedChoiceWeight.intuitionScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('thinkingScore')) {
                    thinkingScore += selectedChoiceWeight.thinkingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('feelingScore')) {
                    feelingScore += selectedChoiceWeight.feelingScore;
                }

            //Move to the next question
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayCurrentQuestion();
            } else {
                calculateMBTITypeAndDisplayImage();
            }
        }
        

    //Function to calculate MBTI type based on scores and display image
    function calculateMBTITypeAndDisplayImage() {
        //Calculate introvert/extrovert dimension
        const introextro = introvertScore > extrovertScore ? "I" :"E";
        //Calculate sensing/intuition dimension
        const sensint = sensingScore > intuitionScore ? "S" : "N";
        //Calculate thinking/feeling dimension
        const thinkfeel = thinkingScore > feelingScore ? "T" : "F";
        //Calculate judging/perceiving dimension
        const judgeper = judgingScore > perceivingScore ? "J" : "P";
        //Produce MBTI type string
        const mbtiTypeString = introextro + sensint + thinkfeel + judgeper;

        console.log("MBTI Type:", mbtiTypeString);

        document.getElementById('results').style.display = 'none';
        
        //Remove quiz-related elements from the DOM
        const questionElement = document.getElementById('question');
        const choiceContainers = document.getElementById('choices');
        const quizContainer = document.getElementById('quiz');
        const thumbnailImage = document.querySelector('img[src="Thumbnail.gif"]');
        questionElement.remove();
        choiceContainers.remove();
        quizContainer.remove();
        thumbnailImage.remove();

        displayImage(mbtiTypeString);

        document.getElementById('results').style.display = 'block'
    }
    
    //Function to calculate MBTI type and return image URL 
        function getMBTIImageUrl(mbtiTypeString) {
            const MBTIImageUrls = {
                "ENTJ": "Lemon.svg",
                "INTJ": "Pomegranate.svg", 
                "ENTP": "Dragon Fruit.svg",
                "INTP": "Grape.svg",
                "ENFJ": "Peach.svg",
                "INFJ": "Fig.svg",
                "ENFP": "Watermelon.svg",
                "INFP": "Cherry.svg",
                "ESFJ": "Orange.svg",
                "ISFJ": "Apple.svg",
                "ESTJ": "Banana.svg",
                "ISTJ": "Pear.svg",
                "ESTP": "Pineapple.svg",
                "ISTP": "Coconut.svg",
                "ESFP": "Mango.svg",
                "ISFP": "Strawberry.svg",
            };
            return MBTIImageUrls[mbtiTypeString] || ""
        }

        //Display image
        function displayImage(mbtiTypeString) {
            const imageURL = getMBTIImageUrl(mbtiTypeString);
            const mbtiImageContainer = document.getElementById('mbti-image');
            const imageElement = document.createElement('img');
            imageElement.src = imageURL;

            mbtiImageContainer.appendChild(imageElement);
    
    }
        //Display the first question when the quiz starts
        displayCurrentQuestion();
        document.addEventListener('DOMContentLoaded', () => {
        const choiceContainers = document.querySelectorAll('.choice-container');
        choiceContainers.forEach((container) => {
            const choices = container.querySelectorAll('button');
            choices.forEach((choice, choiceIndex) => {
                choice.addEventListener('click', () => {
                    handleChoiceClick(choiceIndex);
                });
            });
        });
    });
}

//Call function to start the quiz
displayQuiz();

// Share quiz button click event handler
document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('.share-button');

    shareButton.addEventListener('click', function() {
        const url = window.location.href = 'https://gudetea.github.io/FruitCard-Odyssey/';

        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Quiz URL copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy URL: ', err);
            });
    });
});

// Select the button element
const backToHomeButton = document.getElementById('back-to-home');

// Add event listener for the button click
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back-to-home');

    backButton.addEventListener('click', function() {
        // Redirect to the home page or perform any other action you want
        window.location.href = 'https://gudetea.github.io/FruitCard-Odyssey/'; 
    });
});

// Function to navigate back to the home page
function navigateToHomePage() {
    // Reset quiz state if needed
    resetQuiz(); // Assuming you have a resetQuiz() function defined

    // Hide quiz page and show the home page
    document.getElementById('home').style.display = 'block';
    document.getElementById('quiz-page').style.display = 'none';
}
