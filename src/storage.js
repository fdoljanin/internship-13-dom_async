let storedJokes = JSON.parse(localStorage.getItem("jokes"));

if (storedJokes === null) {
    storedJokes = []
    localStorage.setItem("jokes", JSON.stringify(storedJokes))
};

function saveJoke(rating) {
    let savedJoke = JSON.parse(localStorage.getItem("currentJoke"));
    savedJoke.rating = parseInt(rating);

    storedJokes.push(savedJoke);
    storedJokes.sort((x, y) => x.rating > y.rating ? 1 : -1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));
}

function removeJoke(id) {
    let jokeIndex = storedJokes.findIndex((joke) => joke.id === id);
    storedJokes.splice(jokeIndex, 1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));
}