```javascript
// Get the elements from the Explore page.
const topicChoices = document.getElementById("topicChoices");
const stepTwo = document.getElementById("stepTwo");
const selectedTopic = document.getElementById("selectedTopic");
const subtopicChoices = document.getElementById("subtopicChoices");
const results = document.getElementById("results");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const backButton = document.getElementById("backButton");
const startOverButton = document.getElementById("startOverButton");

// Store the topic data after loading it from JSON.
let exploreData = null;

// Load the JSON data when the page opens.
async function loadExploreData() {
    try {
        const response = await fetch("data/exploreData.json");

        if (!response.ok) {
            throw new Error("The data file could not be loaded.");
        }

        exploreData = await response.json();
    } catch (error) {
        topicChoices.innerHTML =
            "<p>Sorry, the choices could not load. Please try again later.</p>";
        console.error("Error loading Explore data:", error);
    }
}

// Display the subtopics for the selected topic.
function showSubtopics(topicKey) {
    if (!exploreData || !exploreData[topicKey]) {
        return;
    }

    const topic = exploreData[topicKey];

    selectedTopic.textContent = topic.title;
    subtopicChoices.replaceChildren();

    topic.subtopics.forEach(function(subtopic, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "choice-button";
        button.textContent = subtopic.title;

        button.addEventListener("click", function() {
            showResult(topic, subtopic);
        });

        subtopicChoices.appendChild(button);
    });

    topicChoices.querySelectorAll("button").forEach(function(button) {
        button.setAttribute(
            "aria-pressed",
            button.dataset.topic === topicKey ? "true" : "false"
        );
    });

    results.hidden = true;
    stepTwo.hidden = false;
    stepTwo.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Display the result for the selected subtopic.
function showResult(topic, subtopic) {
    resultTitle.textContent = subtopic.title;
    resultDescription.textContent = subtopic.description;

    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Return to the first step.
function goBack() {
    stepTwo.hidden = true;
    results.hidden = true;
    topicChoices.querySelectorAll("button").forEach(function(button) {
        button.setAttribute("aria-pressed", "false");
    });
}

// Reset the page to the beginning.
function startOver() {
    goBack();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Connect the topic buttons to the JavaScript functions.
topicChoices.querySelectorAll("button").forEach(function(button) {
    button.addEventListener("click", function() {
        showSubtopics(button.dataset.topic);
    });
});

backButton.addEventListener("click", goBack);
startOverButton.addEventListener("click", startOver);

// Start loading the data.
loadExploreData();
```
