const isChrome = typeof browser === 'undefined';

// Currently Firefox auto-highlights but Chrome requires this XML syntax
export function chromeHighlightMatch(text = '', match = '') {
  return text.replace(match, `<match>${match}</match>`);
}

export function firefoxHighlightMatch(text) {
  return text;
}

const highlight = isChrome ? chromeHighlightMatch : firefoxHighlightMatch;

export default highlight;
