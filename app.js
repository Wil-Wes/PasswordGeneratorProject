// Password Generator

// Character Generator Functions

// Function that accepts a string value and returns random index number
function randomIndex(str) {
    return Math.floor(Math.random() * str.length);
}

// Example of the randomIndex function
console.log(randomIndex(`Chicken`));//0, 1, 2, 3, 4, 5, 6

// function that returns a random lowercase letter using a random index in the `letters` string
function getRandomLower() {
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    // Returning a random letter using a random index in the `letters` string
    return letters[randomIndex(letters)];
}

// Example of the getRandomLower function
console.log(getRandomLower());//Random lowercase letter

// function that returns a random uppercase letter
function getRandomUpper() {
    //Running the getRandomLower function to create a random lowercase letter and setting that value to the `letter` variable
    const letter = getRandomLower();
    // Changing the random lowercase letter to an uppercase letter and returning it from the function
    return letter.toUpperCase();
}

console.log(getRandomUpper());

// Function that returns a random number (AKA random number as a string)
function getRandomNumber() {
    const numbers = `1234567890`;
    //
    return numbers[randomIndex(numbers)];
}

// example of getRandomNumber function
console.log(getRandomNumber());

function getRandomSymbol() {
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    // Returning random symbol using random index from symbols string
    return symbols[randomIndex(symbols)];
}
// Example of getRandomSymbol
console.log(getRandomSymbol());

// Object to store all the character generator functions
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Selecting DOM elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

// Generate Password Function
// Note: The checkbox inputs and number input will determine the value/arguements entered into this function
function generatePassword(lower, upper, number, symbol, length){

    // 1. Create the password variable
    let generatedPassword = ``;

    // 2 Filter out unchecked options
    // True and false values can be added together (True is equal to 1 and false is equal to 0)
    // NOTE: The values set to the typesCount variable will be used when building out the password
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    // If the user has NOT selected any of the four options then the alert will be displayed
    if (typesCount === 0){
        alert(`Please select at least one option`);
        // Return keyword stops/ends the execution of a function
        return ``;
    }

    //Creating an array of arrays
    let typesArr = [
        [`lower`, lower], 
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];
    console.log(typesArr);

    // The filter method creates a new array with all the items that pass the test implemented by the provided function
    typesArr = typesArr.filter((item) => {
        console.log(item[1]);
        return item[1];
    });

    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION
    // Building password with a for loop
    // Note: The value for "length" is the value entered/selected for length number input

    for ( i = 0; i < length; i += typesCount) {
        // One of the items in the updated/filtered version of the typesArr array will be the value/arguement passed in for the types parameter each time the anonymous arrow function is run
        typesArr.forEach((type) => {
            const funcName = type[0];
            console.log(funcName);
            // Accessing and running/executing a function in the randomFunctions object. Also, concatenating/adding the value returned from the accessed function to the generatedPassword string variable
            generatedPassword += randomFunctions[funcName]();
            console.log(generatedPassword);
        });
        
    }
    // 4. ADD GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE AND RETURN IT OUT OF THE FUNCTION
    // Removing extra characters if necessary (The above loop will create a password that may NOT match the length selected if that length is NOT a multiple of the number of options/checkboxes selected)
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);

    return finalPassword;
}

// Event Listener for when the "Generate Password" button is clicked
generateEl.addEventListener(`click`, () => {
    //Checking if the following options/checkboxes are selected/checked and the true/false values to the respective variables
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Accessing the value for the number input and changing the value from a string to a number
    // Note: The value returned from a number input is a string value

    const length = parseInt(lengthEl.value);

    // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input as arguements and returns a string (AKA the password) which is set as the innerText value for the 'result' (AKA span) element
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// COPY PASSWORD
clipboardEl.addEventListener(`click`, () => {
    //Accessing the text/string value (AKA the password) for the `result` span and setting it to the `password` variable
    const password = resultEl.innerText;

    // If the user clicks the clipboard button while no password is displayed, then an alert will be displayed to the user and nothing will be copied
    if (password === ``){
        alert(`Please generate a password first`);
        return;
    }

    // Referencing the `navigator` object to copy the selected value to the clipboard on the device the webpage is being viewed on
    navigator.clipboard.writeText(password);
});