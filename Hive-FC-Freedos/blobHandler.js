// blobHandler.js

function getBlobFromURL(blobURL) {
  if (blobs.hasOwnProperty(blobURL)) {
    return blobs[blobURL];
  } else {
    console.error(`Blob not found for URL: ${blobURL}`);
    return null;
  }
}

// Function to create an object URL for a Blob
function createObjectURL(blobURL) {
  const blob = getBlobFromURL(blobURL);
  if (blob) {
    return URL.createObjectURL(blob);
  } else {
    console.error(`Object URL not created for Blob with URL: ${blobURL}`);
    return null;
  }
}

// Export functions for external use
export { getBlobFromURL, createObjectURL };
