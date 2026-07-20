// ========================================
// Initial Setup
// ========================================

// Get references to the HTML / DOM elements that JavaScript will interact with
const drawCardButton = document.getElementById("draw-card");
const cardContainer = document.getElementById("card-container");
const reshuffleDeckButton = document.getElementById("reshuffle-deck");

// Get a reference to the element used to display error messages
const errorMessage = document.getElementById("error-message");

// Store the unique ID of the current deck so it can be reused for future API requests
let deckId;

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
        
        // Create an image element to display the custom card's 'reverse' while loading
        const loadingCardImage = document.createElement("img");
        
        // Apply the playing card styling
        loadingCardImage.classList.add("playing-card");

        // Use my custom reverse card image
        loadingCardImage.src = "assets/images/hi-low-card-reverse.webp";
        
        // Alternative text for screen readers
        loadingCardImage.alt = "Reverse of Card";

        // Replace the previously displayed card with the loading card
        cardContainer.replaceChildren(loadingCardImage);

        /*
         * Use a template literal to insert the current deckId
         * dynamically into the API URL
         */
        const response = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );

        // Convert the JSON response into a JavaScript object
        const data = await response.json();

        // Store the first card from the returned cards array
        const card = data.cards[0];

        // Display the individual card data and remaining card count for API testing
        console.log("Card drawn:", card);
        console.log("Cards remaining:", data.remaining);

        // Create an image element to display the card returned by the API
        const cardImage = document.createElement("img");

        // Apply the playing card styling
        cardImage.classList.add("playing-card");

        // Use the card image URL returned by the API as the image source
        cardImage.src = card.image;

        // Create descriptive alternative text using the card value and suit
        cardImage.alt = `${card.value} of ${card.suit}`;

        // Replace the previously displayed card with the newly drawn card
        cardContainer.replaceChildren(cardImage);

        // Clear any previous error message because the card was drawn successfully.
        errorMessage.textContent = "";

        // Re-enable the Draw Card button now after the API request has completed successfully.
        drawCardButton.disabled = false;
        // return button to say draw card
        drawCardButton.textContent = "Draw Card";

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
        errorMessage.textContent = "⚠️ Unable to draw a card. Please check your connection and try again.";
    
        // Re-enable the Draw Card button so the player can use button to try again after an error.
        drawCardButton.disabled = false;
        // return button to say draw card
        drawCardButton.textContent = "Draw Card";
    }
}


// ========================================
// Reshuffle Deck Function
// ========================================

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

        // Create an image element to display the custom card back while shuffling
        const loadingCardImage = document.createElement("img");

        // Use the custom card back image stored in the project
        loadingCardImage.src = "assets/images/hi-low-card-reverse.webp";

        // Provide descriptive alternative text for screen readers
        loadingCardImage.alt = "Reverse of Card";

        // Apply the playing card styling
        loadingCardImage.classList.add("playing-card");

        // Replace the previously displayed card with the loading card
        cardContainer.replaceChildren(loadingCardImage);

        // Use the stored deckId to reshuffle the existing virtual deck
        const response = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
        );

        // Convert the JSON response into a JavaScript object
        const data = await response.json();

        // Display the returned reshuffle data in the console for API testing
        console.log(data);

        // Clear any previous error message because the deck was reshuffled successfully.
        errorMessage.textContent = "";

        // Restore the reshuffle button once the deck has been reshuffled
        reshuffleDeckButton.disabled = false;
        reshuffleDeckButton.textContent = "Reshuffle Deck";
    }

    catch (error) {
        // Display the error details in the browser console
        console.error(error);

        // Display a user-friendly error message on the page
        errorMessage.textContent = "⚠️ Unable to reshuffle the deck. Please check your connection and try again.";
        
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

// Reshuffle the existing deck when the user clicks the Reshuffle Deck button
reshuffleDeckButton.addEventListener("click", reshuffleDeck);

// Create a new shuffled deck when the page first loads
getDeck();