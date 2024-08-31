// fetchData.js - JavaScript code to fetch and display data
export async function fetchAndDisplayData() {
    const guid = 'BA329D36-E09F-4F4E-A4AA-29A259A94E7E';
    console.log("Fetching data for GUID:", guid);
    const url = 'https://hbapps.accenture.com/hbapp/QuizWebApp/ViewAnswer.php';

    const data = new URLSearchParams({
        tempGUID: `{${guid}}`,
        tempTitle: 'RNC | CO-Press@ December 2023 Online Assessment'
    });

    try {
        // Make the fetch request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'text/html, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://hbapps.accenture.com/hbapp/QuizWebApp/'
            },
            body: data.toString()
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Get the compressed data
        const compressedData = await response.arrayBuffer();
        console.log("Compressed data received:", compressedData);

        // Decode the data using TextDecoder
        const decompressedData = new TextDecoder().decode(new Uint8Array(compressedData));
        console.log("Decompressed data:", decompressedData);

        // Parse the decompressed HTML response
        const parser = new DOMParser();
        const doc = parser.parseFromString(decompressedData, 'text/html');
        const answerTable = doc.querySelector('.table-responsive');

        // Display only the answer part in a new popup window
        const popup = window.open("", "Popup", "width=800,height=600");
        popup.document.write(`
            <html>
            <head><title>Answer</title></head>
            <body>
                <h2>Answer</h2>
                <div>${answerTable ? answerTable.outerHTML : '<p>No answer found.</p>'}</div>
            </body>
            </html>
        `);
        popup.document.close();

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    }
}
