# Form-brute - Simple HTML form brute-forcing tool

## Instalation
```
npm install form-brute
```
or
```
yarn add form-brute
```

## Lightweight and simple to use

```js
// Import the package
const { formBrute } = require('form-brute')

// Set up your config
const config = { url: "htttp://localhost:5000", data: { name: "John Doe", password: null }}
const wordList = ["123456","1111111", "01234qwe"]

// Call form-brute
formBrute(config, wordList, 5)
    .then((res) => {
        // Working with the response
    })
    .catch((err) => {
        // Handling errors
    })
 
```
To mark the field you want to brute-force, all you need to do is to asign it **null**. 

Form-brute is a promise based package so it runs asynchronously.