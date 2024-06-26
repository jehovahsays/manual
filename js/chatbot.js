// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const nodes = document.getElementById('nodes');


// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = nodes.value;

  // Clear input field
  nodes.value = '';
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
    const responses = [



"electromagnetism",
"perpetual-motion",
"thermodynamics",
"reproductive-system",
"percentage",
"randomness",
"exploratory",
"compass",
"algorithm",
"learning",
"memorizing",
"gadgetry",
"planetary_alignment",
"intelligence",
"spermatogenesis",
"weather_forecast",
"peripheral_vision",
"randomization",
"combination",
"human_immune_system",
"reflection",
"gravitational_intelligence",
"3d_data_visualization",
"rotation",
"tv",
"playlist",
"gravitational_intelligence",
"gravitational_intelligence",
"gravitational_intelligence",
"gravitational_intelligence",
"planetary_alignment",
];return responses[Math.floor(Math.random() * responses.length)];}window.onblur = function (tabs) {alert('switch tabs alert');};