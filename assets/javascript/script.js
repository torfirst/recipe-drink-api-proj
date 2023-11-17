
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
var favoriteBtnEl = document.querySelector("#drinkFavoriteBtn");
var favoriteSectionEl = document.querySelector(".favorite-section");

var favoriteDrinks = JSON.parse(localStorage.getItem("favorites")) || [];


function callFoodAPI(event) {
    event.preventDefault()
    recipeResults = []; // resets the results
    displayResults.textContent = "";
    favoriteSectionEl.textContent = "";
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
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

                    const missedIngredients = recipe.missedIngredientCount;
                    // Calculate the ratio
                    const totalIngredientsCount = recipe.missedIngredientCount + recipe.usedIngredientCount;
                    const ratio = missedIngredients / totalIngredientsCount;

                    // Check if values are valid (not undefined or null)
                    if (missedIngredients !== undefined && totalIngredientsCount !== undefined) {
                        // Calculate percentage
                        const percentageValue = (missedIngredients / totalIngredientsCount) * 100;

                        // Log or use the percentage values as needed
                        console.log(`Percentage Value: ${percentageValue}%`);

                        // Create an element to display the percentage
                        var percentageElement = document.createElement("p");
                        percentageElement.textContent = `You have ${percentageValue.toFixed(2)}% of the ingredients!`;

                        // Append the percentage element to the recipeDiv
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
                            favoriteBtn.addEventListener("click", function() {
				                favoriteBtn.textContent = "Favorited!";
                                var id = data.drinks[0].strDrink;
                                if (!favoriteDrinks.includes(id)) {
                                    favoriteDrinks.push(id)
                                    localStorage.setItem("favorites", JSON.stringify(favoriteDrinks));
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

                            for(var k = 1; k < 16; k++) {
                                if (data.drinks[0][`strIngredient${k}`] !== null) {
                                    var ingredients = document.createElement("li");
                                    ingredients.textContent = data.drinks[0][`strMeasure${k}`] + ': ' + data.drinks[0][`strIngredient${k}`];
                                    drinkResult.appendChild(ingredients);
                                }}
                            displayResults.appendChild(drinkResult);

                        }})}
        })
}

function callFavoriteDrinks() {
    displayResults.textContent = "";
    favoriteBtnEl.textContent = "";
    for (var i = 0; i <favoriteDrinks.length; i++) {
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

                    for(var k = 1; k < 16; k++) {
                        if (data.drinks[0][`strIngredient${k}`] !== null) {
                            var ingredients = document.createElement("li");
                            ingredients.textContent = data.drinks[0][`strMeasure${k}`] + ': ' + data.drinks[0][`strIngredient${k}`];
                            drinkResult.appendChild(ingredients);
                        }}
                    displayResults.appendChild(drinkResult);

                }})}
}
        
        

foodSearchBtnEl.addEventListener("click", callFoodAPI);
drinkSearchBtnEl.addEventListener("click", callDrinkAPI);
switchBtnEl.addEventListener("change", switchAPI);
favoriteBtnEl.addEventListener("click", callFavoriteDrinks);