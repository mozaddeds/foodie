const searchBtn = document.getElementById("search-btn").addEventListener("click", function(){
    
    const foodSection = document.getElementById("foodsLists");
    foodSection.innerHTML = ``;
    const foodDetailSection = document.getElementById("foodDetails");
    foodDetailSection.innerHTML = ``;
    
    searchValue = document.getElementById("searchPlace").value;

    if (searchValue.length == 1) {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`
        fetch(searchUrl)
        .then(res => res.json())
        .catch(error => displayError(error))
        .then(data => displayFoods(data.meals));
        
    }

    else if (searchValue.length > 1) {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        fetch(searchUrl)
        .then(res => res.json())
        .catch(error => displayError(error))
        .then(data => displayFoods(data.meals));
    }
    
})


const displayError = error => {
    const errorPart = document.getElementById("foodSection");
    errorPart.innerHTML = `
    <h1>Seems like you have mistaken while searching! Don't worry, you can use google to know what search and try again!</h1>
    `
}

const displayFoods = foods => {

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


// const foodEmpty = document.getElementById("foodsLists");
