//Intializing variables
const APIgender = "https://api.genderize.io?name=";
const APIage ="https://api.agify.io/?name=";
const APInationality = "https://api.nationalize.io/?name=";
const dogImage = "https://dog.ceo/api/breeds/image/random";
const button = document.getElementById("submit");

//Changing the dog image
getRandomImage();

//Reveal results on click
button.addEventListener('click', (event) => {
    let input = document.querySelector('[name="input"]').value
    document.getElementById("name").textContent = input

    getGenderPrediction();
    getNationalityPrediction();
    getAgePrediction();
})

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
    //Fetching nationality result from API after converting the response to a JSON response
    fetch(APInationality + input)
    .then(response => response.json())
    .then(results => {
        //Fetching one or two nationalities depending on the length of the country array
        if(results.country.length == 1){
            document.getElementById("nationality_prediction").textContent = results.country[0].country_id
        }
        else{
            document.getElementById("nationality_prediction").textContent = results.country[0].country_id + " and " + results.country[1].country_id
        }
    });
}