const form=document.querySelector('#form');
const userName=document.querySelector('#username');
const password=document.querySelector('#password');

form.addEventListener('submit', (e)=>{
  e.preventDefault()
  login()
})

async function login() {
try {
  await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          username: userName.value,
          password: password.value,
      })
  })
  .then(res =>{
    if(res.ok){
        localStorage.setItem("isLoggedIn", "true");
        window.location.href='index.html'
    }
  })
 }
 catch (error) {
  console.log('Error:', error);
}
}


if(localStorage.getItem('isLoggedIn')){
  window.location.href='index.html'
}



