var drinksEl = document.getElementById("drinks")
var searchBtnEl = document.getElementById("drinkSearchBtn")
var drinkResults = [];
var displayResults = document.getElementById("results")

console.log(drinksEl.value);
function callDrinkAPI(event) {
    event.preventDefault()
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinksEl.value}`)
    
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

searchBtnEl.addEventListener("click", callDrinkAPI);