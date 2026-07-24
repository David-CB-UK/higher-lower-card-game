// ========================================
// Initial DOM Setup
// ========================================

// Get references to the HTML / DOM elements that JavaScript will interact with
const drawCardButton = document.getElementById("draw-card-btn");
const reshuffleDeckButton = document.getElementById("reshuffle-deck");

// Get references to the card images
const currentCardImage = document.getElementById("current-card-image");
const nextCardImage = document.getElementById("next-card-image");

// Disable reshuffle until the first game has started
reshuffleDeckButton.disabled = true;

// Get references to the Higher / Lower buttons
const higherButton = document.getElementById("higher-btn");
const lowerButton = document.getElementById("lower-btn");

// Get reference to display the number of cards remaining
const cardsRemaining = document.getElementById("cards-remaining");

// Get references to the score displays
const currentScoreDisplay = document.getElementById("current-score");
const gameBestScoreDisplay = document.getElementById("game-best-score");
const bestScoreDisplay = document.getElementById("best-score");

// Get a reference to the element used to display error messages
const gameMessage = document.getElementById("game-message");

// ========================================
// Game State Variables
// ========================================


// Store the unique ID of the current deck so it can be reused for future API requests
let deckId;

// Store the current face-up card - This card remains available so it can be compared with the next card.
let currentCard;

// Store the next card drawn after the player makes a guess - This card will be the one  compared against the current card.
let nextCard;

// Store player's current score
let currentScore = 0;

// Store player's best streak during the current game
let gameBestScore = 0;

// All players best score to date (or until page refresh)
let bestScore = 0;


/**
 * Creates and shuffles a new deck using the Deck of Cards API.
 * The returned deck ID is stored so the same deck can be used
 * for future card draw requests.
 */

async function getDeck() {
    // Send a request to the API and wait for the response
    const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );

    // Convert the JSON response into a JavaScript object
    const data = await response.json();

    // Store the unique deck ID returned by the API
    deckId = data.deck_id;

    // Display the returned deck data in the console for API testing
    console.log(data);
}



// ========================================
// End Game Messages
// ========================================

const endGameMessages = {
    0: "💀 I didn't know a result could be this bad... Did you even look at the cards?",
    1: "🃏 Everyone starts somewhere. At least you're on the scoreboard!",
    2: "✌️ Double trouble... or double progress!",
    3: "🍀 Third time's the charm... eventually!",
    4: "🍀 Four-leaf clovers are rare. This score... less so.",
    5: "✋ High five! A start's a start.",
    6: "🎲 Rolling a six is lucky. Keep that luck going!",
    7: "🎩 007 would be proud. Licence to guess.",
    8: "🎱 The Magic 8-Ball approves your choices.",
    9: "🌀 9th Chevron locked. Destination set!",
    10: "👟 Allons-y! Into double figures!",
    11: "⚡ \"It's not every day someone scores eleven!\" Hagrid definitely called this one.",
    12: "🥚 A full dozen! You're warming up now.",
    13: "🍀 Lucky for some... today it was you!",
    14: "🚀 You're gaining momentum now!",
    15: "🏅 Achievement unlocked: Finding Your Feet.",
    16: "🎉 Sweet sixteen! Your guessing game is growing up.",
    17: "📈 Your odds are looking better by the card.",
    18: "🎯 You're definitely getting the hang of this.",
    19: "😎 Nearly twenty... confidence suits you.",
    20: "⭐ Achievement unlocked: On a Roll.",
    21: "♠️ Blackjack would have loved that score!",
    22: "🦆 22... quack quack! No ducks were harmed in achieving this score.",
    23: "🃏 You're stacking the deck in your favour!",
    24: "⏰ 24 hours in a day... and you've made every second count.",
    25: "🏆 Half the deck conquered!",
    26: "🏹 May the odds be ever in your favour.",
    27: "🎉 Now we're talking!",
    28: "📈 Your winning streak has its own momentum now.",
    29: "🔥 You're making this look easy.",
    30: "🎩 You're becoming a Higher or Lower expert.",
    31: "🖖 Section 31 has classified your score as above average. Officially, no such record exists.",
    32: "💪 You're well into expert territory now.",
    33: "⬆️ Level up! You're becoming a Higher or Lower master.",
    34: "🧹 You've got the reflexes of a Seeker.",
    35: "🦈 Achievement unlocked: Card Shark.",
    36: "🎲 Lady Luck clearly knows your name.",
    37: "🚀 This run is getting seriously impressive.",
    38: "🏅 You're playing like a seasoned pro.",
    39: "🌟 So close to forty... keep going!",
    40: "🎉 Life begins at 40... and so do legendary scores.",
    41: "🎖️ You didn't come this far to stop now!",
    42: "🌌 42... apparently the answer to life, the universe and everything.",
    43: "🎲 Fortune favours the bold... and apparently you.",
    44: "🃏 The cards are definitely on your side now.",
    45: "💎 You must have nerves of steel!",
    46: "⚡ Almost unstoppable!",
    47: "👏 You're in elite company now.",
    48: "🎖️ That's a score worth bragging about.",
    49: "🎯 So close you can almost taste perfection.",
    50: "🏅 Half century! That's championship form.",
    51: "😱 One card away from perfection...",
    52: "👑 You achieved the impossible! A flawless run. Take a screenshot—you've earned bragging rights!"
};



// ========================================
// Draw Card Function
// ========================================

/**
 * Draws one card from the current deck using its unique deck ID.
 * The returned card data is logged to the console for testing.
 */
async function drawCard() {
    /*
     * 'Try' to run the code below; If an error occurs 
     * (such as no internet connection or the API being 
     * unavailable), JavaScript will stop executing this block
     * and move to the catch block instead of crashing the program.
     */
    try {
        
        // Prevent the player requesting another card while waiting for the API response
        drawCardButton.disabled = true;

        // Message to the player that a card is currently being requested / drawn
        drawCardButton.textContent = "Drawing...";
        
        // Display the custom card back while the first card is being requested
        currentCardImage.src = "assets/images/hi-low-card-reverse.webp";
        currentCardImage.alt = "Reverse of Card";

        /*
         * Use a template literal to insert the current deckId
         * dynamically into the API URL
         */
        const response = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );

        // Convert the JSON response into a JavaScript object
        const data = await response.json();

        // Store the first card from the returned cards array as the current face-up card
        currentCard = data.cards[0];

        // Display the individual card data and remaining card count for API testing
        await flipCard(
            currentCardImage,
            currentCard.image,
            `${currentCard.value} of ${currentCard.suit}`
        );

        // Reset the number of cards remaining after reshuffling the deck
        cardsRemaining.textContent = data.remaining;

        // Display the card returned by the API
        currentCardImage.src = currentCard.image;
        currentCardImage.alt = `${currentCard.value} of ${currentCard.suit}`;

        // Enable the Higher & Lower buttons ready for the player's first guess
        higherButton.disabled = false;
        lowerButton.disabled = false;

        // Disable the Draw Card button because the game has now started
        drawCardButton.disabled = true;
        drawCardButton.textContent = "Game Started";

        // Clear any previous error message because the card was drawn successfully.
        gameMessage.textContent = "";

        // Re-enable the Draw Card button if there are still cards remaining
        //if (data.remaining > 0) {
        //    drawCardButton.disabled = false;
        //    drawCardButton.textContent = "Draw Card";
        //}

        // Re-enable the reshuffle button after an error
        reshuffleDeckButton.disabled = false;

        // Restore the original button text
        reshuffleDeckButton.textContent = "Reshuffle Deck";
    }
    

    /*
     * If an error occurs anywhere inside the try block,
     * execution continues here. The error is written to the
     * browser console to help with debugging during development.
     */
    catch (error) {
        // Display the error details in the browser console
        console.error(error);

        // Display a user-friendly error message on the page
        gameMessage.textContent = "⚠️ Unable to draw a card. Please check your connection and try again.";
    
        // Re-enable the Draw Card button so the player can use button to try again after an error.
        drawCardButton.disabled = false;
        // return button to say draw card
        drawCardButton.textContent = "Draw Card";
    }
}


// ========================================
// Delay Function
// ========================================

/**
 * Pauses execution for the specified number of milliseconds.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Flips a card and swaps the image halfway through.
 */
async function flipCard(cardElement, imageSrc, imageAlt) {

    // Flip the card away from the player
    cardElement.classList.add("card-flip-out");
    await delay(220);

    // Remove the first animation
    cardElement.classList.remove("card-flip-out");

    // Change the card while edge-on
    cardElement.src = imageSrc;
    cardElement.alt = imageAlt;

    // Flip the new card back towards the player
    cardElement.classList.add("card-flip-in");
    await delay(220);

    // Clean up
    cardElement.classList.remove("card-flip-in");
}





// ========================================
// Higher / Lower Guess Function
// ========================================

/**
 * Draws the next card after the player has chosen
 * Higher or Lower and displays it in the Next Card area.
 */
async function makeGuess(playerGuess) {

    // Console msg to confirm the function has been called
    console.log("Guess button clicked");

    // Request one card from the current deck
    const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    // Convert the JSON response into a JavaScript object
    const data = await response.json();

    // Update the number of cards remaining in the current deck
    cardsRemaining.textContent = data.remaining;

    // Store the first card from the returned cards array as the next face-up card
    nextCard = data.cards[0];

    // Flip the Next Card over to reveal it
    await flipCard(
        nextCardImage,
        nextCard.image,
        `${nextCard.value} of ${nextCard.suit}`
    );

    /**
     * Slides the Next Card container towards the Current Card.
     */
    async function slideCardAcross() {

    const flyingCard = document.getElementById("flying-card");
    const currentCard = document.getElementById("current-card-image");
    const nextCard = document.getElementById("next-card-image");

    // Copy the revealed card
    flyingCard.src = nextCard.src;
    flyingCard.alt = nextCard.alt;
    flyingCard.style.display = "block";

    // Immediately reveal what is underneath
    if (drawCardButton.textContent === "Out of Cards") {

        nextCard.src = "assets/images/out-of-cards-card.webp";
        nextCard.alt = "Out of Cards";

    } else {

        nextCard.src = "assets/images/hi-low-card-reverse.webp";
        nextCard.alt = "Reverse of Card";

    }

    // Work out how far to travel
    const start = flyingCard.getBoundingClientRect();
    const end = currentCard.getBoundingClientRect();

    const x = end.left - start.left;
    const y = end.top - start.top;

    flyingCard.style.transition = "transform 0.45s ease-in-out";
    flyingCard.style.transform = `translate(${x}px, ${y}px)`;

    await delay(450);

    // Reset
    flyingCard.style.display = "none";
    flyingCard.style.transform = "";
}

// Display the returned data in the browser console for testing
console.log(data);

// Compare the current and next cards
const result = compareCards(playerGuess);

if (result === "correct") {
    gameMessage.textContent = "✅ Correct!";
} else if (result === "incorrect") {
    gameMessage.textContent = "❌ Incorrect!";
} else {
    gameMessage.textContent =
        "🤝 It's a tie! Equal cards don't count. Guess again!";
}

// Display the returned result for testing
console.log("Returned result:", result);

// Prevent additional guesses (hi/low button presses) while the turn is being processed
higherButton.disabled = true;
lowerButton.disabled = true;

// Allow the player time to view the revealed card
await delay(700);

// Slide the revealed card towards the Current Card
await slideCardAcross();

updateGameState(result);

// Leave the feedback visible briefly
await delay(500);
    if (result !== "equal" && Number(cardsRemaining.textContent) > 0) {
        gameMessage.textContent = "";
    }
}



// ========================================
// Compare Cards Function
// ========================================

/**
 * Converts the value returned by the Deck of Cards API
 * into a number so that two cards can be compared.
 */
function getCardValue(card) {

    switch (card.value) {

        case "ACE":
            return 1;

        case "KING":
            return 13;

        case "QUEEN":
            return 12;

        case "JACK":
            return 11;

        default:
            return Number(card.value);
    }

}

/**
 * Compares the current card with the next card.
 * The comparison result will be used to determine
 * whether the player's guess is correct.
 */
function compareCards(playerGuess) {

    const currentValue = getCardValue(currentCard);
    const nextValue = getCardValue(nextCard);

    let result;

    if (nextValue === currentValue) {
        // Equal card
        // Ignore it and draw another card
        result = "equal";
        console.log("= Equal cards! No win or loss. Please guess again.");
    
    } else if (playerGuess === "higher") {
        if (nextValue > currentValue) {
            result = "correct";
        } else {
        result = "incorrect";
    }

    } else {
        if (nextValue < currentValue) {
            result = "correct";
        } else {
            result = "incorrect";
        }
    }

    console.log("Player guessed:", playerGuess);
    console.log("Current value:", currentValue);
    console.log("Next value:", nextValue);
    console.log("Result:", result);

    return result;
}


// ========================================
// Update Game State Function
// ========================================

/**
 * Updates the game after the current and next cards
 * have been compared.
 */
function updateGameState(result) {

    console.log("Updating game state:", result);

        // Increase or reset the player's score
        if (result === "correct") {
            currentScore++;

            // Update the best streak for this game
            if (currentScore > gameBestScore) {
                gameBestScore = currentScore;
            }

            // Update the best score across all games
            if (currentScore > bestScore) {
                bestScore = currentScore;
            }

            } else if (result === "incorrect") {
                currentScore = 0;

            } else if (result === "equal") {
                // Equal cards do not affect the score - & If there are no cards left it does nothing, so the existing Game Over message stays visible and 
                // not overwritten by the tie message if there are 2 equal last cards at the end of the deck!
                if (Number(cardsRemaining.textContent) > 0) {
                    gameMessage.textContent = "🤝 It's a tie! Equal cards don't count. Guess again!";
                    }
        }

    // Update the displayed scores
    updateScoreDisplay();

    // Move the next card so it becomes the current card
    currentCard = nextCard;

    // Display the new current card
    currentCardImage.src = currentCard.image;
    currentCardImage.alt = `${currentCard.value} of ${currentCard.suit}`;

    // Only allow another guess if there are still cards remaining
    if (cardsRemaining.textContent !== "0") {
        higherButton.disabled = false;
        lowerButton.disabled = false;
    } else {
        setOutOfCardsState();
    }

}


// ========================================
// Score Display Function
// ========================================

/**
 * Updates the score displayed to the player.
 */
function updateScoreDisplay() {
    currentScoreDisplay.textContent = currentScore;
    gameBestScoreDisplay.textContent = gameBestScore;
    bestScoreDisplay.textContent = bestScore;
}


// ========================================
// Out of Cards Function
// ========================================


//Updates the game when all cards have been drawn.
function setOutOfCardsState() {

    //temp for dignosis
    console.log("GAME OVER CALLED");

// Get the message for the player's final score
const endMessage = endGameMessages[gameBestScore] || "Thanks for playing!";

// Display the end-of-game message
gameMessage.innerHTML = `
    <strong>🎉 Game Over!</strong>
    <br><br>
    <strong>🏆 Best Streak This Game: ${gameBestScore}</strong>
    <br><br>
    ${endMessage}<br>
    <br> 
    🃏 You've reached the end of the deck. <br> Please reshuffle the deck to continue.`;

    // Prevent any further cards being drawn
    drawCardButton.disabled = true;

    // Update the button text to reflect the current game state
    drawCardButton.textContent = "Out of Cards";

}


// ========================================
// Reshuffle Deck Function
// ========================================

console.log({
    drawCardButton,
    reshuffleDeckButton,
    cardsRemaining,
    gameMessage
});

/**
 * Reshuffles the existing deck using its stored deck ID.
 * This allows the same virtual deck to be reused rather than
 * requesting a new deck and deck ID.
 */
async function reshuffleDeck() {

    try {

        // Disable the reshuffle button while the deck is being reshuffled
        reshuffleDeckButton.disabled = true;

        // Indicate to the player that the deck is currently being reshuffled
        reshuffleDeckButton.textContent = "Shuffling...";

        // Display the custom card back while reshuffling
        currentCardImage.src = "assets/images/hi-low-card-reverse.webp";
        currentCardImage.alt = "Reverse of Card";

        // Reset the Next Card area
        nextCardImage.src = "assets/images/hi-low-card-reverse.webp";
        nextCardImage.alt = "Reverse of Card";

        // Clear the stored cards ready for a new game
        currentCard = null;
        nextCard = null;

         // Reset the current score for the new game
        currentScore = 0;
        gameBestScore = 0;

        // Update the score display
        updateScoreDisplay();

        // Use the stored deckId to reshuffle the existing virtual deck
        const response = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
        );

        // Convert the JSON response into a JavaScript object
        const data = await response.json();

        // Display the returned reshuffle data in the console for API testing
        console.log(data);

        // Disable reshuffle until a new game starts
        reshuffleDeckButton.disabled = true;
        reshuffleDeckButton.textContent = "Reshuffle Deck";

        // Update the number of cards remaining after reshuffling the deck
        cardsRemaining.textContent = data.remaining;
        
        gameMessage.textContent =
        "🔀 Deck reshuffled successfully. Draw a card to begin!";

        // Re-enable the Draw Card button
        drawCardButton.disabled = false;

        // Restore Draw Card button text
        drawCardButton.textContent = "Draw Card";

        // Disable Higher & Lower until a new first card is drawn
        higherButton.disabled = true;
        lowerButton.disabled = true;
    }

    catch (error) {
        // Display the error details in the browser console
        console.error(error);

        // Display a user-friendly error message on the page
        gameMessage.textContent = "⚠️ Unable to reshuffle the deck. Please check your connection and try again.";
        
        // Re-enable the reshuffle button so the player can try again after an error.
        reshuffleDeckButton.disabled = false;
        reshuffleDeckButton.textContent = "Reshuffle Deck";
    }
}

// ========================================
// Nav-Bar & Rules accordion
// ========================================


// Automatically open the Rules accordion when the navbar link is clicked
document.getElementById("rules-link").addEventListener("click", () => {

    const instructions = document.getElementById("instructions");

    const accordion = new bootstrap.Collapse(instructions, {
        toggle: false
    });

    accordion.show();

});



// ========================================
// Event Listeners
// ========================================

// Draw one card when the user clicks the Draw Card button
drawCardButton.addEventListener("click", drawCard);

// Draw the next card when the player chooses Higher
higherButton.addEventListener("click", () => {
    makeGuess("higher");
});

// Draw the next card when the player chooses Lower
lowerButton.addEventListener("click", () => {
    makeGuess("lower");
});

// Reshuffle the existing deck when the user clicks the Reshuffle Deck button
reshuffleDeckButton.addEventListener("click", reshuffleDeck);

// Create a new shuffled deck when the page first loads
getDeck();

// Display the initial scores when the page loads
updateScoreDisplay();