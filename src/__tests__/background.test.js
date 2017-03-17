import background from '../background';
import {
  defaultSuggestion,
  handleInputChanged,
  handleInputEntered,
  SEARCH_API_URL,
  SEARCH_DEFAULT_URL
} from '../omnibox';

describe('background', () => {
  it('should have set a default suggestion', () => {
    expect(chrome.omnibox.setDefaultSuggestion).toBeCalledWith(
      defaultSuggestion
    );
  });

  it('should have an onInputChanged listener', () => {
    expect(chrome.omnibox.onInputChanged.addListener).toBeCalledWith(
      handleInputChanged
    );
  });

  it('should have an onInputEntered listener', () => {
    expect(chrome.omnibox.onInputEntered.addListener).toBeCalledWith(
      handleInputEntered
    );
  });
});
