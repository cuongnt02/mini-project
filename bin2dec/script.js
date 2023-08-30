"use strict";

const inputStyle = (function() {
    const input = document.getElementById("input");

    function addFocus() {
        const headStyle = document.head.appendChild(document.createElement("style"));
        headStyle.innerHTML = ".number-input::after {width: 100%; opacity: 255;}"
    }
    function removeFocus() {
        document.head.removeChild(document.getElementsByTagName("style")[0]);
    }

    return {
        focus() {
            input.addEventListener("focusin", addFocus);
            input.addEventListener("focusout", removeFocus);
        },
    };
})().focus();

const binaryInput = (function() {
    const input = document.getElementById("input");
    let inputValue = input.value;
    const re = /^[01]+$/i;
    const BASE = 2;

    function updateValue() {
        inputValue = input.value;
    }

    function validate() {
        return re.test(inputValue);
    }

    function calculateDec(value) {
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            if (value.charAt(i) === '1') sum += Math.pow(2, value.length - i - 1);
        }
        return sum;
    }

    return{
        parseDec() {
            updateValue()
            return validate() ? calculateDec(inputValue) : -1;
        },
    };
})();


const getValueButton = document.getElementById("getValue");
const answer = document.getElementById("answer");
getValueButton.addEventListener("click", () => {
    let result = binaryInput.parseDec();
    answer.innerHTML = result === -1 ? "INVALID VALUE" : BigInt(result);
    answer.classList.remove("animation");
    setTimeout(() => {
        answer.classList.add("animation");
    }, 500);
});

