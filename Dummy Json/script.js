async function getData(){
  try{
    let response= await fetch('https://dummyjson.com/users');
    let data= await response.json();
    let users= await data.users;
    console.log(users)
    let usersHtml='';
    users.forEach((user, index) => {
      usersHtml+=`
      <tr class="user" >
          <td>${index+1}</td>
          <td>${user.firstName}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>
             <a class="details" id="${user.id}" href="profile.html">Details</a>
          </td>
      </tr>
      `;
    });
    document.querySelector('.table-data').innerHTML=usersHtml;
    const detailBtns=document.querySelectorAll('.details');
    detailBtns.forEach(button =>{
      button.addEventListener('click', (e)=>{
        let userId=e.target.id
        sessionStorage.setItem('userId', userId)
      })
    })
  }catch(error){
    console.log('Error', error)
  }
}
getData()



const logoutBtn=document.querySelector('.logout');
logoutBtn.addEventListener('click', ()=>{
  localStorage.removeItem('isLoggedIn')
  window.location.href='/login.html'
})



