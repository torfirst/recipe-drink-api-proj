
var ingredientsEl = document.querySelector("#ingredient")
var drinkIngredientsEl = document.querySelector("#drink-ingredient")
var foodSearchBtnEl = document.querySelector("#foodSearchBtn")
var drinkSearchBtnEl = document.querySelector("#drinkSearchBtn")
var foodApiKey = "ea483b863cdd433eb55d9222c3cc0c4d";
var recipeResults = [];
var drinkResults = [];
var displayResults = document.getElementById("results");
var switchBtnEl = document.querySelector("#switchAPI")
var foodSearchEl = document.querySelector("#foodSearch")
var drinkSearchEl = document.querySelector("#drinkSearch")
var drinksEl = document.querySelector("#drink-ingredient")


function callFoodAPI(event) {
    event.preventDefault()
    recipeResults = []; // resets the results
    displayResults.textContent = ""
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
    var requestURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${foodApiKey}&ingredients=${ingredientsEl.value}&number=10&ignorePantry=false`;

    console.log(ingredientsEl.value);

    fetch(requestURL)
    .then(function(response) { // made API call, awaiting data response
        return response.json();
    })
    .then(function (data) { // API call complete, generate divs to display data response
        console.log(data);    
        recipeResults = data;
        if (recipeResults.length > 0){
            recipeResults.forEach(recipe => {
                var recipeDiv = document.createElement("div");
                // API call to retrieve recipe card image, attach to recipeDiv
                var recipeCard = `https://api.spoonacular.com/recipes/${recipe.id}/card?apiKey=${foodApiKey}`;
                fetch (recipeCard)
                .then(function(recipeCardResponse) {
                    return recipeCardResponse.json();
                })
                .then(function(res){
                    console.log(res);
                    var displayRecipe = document.createElement("img");
                    displayRecipe.classList.add("recipeCard");
                    displayRecipe.src = res.url;
                    recipeDiv.appendChild(displayRecipe); 
                    displayResults.appendChild(recipeDiv);
                })
            })
        }
    })
}

function switchAPI() {
    var search = document.querySelectorAll(".searchNav")
    search.forEach(function (i) {
        i.classList.toggle("hide");
    })
}

function callDrinkAPI(event) {
    event.preventDefault()
    displayResults.textContent = ""
    drinkResults = []; // resets the results
    var requestDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinksEl.value}`;
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs

    
    fetch(requestDrinkUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}


foodSearchBtnEl.addEventListener("click", callFoodAPI);
drinkSearchBtnEl.addEventListener("click", callDrinkAPI);
switchBtnEl.addEventListener("change", switchAPI);