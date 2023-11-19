
var ingredientsEl = document.querySelector("#ingredient");
var drinkIngredientsEl = document.querySelector("#drink-ingredient");
var foodSearchBtnEl = document.querySelector("#foodSearchBtn");
var drinkSearchBtnEl = document.querySelector("#drinkSearchBtn");
var foodApiKey = "ea483b863cdd433eb55d9222c3cc0c4d";
var recipeResults = [];
var drinkResults = [];
var displayResults = document.getElementById("results");
var switchBtnEl = document.querySelector("#switchAPI");
var foodSearchEl = document.querySelector("#foodSearch");
var drinkSearchEl = document.querySelector("#drinkSearch");
var drinksEl = document.querySelector("#drink-ingredient");
var foodFavoritesBtn = document.getElementById('food-favorites-button')

var drinkFavoriteBtn = document.querySelector("#drink-favorites-button");
var favoriteSectionEl = document.querySelector(".favorite-section");

var favoriteDrinks = JSON.parse(localStorage.getItem("drink-favorites")) || [];
var favoriteFood = JSON.parse(localStorage.getItem("food-favorites")) || [];

function callFoodAPI(event) {
    event.preventDefault()
    recipeResults = []; // resets the results
    displayResults.textContent = "";
    favoriteSectionEl.textContent = "";
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
    var requestURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${foodApiKey}&ingredients=${ingredientsEl.value}&number=10&ignorePantry=false`;


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
                    recipeDiv.classList.add("recipeCard");

                    const missedIngredients = recipe.missedIngredientCount;
                    // Calculate the ratio
                    const totalIngredientsCount = recipe.missedIngredientCount + recipe.usedIngredientCount;
                    const ratio = missedIngredients / totalIngredientsCount;

                    // Check if values are valid (not undefined or null)
                    if (missedIngredients !== undefined && totalIngredientsCount !== undefined) {
                        const percentageValue = (missedIngredients / totalIngredientsCount) * 100;
                        var percentageElement = document.createElement("p");
                        percentageElement.classList.add("percentages");
                        percentageElement.textContent = `You have ${percentageValue.toFixed(2)}% of the ingredients!`;
                        recipeDiv.appendChild(percentageElement);
                    } else {
                        console.warn(`Recipe: ${recipe.title} has missing values`);
                    }

                    // API call to retrieve recipe card image, attach to recipeDiv
                    var recipeCard = `https://api.spoonacular.com/recipes/${recipe.id}/card?apiKey=${foodApiKey}`;
                    fetch(recipeCard)
                        .then(function (recipeCardResponse) {
                            return recipeCardResponse.json();
                        })
                        .then(function (res) {
                            console.log(res);

                            var favoriteBtn = document.createElement("button");
                            favoriteBtn.classList.add("foodsearchfavoriteBtn");
                            favoriteBtn.textContent = "Add to Favorites";
                            favoriteBtn.addEventListener("click", function () {
                                favoriteBtn.textContent = "Favorited!";
                                var id = recipeResults[0].id;
                                if (!favoriteFood.includes(id)) {
                                    favoriteFood.push(id)
                                    localStorage.setItem("food-favorites", JSON.stringify(favoriteFood));
                                }
                            })
                            
                            recipeDiv.appendChild(favoriteBtn);

                            var displayRecipe = document.createElement("img");
                            displayRecipe.classList.add("recipe-img");
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
    displayResults.textContent = "";
    favoriteSectionEl.textContent = "";
    drinkResults = []; // resets the results
    var drinkIngredients = drinksEl.value.split(' ').join('');
    var ingredientUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${drinkIngredients}`;

    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs


    fetch(ingredientUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data);
            for (var i = 0; i < 10; i++) {
                var drinkURL = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${data.drinks[i].strDrink}`;
                fetch(drinkURL)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Network response was not ok: ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('API response:', data);
                        for (var j = 0; j < data.drinks.length; j++) {

                            var drinkResult = document.createElement("div");
                            drinkResult.classList.add("drinkCard");

                            var favoriteBtn = document.createElement("button");
                            favoriteBtn.classList.add("favoriteBtn");
                            favoriteBtn.textContent = "Add to Favorites";
                            favoriteBtn.addEventListener("click", function () {
                                favoriteBtn.textContent = "Favorited!";
                                var id = data.drinks[0].strDrink;
                                if (!favoriteDrinks.includes(id)) {
                                    favoriteDrinks.push(id)
                                    localStorage.setItem("drink-favorites", JSON.stringify(favoriteDrinks));
                                }

                            });
                            drinkResult.appendChild(favoriteBtn);


                            var drinkName = document.createElement("h2");
                            drinkName.textContent = data.drinks[j].strDrink;
                            drinkResult.appendChild(drinkName);

                            var drinkImg = document.createElement("img");
                            drinkImg.classList.add("drinkImg");
                            drinkImg.src = data.drinks[j].strDrinkThumb;
                            drinkResult.appendChild(drinkImg);

                            var instructions = document.createElement("div");
                            instructions.textContent = "Instructions: " + data.drinks[j].strInstructions;
                            drinkResult.appendChild(instructions);

                            for (var k = 1; k < 16; k++) {
                                if (data.drinks[0][`strIngredient${k}`] !== null) {
                                    var ingredients = document.createElement("li");
                                    ingredients.textContent = data.drinks[0][`strMeasure${k}`] + ': ' + data.drinks[0][`strIngredient${k}`];
                                    drinkResult.appendChild(ingredients);
                                }
                            }
                            displayResults.appendChild(drinkResult);

                        }
                    })
            }
        })
}

function callFavoriteFood() {
    displayResults.textContent = "";
    foodFavoritesBtn.textContent = "";
    for (var i = 0; i < favoriteFood.length; i++) {
        var favoriteFoodURL = `https://api.spoonacular.com/recipes/${favoriteFood[i]}/card?apiKey=${foodApiKey}`;
        fetch(favoriteFoodURL)
        .then(function (favoriteFoodURLResponse) {
            return favoriteFoodURLResponse.json();
        })
        .then(function (res) {
            console.log(res);
            var recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipeCard");
            var displayRecipe = document.createElement("img");
            displayRecipe.classList.add("recipe-img");
            displayRecipe.src = res.url;
            recipeDiv.appendChild(displayRecipe);

            displayResults.appendChild(recipeDiv);
            })
    }
}

function callFavoriteDrinks() {
    displayResults.textContent = "";
    drinkFavoriteBtn.textContent = "";
    for (var i = 0; i < favoriteDrinks.length; i++) {
        var favoriteURL = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${favoriteDrinks[i]}`;
        fetch(favoriteURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(function (data) {
                console.log('API response:', data);
                for (var j = 0; j < data.drinks.length; j++) {

                    var drinkResult = document.createElement("div");
                    drinkResult.classList.add("drinkCard");
                    var drinkName = document.createElement("h2");
                    drinkName.textContent = data.drinks[j].strDrink;
                    drinkResult.appendChild(drinkName);
                    var drinkImg = document.createElement("img");
                    drinkImg.classList.add("drinkImg");
                    drinkImg.src = data.drinks[j].strDrinkThumb;
                    drinkResult.appendChild(drinkImg);
                    var instructions = document.createElement("div");
                    instructions.textContent = "Instructions: " + data.drinks[j].strInstructions;
                    drinkResult.appendChild(instructions);

                    for (var k = 1; k < 16; k++) {
                        if (data.drinks[0][`strIngredient${k}`] !== null) {
                            var ingredients = document.createElement("li");
                            ingredients.textContent = data.drinks[0][`strMeasure${k}`] + ': ' + data.drinks[0][`strIngredient${k}`];
                            drinkResult.appendChild(ingredients);
                        }
                    }
                    displayResults.appendChild(drinkResult);

                }
            })
    }
}



foodSearchBtnEl.addEventListener("click", callFoodAPI);
drinkSearchBtnEl.addEventListener("click", callDrinkAPI);
switchBtnEl.addEventListener("change", switchAPI);
drinkFavoriteBtn.addEventListener("click", callFavoriteDrinks);
foodFavoritesBtn.addEventListener("click", callFavoriteFood);