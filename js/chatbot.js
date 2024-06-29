// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const filterInput = document.getElementById('filterInput');
const response = document.getElementsByClassName('edges');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = filterInput.value;

  // Clear input field
  filterInput.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  // Generate chatbot response
  const response = generateResponse(input);
   

//return responses[Math.floor(Math.random() * responses.length)];}	
  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});
});

// Generate chatbot response function
function generateResponse(input) {
    // Add chatbot logic here
	// Do not delete the last line of this file because the logger will break and delete entire file. 
    const responses = [


"database",
"about",
"books",
"light",
"radio",
"tv",
"symbiosis",
"magnetic-polarity",
"planetary-alignment",
"intelligence-absorption",
"reaction_based_on_interaction_during_magnetic_field_disturbance",
];return responses[Math.floor(Math.random() * responses.length)];}window.onblur = function (tabs) {alert('switch tabs alert');};