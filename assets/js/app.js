console.log("APP");
function goBack() {
    window.history.back();
}


const inputs = ["input1", "input2", "input3", "input4", "input5", "input6"];

inputs.map((id) => {
    const input = document.getElementById(id);
    addListener(input);
});

function addListener(input) {
    input.addEventListener("keyup", (event) => {
        const code = parseInt(input.value);
        if (code >= 0 && code <= 9) {
            const n = input.nextElementSibling;
            if (n) n.focus();
        } else {
            input.value = "";
        }

        const key = event.key;
        if (key === "Backspace" || key === "Delete") {
            const prev = input.previousElementSibling;
            if (prev) prev.focus();
        }
    });

    // Listen for paste event
    input.addEventListener("paste", (event) => {
        event.preventDefault(); // Prevent default paste behavior

        // Get pasted text and split into individual digits
        const pastedText = (event.clipboardData || window.clipboardData).getData("text");
        const digits = pastedText.split("").filter((char) => !isNaN(parseInt(char)));

        // Fill the input boxes with pasted digits
        let currentInput = input;
        digits.forEach((digit) => {
            if (currentInput) {
                currentInput.value = digit;
                currentInput = currentInput.nextElementSibling;
            }
        });

        // Focus on the last input
        const lastInput = input.parentElement.lastElementChild;
        if (lastInput) {
            lastInput.focus();
        }
    });
}
