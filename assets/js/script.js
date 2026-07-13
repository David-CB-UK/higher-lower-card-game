// Get references to the HTML elements that JavaScript will interact with
const drawCardButton = document.getElementById("draw-card");
const cardContainer = document.getElementById("card-container");

/**
 * Creates and shuffles a new deck using the Deck of Cards API.
 * The API response is converted from JSON into a JavaScript object
 * so that the returned deck data can be used by the application.
 */

async function getDeck() {
    // Send a request to the API and wait for the response
    const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );

    // Convert the JSON response into a JavaScript object
    const data = await response.json();

    // To display the returned data in the console for initial API testing
    console.log(data);
}

// Call the function when the page first loads to test the API connection
getDeck();