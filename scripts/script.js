// Function to toggle the theme
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Event listener for the theme switcher
document.getElementById('theme-switcher').addEventListener('click', toggleTheme);

// Function to set the theme based on user preference
function setTheme() {
    const theme = localStorage.getItem('theme') || 'light'; // Default to light theme
    document.body.classList.add(theme + '-theme');
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Call setTheme on page load
setTheme();

// Function to toggle the visibility of the back-to-top link
function toggleBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 200) { // Show the link if scrolled more than 200px
        backToTop.classList.remove('d-none'); // Assuming 'd-none' is the class that hides the element
    } else {
        backToTop.classList.add('d-none'); // Hide the link if scrolled less than or equal to 200px
    }
}

// Event listener for the scroll event
window.addEventListener('scroll', toggleBackToTop);

// Initial call to set the correct visibility state
toggleBackToTop();

// Back-to-top anchor functionality
document.getElementById('back-to-top').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action to stop the page from jumping
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Rotating Text Animation
let words = document.querySelectorAll(".word")
words.forEach(word => {
    let letters = word.textContent.split("")
    word.textContent = ""
    letters.forEach(letter => {
        let span = document.createElement("span")
        span.textContent = letter
        span.className = "letter"
        word.append(span)
    })
})

let currentWordIndex = 0
let maxWordIndex = words.length - 1
words[currentWordIndex].style.opacity = "1"

let rotateText = () => {
    let currentWord = words[currentWordIndex]
    let nextWord =
        currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1]
    // rotate out letters of current word
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out"
        }, i * 80)
    })
    // reveal and rotate in letters of next word
    nextWord.style.opacity = "1"
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind"
        setTimeout(() => {
            letter.className = "letter in"
        }, 340 + i * 80)
    })
    currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1
}

rotateText()
setInterval(rotateText, 4000)

function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var subject = document.getElementById("subject").value; // Get the subject from the form

    // Construct the mailto: link with the subject
    var mailtoLink = "mailto:?subject=" + encodeURIComponent(subject) + "&body=Name: " + encodeURIComponent(name) + "%0D%0AEmail: " + encodeURIComponent(email) + "%0D%0AMessage: " + encodeURIComponent(message);

    // Create a temporary form element
    var tempForm = document.createElement('form');
    tempForm.action = mailtoLink;
    tempForm.method = 'post';
    tempForm.style.display = 'none';
    document.body.appendChild(tempForm);

    // Submit the temporary form
    tempForm.submit();

    // Remove the temporary form from the DOM
    document.body.removeChild(tempForm);
}

// Add an event listener for the form's submit event
document.getElementById('contact-form').addEventListener('submit', validateForm);