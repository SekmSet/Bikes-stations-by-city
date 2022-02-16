class Utils {
    static clearInput(input) {
        input.value = ""
    }

    static setTextContent (element, text) {
        element.textContent = text
    }

    static setInnerHtml (element, text) {
        element.innerHTML = text
    }

    static changeDisplay(element, display) {
        element.style.display = display;
    }
}