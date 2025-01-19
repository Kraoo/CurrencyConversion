document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-button');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDisplay = document.getElementById('result');

    convertButton.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (!isNaN(amount) && fromCurrency && toCurrency) {
            chrome.runtime.sendMessage({ amount, fromCurrency, toCurrency }, function(response) {
                if (response && response.convertedAmount) {
                    resultDisplay.textContent = `${amount} ${fromCurrency} = ${response.convertedAmount} ${toCurrency}`;
                } else {
                    resultDisplay.textContent = 'Conversion failed. Please try again.';
                }
            });
        } else {
            resultDisplay.textContent = 'Please enter a valid amount and select currencies.';
        }
    });
});