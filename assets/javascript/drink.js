var drinksEl = document.getElementById("drinks")
var drinkSearchBtnEl = document.getElementById("drinkSearchBtn")
var drinkResults = [];
var displayResults = document.getElementById("results")
const checkbox = document.getElementById('checkbox');
const scriptElement = document.getElementById('script');
var requestDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinksEl.value}`;
var requestURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${foodApiKey}&ingredients=${ingredientsEl.value}&number=10&ignorePantry=false`;

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

drinkSearchBtnEl.addEventListener("click", callDrinkAPI);