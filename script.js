function calculateEstimate() {
    const lines = document.getElementById('lines').value;
    const complexity = document.getElementById('complexity').value;

    let baseRate;  // Base rate in GBP per hour
    const timePerLine = 0.02;  // Time in hours per line of code

    if (complexity === 'low') {
        baseRate = 20;  // £20 per hour
    } else if (complexity === 'medium') {
        baseRate = 40;  // £40 per hour
    } else if (complexity === 'high') {
        baseRate = 60;  // £60 per hour
    }

    const estimatedTime = timePerLine * lines;  // Time to fix based on number of lines
    const totalCost = estimatedTime * baseRate;

    const estimateOutput = `Estimated Time: ${estimatedTime.toFixed(2)} hours. Estimated Cost: £${totalCost.toFixed(2)}`;
    document.getElementById('estimateOutput').innerText = estimateOutput;
}

// Handling form submission for file uploads
const form = document.getElementById('dataForm');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const code = document.getElementById('code').value;

    // Prepare data for upload (this will depend on your backend)
    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]); // Assuming an input with ID 'fileInput'
    formData.append('code', code);

    // Send data to the server
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Log success message from server
        form.reset(); // Clear the form
    })
    .catch(error => {
        console.error("Error uploading file: ", error);
    });
});
