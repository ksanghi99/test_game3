// =================== GAME DATA ===================
const questions = [
    // SECTION 1: Cheesy (2 Questions)
    {
        question: "What do you call a couple who's always laughing together?",
        options: [
            { text: "Perfect Match", emoji: "💞", type: "plausible" },
            { text: "Us", emoji: "😉", type: "plausible" },
            { text: "Professional Comedians", emoji: "🎭", type: "wrong" }
        ]
    },
    {
        question: "If you were a fruit, you'd be a fine-apple! Because...",
        options: [
            { text: "You're always ripe for love", emoji: "🍎", type: "plausible" },
            { text: "You make my heart go core-azy", emoji: "❤️", type: "plausible" },
            { text: "You belong in a fruit salad", emoji: "🥗", type: "wrong" }
        ]
    },
    
    // SECTION 2: Romantic (3 Questions)
    {
        question: "When we're together, time feels like...",
        options: [
            { text: "A beautiful melody", emoji: "🎵", type: "plausible" },
            { text: "My favorite chapter", emoji: "📖", type: "plausible" },
            { text: "A boring meeting", emoji: "😴", type: "wrong" }
        ]
    },
    {
        question: "Your smile does to me what coffee does to mornings...",
        options: [
            { text: "Makes everything better", emoji: "✨", type: "plausible" },
            { text: "Is my daily addiction", emoji: "💘", type: "plausible" },
            { text: "Gives me stomach ache", emoji: "🤢", type: "wrong" }
        ]
    },
    {
        question: "If love were a language, ours would be spoken in...",
        options: [
            { text: "Whispers and secrets", emoji: "🤫", type: "plausible" },
            { text: "Silences that say everything", emoji: "🤍", type: "plausible" },
            { text: "Angry shouting", emoji: "😡", type: "wrong" }
        ]
    },
    
    // SECTION 3: Naughty/Adult Teasing (5 Questions)
    {
        question: "What's my favorite place to get lost with you?",
        options: [
            { text: "Between the sheets", emoji: "🛏️", type: "plausible" },
            { text: "In each other's arms", emoji: "🤗", type: "plausible" },
            { text: "At the grocery store", emoji: "🛒", type: "wrong" }
        ]
    },
    {
        question: "Your kisses taste better than...",
        options: [
            { text: "The finest wine", emoji: "🍷", type: "plausible" },
            { text: "Forbidden fruit", emoji: "🍎", type: "plausible" },
            { text: "Boiled broccoli", emoji: "🥦", type: "wrong" }
        ]
    },
    {
        question: "What's the secret ingredient in our recipe for love?",
        options: [
            { text: "Spice and everything nice", emoji: "🌶️", type: "plausible" },
            { text: "Late nights and soft whispers", emoji: "🌙", type: "plausible" },
            { text: "Boring routines", emoji: "⏰", type: "wrong" }
        ]
    },
    {
        question: "If we were a movie, our rating would be...",
        options: [
            { text: "R - Romantically Risqué", emoji: "😏", type: "plausible" },
            { text: "A - Absolutely Addicting", emoji: "❤️", type: "plausible" },
            { text: "B - Boring as heck", emoji: "😒", type: "wrong" }
        ]
    },
    {
        question: "What's the game I always want to play with you?",
        options: [
            { text: "Hide and seek under covers", emoji: "🙈", type: "plausible" },
            { text: "Staring contest that ends with kisses", emoji: "👄", type: "plausible" },
            { text: "Monopoly (and argue about rules)", emoji: "🎲", type: "wrong" }
        ]
    }
];

// =================== GAME STATE ===================
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let selectedOption = null;
let gameCompleted = false;

// DOM Elements
const questionText = document.getElementById('questionText');
const qNumber = document.getElementById('qNumber');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const progressFill = document.getElementById('progressFill');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const correctCountEl = document.getElementById('correctCount');
const streakCountEl = document.getElementById('streakCount');
const nextBtn = document.getElementById('nextBtn');
const heartsDisplay = document.getElementById('heartsDisplay');

// =================== INITIALIZE GAME ===================
function initGame() {
    totalQuestionsEl.textContent = questions.length;
    updateHeartsDisplay();
    loadQuestion(currentQuestionIndex);
    updateStats();
}

// =================== LOAD QUESTION ===================
function loadQuestion(index) {
    if (index >= questions.length) {
        showCompletionScreen();
        return;
    }
    
    const question = questions[index];
    questionText.textContent = question.question;
    qNumber.textContent = index + 1;
    currentQuestionEl.textContent = index + 1;
    
    // Update progress bar
    const progressPercentage = ((index + 1) / questions.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    selectedOption = null;
    feedbackMessage.textContent = '';
    feedbackMessage.style.color = '#ff006e';
    nextBtn.disabled = true;
    
    // Create option buttons
    question.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.className = `option-btn ${option.type}`;
        button.innerHTML = `
            <div class="option-emoji">${option.emoji}</div>
            <div class="option-text">${option.text}</div>
        `;
        
        button.onclick = () => selectOption(button, optionIndex, option.type);
        optionsContainer.appendChild(button);
    });
}

// =================== SELECT OPTION ===================
function selectOption(button, optionIndex, type) {
    if (selectedOption !== null) return; // Prevent re-selection
    
    selectedOption = button;
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Check answer
    if (type === 'plausible') {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
    
    nextBtn.disabled = false;
}

// =================== HANDLE CORRECT ANSWER ===================
function handleCorrectAnswer() {
    score++;
    streak++;
    
    selectedOption.classList.add('correct');
    
    // Romantic feedback messages
    const messages = [
        "Perfect! That's exactly us! ❤️",
        "You know my heart so well! 💖",
        "Exactly what I was thinking! 😊",
        "That's our love story! 📖",
        "You read my mind! 💭"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    feedbackMessage.textContent = randomMessage;
    feedbackMessage.style.color = '#4cc9f0';
    
    // Create floating hearts
    createFloatingHearts();
    
    updateStats();
    updateHeartsDisplay();
}

// =================== HANDLE WRONG ANSWER ===================
function handleWrongAnswer() {
    streak = 0;
    
    selectedOption.classList.add('incorrect');
    
    // Teasing feedback messages
    const messages = [
        "That's not us! We're more romantic! 😉",
        "Come on, you know us better than that! 💕",
        "We're way more exciting than that! ✨",
        "Think again, my love! ❤️",
        "That sounds like someone else's boring relationship! 😴"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    feedbackMessage.textContent = randomMessage;
    feedbackMessage.style.color = '#ff4d6d';
    
    updateStats();
}

// =================== CREATE FLOATING HEARTS ===================
function createFloatingHearts() {
    const container = document.querySelector('.game-container');
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'float-heart';
        heart.innerHTML = '❤️';
        
        // Random position
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 80 + 10;
        
        heart.style.left = `${startX}%`;
        heart.style.top = `${startY}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.color = i % 2 === 0 ? '#ff4d6d' : '#4cc9f0';
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// =================== UPDATE STATS ===================
function updateStats() {
    correctCountEl.textContent = score;
    streakCountEl.textContent = streak;
}

// =================== UPDATE HEARTS DISPLAY ===================
function updateHeartsDisplay() {
    const filledHearts = '❤️'.repeat(currentQuestionIndex);
    const emptyHearts = '🤍'.repeat(questions.length - currentQuestionIndex);
    heartsDisplay.innerHTML = filledHearts + emptyHearts;
}

// =================== NEXT QUESTION ===================
nextBtn.onclick = function() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        showCompletionScreen();
    }
};

// =================== COMPLETION SCREEN ===================
function showCompletionScreen() {
    if (gameCompleted) return;
    gameCompleted = true;
    
    // Create completion screen
    const completionScreen = document.createElement('div');
    completionScreen.className = 'completion-screen';
    completionScreen.innerHTML = `
        <div class="completion-content">
            <h2 class="completion-title">You Decoded My Heart! 💖</h2>
            <p class="completion-message">
                You got ${score} out of ${questions.length} right!<br>
                Our love story is written in every answer you chose. ❤️
            </p>
            
            <div class="final-stats">
                <div class="final-stat">
                    <div class="final-stat-value">${score}/${questions.length}</div>
                    <div class="final-stat-label">Score</div>
                </div>
                <div class="final-stat">
                    <div class="final-stat-value">${streak}</div>
                    <div class="final-stat-label">Final Streak</div>
                </div>
            </div>
            
            <p class="completion-message">
                "Every answer was right when it came from you, Mitthi 💕"<br><br>
                Ready for the next adventure?
            </p>
            
            <button class="continue-btn" id="continueBtn">Continue Our Journey →</button>
        </div>
    `;
    
    document.body.appendChild(completionScreen);
    
    // Add celebration hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingHearts(), i * 100);
    }
    
    // Continue button
    document.getElementById('continueBtn').onclick = function() {
        completionScreen.remove();
        // Here you would navigate to next game
        console.log("Proceed to next game!");
        alert("Game completed! Next game would start here.");
    };
}

// =================== KEYBOARD SUPPORT ===================
document.addEventListener('keydown', function(e) {
    if (gameCompleted) return;
    
    if (e.key >= '1' && e.key <= '3' && selectedOption === null) {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option-btn');
        if (options[optionIndex]) {
            options[optionIndex].click();
        }
    }
    
    if (e.key === 'Enter' && !nextBtn.disabled) {
        nextBtn.click();
    }
});

// =================== START GAME ===================
window.addEventListener('DOMContentLoaded', initGame);
