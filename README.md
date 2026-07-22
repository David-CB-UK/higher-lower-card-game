# Higher or Lower

> **Project Status:** In Development

[Live Site](#) | [GitHub Repository](#)

<!-- Add responsive mock-up image when the final application has been developed. -->

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [User Experience](#user-experience)

   * [User Stories](#user-stories-and-related-goals)
   * [User Experience Goals](#user-experience-goals)
3. [Project Management](#project-management)

   * [Development Approach](#development-approach)
   * [MoSCoW Prioritisation](#moscow-prioritisation)
4. [Design](#design)

   * [Research and Inspiration](#research-and-inspiration)
   * [Colour Scheme](#the-colour-scheme)
   * [Typography](#typography)
   * [Accessibility](#accessibility)
   * [Skeleton Layout / Wireframe Images](#skeleton-layout--wireframe-images)
5. [Features](#features)

   * [Core Gameplay](#core-gameplay)
   * [Game Instructions](#game-instructions)
   * [Score and Streak](#score-and-streak)
   * [API Feedback and Error Handling](#api-feedback-and-error-handling)
   * [Responsive Design](#responsive-design)
   * [Future Features](#future-features)
6. [User Goals Mapping](#user-goals-mapping)
7. [Technologies Used](#technologies-used)
8. [API Integration](#api-integration)

   * [Deck of Cards API](#deck-of-cards-api)
   * [API Endpoints Used](#api-endpoints-used)
   * [Asynchronous JavaScript](#asynchronous-javascript)
   * [API Error Handling](#api-error-handling)
   * [API Security Considerations](#api-security-considerations)
9. [Project Structure](#project-structure)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Credits](#credits)
13. [Acknowledgements](#acknowledgements)
14. [Reflections](#reflections)
    * [Development Reflection](#development-reflection)
    * [Planned Future Enhancements](#planned-future-enhancements)

---

## Project Overview

Higher or Lower is a single-page interactive card game being developed as the second portfolio project for the Level 5 Diploma in Web Application Development.

The application is planned to use the Deck of Cards API to provide a shuffled deck of playing cards. Players will be shown a card and asked to predict whether the next card drawn will be higher or lower. Correct predictions will increase the player's score and current streak, while an incorrect prediction will end the game.

The project is being developed using HTML, CSS and vanilla JavaScript, with Bootstrap planned for use where appropriate to support responsive layout and selected interface components.

The concept for this project developed while researching publicly available APIs that were suitable for the scope of an interactive front-end web application. During this research, I discovered the Deck of Cards API and identified the opportunity to use its card and deck functionality to create a Higher or Lower game.

The initial inspiration comes from the simple and focused gameplay of card and chance-based games associated with 1980s home computers, including systems such as the Amstrad and Amiga. The project is not intended to reproduce a specific existing game or to strictly recreate an authentic 1980s visual style. Instead, this inspiration will influence the simplicity and accessibility of the core gameplay, while the final visual design will also consider the appearance of the playing-card images supplied by the external API.

The project is deliberately based around a straightforward core gameplay loop. This allows development to focus on interactive JavaScript, asynchronous API requests, user feedback, responsive design, defensive programming and a polished user experience.

Due to the limited development timeframe, the initial development priority is to produce a fully functioning, robust and tested core game before implementing additional enhancements.

[Back to top](#higher-or-lower)

---

## User Experience

### User Stories and Related Goals

<!-- User stories will be added during the initial planning stage. -->

[Back to top](#higher-or-lower)

---

### User Experience Goals

<!-- User experience goals will be defined during the initial planning and wireframing stage. -->

[Back to top](#higher-or-lower)

---

## Project Management

### Development Approach

The project is being developed incrementally, with the core gameplay prioritised before additional enhancements.

Development is divided into small features and fixes so that each stage can be implemented, tested and committed separately using Git and GitHub.

The README is being maintained throughout development to document the planning, design decisions, implementation, testing, bugs, fixes and changes in project scope as they occur.

Due to the limited development timeframe, project scope is being managed to prioritise a fully functioning and well-tested application over a larger number of incomplete features.

[Back to top](#higher-or-lower)

---

### MoSCoW Prioritisation

The MoSCoW method is being used to separate essential functionality from optional enhancements and to manage the scope of the project within the available development time.

The priorities below represent the initial planning stage and may be updated during development as features are implemented, tested or moved into future development.

#### Must Have

* A responsive single-page game interface.
* Integration with the Deck of Cards API.
* A shuffled deck and displayed playing cards.
* Higher and Lower player controls.
* Correct comparison of card values.
* Defined handling of equal-value cards.
* Score tracking.
* Current streak tracking.
* Game-over functionality.
* Score-dependent end-of-game feedback.
* Ability to play again.
* Clear game instructions.
* Loading feedback during API requests.
* Prevention of repeated player input while an API request is being processed.
* Graceful handling of API errors.
* Responsive functionality across different screen sizes.
* Basic visual feedback and CSS transitions.

#### Should Have

* High score stored using browser local storage.
* Best streak stored using browser local storage.
* Display of the number of cards remaining.
* Reuse and reshuffling of an existing API deck where appropriate.
* A recommendation to use landscape orientation on smaller mobile devices while retaining portrait functionality.
* A choice between modern and retro-inspired visual themes.
* Additional CSS-based card and interface animations.

#### Could Have

* An Easy difficulty mode displaying probability information.
* A Hard difficulty mode with Higher, Lower and Same predictions.
* Difficulty-specific scoring.
* More advanced card animations.
* Additional player statistics.
* Achievements.

#### Won't Have in This Release

The following features are outside the planned scope of the initial front-end application but may be considered for future development:

* User accounts.
* A backend database.
* A global leaderboard.
* Cross-device score and preference synchronisation.
* Multiplayer functionality.

[Back to top](#higher-or-lower)

---

## Design

### Research and Design Inspiration

The concept for this project developed while researching publicly available APIs that were suitable for the scope of an interactive front-end web application. During this research, I discovered the Deck of Cards API and identified the opportunity to use its deck, card and image functionality to create a Higher or Lower game.

The initial inspiration for the gameplay and presentation comes partly from the simplicity and focused nature of card and chance-based games associated with 1980s home computers, including systems such as the ZX Spectrum, Amstrad CPC, Commodore 64 and Amiga.

As part of the initial research, I examined a 1986 ZX Spectrum version of *Play Your Cards Right* by Britannia Software. The historical game used a more complex player-versus-computer format that included Higher and Lower predictions, the ability to change a starting card, a Freeze option and multiple games within a match.

The historical implementation also explicitly handled equal-value cards as pairs for which the player did not receive a reward. This provided an interesting comparison with the independently planned handling of equal cards in this project. In the planned initial version, an equal card will be treated as a draw: it will not affect the player's score or streak, and another card will be drawn while retaining the player's original Higher or Lower prediction.

Contemporary browser-based Higher or Lower games were also reviewed to understand common user expectations, gameplay conventions and interface approaches. Examples reviewed during the research stage include HighLowCardGame.com and Card Station's High Low game.

These contemporary examples demonstrated common features such as clear Higher and Lower controls, score and streak tracking, immediately visible game information and simple single-page gameplay. They also demonstrated that implementations of the same basic game can make different design decisions. For example, approaches to equal-value cards, scoring and game progression can vary between games.

This research is being used for comparison and inspiration rather than as a source for the project's code or as a design to reproduce. The final application will be independently developed using HTML, CSS and JavaScript and will use the Deck of Cards API as its external data source.

The project is not intended to recreate a specific existing game or produce a completely authentic 1980s interface. Instead, the historical inspiration may influence elements such as focused single-screen gameplay, a clear score display, bold controls and immediate visual feedback.

The final visual design will be developed after testing the playing-card images supplied by the Deck of Cards API. This will allow the interface, colour palette and surrounding visual elements to complement the external card assets rather than forcing them into a predetermined visual style.

A modern and retro-inspired visual theme may be implemented if development time allows.

#### Research Sources

The following websites and resources were reviewed during the initial research and planning stage. They were used to explore the history of Higher or Lower games, compare different gameplay approaches and consider common features and interface conventions. These resources were used for research and inspiration only and were not used as sources for the project's code.

| Resource                                                                          | Type                     | Research Purpose                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Deck of Cards API](https://deckofcardsapi.com/)                                  | API / Technical Research | The external API discovered during initial project research that inspired the concept of developing a Higher or Lower card game. Reviewed to understand the available deck, shuffle, draw, card image and remaining-card functionality. |
| [HighLowCardGame.com](https://highlowcardgame.com/)                               | Contemporary Game        | Reviewed as an example of a modern browser-based Higher or Lower game to understand common gameplay conventions and approaches to presenting a simple card game online.                                                                 |
| [Card Station - High Low](https://www.cardstation.games/games/highlow)            | Contemporary Game        | Reviewed to compare modern gameplay and interface conventions, including the presentation of Higher and Lower controls, scores, streaks and remaining cards.                                                                            |
| [UVL - Higher and Lower Group](https://www.uvlist.net/groups/info/higherandlower) | Historical Game Research | Used to explore historical games based on the Higher or Lower concept and understand how the game mechanic has appeared across older computer platforms.                                                                                |
| [UVL - Play High Low](https://www.uvlist.net/game-154804-Play+High+Low)           | Historical Game Research | Reviewed as an example of an older computer game based on the Higher or Lower card-game                                                                                                                                                 |


[Back to top](#higher-or-lower)

---

### The Colour Scheme

<!-- TBC: The colour palette and design reasoning will be documented once the Deck of Cards API images have been tested and the visual design has been developed. -->

[Back to top](#higher-or-lower)

---

### Typography

<!-- TBC: Typography choices and the reasoning behind them will be documented once selected. -->

[Back to top](#higher-or-lower)

---

### Accessibility

Accessibility will be considered throughout the design and development process.

Planned considerations include:

* Clear and readable text.
* Sufficient colour contrast.
* Clear button labels.
* Visible keyboard focus states.
* Semantic HTML.
* Keyboard-accessible interactive controls.
* User feedback that does not rely solely on colour.
* Responsive functionality across different screen sizes and orientations.

<!-- Update this section with the accessibility features actually implemented and the results of accessibility testing. -->

[Back to top](#higher-or-lower)

---

### Skeleton Layout / Wireframe Images

<!-- TBC: Initial wireframes and later comparisons between the planned and implemented design will be added here. -->

[Back to top](#higher-or-lower)

---

## Features

The features below represent the initial development plan. This section will be updated throughout development to document the features that are actually implemented.

### Core Gameplay

The planned core gameplay will:

1. Start a game using a shuffled deck.
2. Display a card supplied by the Deck of Cards API.
3. Ask the player to predict whether the next card will be higher or lower.
4. Draw another card from the same deck.
5. Compare the card values.
6. Provide immediate feedback to the player.
7. Increase the score and streak following a correct prediction.
8. End the game following an incorrect prediction.

If an equal-value card is drawn, it will be treated as a draw. The player's score and streak will not be affected, the player will be informed, and another card will be drawn while retaining the original Higher or Lower prediction.

This approach prevents the player from losing due to an outcome they were not able to select.

A future Hard difficulty mode could introduce a third **Same** option, turning equal-value cards into an additional risk-and-reward gameplay mechanic.

<!-- Update after implementation. -->

[Back to top](#higher-or-lower)

---

### Game Instructions

Clear instructions will be included within the single-page application to explain the game rules without requiring the user to leave the game.

The instructions are currently planned as a collapsible or expandable section, potentially using a Bootstrap component.

<!-- TBC: Final implementation will be documented here. -->

[Back to top](#higher-or-lower)

---

### Score and Streak

The game is planned to track:

* Current score.
* Current streak.
* High score using browser local storage.
* Best streak using browser local storage.

The end-of-game message will change depending on the player's final score to provide more engaging and personalised feedback.

<!-- TBC: Final scoring thresholds and messages will be documented after gameplay testing. -->

[Back to top](#higher-or-lower)

---

### API Feedback and Error Handling

The application is planned to provide clear feedback while communicating with the external API.

During an API request, player controls will be temporarily disabled to prevent multiple simultaneous actions while the application is waiting for a response.

The planned user-facing error message for a failed card request is:

> ⚠️ **Unable to draw a card.**
>
> Please check your connection and try again.
>
> **Try Again**

Where possible, the player will be able to retry the failed action without unnecessarily losing the current game state.

<!-- Update with the final implementation and testing evidence. -->

[Back to top](#higher-or-lower)

---

### Responsive Design

The application is planned to function across desktop, tablet and mobile screen sizes.

Landscape orientation may provide the preferred gameplay layout on smaller mobile devices. If implemented, users viewing the application in portrait orientation may be shown a recommendation to rotate their device while still retaining the ability to use the game in portrait mode.

The application will not intentionally prevent users from playing in portrait orientation.

<!-- TBC: Final responsive implementation and screenshots will be documented here. -->

[Back to top](#higher-or-lower)

---

### Future Features

Features not completed within the available development timeframe will be documented as future enhancements rather than being left partially implemented.

Potential future features include:

* Easy difficulty mode with probability information.
* Hard difficulty mode with a Same prediction.
* Difficulty-specific scoring.
* Additional game statistics.
* Achievements.
* More advanced animations.
* User accounts.
* A global leaderboard.
* Multiplayer functionality.

[Back to top](#higher-or-lower)

---

## User Goals Mapping

<!-- TBC: Implemented features will be mapped against the final user stories and user goals after development. -->

[Back to top](#higher-or-lower)

---

## Technologies Used

The following technologies, frameworks, APIs and development tools are currently in use or planned for the development of the Higher or Lower game.

This table will be updated throughout the development process to reflect the technologies actually implemented in the final application.

| Technology                | Status        | Purpose                                                                                                                                                                                               |
| ------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML5**                 | Planned       | To create the semantic structure and content of the single-page web application.                                                                                                                      |
| **CSS3**                  | Planned       | To create the custom visual design, responsive styling, interface feedback, and CSS-based transitions and animations.                                                                                 |
| **JavaScript**            | Planned       | To create the interactive game logic, manipulate the DOM, respond to player actions, manage game state, and process data returned by the external API.                                                |
| **Bootstrap**             | Planned / TBC | Intended to support responsive layout and selected interface components. Its exact use will be confirmed during development, with custom CSS used to create the project's individual visual identity. |
| **Deck of Cards API**     | Planned       | To provide the external data source for creating and shuffling a virtual deck, drawing cards, and supplying playing-card data and images.                                                             |
| **Fetch API**             | Planned       | To make asynchronous HTTP requests from JavaScript to the Deck of Cards API and process the returned data.                                                                                            |
| **Browser Local Storage** | Planned       | Intended to store the player's high score and best streak within the browser, allowing these values to persist between sessions on the same browser and device.                                       |
| **Git**                   | In Use        | Used for version control from the beginning of the development process, allowing individual features and fixes to be tracked through regular commits.                                                 |
| **GitHub**                | In Use        | Used to host the project repository remotely and provide a documented record of the development process through the project's commit history.                                                         |
| **GitHub Pages**          | Planned       | Intended to deploy and host the final front-end web application.                                                                                                                                      |
| **Visual Studio Code**    | In Use        | Used as the local development environment for creating and managing the project's files.                                                                                                              |
| **ChatGPT** | In Use | Used as an AI-assisted learning and development aid to support project planning, explain technical concepts, discuss implementation approaches, assist with debugging, review code, and help structure and refine project documentation. Custom prompts and project-specific instructions were used to provide relevant context and maintain consistency with the project requirements and development approach. All suggestions and code used within the project are reviewed, understood, tested and adapted as part of the development process. Was also used to create the back image for the custom card reverse.|
| **[Image Robo](https://imagerobo.com/)** | In Use | Used to resize the custom card back image to match the Deck of Cards API card dimensions (226 pixels × 314 pixels). |
| **[PhotoRoom](https://app.photoroom.com/)** | In Use | Used to remove the background and create transparent edges for the custom card back image. |



[Back to top](#higher-or-lower)

---

## API Integration

### Deck of Cards API

The application is planned to use the Deck of Cards API to create, shuffle and draw cards from a virtual deck.

The API was selected after researching publicly available APIs suitable for the scope of an interactive front-end application. Its functionality provided the inspiration for the Higher or Lower game concept.

The API provides card data and playing-card images that can be used by the application.

<!-- Update with exact implementation details after the API has been tested and integrated. -->

[Back to top](#higher-or-lower)

---

### API Endpoints Used

<!-- TBC: The exact API endpoints used by the final application will be documented after API testing and implementation. -->

Planned functionality includes:

* Creating a new shuffled deck.
* Drawing cards from an existing deck.
* Checking the number of cards remaining.
* Reshuffling an existing deck where appropriate.

[Back to top](#higher-or-lower)

---

### Asynchronous JavaScript

The application requires asynchronous JavaScript because requests to the external API do not return immediately.

The time taken for an API request to complete can vary. If a player were able to submit multiple guesses while a request was still being processed, multiple requests could potentially affect shared game values such as the current card, score or streak.

The planned implementation will account for this by temporarily preventing additional player input while a card request is being processed.

The intended interaction is:

1. The player makes a Higher or Lower prediction.
2. The relevant game controls are temporarily disabled.
3. The application requests the next card.
4. The application waits for the API response.
5. The returned card is processed.
6. The game state and interface are updated.
7. Player controls are made available again when appropriate.

<!-- Update this section with the final implementation and examples after development. -->

[Back to top](#higher-or-lower)

---

### API Error Handling

The application will be designed to handle failed API requests gracefully and provide clear feedback to the player.

The intended approach is to protect the current game state where possible and allow the player to retry a failed action rather than unnecessarily restarting the game.

<!-- TBC: Error handling implementation and testing evidence will be added during development. -->

[Back to top](#higher-or-lower)

---

### API Security Considerations

The Deck of Cards API does not require an API key or authentication. Therefore, no API credentials or secret keys need to be stored within this project.

The API does return a unique `deck_id` when a new deck is created. This identifier allows subsequent requests to draw from, shuffle or otherwise interact with the same virtual deck. The `deck_id` is required for the application's normal functionality and is not a secret API credential.

During development testing, the returned `deck_id` may be visible in the browser console or network requests. Where API test results are documented in this README, temporary deck identifiers are represented using descriptive placeholders such as `[unique deck identifier returned]` rather than recording a specific temporary value. This keeps the documentation focused on the structure and result of the test rather than an identifier that is only relevant to a particular API session.

If an API requiring a secret key were used in a purely front-end application, placing the key in a JavaScript file would expose it to users through the browser's source code, developer tools or network requests.

A `.gitignore` file can prevent local configuration files containing credentials from being committed to a Git repository. However, it cannot make a secret secure if that secret must ultimately be sent to and used by client-side JavaScript.

A future application requiring genuinely secret API credentials would therefore require a secure backend or server-side proxy to make authenticated requests without exposing those credentials to the browser.

---

## Project Structure

The initial project structure is:

```text
higher-or-lower/
│
├── index.html
├── README.md
│
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
```

The project structure will be updated as additional files or directories are added during development.

[Back to top](#higher-or-lower)

---

## Testing

Testing formed part of an **iterative development process**, with new functionality tested incrementally as it was implemented. Testing included functional testing, JavaScript and game-logic testing, API integration and error testing, asynchronous interaction testing, responsive and cross-browser testing, validation, accessibility testing and user feedback.

Full testing documentation, including test results, screenshots, bugs and fixes, is available in the separate testing document:

<mark>**[View the full testing documentation](TESTING.md)**</mark>

[Back to top](#higher-or-lower)

---

## Deployment

The final application is planned to be deployed using GitHub Pages.

<!-- TBC: Fully document the deployment procedure after deployment, including the steps used to deploy the application and testing to confirm that the deployed version matches the development version. -->

[Back to top](#higher-or-lower)

---

## Credits

### API

| Resource              | Use in Project                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **Deck of Cards API** | Planned external API used to provide virtual deck functionality, card data and playing-card images. |

### Frameworks and Libraries

| Resource      | Use in Project                                                         |
| ------------- | ---------------------------------------------------------------------- |
| **Bootstrap** | Planned / TBC for responsive layout and selected interface components. |

### Research and Inspiration

The following external resources were used during the research and planning stage to explore historical and contemporary implementations of Higher or Lower games. These resources were used for research and inspiration only and were not used as sources for the project's code.

| Resource                                                                                               | Type                     | Research Purpose                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [HighLowCardGame.com](https://highlowcardgame.com/)                                                    | Contemporary Game        | Reviewed as an example of a modern browser-based Higher or Lower game to understand common gameplay conventions and approaches to presenting a simple card game online. |
| [Card Station - High Low](https://www.cardstation.games/games/highlow)                                 | Contemporary Game        | Reviewed to compare modern gameplay and interface conventions, including the presentation of Higher and Lower controls, scores, streaks and remaining cards.            |
| [UVL - Higher and Lower Group](https://www.uvlist.net/groups/info/higherandlower)                      | Historical Game Research | Used to explore historical games based on the Higher or Lower concept and understand how the game mechanic has appeared across older computer platforms.                |
| [UVL - Play High Low](https://www.uvlist.net/game-154804-Play+High+Low)                                | Historical Game Research | Reviewed as an example of an older computer game based on the Higher or Lower card-game concept.                                                                        |
| [My Abandonware - Play Your Cards Right](https://www.myabandonware.com/game/play-your-cards-right-5s1) | Historical Game Research | Used as the main source for researching the 1986 computer game *Play Your Cards Right* and its historical gameplay and presentation.                                    |


### Code

All custom project code will be written specifically for this project unless otherwise stated.

Any externally sourced or adapted code will be clearly identified, commented in the relevant source file where appropriate, and attributed in this section.

<!-- Add full credits and links as external resources are used. -->

[Back to top](#higher-or-lower)

---


## Acknowledgements

<!-- TBC: Add acknowledgements for learning resources, academic or tutor support, user testers, community support and other assistance received during development. -->

[Back to top](#higher-or-lower)


---

## Reflections


### Development Decisions 

The project uses traditional anonymous functions for some event listeners instead of arrow functions. Although arrow functions are common in modern JavaScript, I found the traditional syntax more readable while learning. It also made it clearer to me that I was defining a function to be executed when the event occurs, rather than calling the function immediately. An example of this was with the Hight and lower guess buttons:

```
higherButton.addEventListener("click", function () {
    makeGuess("higher");
});
```

### Development Reflection

<!-- TBC: Complete towards the end of the project, reflecting on the planning process, development decisions, challenges, changes in scope, testing, learning and the final outcome. -->

[Back to top](#higher-or-lower)





---

### Planned Future Enhancements

Potential future development currently includes:

* An Easy difficulty mode displaying the probability of the next card being higher or lower.
* A Hard difficulty mode introducing a **Same** prediction.
* Difficulty-specific scoring.
* Additional player statistics.
* Achievements.
* More advanced card animations.
* Animated Button Loading Feedback
* User accounts.
* Persistent player profiles.
* Cross-device score and preference synchronisation.
* A database-backed global leaderboard.
* Multiplayer functionality.

The initial project scope deliberately prioritises a fully functioning, robust and tested core Higher or Lower game. Features that cannot be completed and tested to an appropriate standard within the available development timeframe will be retained as future enhancements rather than being left partially implemented.


#### Animated Loading Feedback

Improve the loading feedback shown while waiting for the Deck of Cards API.

Planned behaviour:

- When the **Draw Card** button is disabled I would animate the button text (as sown below) to say :

```
Drawing
Drawing.
Drawing..
Drawing...
Drawing
Drawing.
Drawing..
Drawing...
```

- This would repeat the animation until the API request has completed loading.
The button would then restore the button text to **Draw Card** when the request succeeds or fails. This would provide clear feedback that the application is actively waiting for a response.

[Back to top](#higher-or-lower)


### Planned Improvement – Empty Deck Handling

When all 52 cards have been drawn, the game should not display the generic API error message.

Instead the game should:

- Display the custom card back.
- Display the message:
  > 🃏 The deck is empty. Please reshuffle to continue.
- Disable the **Draw Card** button until the deck has been reshuffled.
- Re-enable the **Draw Card** button after a successful reshuffle.


### Planned Improvement – Multiple Deck of cards

The Deck of Cards API supports combining multiple standard decks into a single virtual deck. A future version of the game could allow players to choose the number of decks used before starting a game. This would increase game length and alter the probability of drawing higher or lower cards, providing an additional gameplay option without changing the core mechanics.

[Back to top](#higher-or-lower)
