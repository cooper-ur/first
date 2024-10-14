const imageSlots = document.querySelectorAll('.image-slot');
const submitButton = document.getElementById('submitButton');
const sorryButton = document.getElementById('sorryButton');
const feedbackModal = document.getElementById('feedbackModal');
const correctModal = document.getElementById('correctModal'); // New modal for correct order
const modalImage = document.getElementById('modalImage');
const bgm = document.getElementById('bgm');
const correctMoves = document.getElementById('correctMoves'); // Element to display moves in the correct modal
const correctLink = document.getElementById('correctLink'); // Button that redirects user after correct order

let draggedItem = null;
let incorrectAttempts = 0; // Counter for incorrect attempts
let totalMoves = 0; // Track total moves


// Shuffle the images when the page loads
function shuffleImages() {
  const container = document.getElementById('gameContainer');
  const slotsArray = Array.from(imageSlots);
  
  // Randomize the order of images
  for (let i = slotsArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    container.appendChild(slotsArray[randomIndex]);
  }
}

// Add drag start event
imageSlots.forEach(slot => {
  slot.addEventListener('dragstart', (e) => {
    draggedItem = slot;
    setTimeout(() => {
      slot.classList.add('dragging');
    }, 0);
  });

  slot.addEventListener('dragend', () => {
    setTimeout(() => {
      slot.classList.remove('dragging');
      draggedItem = null;
    }, 0);
  });

  slot.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow the drop
    slot.classList.add('drag-over');
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('drag-over');
  });

  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    slot.classList.remove('drag-over');

    if (draggedItem !== slot) {
      const container = slot.parentNode;
      const allSlots = [...container.children];
      
      // Swap the dragged item and the target slot
      const draggedIndex = allSlots.indexOf(draggedItem);
      const targetIndex = allSlots.indexOf(slot);

      if (draggedIndex > targetIndex) {
        container.insertBefore(draggedItem, slot);
      } else {
        container.insertBefore(draggedItem, slot.nextSibling);
      }
    }
  });
});

const gifs = [
  'gif/1.gif',
  '/first/gif/2.gif',
  '/first/gif/3.gif',
  '/first/gif/4.gif',
  '/first/gif/5.gif'
];

function getRandomGif() {
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex];
}

// Function to check the order after dragging
function checkOrder() {
  let correctOrder = true;
  const imageSlots = document.querySelectorAll('.image-slot');
  
  imageSlots.forEach((slot, index) => {
    if (parseInt(slot.getAttribute('data-order')) !== index + 1) {
      correctOrder = false;
    }
  });
  
  totalMoves += 1; // Increment total moves whenever user clicks the check button

  if (!correctOrder) {
    // Get a random GIF and display it\
    incorrectAttempts += 1;

    const randomGif = getRandomGif();
    modalImage.src = randomGif;
    
    // Show the modal and play the background music
    feedbackModal.classList.add('show');
    bgm.play();
  } else {
    // Provide feedback for correct order
     // User got the correct order, display the correct modal
     correctMoves.textContent = `You got the correct order in ${totalMoves} moves!`;
     correctModal.classList.add('show'); // Show the correct result modal
  }
}


// Event listener for the submit button

// Event listener for the SORRY button to close the modal
sorryButton.addEventListener('click', () => {
  feedbackModal.classList.remove('show');
  bgm.pause(); // Stop the background music when modal is closed
  bgm.currentTime = 0; // Reset the music to the start
});

correctLink.addEventListener('click', () => {
  window.location.href = 'https://drive.google.com/file/d/1IX_lN4wR0hSpWgts9xt_m5byLzXdOCCw/view?usp=sharing'; // Replace this with your desired link
});
// Shuffle the images when the page loads
window.onload = shuffleImages;

// Event listener to check the order when the button is clicked
submitButton.addEventListener('click', checkOrder);
