// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');


// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  // Generate chatbot response
  const response = generateResponse(input);

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

"magnetic-polarity💡",
"reproductive-system💡",
"electromagnetic-conduction💡",
"compass💡",
"intelligence💡",
"thermodynamics💡",
"gravity💡",
"alignment💡",
"diamagnetism💡",
"nucleolus💡",
"neurosphere💡",
"radius💡",
"Pi💡",
"orbit💡",
"perpetual-motion💡",
"infinity-symbol💡",
"half💡",
"necker-cube💡",
"superposition💡",
"magnetotactic-bacteria_💡",
"recognition💡",
"thatcher-effect💡",
"toroflux💡",
"brinicle-formation💡",
"zoetrope💡",
"wimshurst-machine💡",
"magnetic-vortex💡",
"sonoluminescence💡",
"bioluminescence💡",
"self-aware💡",
"imagination💡",
"freewill💡",
"control💡",
"existence💡",
"evolution💡",
"memorization💡",
"symbiosis💡",
"synapse💡",
"sandbox💡",
"pineal-gland💡",
"emergence💡",
"electron-transport-chain💡",
"mutoscope💡",
"reflection💡",
"echo💡",
];return responses[Math.floor(Math.random() * responses.length)];}window.onblur = function (tabs) {alert('switch tabs alert');};