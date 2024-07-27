let tablinks = document.querySelectorAll(".tab-links");
let tabcontents = document.querySelectorAll(".tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    document.querySelector(`[onclick="opentab('${tabname}')"]`).classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

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
    speed = 75;
  
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
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwpICTEbrHh5A-AoSwvAghSYOnwUVcE4znu7kmbVz5LqdW25XIju7o_Tflrlyq8utrzfQ/exec'
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