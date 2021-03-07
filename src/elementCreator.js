function createJokeArticle(joke) {
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

    removeButton.addEventListener("click", e => removeJokeAction(e));

    jokeInfo.appendChild(jokeId);
    jokeInfo.appendChild(jokeText);
    jokeInfo.appendChild(jokeRating);

    jokeDiv.appendChild(jokeInfo);
    jokeDiv.appendChild(removeButton);

    return jokeDiv;
}