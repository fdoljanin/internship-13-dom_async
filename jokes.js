let storedJokes = JSON.parse(localStorage.getItem("jokes")) || [];
if (storedJokes === null) localStorage.setItem("jokes", JSON.stringify(storedJokes));

function nextJoke() {
    fetch("https://icanhazdadjoke.com/",
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            else return response.json();
        })
        .then(changeJoke)
        .catch((err) => {
            console.log(err);
        })
}

function changeJoke(joke) {
    localStorage.setItem("currentJoke", JSON.stringify(joke));
    document.querySelector(".joke-text").innerHTML = joke.joke;
}

document.querySelector(".joke-save").addEventListener("click", () => {
    document.querySelector(".ratings").style.display = "block";
})

function giveRatingAndSave(rating) {
    document.querySelector(".ratings").style.display = "none";

    let savedJoke = JSON.parse(localStorage.getItem("currentJoke"));
    savedJoke.rating = rating;

    storedJokes.push(savedJoke);
    storedJokes.sort((x, y) => x.rating > y.rating ? 1 : -1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));

    nextJoke();
} 

function showSavedJokes() {
    let jokesContainer = document.querySelector(".stored__jokes");
    
    for (joke of storedJokes){
        let jokeDiv = document.createElement("article");
        jokeDiv.classList.add("stored__joke");
        let jokeText = document.createElement("p");
        jokeText.innerHTML = joke.joke;
        jokeText.classList.add("stored__joke-text");
        let jokeRating = document.createElement("p");
        jokeRating.innerHTML = joke.rating;
        jokeRating.classList.add("stored__joke-rating");
        let jokeId = document.createElement("p");
        jokeId.innerHTML = joke.id;
        jokeId.classList.add("stored__joke-id");
        let removeButton = document.createElement("button");
        removeButton.innerHTML="Remove joke";
        removeButton.classList.add("stored__jokes-remove");
        
        

        jokeDiv.appendChild(jokeText);
        jokeDiv.appendChild(jokeRating);
        jokeDiv.appendChild(jokeId);
        jokeDiv.appendChild(removeButton);

        jokesContainer.appendChild(jokeDiv);

        removeButton.addEventListener("click", ()=>removeJoke(joke.id));
    }
}

function removeJoke(jokeId){
    if(!confirm("Del joke?")) return;

    let jokeIndex = storedJokes.findIndex((joke)=>joke.id===jokeId)-1;
    console.log(jokeIndex);
    storedJokes.splice(jokeIndex,1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));
}

function logOff(){
    localStorage.clear();
}