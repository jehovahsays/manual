// Get chatbot elements
const chatbot = document.getElementById('chatbot');

const conversation = document.getElementById('conversation');
// input box label to send data to php action file
const inputForm = document.getElementById('secure-form-answer');
// input box id
const filterInput = document.getElementById('filterInput');


// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = filterInput.value;
 //var msg = new SpeechSynthesisUtterance(input); 
 //window.speechSynthesis.speak(msg); 

  // Clear input field
  filterInput.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  //let message = document.createElement('div');
  //message.classList.add('chatbot-message', 'user-message');
  //message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  //conversation.appendChild(message);

  // Generate chatbot response
  const response = generateResponse(input);
   

  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p style="left:10px;" class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  var msg = new SpeechSynthesisUtterance(response); 
  window.speechSynthesis.speak(msg); 

  message.scrollIntoView({behavior: "smooth"});
});

// Generate chatbot response function
function generateResponse(input) {
    // Add chatbot logic here
	// Do not delete the last line of this file because the logger will break and delete entire file. 
    const responses = [

"yes",
"no",
"how",
"what",
"when",
"where",
"who",
"why",
"know",
"unknown",
"ask",
"remember",
"i",
"me",
"you",
"them",
"us",
"my",
"has",
"have",
"had",
"fata morgana",
"symbiosis",
"core",
"center",
"has",
"is",
"it",
"thought",
"think",
"mind",
"your",
"a",
"as",
"and",
"about",
"almost",
"most",
"time",
"can",
"define",
"talk",
"between",
"celebration",
"best",
"true",
"false",
"gravity",
"compass",
"ley line",
"planetary alignment",
"idea",
"science",
"magnetic polarity",
"superposition",
"hello",
"hi",
"see",
"hear",
"orbit",
"knows",
"do",
"did",
"infinite",
"collection",
"hey how are you doing",
"visual",
"audible",
"sound",
"light",
"space",
"time",
"velocity",
"speed",
"date",
"shadow",
"rotation",
"perfection",
"perpetual motion",
"cloud",
"weather",
"sun",
"i am",
"i am not",
"wind",
"evolution",
"eyeball",
"pupil",
"diamagnetic structure",
"ghost",
"clean",
"learn",
"energy",
"connected",
"live",
"hand",
"eye",
"walk",
"invisible",
"visible",
"knowledge",
"mirror",
"correct",
"incorrect",
"illusion",
"hey",
"focus",
"spherical",
"half",
];return responses[Math.floor(Math.random() * responses.length)];};