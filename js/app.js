const loadPhones = async (phoneName,dataLimite) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
  const res = await fetch(url)
  const data = await res.json()
  displayPhones(data.data ,dataLimite);
}

const displayPhones = (data ,dataLimite) =>{
  const showAllBtn = document.getElementById('showAll');
  if(dataLimite > 9 && data.length > 10){
  data = data.slice(0,10);
  showAllBtn.classList.remove('d-none');
  }
  else{
    showAllBtn.classList.add('d-none');
  }
  const notFound = document.getElementById('not-found');
  if(data.length === 0){
    notFound.classList.remove('d-none');
    toggle(false);
  }
  else{
    notFound.classList.add('d-none');
  }
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  data.forEach(element => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
       <div class="card">
       <img src="${element.image}" class="card-img-top p-5" alt="...">
       <div class="card-body">
         <h5 class="card-title">${element.phone_name}</h5>
         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         <button onclick="details('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#details-modal">Show Details</button>
       </div>
       </div>
    `;
    phonesContainer.appendChild(phoneDiv);
    // spinner stop 
    toggle(false);
  });
}

const processSearch = (dataLimite) => {
  toggle(true);
  const inputFeild = document.getElementById('input-field');
  const inputValue = inputFeild.value;
  loadPhones(inputValue, dataLimite);
}

document.getElementById('search-btn').addEventListener('click', () => {
   processSearch(10);
})

// search on enter key 
document.getElementById('input-field').addEventListener('keyup', (e)=>{
  if(e.key === 'Enter'){
    processSearch(10);
  }
})


function toggle(isTrue){
  const spinner = document.getElementById('spinner-id');
  if(isTrue){
    spinner.classList.remove('d-none');
  }
  else{
    spinner.classList.add('d-none');
  }
}


document.getElementById('showAll-btn').addEventListener('click', ()=>{
  processSearch();
});


const details = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => detailsOnModal(data))
}

const detailsOnModal = data => {
  console.log(data.data)
  const phoneName = document.getElementById('phoneName');
  phoneName.innerText = data.data.name;
  const phoneDetails = document.getElementById('modal-body');
  phoneDetails.innerHTML = `
  <img src="${data.data.image}">
  <h5>Release Date : ${data.data.releaseDate}</h5>
  <p>Brand : ${data.data.brand}</p>
  <p>Storage : ${data.data.mainFeatures.storage}</p>
  `
}

