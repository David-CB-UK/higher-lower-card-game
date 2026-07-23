// ========================================
// Initial DOM Setup
// ========================================

// Get references to the HTML / DOM elements that JavaScript will interact with
const drawCardButton = document.getElementById("draw-card");
const reshuffleDeckButton = document.getElementById("reshuffle-deck");

// Get references to the card images
const currentCardImage = document.getElementById("current-card-image");
const nextCardImage = document.getElementById("next-card-image");

// Get references to the Higher / Lower buttons
const higherButton = document.getElementById("higher-button");
const lowerButton = document.getElementById("lower-button");

// Get reference to display the number of cards remaining
const cardsRemaining = document.getElementById("cards-remaining");

// Get references to the score displays
const currentScoreDisplay = document.getElementById("current-score");
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

// Store player's best score
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
        // Check whether the current deck has run out of cards
        if (data.remaining === 0) {
            setOutOfCardsState();
        }

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
    await delay(300);

    // Remove the first animation
    cardElement.classList.remove("card-flip-out");

    // Change the card while edge-on
    cardElement.src = imageSrc;
    cardElement.alt = imageAlt;

    // Flip the new card back towards the player
    cardElement.classList.add("card-flip-in");
    await delay(300);

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
        if (data.remaining === 0) {
        setOutOfCardsState();
    }

    // Store the first card from the returned cards array as the next face-up card
    nextCard = data.cards[0];

    // Display the next card
    nextCardImage.src = nextCard.image;
    nextCardImage.alt = `${nextCard.value} of ${nextCard.suit}`;

    // Display the returned data in the browser console for testing
    console.log(data);

    // Compare the current and next cards
    const result = compareCards(playerGuess);

    // Display the returned result for testing
    console.log("Returned result:", result);

    // Prevent additional guesses (hi/low button presses) while the turn is being processed
    higherButton.disabled = true;
    lowerButton.disabled = true;

    // Allow the player time to view the revealed card
    await delay(1800);

    // Update the game
    updateGameState(result);
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
        if (currentScore > bestScore) {
            bestScore = currentScore;
        }
    } else if (result === "incorrect") {
        currentScore = 0;
    }

    // Update the displayed scores
    updateScoreDisplay();

    // Move the next card so it becomes the current card
    currentCard = nextCard;

    // Display the new current card
    currentCardImage.src = currentCard.image;
    currentCardImage.alt = `${currentCard.value} of ${currentCard.suit}`;

    // Reset the Next Card area unless the deck has been exhausted
    if (drawCardButton.textContent !== "Out of Cards") {
        nextCardImage.src = "assets/images/hi-low-card-reverse.webp";
        nextCardImage.alt = "Reverse of Card";
    }

    // Allow the player to make the next guess
    higherButton.disabled = false;
    lowerButton.disabled = false;

}


// ========================================
// Score Display Function
// ========================================

/**
 * Updates the score displayed to the player.
 */
function updateScoreDisplay() {
    currentScoreDisplay.textContent = currentScore;
    bestScoreDisplay.textContent = bestScore;
}


// ========================================
// Out of Cards Function
// ========================================


//Updates the game when all cards have been drawn.
function setOutOfCardsState() {

    // Inform the player that the deck has been exhausted
    gameMessage.textContent =
        "🃏 You've reached the end of the deck. Please reshuffle the deck to continue.";

    // Prevent any further cards being drawn
    drawCardButton.disabled = true;

    // Update the button text to reflect the current game state
    drawCardButton.textContent = "Out of Cards";

    // Display the Out of Cards card in the Next Card area
    nextCardImage.src = "assets/images/out-of-cards-card.webp";
    nextCardImage.alt = "Out of Cards";
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

        // Restore the reshuffle button once the deck has been reshuffled
        reshuffleDeckButton.disabled = false;
        reshuffleDeckButton.textContent = "Reshuffle Deck";

        // Update the number of cards remaining after reshuffling the deck
        cardsRemaining.textContent = data.remaining;
        
        // Clear 'out of cards' message
        gameMessage.textContent = "";

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