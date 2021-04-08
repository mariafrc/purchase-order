Simple purchase order app developed with `Angular` - `Electron` And `Typeorm.`

## Installation

First install dependencies:

```bash
npm install
```

Update the `Typeorm` configuration on the `main/config/database.ts` file.

* To serve locally renderer and main process: 

  ```bash
  npm run ng:serve
  ```

  and

  ```bash
  npm run electron:serve
  ```

* To build the app

  ```bash
  npm run build
  ```

  It run `ng build` for the renderer process and `tsc` for the main process. You can the following command to see the result

  ```bash
  npm run electron
  ```

* The following command will build it with `electron-builder` for the chosen operating system

  ```bash
  npm run electron:linux
  npm run electron:windows
  npm run electron:mac
  ```
