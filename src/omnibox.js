const BASE_URL = `https://developer.mozilla.org`;
export const SEARCH_API_URL = `${BASE_URL}/en-US/search.json?topic=css&topic=js&q=`;
export const SEARCH_DEFAULT_URL = `${BASE_URL}/en-US/search?q=`;

import highlight from './highlight';

export const defaultSuggestion = {
  description: `Search MDN (e.g. "margin" | "splice")`
};

export function handleInputChanged(text, addSuggestions) {
  const headers = new Headers({ Accept: 'application/json' });
  const init = { method: 'GET', headers };
  const q = encodeURIComponent(text);
  const url = `${SEARCH_API_URL}${q}`;
  const request = new Request(url, init);

  fetch(request).then(handleResponse).then(addSuggestions);
}

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
            description: highlight(page.title, json.query)
          };
        })
      );
    });
  });
}

export function handleInputEntered(text, disposition) {
  const url = text.startsWith('https://')
    ? text
    : `${SEARCH_DEFAULT_URL}${text}`;

  switch (disposition) {
    case 'currentTab':
      return chrome.tabs.update({ url });
    case 'newForegroundTab':
      return chrome.tabs.create({ url });
    case 'newBackgroundTab':
      return chrome.tabs.create({ url, active: false });
  }
}
