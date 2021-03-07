let storedJokes = JSON.parse(localStorage.getItem("jokes"));
if (storedJokes === null) localStorage.setItem("jokes", JSON.stringify([]));

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

nextJoke();

function showSavedSection() {
    document.querySelector(".joke").style.display = "none";
    document.querySelector(".stored__jokes").style.display = "flex";
}

function showJokesSection() {
    document.querySelector(".joke").style.display = "flex";
    document.querySelector(".stored__jokes").style.display = "none";
}


function changeJoke(joke) {
    localStorage.setItem("currentJoke", JSON.stringify(joke));
    document.querySelector(".joke-text").innerHTML = joke.joke;
}

document.querySelector("#joke-save").addEventListener("click", () => {
    document.querySelector(".background__dim").style.display = "block";
    updateRating();
    document.querySelector(".popup--rating").style.display = "flex";
})

function updateRating() {
    let rating = document.querySelector("input[name='rating']").value;
    document.querySelector(".popup-title--rating").innerHTML = `Rate joke: (${rating})`;
}

function hideSavePopup() {
    document.querySelector(".background__dim").style.display = "none";
    document.querySelector(".popup--rating").style.display = "none";
}


function saveJoke() {
    document.querySelector(".popup--rating").style.display = "none";
    let rating = document.querySelector("input[name='rating']").value;

    let savedJoke = JSON.parse(localStorage.getItem("currentJoke"));
    savedJoke.rating = rating;

    storedJokes.push(savedJoke);
    storedJokes.sort((x, y) => x.rating > y.rating ? 1 : -1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));

    nextJoke();
    hideSavePopup();
}

function showSavedJokes() {
    let jokesContainer = document.querySelector(".stored__jokes");

    for (joke of storedJokes) {
        let jokeDiv = document.createElement("article");
        jokeDiv.classList.add("stored__joke");
        jokeDiv.classList.add(joke.id);
        let jokeInfo = document.createElement("div");
        jokeInfo.classList.add("stored__joke-info");
        let jokeText = document.createElement("p");
        jokeText.innerHTML = joke.joke;
        jokeText.classList.add("stored__joke-text");
        let jokeRating = document.createElement("p");
        jokeRating.innerHTML = "Rating: " + joke.rating;
        jokeRating.classList.add("stored__joke-rating");
        let jokeId = document.createElement("p");
        jokeId.innerHTML = joke.id;
        jokeId.classList.add("stored__joke-id");
        let removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove joke";
        removeButton.classList.add("stored__joke-remove");
        removeButton.classList.add(joke.id);

        removeButton.addEventListener("click", (e) =>removeJoke(e));

        jokeInfo.appendChild(jokeId);
        jokeInfo.appendChild(jokeText);
        jokeInfo.appendChild(jokeRating);

        jokeDiv.appendChild(jokeInfo);
        jokeDiv.appendChild(removeButton);

        jokesContainer.appendChild(jokeDiv);
    }
}

showSavedJokes();

function removeJoke(event) {
    let jokeId = event.target.classList[1];

    let jokeIndex = storedJokes.findIndex((joke) => joke.id === jokeId);
    console.log(jokeId);
    storedJokes.splice(jokeIndex, 1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));
}

function logOff() {
    localStorage.clear();
}