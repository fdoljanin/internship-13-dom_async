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
    toggleScroll(true);
    document.querySelector(".background__dim").style.display = "none";
    popup.style.display = "none";
}

function showPopup(popup) {
    toggleScroll(false);
    document.querySelector(".background__dim").style.display = "block";
    popup.style.display = "flex";
}

function toggleScroll(enable) {
    if (enable) {
        document.body.style.overflow = "scroll";
    } else {
        document.body.style.overflow = "hidden";
    }
}