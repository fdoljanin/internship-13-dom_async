async function nextJoke() {
    let joke = await fetchJoke();
    localStorage.setItem("currentJoke", JSON.stringify(joke));
    document.querySelector(".joke-text").innerHTML = joke.joke;
}

nextJoke();

function updateRating() {
    let rating = document.querySelector("input[name='rating']").value;
    document.querySelector(".popup-title--rating").innerHTML = `Rate joke: (${rating})`;
}

async function saveJokeAction() {
    try {
        let rating = await getRating();
        saveJoke(rating);
        nextJoke();
    } catch (e) { }
}

function listSavedJokes() {
    let jokesContainer = document.querySelector(".stored__jokes-container");
    jokesContainer.innerHTML="";

    for (joke of storedJokes) {
        let jokeArticle = createJokeArticle(joke);
        jokesContainer.appendChild(jokeArticle);
    }
}

async function removeJokeAction(event) {
    let jokeId = event.target.classList[1];
    let userConfirmed = await confirmDeletePopup();
    if (!userConfirmed) return;
    removeJoke(jokeId);
    document.querySelector('.'+event.target.classList[1]).style.display="none";
}


function logOff() {
    localStorage.clear();
}

async function confirmDeletePopup(){
    return new Promise((resolve, reject) => {
        showPopup(document.querySelector(".popup--deletion"));
        document.querySelector("#joke-confirm__deletion--popup").addEventListener("click", () => {
            hidePopup(document.querySelector(".popup--deletion"));
            resolve(true);
        })

        document.querySelector("#joke-cancel__deletion--popup").addEventListener("click", () => {
            hidePopup(document.querySelector(".popup--deletion"));
            resolve(false);
        })
    })
}

async function getRating() {
    return new Promise((resolve, reject) => {
        showPopup(document.querySelector(".popup--rating"));

        document.querySelector("#joke-save--popup").addEventListener("click", () => {
            hidePopup(document.querySelector(".popup--rating"));
            resolve(document.querySelector("input[name='rating']").value);
        })

        document.querySelector("#joke-cancel--popup").addEventListener("click", () => {
            hidePopup(document.querySelector(".popup--rating"));
            reject();
        })
    })
}