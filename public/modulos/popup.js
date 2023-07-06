export function popup() {
    let popupElement = document.querySelector(".user_popup");
    let popupButton = document.querySelector(".detailUser");
    console.log(getComputedStyle(popupElement).display);
    if (getComputedStyle(popupElement).display === "none") {
        popupElement.style.display = "block";
        popupElement.style.animation = "popup 0.25s linear";
        popupElement.addEventListener("animationend", () => {
            popupElement.style.animation = "";
            popupElement.style.display = "block";
        })
        window.addEventListener('click', (event) => {
            if (!popupButton.contains(event.target) && !popupElement.contains(event.target)) {
                popupElement.style.animation = "unpopup 0.25s linear";
                popupElement.addEventListener("animationend", () => {
                    popupElement.style.display = "none";
                    popupElement.style.animation = "";
                })
            }
        })
    } else {
        popupElement.style.animation = "unpopup 0.25s linear";
        popupElement.addEventListener("animationend", () => {
            popupElement.style.display = "none";
            popupElement.style.animation = "";
        })
    }
}