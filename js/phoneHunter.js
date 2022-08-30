const processSearch = (dataLimite) => {
  toggleSpinner(true);
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  loadData(inputValue , dataLimite);
}

document.getElementById('input-field').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    processSearch(10);
  }
});

const search = () => {
  processSearch(10);
};

const loadData = (phoneName, dataLimite) => {
  fetch(` https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data, dataLimite))
}

const displayPhones = (phones, dataLimite) => {
  const notFound = document.getElementById('not-found');
  if (phones.length === 0) {
    notFound.classList.remove('d-none');
    toggleSpinner(false);
  }
  else {
    notFound.classList.add('d-none');
  }
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  const showAllBtn = document.getElementById('show-all');
  if (dataLimite && phones.length > 9) {
    phones = phones.slice(0, 9);
    showAllBtn.classList.remove('d-none');
  }
  else {
    showAllBtn.classList.add('d-none');
  }
  phones.forEach(phone => {
    const { image, phone_name, slug } = phone;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
     <div class="card h-100">
       <img src="${image}" class="card-img-top p-4" alt="...">
       <div class="card-body">
         <h5 class="card-title">${phone_name}</h5>
         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         <button class="btn btn-success" onclick="details('${slug}')" data-bs-toggle="modal" data-bs-target="#phoneModal">Details</button>
       </div>
     </div>
  `;
    phonesContainer.appendChild(div);
    toggleSpinner(false);
  });
}

const toggleSpinner = isTrue => {
  const spinner = document.getElementById('spinner');
  if (isTrue === true) {
    spinner.classList.remove('d-none');
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    const showAllBtn = document.getElementById('show-all');
    showAllBtn.classList.add('d-none');
  }
  else {
    spinner.classList.add('d-none');
  }
};

const showAll = () => {
  processSearch();
}

// show details 
const details = id => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  .then(res => res.json())
  .then(data => displayPhoneDetails(data.data))
};

const displayPhoneDetails = phone => {
    const {brand, image, name, releaseDate} = phone;
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = brand;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
       <div class="card">
         <img src="${image}" class="card-img-top p-5 img-fluid" alt="...">
         <div class="card-body">
           <h5 class="card-title">${name}</h5>
           <p class="card-text">Features:</p>
           <p class="card-text">Chip Set : ${phone.mainFeatures.chipSet}</p>
           <p class="card-text">Display Size : ${phone.mainFeatures.displaySize}</p>
           <p class="card-text">Storage : ${phone.mainFeatures.storage}</p>
         </div>
         <div class="card-footer">
           <small class="text-muted">${releaseDate}</small>
         </div>
       </div>
    `;
};