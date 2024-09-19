
async function sendData() {
    const data = document.URL;
    console.log("fetch_data: data: ", data);

    await chrome.runtime.sendMessage({
        action: 'FRESH_DATA',
        data: data
    });
}

// when injected send data
console.log("fetch_data");
sendData();

