
let customers = [];


function Customer(fullName, password, dob, gender, orderType, orderOption, imageUrl, phone) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = "";
  this.phone = phone;
}


function renderCustomer(customer) {
  const customerCards = document.getElementById("customerCards");
  
 
  const card = document.createElement("div");
  card.classList.add("customer-card");

 
  const img = document.createElement("img");
  img.src = customer.imageUrl || ""; 
  img.alt = `${customer.fullName || "Unknown Customer"}'s Image`;
  card.appendChild(img);

  
  const details = document.createElement("div");
  details.classList.add("customer-details");

  details.innerHTML = `
    <h3>${customer.fullName || "Unknown Customer"}</h3>
    <p><strong>Password:</strong> ${customer.password || "N/A"}</p>
    <p><strong>Date of Birth :</strong> ${customer.dob || "N/A"}</p>
  `;

  card.appendChild(details);

  
  customerCards.appendChild(card);
}


function handleFormSubmit(event) {
  event.preventDefault(); 

  const form = document.getElementById("orderForm");

  const fullName = form.fullName.value;
  const password = form.password.value;
  const dob = form.dob.value;
  const gender = form.gender.value;
  const phone = form.phone.value;

  
  const orderType = [];
  form.querySelectorAll('input[name="orderType"]:checked').forEach((checkbox) => {
    orderType.push(checkbox.value);
  });

 
  const orderOption = form.querySelector('input[name="orderOption"]:checked').value;

  
  const imageUrl = "";

 
  const newCustomer = new Customer(fullName, password, dob, gender, orderType, orderOption, imageUrl, phone);

  customers.push(newCustomer);

  localStorage.setItem("customers", JSON.stringify(customers));

  
  renderCustomer(newCustomer);


  form.reset();
}


document.addEventListener("DOMContentLoaded", () => {
  const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];


  storedCustomers.forEach((customerData) => {
    const customer = new Customer(
      customerData.fullName,
      customerData.password,
      customerData.dob,
      customerData.gender,
      customerData.orderType,
      customerData.orderOption,
      customerData.imageUrl,
      customerData.phone
    );
    customers.push(customer);
    renderCustomer(customer);
  });
});


document.getElementById("orderForm").addEventListener("submit", handleFormSubmit);
