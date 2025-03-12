let intervalId;

function showFallbackSpinner() {
    document.getElementById('image-loader').style.display = 'none';
    document.getElementById('spinner').style.display = 'block';
};

function showErrorMessage() {
    document.getElementById('image-loader').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';

    document.querySelector('.text').innerText = 'An error occurred while processing your request. Please try again later.';
    clearInterval(intervalId);
}

function fetchInvoice() {
    fetch(`/fetch-invoice-url?id=${new URLSearchParams(window.location.search).get("id")}`)
        .then(res => {
            if (res.status === 400) {
                showErrorMessage();
                console.log('Received 400, stopping interval.');
            }
            if (res.status != 200) {
                return;
            }

            return res.json();
        })
        .then(data => {
            if (data.url) {
                window.location.href = data.url;
            }
        })
        .catch(error => {
            showErrorMessage();
            console.error('Error fetching invoice:', error);
        });
};

window.onload = function() {
    fetchInvoice();
    intervalId = setInterval(fetchInvoice, 3000);
};