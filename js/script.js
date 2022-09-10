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
}

function getAgePrediction(){
}

function getNationalityPrediction(){
}