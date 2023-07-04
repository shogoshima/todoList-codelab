export function popup() {
    let popupElement = document.querySelector(".user_popup");
    console.log(getComputedStyle(popupElement).display);
    if (getComputedStyle(popupElement).display === "none") {
        popupElement.style.display = "block";
        popupElement.style.animation = "popup 0.25s linear";
        popupElement.addEventListener("animationend", () => {
            popupElement.style.animation = "";
            popupElement.style.display = "block";
        })
    } else {
        popupElement.style.animation = "unpopup 0.25s linear";
        popupElement.addEventListener("animationend", () => {
            popupElement.style.display = "none";
            popupElement.style.animation = "";
        })
    }
}