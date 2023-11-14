
var foodApiKey = "ea483b863cdd433eb55d9222c3cc0c4d";
var ingredientsEl = document.querySelector("#ingredient")
var drinksEl = document.getElementById("drinks")
var searchBtnEl = document.querySelector("#searchBtn")
var recipeResults = [];
var displayResults = document.getElementById("results");
const checkbox = document.getElementById('checkbox');
const scriptElement = document.getElementById('script');
var requestURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${foodApiKey}&ingredients=${ingredientsEl.value}&number=10&ignorePantry=false`;
var requestDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinksEl.value}`;

checkbox.addEventListener('change', changeScript);

fetchData();
changeScript();

function changeScript() {
    var scriptElement = document.getElementById('script');

    if (checkbox.checked) {
        scriptElement.src = './assets/javascript/drink.js';
    } else {
        scriptElement.src = './assets/javascript/food.js';
    }
}

function fetchData() {
    const apiUrl = checkbox.checked ? requestDrinkUrl : requestURL;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data);
            // Process the data as needed
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

checkbox.addEventListener("change", function () {
    fetchData();
    changeScript();
});

function callAPI(event) {
    recipeResults = []; // resets the results
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
    event.preventDefault()

    console.log(ingredientsEl.value);

    fetch(requestURL)
        .then(function (response) { // made API call, awaiting data response
            return response.json();
        })
        .then(function (data) { // API call complete, generate divs to display data response
            console.log(data);
            recipeResults = data;
            if (recipeResults.length > 0) {
                recipeResults.forEach(recipe => {
                    var recipeDiv = document.createElement("div");
                    recipeDiv.innerHTML = recipe.title;
                    // API call to retrieve recipe card image, attach to recipeDiv
                    var recipeCard = `https://api.spoonacular.com/recipes/${recipe.id}/card?apiKey=${foodApiKey}`;
                    fetch(recipeCard)
                        .then(function (recipeCardResponse) {
                            return recipeCardResponse.json();
                        })
                        .then(function (res) {
                            console.log(res);
                            var displayRecipe = document.createElement("img");
                            displayRecipe.src = res.url;
                            recipeDiv.appendChild(displayRecipe);
                            displayResults.appendChild(recipeDiv);
                        })
                })
            }
        })
}

searchBtnEl.addEventListener("click", callAPI);