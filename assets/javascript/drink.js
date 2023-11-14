var drinksEl = document.getElementById("drinks")
var searchBtnEl = document.getElementById("drinkSearchBtn")
var drinkResults = [];
var displayResults = document.getElementById("results")

function callDrinkAPI(event) {
    var requestURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinksEl.value}`;

}

searchBtnEl.addEventListener("click", callDrinkAPI);