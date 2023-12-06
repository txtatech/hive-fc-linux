// blobHandler.js

// Store blobs in a map
const blobs = new Map();

// Function to get a Blob from a URL
function getBlobFromURL(blobURL) {
  if (blobs.has(blobURL)) {
    return blobs.get(blobURL);
  } else {
    console.error(`Blob not found for URL: ${blobURL}`);
    return null;
  }
}

// Function to create an object URL for a Blob
function createObjectURL(blob) {
  if (blob instanceof Blob) {
    const objectURL = URL.createObjectURL(blob);
    // Store the Blob in the map
    blobs.set(objectURL, blob);
    return objectURL;
  } else {
    console.error(`Object URL not created. Invalid Blob provided.`);
    return null;
  }
}

// Export functions for external use
export { getBlobFromURL, createObjectURL };
