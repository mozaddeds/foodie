const searchBtn = document.getElementById("search-btn").addEventListener("click", function(){
    
    const foodSection = document.getElementById("foodsLists");
    if (foodSection!=null) {

        foodSection.innerHTML = ``;
    }
    const foodDetailSection = document.getElementById("foodDetails");
    if (foodDetailSection!=null){

        foodDetailSection.innerHTML = ``;
    }

    const foodErrorSection = document.getElementById("foodDetails");
    if (foodDetailSection!=null){

        foodDetailSection.innerHTML = ``;
    }

    
    searchValue = document.getElementById("searchPlace").value;

    if (searchValue.length == 1) {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`
        fetch(searchUrl)
        .catch(error => displayError(error))
        .then(res => res.json())
        .then(data => displayFoods(data.meals));
        
    }

    else if (searchValue.length > 1) {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        fetch(searchUrl)
        .then(check)
        .catch(error => displayError(error))
        .then(res => res.json())
        .then(data => displayFoods(data.meals));
    }
    
})

var check = function(response) {
    if(!response.ok)
    throw Error();
    displayError(response);
    return response;
}


const displayError = error => {
    const errorPart = document.getElementById("foodsLists");
    // errorPart.innerHTML = `
    // <h1>Seems like you have mistaken while searching! Don't worry, you can use google to know what search and try again!</h1>
    // `
}

const displayFoods = foods => {

    if(foods!=null){

        const foodsDiv = document.getElementById("foodsLists");
        foods.forEach(food => {
            
            const foodDiv = document.createElement('div');
            foodDiv.className = 'foodBox';
    
            const foodInfo = `
                <div id="foodArea" onclick="displayFoodDetail('${food.idMeal}')">
                <img src="${food.strMealThumb}">
                <h3>${food.strMeal}</h3>
                </div>
            ` ;
    
            foodDiv.innerHTML = foodInfo;
            foodsDiv.appendChild(foodDiv);
        });
    }

    else {
        const errorPart = document.getElementById("foodsLists");
        errorPart.innerHTML = `
        <h1>Seems like you have mistaken while searching! Don't worry, you can use google to know what search and try again!</h1>
        `
    }
    
}

const displayFoodDetail = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`
    fetch(url)
    .then(res => res.json())
    .then(data => renderFoodInfo(data.meals));
}

const renderFoodInfo = foods => {

    

    foods.forEach(food => {
        const foodDetail = document.getElementById("foodDetails")
        foodDetail.innerHTML = `
        <img src="${food.strMealThumb}">
        <h2>${food.strMeal}</h2>
        <p>${food.strIngredient1}</p>
        <p>${food.strIngredient2}</p>
        <p>${food.strIngredient3}</p>
        <p>${food.strIngredient4}</p>
        <p>${food.strIngredient5}</p>
        <p>${food.strIngredient6}</p>
        `
    }); 
}
