document.addEventListener('DOMContentLoaded', function () {
    const convertButton = document.getElementById('convertButton');
    const switchButton = document.getElementById('switchButton');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDisplay = document.getElementById('result');

    const savedFromCurrency = localStorage.getItem('fromCurrency');
    const savedToCurrency = localStorage.getItem('toCurrency');
    if (savedFromCurrency) {
        fromCurrencySelect.value = savedFromCurrency;
    }
    if (savedToCurrency) {
        toCurrencySelect.value = savedToCurrency;
    }

    amountInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            convertButton.click();
        }
    });

    switchButton.addEventListener('click', function () {
        const fromCurrency = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = fromCurrency;
    });

    convertButton.addEventListener('click', function () {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        localStorage.setItem('fromCurrency', fromCurrency);
        localStorage.setItem('toCurrency', toCurrency);

        if (isNaN(amount) || amount <= 0) {
            resultDisplay.textContent = 'Please enter a valid amount.';
            return;
        }

        const apiKey = '2a5f40256fac777247f8dfe1';
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    const rate = data.conversion_rates[toCurrency];
                    const convertedAmount = (amount * rate).toFixed(2);
                    resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                } else {
                    resultDisplay.textContent = 'Error fetching conversion rate';
                }
            })
            .catch(error => {
                resultDisplay.textContent = 'Error fetching conversion rate';
                console.error('Error:', error);
            });
    });
});
