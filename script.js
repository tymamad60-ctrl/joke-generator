const API_URL = 'https://api.jokes.one/jokes/random';
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any';

let currentJokeType = 'Any';
const jokeTypes = ['Any', 'General', 'Knock-knock', 'Programming'];

// Get joke from API
async function getJoke() {
    const jokeText = document.getElementById('joke-text');
    
    try {
        jokeText.textContent = 'Loading...';
        jokeText.classList.add('loading');
        
        const response = await fetch(`${JOKE_API_URL}?type=single`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        jokeText.classList.remove('loading');
        
        if (data.type === 'single') {
            jokeText.textContent = data.joke;
        } else if (data.type === 'twopart') {
            jokeText.textContent = `${data.setup}\n\n${data.delivery}`;
        }
    } catch (error) {
        jokeText.classList.remove('loading');
        jokeText.textContent = 'Oops! Could not fetch a joke. Please try again.';
        console.error('Error fetching joke:', error);
    }
}

// Change joke type
function changeJokeType() {
    const currentIndex = jokeTypes.indexOf(currentJokeType);
    const nextIndex = (currentIndex + 1) % jokeTypes.length;
    currentJokeType = jokeTypes[nextIndex];
    
    document.getElementById('type-display').textContent = currentJokeType;
    getJoke();
}

// Event listeners
document.getElementById('get-joke-btn').addEventListener('click', getJoke);
document.getElementById('next-type-btn').addEventListener('click', changeJokeType);

// Load a joke on page load
window.addEventListener('load', getJoke);
