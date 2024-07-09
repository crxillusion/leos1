document.addEventListener('DOMContentLoaded', () => {
    const mainInput = document.getElementById('mainInput');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const dynamicInputs = document.getElementById('dynamicInputs');
    const submitButton = document.getElementById('submitBtn');
    const successBlock = document.querySelector('.success-block');

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
                newInput.placeholder = `Անուն Ազգանուն (հյուր ${i + 2})`;
                newInput.className = 'input-text';
                newInput.name = `guest[${i + 1}]`;

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

    submitButton.addEventListener('click', () => {
        const form = document.querySelector('.coming-form');
        const params = new FormData(form);

        var botToken = '7451052263:AAH5d0ujgXz-6mKvZWTf7hg-U7LX1sP0JiQ';
        var chatId = '-4236962620';
        var guest_num = params.get('guests_number');
        var coming = params.get('coming');
        var guests = [];
        if (guest_num > 1) {
            for (let i = 1; i <= guest_num; i++) {
                guests.push(params.get(`guest[${i}]`));
            }
        }
        var str = `${coming === 'true' ? '#գալիսեն' : '#չենգալիս'}
Հիմնական հյուր՝ ${params.get('guest[0]')}
Հյուրերի քանակ՝ ${params.get('guests_number')}
Մնացած հյուրեր՝ ${guests.length ? guests.join(', ') : 'չկան'}`;
        var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(str)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                successBlock.classList.add('visible');
                console.log(coming);
                if(coming === 'true'){
                    document.querySelector('.message-coming').classList.add('visible');
                }else{
                    document.querySelector('.message-not-coming').classList.add('visible');
                }
                if (data.ok) {
                } else {
                    console.log('Error sending message: ' + data.description);
                }
            })
            .catch(error => {
                console.log('Error: ' + error);
            });
    })

    // Initialize the dynamic inputs on page load
    updateDynamicInputs();


});
