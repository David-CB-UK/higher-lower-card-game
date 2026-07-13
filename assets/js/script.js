// Get references to the HTML / DOM elements that JavaScript will interact with
const drawCardButton = document.getElementById("draw-card");
const cardContainer = document.getElementById("card-container");
const reshuffleDeckButton = document.getElementById("reshuffle-deck");

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

/**
 * Draws one card from the current deck using its unique deck ID.
 * The returned card data is logged to the console for testing.
 */
async function drawCard() {
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

    // Display the individual card data in the console for testing
    console.log(card);

    // Create an image element to display the card returned by the API
    const cardImage = document.createElement("img");

    // Use the card image URL returned by the API as the image source
    cardImage.src = card.image;

    // Create descriptive alternative text using the card value and suit
    cardImage.alt = `${card.value} of ${card.suit}`;

    // Replace the previously displayed card with the newly drawn card
    cardContainer.replaceChildren(cardImage);
}

/**
 * Reshuffles the existing deck using its stored deck ID.
 * This allows the same virtual deck to be reused rather than
 * requesting a new deck and deck ID.
 */
async function reshuffleDeck() {
    // Use the stored deckId to reshuffle the existing virtual deck
    const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    );

    // Convert the JSON response into a JavaScript object
    const data = await response.json();

    // Display the returned reshuffle data in the console for API testing
    console.log(data);
}


// Draw one card when the user clicks the Draw Card button
drawCardButton.addEventListener("click", drawCard);

// Reshuffle the existing deck when the user clicks the Reshuffle Deck button
reshuffleDeckButton.addEventListener("click", reshuffleDeck);

// Create a new shuffled deck when the page first loads
getDeck();