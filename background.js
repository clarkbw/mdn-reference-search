const BASE_URL = `https://developer.mozilla.org`;
const SEARCH_API_URL = `${BASE_URL}/en-US/search.json?topic=css&topic=js&q=`;
const SEARCH_DEFAULT_URL = `${BASE_URL}/en-US/search?q=`;

const browser = chrome || browser;

// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
  description: `Search MDN (e.g. "margin" | "splice")`
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  const headers = new Headers({ Accept: 'application/json' });
  const init = { method: 'GET', headers };
  const q = encodeURIComponent(text);
  const url = `${SEARCH_API_URL}${q}`;
  const request = new Request(url, init);

  fetch(request).then(handleResponse).then(addSuggestions);
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = text.startsWith('https://')
    ? text
    : `${SEARCH_DEFAULT_URL}${text}`;

  switch (disposition) {
    case 'currentTab':
      browser.tabs.update({ url });
      break;
    case 'newForegroundTab':
      browser.tabs.create({ url });
      break;
    case 'newBackgroundTab':
      browser.tabs.create({ url, active: false });
      break;
  }
});

function handleResponse(response) {
  return new Promise(resolve => {
    response.json().then(json => {
      const pages = json.documents
        .filter(doc => doc.tags.includes('Reference'))
        .slice(0, 5);

      return resolve(
        pages.map(page => {
          return {
            content: page.url,
            description: page.title.replace(
              json.query,
              `<match>${json.query}</match>`
            )
          };
        })
      );
    });
  });
}
