## MDN Reference Search 

[Chrome](https://chrome.google.com/webstore/detail/mdn-code-search/nifjgldbgogopimfdfclafkhbadkjfca?hl=en-US) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/mdn-search/)
---|---

A WebExtension that uses the keyword `mdn` to trigger a search of the [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) References on [MDN](https://developer.mozilla.org/).

<img width="1106" alt="screen shot 2017-03-17 at 2 33 25 pm" src="https://cloud.githubusercontent.com/assets/2134/24063861/afe2d684-0b1e-11e7-88d9-261cce41924e.png">

![screen shot 2017-03-17 at 2 31 08 pm](https://cloud.githubusercontent.com/assets/2134/24063803/68a0a7ec-0b1e-11e7-89c0-8da72dae19f2.png)

### Development

Here's how you can get setup to develop.

```bash
yarn install
yarn run build:watch
```

Here are some example results from the MDN Search.

* JavaScript search: https://developer.mozilla.org/en-US/search.json?q=assign&topic=css&topic=js
* CSS search: https://developer.mozilla.org/en-US/search.json?q=margin&topic=css&topic=js

Follow the instructions for developing [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

### License

MPL v2
