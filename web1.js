function opentab(tabname) {
  var i;
  var x = document.getElementsByClassName("tab-contents");
  var y = document.getElementsByClassName("tab-links");

  for (i = 0; i < x.length; i++) {
      x[i].classList.remove("active-tab");
  }

  for (i = 0; i < y.length; i++) {
      y[i].classList.remove("active-link");
  }

  document.getElementById(tabname).classList.add("active-tab");
  event.currentTarget.classList.add("active-link");
}

window.opentab = opentab;



var words = [
    'Software Engineering Fellow',
    'Junior Data Commitee',
    'Auditor',
    'Aspiring Software Developer',
    'Aspiring Data Engineer'
  ];
  var part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    speed = 60;
  
  var wordflick = function () {
    setInterval(function () {
      part = words[i].substring(0, offset);
      if (forwards) {
        offset++;
        if (offset > words[i].length) {
          forwards = false;
        }
      } else {
        offset--;
        if (offset === 0) {
          forwards = true;
          i = (i + 1) % len;
        }
      }
  
      
      document.getElementById('word').textContent = part;
    }, speed);
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    wordflick();
  });

  var sidemenu = document.getElementById("sidemenu");

  function openmenu(){
    sidemenu.style.right = "0";

  }
  function closemenu(){
    sidemenu.style.right = "-200px";
    
  }


  //contact forms
  const scriptURL = 'https://script.google.com/macros/s/AKfycby5b20lpqHLDHdHNyAxiq94OU-0JpxADi8MdcC3KSGpXl4v2JNtjTtOY40CPBWjH28B/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault();
  
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
  
        msg.innerHTML = "Message Sent!";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 3000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
  // Get all anchor elements in the document
  var allLinks = document.querySelectorAll("a");

  // Add target="_blank" attribute to each anchor element
  allLinks.forEach(function(link) {
      link.setAttribute("target", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var workList = document.getElementById("workList");
  var seeMoreBtn = document.getElementById("seeMoreBtn");

  // Event listener for the "See More" button
  seeMoreBtn.addEventListener("click", function() {
      // Toggle the "see-more" class on the workList element
      var isSeeMore = workList.classList.toggle("see-more");

      // Change the button text based on the toggle state
      seeMoreBtn.textContent = isSeeMore ? "See Less" : "See More";
  });
});


const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose");

  let getMode = localStorage.getItem("mode");
    if(getMode && getMode === "dark-mode"){
        body.classList.add("dark");
    }
  


  // toggles light and dark mode
      modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");

        //code to stay dark/light
        if(!body.classList.contains("dark")){
          localStorage.setItem("mode" , "light-mode");
        }else{
          localStorage.setItem("mode", "dark-mode")
        }

      })

      document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
    
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
      if (window.innerWidth <= 600) {
        document.body.classList.add('dark');
      }
    });

// Chat Bot
import { apiKey } from './apikey.js';

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");



let userMessage;
const API_KEY = apiKey;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passes message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">robot_2</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
}

const generateResponse = (incomingChatLI) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLI.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{role: "user", content: userMessage}]
    })
  }

  // Send POST Request to API, get response
  fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
    messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
    messageElement.classList.add("error");
    messageElement.textContent = "Something went wrong. Please try again. "
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () =>{
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

 

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  

  setTimeout(() => {
    // Display "Processing..." while waiting for a response
    const incomingChatLI = createChatLi("Processing...", "incoming")
    chatbox.appendChild(incomingChatLI);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLI);
  }, 600);
}

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
})

chatInput.addEventListener("keydown", (e) => {
  // If enter is pressed without shift key and window width is greater than 800px, send the chat
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
})

chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);