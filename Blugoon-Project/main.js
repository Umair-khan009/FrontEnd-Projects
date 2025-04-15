(function() {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "zdL9J6PKzguNqVe3T",
  });
})();

// ====== Sidebar ======
const navbar = document.querySelector('.navbar');
const sidebarBtn = document.querySelector('.sidebar-icon');
const closeBtn = document.querySelector('.close-btn');

sidebarBtn.addEventListener('click', () => {
    navbar.classList.add('sidebar');
});

closeBtn.addEventListener('click', () => {
    navbar.classList.remove('sidebar');
});

// ====== Gallery images filtering ======
const allElement = document.querySelector('.all-images');
const prettyElement = document.querySelector('.pretty-images');
const sexyElement = document.querySelector('.sexy-images');
const beachElement = document.querySelector('.beach-images');
const allImages = document.querySelectorAll('.image');

allElement.addEventListener('click', () => filterImages('all'));
prettyElement.addEventListener('click', () => filterImages('pretty'));
sexyElement.addEventListener('click', () => filterImages('sexy'));
beachElement.addEventListener('click', () => filterImages('beach'));

const filterImages = (className) => {
    allImages.forEach((image) => {
        if (!image.classList.contains(className) && className !== 'all') {
            image.classList.add('hide');
        } else {
            image.classList.remove('hide');
        }
    });
};

// ====== EmailJS ======
const form = document.querySelector('.form');
const inputName = document.querySelector('.name');
const inputEmail = document.querySelector('.email');
const subject = document.querySelector('.subject');
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
});

function sendForm() {
    const parameters = {
        from_name: inputName.value,  // Make sure this matches your EmailJS template variables
        from_email: inputEmail.value,
        subject: subject.value,
        message: message.value
    };

    console.log("Sending email with parameters:", parameters); // Debugging

    emailjs.send('service_2tsvv9j', 'template_nusksb2', parameters, 'zdL9J6PKzguNqVe3T')
        .then(() => {
            alert('Email submitted successfully!');
        })
        .catch((error) => {
            alert('Failed to send email. Please try again.');
            console.error("EmailJS Error:", error);
        });
}
