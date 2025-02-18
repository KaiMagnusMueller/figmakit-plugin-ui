# FigmaKit Plugin UI Svelte

A component library for Svelte based Figma plugins. It provides a set of reusable components and utilities to help you build Figma plugin interfaces quickly and efficiently with Svelte 5.

Number one priority was to re-implement the original Figma UI elements as close as possible, so plugin users have a familiar and high quality experience.

This library is built on top of [figma-plugin-ds-svelte](https://github.com/thomas-lowry/figma-plugin-ds-svelte), many thanks to the original author for providing this resource.

## Usage

### Setup

Install this library via `npm install figmakit-plugin-ui-svelte` and import components like this

```javascript
import { Button } from 'figmakit-plugin-ui-svelte';

<Button onClick={() => console.log('Button clicked!')}>Click Me</Button>;
```

## Demo Page

Inside '/routes' is a demo page with all the components and usage examples. After cloning this repo and installing the dependencies via `npm install`, run `npm run dev` to start a local server and the demo app. There you find some usage examples on how to use the components and which properties they have in action.

### Styles

There are additional global styles needed for the components to work correctly. Import them in your main .svelte file like this and your bundler will grab add them to your plugin.

```javascript
<script lang="ts">
	import '../node_modules/figmakit-plugin-ui-svelte/dist/css/resets.css';
	import '../node_modules/figmakit-plugin-ui-svelte/dist/css/global.css';
	...
```

The components use the built-in Figma color tokens whenever possible, so they don't need to be included in your plugin. If you are using VS Code, you install an extension like [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables) to get autocomplete suggestions. To set this up, add the files to `.vscode/settings.json`:

```javascript
	"cssVariables.lookupFiles": [
		"node_modules/figmakit-plugin-ui-svelte/dist/css/global.css",
		"node_modules/figmakit-plugin-ui-svelte/dist/css/reset.css",
		"node_modules/figmakit-plugin-ui-svelte/dist/css/figma-styles-for-testing.css"
	]
```

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Developing

To get started extending this UI kit, clone the repository and install the dependencies:

```bash
git clone https://github.com/KaiMagnusMueller/figmakit-plugin-ui.git
cd figmakit-plugin-ui
npm install
```

Once you've cloned the repository and installed everything, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` is used for testing and preview.

## Building

To build the library (for uploading to npm, or example, but npm publish does this for you as well):

```bash
npm run package
```

To create a production version of the library:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

Optionally use

```bash
npm publish --tag beta
```

To publish to a specific tag (the default tag is "latest"). This is useful for developing on separate branches, for example a new beta version that normal users shouldn't download yet.
