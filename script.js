// Get elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const languageSelect = document.getElementById('languageSelect');
const translateBtn = document.getElementById('translateBtn');
const historyList = document.getElementById('historyList');

// Toggle the visibility of the language options
document.getElementById('languageBtn').addEventListener('click', function() {
    const options = document.getElementById('languageOptions');
    options.style.display = (options.style.display === 'block') ? 'none' : 'block';
});

// Set selected language
function setLanguage(language) {
    document.getElementById('languageBtn').textContent = language;
    document.getElementById('languageOptions').style.display = 'none';  // Hide options after selection
}

// Toggle the visibility of the translate options
document.getElementById('translateBtn').addEventListener('click', function() {
    const options = document.getElementById('translateOptions');
    options.style.display = (options.style.display === 'block') ? 'none' : 'block';
});

// (Optional) If you want to set the translation language when clicked
const translateOptions = document.querySelectorAll('.translate-option');
translateOptions.forEach(option => {
    option.addEventListener('click', function() {
        document.getElementById('translateBtn').textContent = `Translate to ${this.textContent}`;
        document.getElementById('translateOptions').style.display = 'none';  // Hide options after selection
    });
});

// Simulating translation for now
const simulateTranslation = (text, language) => {
    // This is just a placeholder translation for demo purposes
    return `Translated (${language}): ${text}`;
};

// Function to update history
const updateHistory = (input, output, language) => {
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `<strong>${language}</strong>: ${input} <br> <em>→ ${output}</em>`;
    historyItem.onclick = () => {
        inputText.value = input;
        outputText.value = output;
    };
    historyList.appendChild(historyItem);
};

// Event listener for Translate button
translateBtn.addEventListener('click', () => {
    const input = inputText.value;
    const selectedLanguage = languageSelect.value;

    if (input.trim() === "") {
        alert("Please enter some text to translate.");
        return;
    }

    // Simulate translation
    const translatedText = simulateTranslation(input, selectedLanguage);

    // Set output text
    outputText.value = translatedText;

    // Save to history
    updateHistory(input, translatedText, selectedLanguage);

    // Clear input field after translation
    inputText.value = '';
});