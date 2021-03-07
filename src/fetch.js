async function fetchJoke() {
    try {
        const response = await fetch("https://icanhazdadjoke.com/",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

        if (!response.ok)
            throw new Error();

        const joke = await response.json();
        return joke;
    } catch (err) {
        alert("There is an error! Check your connection.");
    };
}