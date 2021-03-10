# designbook
A lightweight Design Component documentation framework

## ⚠ This repository is experimental
I wouldn't even call it _work in progress_. It's more like a _proof of concept_. A very good (and working)alternative is
[react styleguidist](https://github.com/styleguidist/react-styleguidist).

## Playing around
Install dependencies
```
npm i
```
start the server
```
node app.js
```

It will compile all markdown files inside [/app](/example-app) to HTML and sub-compile the markdown code blocks using the
predefined [compilers](src/server/Compiler). Each code block will be isolated and have its own javascript bundle.

The default example of the [Button.md](example-app/Components/Button.md) can be checke at
http://localhost:3000/docs/example-app/Components/Button/ after the startup has finished.