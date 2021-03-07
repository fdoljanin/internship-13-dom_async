let storedJokes = JSON.parse(localStorage.getItem("jokes"));
if (storedJokes === null) localStorage.setItem("jokes", JSON.stringify([]));

function saveJoke(rating){
    let savedJoke = JSON.parse(localStorage.getItem("currentJoke"));
    savedJoke.rating = rating;

    storedJokes.push(savedJoke);
    storedJokes.sort((x, y) => x.rating > y.rating ? 1 : -1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));
}

function removeJoke(id){
    let jokeIndex = storedJokes.findIndex((joke) => joke.id === id);
    storedJokes.splice(jokeIndex, 1);
    localStorage.setItem("jokes", JSON.stringify(storedJokes));
}