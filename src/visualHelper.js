function showSavedSection() {
    document.querySelector(".joke").style.display = "none";
    document.querySelector(".stored__jokes").style.display = "flex";
    listSavedJokes();
}

function showJokesSection() {
    document.querySelector(".joke").style.display = "flex";
    document.querySelector(".stored__jokes").style.display = "none";
}

function hidePopup(popup) {
    document.querySelector(".background__dim").style.display = "none";
    popup.style.display = "none";
}

function showPopup(popup) {
    document.querySelector(".background__dim").style.display = "block";
    popup.style.display = "flex";
}