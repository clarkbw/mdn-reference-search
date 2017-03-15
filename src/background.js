import { defaultSuggestion, handleInputChanged, handleInputEntered } from './omnibox';

// Provide help text to the user.
chrome.omnibox.setDefaultSuggestion(defaultSuggestion);

// Update the suggestions whenever the input is changed.
chrome.omnibox.onInputChanged.addListener(handleInputChanged);

// Open the page based on how the user clicks on a suggestion.
chrome.omnibox.onInputEntered.addListener(handleInputEntered);
