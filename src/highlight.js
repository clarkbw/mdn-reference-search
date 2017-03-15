const isChrome = typeof browser === 'undefined';

// Currently Firefox auto-highlights but Chrome requires this XML syntax
function chromeHighlightMatch(text = '', match = '') {
  return text.replace(match, `<match>${match}</match>`);
}

const highlight = isChrome ? chromeHighlightMatch : text => text;

modules.export = highlight;
