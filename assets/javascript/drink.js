var drinksEl = document.getElementById("drinks")
var searchBtnEl = document.getElementById("drinkSearchBtn")
var drinkResults = [];
var displayResults = document.getElementById("results")

function callDrinkAPI(event) {
    event.preventDefault()
    var requestURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinksEl.value}`;
    fetch(requestURL)
    .then(function(response) { // made API call, awaiting data response
        return response.json();
    })
    .then(function(data){
        console.log(data);

    })

}

searchBtnEl.addEventListener("click", callDrinkAPI);