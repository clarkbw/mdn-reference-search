const BASE_URL = `https://developer.mozilla.org/`;
const URL = `${BASE_URL}/en-US/search.json?topic=css&topic=js&q=`;

// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
  description: `Search MDN (e.g. "margin" | "splice")`
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  const headers = new Headers({ Accept: "application/json" });
  const init = { method: "GET", headers };
  const q = encodeURIComponent(text);
  const url = `${URL}${q}`;
  const request = new Request(url, init);

  fetch(request).then(handleResponse).then(addSuggestions);
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = text;
  switch (disposition) {
    case "currentTab":
      browser.tabs.update({ url });
      break;
    case "newForegroundTab":
      browser.tabs.create({ url });
      break;
    case "newBackgroundTab":
      browser.tabs.create({ url, active: false });
      break;
  }
});

const emptyResults = [
  {
    content: BASE_URL,
    description: "no results found"
  }
];

function handleResponse(response) {
  return new Promise(resolve => {
    response.json().then(json => {

      if (json.pages <= 0) {
        return resolve(emptyResults);
      }

      const pages = json.documents
        .filter(doc => doc.tags.includes("Reference"))
        .slice(0, 5);

      return resolve(
        pages.map(page => {
          return {
            content: page.url,
            description: page.slug
          };
        })
      );
    });
  });
}
