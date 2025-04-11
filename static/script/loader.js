let intervalId;

function showErrorMessage() {
    document.getElementById('spinner').style.display = 'none';

    document.querySelector('.text').innerText = 'An error occurred while processing your request. Please try again later.';
    clearInterval(intervalId);
}

function fetchInvoice(id) {
    fetch(`/fetch-invoice-url?id=${id}`)
        .then(res => {
            if (res.status === 400) {
                showErrorMessage();
                console.log('Received 400, stopping interval.');
            }
            if (res.status != 200) {
                return {};
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

window.onload = () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id") ?? "unknown"
    const interval = Number(params.get("interval") ?? 3) * 1000
    fetchInvoice(id);
    intervalId = setInterval(fetchInvoice, interval, id);
};