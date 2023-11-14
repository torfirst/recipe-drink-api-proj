
var ingredientsEl = document.querySelector("#ingredient")
var searchBtnEl = document.querySelector("#searchBtn")
var foodApiKey = "ea483b863cdd433eb55d9222c3cc0c4d";
var recipeResults = [];
var displayResults = document.getElementById("results");

function loadScript(src){
    var el = document.createElement("script");
    el.src = src;
    document.body.appendChild(el);
}
const checkbox = document.querySelector('#myCheckbox');

checkbox.addEventListener('change', function() {
  // Check if the checkbox is checked
  if (this.checked) {
    // Execute code for when the checkbox is checked
    // For example, switch to a different JavaScript file or make a different API call
    // You can load a new JavaScript file dynamically using the `script` tag
    // Or you can make a new API call using the appropriate method (e.g., fetch)
  } else {
    // Execute code for when the checkbox is unchecked
    // For example, switch back to the original JavaScript file or make the original API call
  }
});

function callAPI(event) {
    if (inputs[i].checked = !inputs[i].checked) {
        var drinkSearch = document.querySelector(".drinkSearch");
        drinkSearch.removeAttribute(".hide");
        loadScript()
    }

    recipeResults = []; // resets the results
    while (displayResults.firstChild) {
        displayResults.removeChild(displayResults.firstChild);
    } // clears result divs
    event.preventDefault()
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

searchBtnEl.addEventListener("click", callAPI);