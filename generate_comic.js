// Simulating image manipulation with HTML5 Canvas
function generateComic(prompt) {
    // List of simple words and objects
    const words = ["cat", "dog", "ball", "sun", "tree", "car", "bird", "fish"];
    const colors = ["red", "blue", "green", "pink", "gold", "brown"];
    
    // Helper function to get a random item from an array
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Generate a simple story
    const story = `A ${randomChoice(colors)} ${randomChoice(words)} sees a ${randomChoice(words)}.`;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Fill the background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 600);
    
    // Draw simple shapes for the story
    ctx.fillStyle = randomChoice(colors);
    ctx.fillRect(100, 100, 200, 200);
    
    ctx.fillStyle = randomChoice(colors);
    ctx.beginPath();
    ctx.ellipse(500, 300, 100, 100, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add text
    ctx.fillStyle = 'black';
    ctx.font = '36px Arial';
    ctx.fillText(story, 50, 500);
    
    // Convert canvas to image data URL
    const imageDataUrl = canvas.toDataURL('image/png');
    
    return { story, imageDataUrl };
}

// Example usage
function createComic() {
    const prompt = "Create a simple comic about animals";
    const { story, imageDataUrl } = generateComic(prompt);
    
    // Display the story
    const storyElement = document.getElementById('story');
    storyElement.textContent = `Generated story: ${story}`;
    
    // Display the image
    const imageElement = document.getElementById('comic-image');
    imageElement.src = imageDataUrl;
}

// Call this function when the page loads
window.onload = createComic;
