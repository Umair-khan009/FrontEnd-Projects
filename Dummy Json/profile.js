async function getUser(){
  let id=sessionStorage.getItem('userId')
  try{
    let response= await fetch(`https://dummyjson.com/users/${id}`)
    let user= await response.json();
    // console.user
    let userHtml=`
  <div class="card">
        <h1 class="name">${user.firstName} ${user.lastName}</h1>
        <p class="title">${user.role}</p>
        <div class="email">
            ${user.email}
        </div>

        <div class="info-container">
            <div class="info-item">
                <span class="info-label">Phone</span>
                <span class="info-value">${user.phone}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Age</span>
                <span class="info-value">${user.age}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Gender</span>
                <span class="info-value">${user.gender}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Blood Group</span>
                <span class="info-value">${user.bloodGroup}</span>
            </div>
        </div>
        <div class="yellow-accent"></div>
    </div>
  `;
  document.body.innerHTML=userHtml
  }
  catch(error){
    console.log('Error Fetching user:', error)
  }
  
}
getUser()
