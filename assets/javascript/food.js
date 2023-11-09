
var ingredientsEl = document.querySelector("#ingredient")
var searchBtnEl = document.querySelector("#searchBtn")
var foodApiKey = "ea483b863cdd433eb55d9222c3cc0c4d";

function callAPI(event) {
    event.preventDefault()
    var requestURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=ea483b863cdd433eb55d9222c3cc0c4d&includeIngredients=" + ingredientsEl.value
    
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);    
    })
}

searchBtnEl.addEventListener("click", callAPI);