async function createComic() {
    const promptInput = document.getElementById('prompt-input');
    const prompt = promptInput.value || "a friendly cat";
    
    try {
        const response = await fetch('/generate-comic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate comic');
        }
        
        const { story, imageUrl } = await response.json();
        
        // Display the story
        const storyElement = document.getElementById('story');
        storyElement.textContent = story;
        
        // Display the image
        const imageElement = document.getElementById('comic-image');
        imageElement.src = imageUrl;
    } catch (error) {
        console.error('Error generating comic:', error);
        alert('Failed to generate comic. Please try again.');
    }
}
