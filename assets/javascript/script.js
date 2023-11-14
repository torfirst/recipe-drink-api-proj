
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
var drinksEl = document.querySelector("#drinks")

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
});

function callFoodAPI(event) {
    event.preventDefault()
    recipeResults = []; // resets the results
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
                recipeDiv.innerHTML = recipe.title;
                // API call to retrieve recipe card image, attach to recipeDiv
                var recipeCard = `https://api.spoonacular.com/recipes/${recipe.id}/card?apiKey=${foodApiKey}`;
                fetch (recipeCard)
                .then(function(recipeCardResponse) {
                    return recipeCardResponse.json();
                })
                .then(function(res){
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

function switchAPI() {
    var search = document.querySelectorAll(".searchNav")
    search.forEach(function (i) {
        i.classList.toggle("hide");
    })
}

function callDrinkAPI(event) {
    drinkResults = []; // resets the results
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs

    event.preventDefault()

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