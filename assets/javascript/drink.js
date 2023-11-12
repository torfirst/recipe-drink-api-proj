var drinksEl = document.getElementById("drinks")
var searchBtnEl = document.getElementById("drinkSearchBtn")
var drinkResults = [];
var displayResults = document.getElementById("results")

function callDrinkAPI(event) {
    var requestURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinksEl.value}`;

    if (inputs[i].checked = !inputs[i].checked) {
        var drinkSearch = document.querySelector(".drinkSearch");
        drinkSearch.removeAttribute(".hide");
    }
    
    drinkResults = []; // resets the results
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
    event.preventDefault()

    console.log(drinksEl.value);

    fetch(requestURL)
        .then(function (response) { // made API call, awaiting data response
            return response.json();
        })
        .then(function (data) { // API call complete, generate divs to display data response
            console.log(data);
            drinkResults = data;
            if (drinkResults.length > 0) {
                drinkResults.forEach(drink => {
                    var drinkDiv = document.createElement("div");
                    drinkDiv.innerHTML = drink.title;
                    displayResults.appendChild(drinkDiv);
                })
            }
        })
}

searchBtnEl.addEventListener("click", callDrinkAPI);