# Figma Plugin UI Kit

This repository contains a UI kit for developing Figma plugins. It provides a set of reusable components and utilities to help you build Figma plugin interfaces quickly and efficiently with Svelte 5.

They are designed to resemble the original Figma UI as close as possible, so users get a high quality and familiar experience.

This library is built on top of [figma-plugin-ds-svelte](https://github.com/thomas-lowry/figma-plugin-ds-svelte), many thanks to the original author for providing this resource.

## Usage

You can use the components and utilities provided in this UI kit in your Figma plugin projects. Import the necessary components from the `src/lib` directory and use them in your plugin code.

Example:

```javascript
import { Button } from 'figma-plugin-ui-kit';

<Button onClick={() => console.log('Button clicked!')}>Click Me</Button>;
```

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Developing

To get started extending this UI kit, clone the repository and install the dependencies:

```bash
git clone https://github.com/KaiMagnusMueller/figma-plugin-ui-kit.git
cd figma-plugin-ui-kit
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

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

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
