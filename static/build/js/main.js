document.addEventListener('DOMContentLoaded', () => {
    const mainInput = document.getElementById('mainInput');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const dynamicInputs = document.getElementById('dynamicInputs');

    function updateDynamicInputs() {
        const value = parseInt(mainInput.value);
        dynamicInputs.innerHTML = '';

        if (value >= 2) {
            for (let i = 0; i < value - 1; i++) {
                const inputWrapper = document.createElement('div');
                inputWrapper.className = 'input-wrapper';

                const inputBox = document.createElement('div');
                inputBox.className = 'input-box';

                const newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.placeholder = 'Անուն';
                newInput.className = 'input-text';

                inputBox.appendChild(newInput);
                inputWrapper.appendChild(inputBox);
                dynamicInputs.appendChild(inputWrapper);
            }
        }
    }

    plusButton.addEventListener('click', () => {
        mainInput.value = parseInt(mainInput.value) + 1;
        updateDynamicInputs();
    });

    minusButton.addEventListener('click', () => {
        if (mainInput.value > 0) {
            mainInput.value = parseInt(mainInput.value) - 1;
            updateDynamicInputs();
        }
    });

    mainInput.addEventListener('input', () => {
        if (mainInput.value < 0) {
            mainInput.value = 0;
        }
        updateDynamicInputs();
    });

    // Initialize the dynamic inputs on page load
    updateDynamicInputs();
});
