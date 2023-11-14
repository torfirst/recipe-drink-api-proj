
var ingredientsEl = document.querySelector("#ingredient")
var searchBtnEl = document.querySelector("#searchBtn")
var foodApiKey = "ea483b863cdd433eb55d9222c3cc0c4d";
var recipeResults = [];
var displayResults = document.getElementById("results");
const checkbox = document.getElementById('checkbox');
var scriptElement = document.getElementById('script');

checkbox.addEventListener('change', changeScript);

function changeScript() {
    var scriptElement = document.getElementById('script');

    if (checkbox.checked) {
        scriptElement.src = './assets/javascript/drink.js'; 
    } else {
        scriptElement.src = './assets/javascript/food.js'; 
    }
}

function callAPI(event) {

    recipeResults = []; // resets the results
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
    event.preventDefault()
    var requestURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${foodApiKey}&ingredients=${ingredientsEl.value}&number=10&ignorePantry=false`;

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