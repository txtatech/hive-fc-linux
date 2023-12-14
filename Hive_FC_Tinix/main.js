import { blobs, addBlob } from './blobHandler.js';

    document.getElementById('viewJsonButton').addEventListener('click', async () => {
        const jsonUrl = document.getElementById('jsonUrlInput').value;
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            document.getElementById('jsonContentDisplay').textContent = JSON.stringify(jsonData, null, 2);

            // Create Blob URLs from the JSON data
            const blobUrls = createBlobUrlsFromJson(jsonData);
            displayJsonBlobUrls(blobUrls); // Call the new function to display JSON blob URLs
        } catch (error) {
            console.error("Error fetching or parsing JSON: ", error);
            document.getElementById('jsonContentDisplay').textContent = `Error loading JSON: ${error.message}`;
        }
    });


    function createBlobUrlsFromJson(jsonData) {
        const blobUrls = {};

        const createBlobUrl = (data, key) => {
            // Convert the data to JSON string and then to a Blob
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

            // Create a Blob URL
            const url = URL.createObjectURL(blob);

            // Store the URL with the corresponding key
            blobUrls[key] = url;
        };

        const iterateAndCreateBlobUrls = (data, parentKey = '') => {
            if (typeof data === 'object' && data !== null) {
                Object.entries(data).forEach(([key, value]) => {
                    const combinedKey = parentKey ? `${parentKey}.${key}` : key;
                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        // If the value is an object, iterate deeper
                        iterateAndCreateBlobUrls(value, combinedKey);
                    } else {
                        // Create Blob URL for the current value
                        createBlobUrl(value, combinedKey);
                    }
                });
            }
        };

        iterateAndCreateBlobUrls(jsonData);

        return blobUrls;
    }

    document.getElementById('viewJsonButton').addEventListener('click', async () => {
        const jsonUrl = document.getElementById('jsonUrlInput').value;
        try {
            const response = await fetch(jsonUrl);
            const jsonData = await response.json();
            document.getElementById('jsonContentDisplay').textContent = JSON.stringify(jsonData, null, 2);

            // Create Blob URLs from the JSON data
            const blobUrls = createBlobUrlsFromJson(jsonData);
            displayBlobUrls(blobUrls);
        } catch (error) {
            console.error("Error fetching JSON: ", error);
            document.getElementById('jsonContentDisplay').textContent = 'Error loading JSON';
        }
    });

    // Adjusted function to display blob URLs in a specific element
    function displayBlobUrls(blobUrls) {
        const blobUrlList = document.getElementById('blobUrlList'); // Ensure this ID matches your HTML element

        blobUrlList.innerHTML = ''; // Clear existing content

        Object.entries(blobUrls).forEach(([key, url]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${key}: `;

            const link = document.createElement('a');
            link.href = url;
            link.textContent = 'View Blob';
            link.target = '_blank';

            listItem.appendChild(link);
            blobUrlList.appendChild(listItem);
        });
    }


    function displayJsonBlobUrls(blobUrls) {
        const jsonBlobUrlList = document.getElementById('jsonBlobList');
        jsonBlobUrlList.innerHTML = ''; // Clear existing list items

        Object.entries(blobUrls).forEach(([key, url]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${key}: `;

            const link = document.createElement('a');
            link.href = url;
            link.textContent = 'View Blob';
            link.target = '_blank';

            listItem.appendChild(link);
            jsonBlobUrlList.appendChild(listItem);
        });
    }

    function isGzipCompressed(data) {
        // Function to check if data is Gzip compressed
        return data[0] === 0x1F && data[1] === 0x8B;
    }

    function base64ToBlob(base64Data, mimeType) {
        let standardBase64 = base64Data.replace(/-/g, '+').replace(/_/g, '/');
        while (standardBase64.length % 4 !== 0) {
            standardBase64 += '=';
        }
        try {
            const byteCharacters = atob(standardBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            if (isGzipCompressed(byteArray)) {
                return new Blob([pako.inflate(byteArray)], { type: mimeType });
            }
            return new Blob([byteArray], { type: mimeType });
        } catch (e) {
            console.error("Error in base64 decoding: ", e);
            return null;
        }
    }

    function appendVideoToDocument(blob, fileName) {
        if (fileName.endsWith('.mp3')) {
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = URL.createObjectURL(blob);

            videoPlayer.onloadeddata = function() {
                videoPlayer.play();
            };
        }
    }
  
    let currentMediaIndex = 0; // To keep track of the current media file
    const mediaFiles = []; // Array to store the media files

    // Function to play a specific media file
    function playMedia(index) {
        if (index >= 0 && index < mediaFiles.length) {
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = mediaFiles[index].url;
            videoPlayer.load();
            videoPlayer.play();
            currentMediaIndex = index;
        }
    }

    // Function to play the next media file
    function playNextMedia() {
        playMedia(currentMediaIndex + 1);
    }

    // Function to play the previous media file
    function playPrevMedia() {
        playMedia(currentMediaIndex - 1);
    }

    // Event listeners for Next and Previous buttons
    document.getElementById('nextButton').addEventListener('click', playNextMedia);
    document.getElementById('prevButton').addEventListener('click', playPrevMedia);

    // Append file to media list and play if it's the first file
    function appendFileToDocument(blob, fileName) {
        var file = new Blob([blob], { type: 'application/octet-stream' });
        var url = window.URL.createObjectURL(file); // Create Blob URL
        addBlob(fileName, url); // Add Blob URL to the 'blobs' map
        mediaFiles.push({ name: fileName, url: url });

        // If it's the first media file, play it automatically
        if (mediaFiles.length === 1) {
            playMedia(0);
        }

        // Check if the file is a video and set it as the source for the video player
        if (fileName.endsWith('.mp3')) {
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = url;
            videoPlayer.load(); // Load the new video source
        }

        console.log(`File: ${fileName}, Blob URL: ${url}, Size: ${file.size}, Type: ${file.type}`);
    }

    function processDataFromChunkyHTML(htmlContent) {
        console.log("Processing HTML content");

        const scriptContentMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
        if (!scriptContentMatch) {
            console.error("No script with JSON data found");
            return;
        }

        const scriptContent = scriptContentMatch[1];
        const jsonDataMatches = scriptContent.match(/data \+= `([\s\S]*?)`;/g);
        if (!jsonDataMatches) {
            console.error("No JSON data found in script");
            return;
        }

        let sortedChunks = [];
        jsonDataMatches.forEach((jsonDataMatch) => {
            const jsonData = jsonDataMatch.match(/data \+= `([\s\S]*?)`;/)[1].trim();
            try {
                const json = JSON.parse(jsonData);
                if (json && json.content && json.content.chunk && typeof json.content.chunk === 'string') {
                    sortedChunks.push({ file: json.file, chunk: json.content.chunk, number: json.number });
                }
            } catch (e) {
                console.error("Error parsing JSON chunk", e);
            }
        });
        sortedChunks.sort((a, b) => a.number - b.number);

        let fileChunks = {}; // Temporary storage for file chunks

        sortedChunks.forEach((chunk) => {
            const fileIdentifier = chunk.file;
            if (!fileChunks[fileIdentifier]) {
                fileChunks[fileIdentifier] = [];
            }
            fileChunks[fileIdentifier].push(chunk.chunk);
        });

        // Combine chunks for each file and create Blobs
        for (const [fileIdentifier, chunks] of Object.entries(fileChunks)) {
            const combinedBase64 = chunks.join('');
            const blobData = base64ToBlob(combinedBase64);
            if (blobData) {
                appendFileToDocument(blobData, fileIdentifier); // This call should log the Blob URL
            }
        }

        populateBlobList(); // Update the blob list
    }

    function populateBlobList() {
        const blobList = document.getElementById('blobList');
        blobList.innerHTML = '';  // Clear existing list items

        blobs.forEach((url, filename) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${filename}: `; // Set the text content to the filename

            const link = document.createElement('a');
            link.href = url;
            link.textContent = 'View Blob';
            link.target = '_blank'; // Open in a new tab/window

            listItem.appendChild(link); // Append the link to the list item
            blobList.appendChild(listItem); // Append the list item to the blob list
        });
    }

    document.getElementById('decodeButton').addEventListener('click', function() {
        const fileInput = document.getElementById('chunkyFileInput');
        if (fileInput.files.length === 0) {
            alert('Please select the chunky.html file.');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            processDataFromChunkyHTML(content);
        };
        reader.readAsText(file);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Fetch and process chunky.html automatically on page load
        fetch('chunky.html')
            .then(response => response.text())
            .then(content => {
                processDataFromChunkyHTML(content);
            })
            .catch(error => console.error('Error loading chunky.html:', error));
    });
