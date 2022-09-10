//Intializing variables
const APIgender = "https://api.genderize.io?name=";
const APIage ="https://api.agify.io/?name=";
const APInationality = "https://api.nationalize.io/?name=";
const dogImage = "https://dog.ceo/api/breeds/image/random";
const button = document.getElementById("submit");

getRandomImage();

function getRandomImage(){
    //Fetching image link from the API after converting the response to a JSON response
    fetch(dogImage)
    .then(response => response.json())
    .then(image => document.getElementById("dog_image").src = image.message);
}

function getGenderPrediction(){
    //Fetching gender result from API after converting the response to a JSON response
    fetch(APIgender + input)
    .then(response => response.json())
    .then(results => document.getElementById("gender_prediction").textContent = results.gender);
}

function getAgePrediction(){
    //Fetching age result from API after converting the response to a JSON response
    fetch(APIage + input)
    .then(response => response.json())
    .then(results => document.getElementById("age_prediction").textContent = results.age);
}

function getNationalityPrediction(){
}