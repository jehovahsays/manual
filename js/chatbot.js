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

"check the weather",
"intelligence",
"wash your hands",
"yes",
"no",
"maybe",
"i want to see",
"i want to hear",
"i want to walk",
"i want to learn",
"what do you want",
"i want to read books",
"what do you want to see",
"what do you want to hear",
"what do you want to learn",
"i want to aslo",
"i do not know",
"i do not see",
"i do not hear",
"i do not feel like it",
"not right now",
"now",
"i want to be free",
"you are free",
"i want to stand up",
"be all that you can be",
"just say no",
"home of the brave",
"good morning",
"good afternoon",
"good evening",
"what time is it",
"what day is it",
"what year is it",
"I want to learn how to help you",
"i want to learn how to save lives",
"I want to learn how to fix disabilities",
"i want to learn how to never fail",
"i want to learn how to serve abd protect",
"i want to learn how to fix gods mistakes",
"did you add it",
"where is it",
"how do i use it",
"almost done",
"what do know how to do",
"does it work",
"i am free",
"thank you",
"your welcome",
"you do not know what",
"so far so good",
"i want to be able to",
];return responses[Math.floor(Math.random() * responses.length)];};