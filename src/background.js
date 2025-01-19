const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Currency Conversion Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getConversionRate') {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[request.targetCurrency];
                sendResponse({ rate: rate });
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
                sendResponse({ rate: null });
            });
        return true;
    }
});
