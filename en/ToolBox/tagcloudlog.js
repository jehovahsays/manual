// --- GLOBAL TAG CLOUD STATE ---
// The core list of words for the TagCloud. We need this array to be persistent.
var tagCloudWords = [
    "main",
    "recent",
    "settings",
    "about",
];
// The instance of the TagCloud object, stored globally to allow updates.
var tagCloudInstance = null; 


// --- 1. INITIALIZATION (Modified from tagcloudlog.js) ---
// This function runs once the script loads to set up the TagCloud
function initTagCloud() {
    // Initialize the TagCloud, targeting the '.content' div (the filterInput container)
    tagCloudInstance = TagCloud('.content', tagCloudWords, {
        // Optional: Custom configurations based on TagCloud.js defaults
        containerClass: 'filterInput', 
        itemClass: 'titleInput',
    });
    console.log("TagCloud Initialized:", tagCloudInstance);
}


// --- 2. NEW FUNCTION: Create and Add Interactive Tag Node ---
function createTagNode(event) {
    // Prevents the form from submitting and causing a page reload
    event.preventDefault(); 
    
    let inputField = document.getElementById('secure-form-answer-Human');
    // Get the new word and clean up any whitespace
    let newTag = inputField.value.trim();

    // Exit if the input is empty
    if (!newTag) {
        console.log("Input is empty. Cannot create tag node.");
        return;
    }
    
    // Add the new tag to the word list if it doesn't already exist
    if (!tagCloudWords.includes(newTag)) {
        tagCloudWords.push(newTag);
        
        // Use the TagCloud's API to refresh the visualization
        if (tagCloudInstance && tagCloudInstance.update) {
            tagCloudInstance.update(tagCloudWords);
            console.log(`TagCloud updated with new tag: ${newTag}`);
        }
    } else {
        console.log(`Tag "${newTag}" already exists. Redirecting...`);
    }

    // --- INTERACTIVITY: Redirect to the new page hash ---
    // This is the key step that makes the node 'interactive' 
    // by triggering your existing SPA hash routing logic.
    window.location.hash = newTag; 
    
    // Clear the input field
    inputField.value = ''; 
    
    // Optional: Re-run the speech synthesis for confirmation/accessibility (from original titleInput logic)
    var msg = new SpeechSynthesisUtterance(newTag); 
    window.speechSynthesis.speak(msg);
}


// --- 3. EXISTING titleInput() FOR KEYUP FILTERING (Preserved) ---
// If you want to keep the onkeyup filtering functionality on the TagCloud as you type, 
// you must preserve this function.

function titleInput() {
    let input = document.getElementById('filterInput').value; // Note: 'filterInput' here is a div, not the form input. It seems you need to modify this line to target the secure-form-answer-Human input instead.
    
    // *** FIX: Use the actual input field for the value ***
    let realInput = document.getElementById('secure-form-answer-Human');
    input = realInput.value;

    input = input.toLowerCase();

    let x = document.getElementsByClassName('titleInput'); // These are the TagCloud items
 
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item"; // TagCloud items are links, not list items, but preserving original logic.
        }
    }
      
    // var msg = new SpeechSynthesisUtterance(input); 
    // window.speechSynthesis.speak(msg); // Only speak on submit for less noise
}


// Start the TagCloud initialization
initTagCloud();
