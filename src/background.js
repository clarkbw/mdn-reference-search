const BASE_URL = `https://developer.mozilla.org`;
const SEARCH_API_URL = `${BASE_URL}/en-US/search.json?topic=css&topic=js&q=`;
const SEARCH_DEFAULT_URL = `${BASE_URL}/en-US/search?q=`;

const highlight = require('./highlight');
const { defaultSuggestion, handleInputChanged, handleInputEntered } = require('./omnibox');

// Provide help text to the user.
chrome.omnibox.setDefaultSuggestion(defaultSuggestion);

// Update the suggestions whenever the input is changed.
chrome.omnibox.onInputChanged.addListener(handleInputChanged);

// Open the page based on how the user clicks on a suggestion.
chrome.omnibox.onInputEntered.addListener(handleInputEntered);
