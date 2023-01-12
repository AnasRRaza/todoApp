//     SCRIPT FOR LOGIN PAGE

function getInput() {
  let textValue = document.getElementById("text").value;
  let emailValue = document.getElementById("email").value;
  localStorage.setItem("Text Value", textValue);
  localStorage.setItem("Email Value", emailValue);
}
let userEmail = document.getElementById("user-email");

userEmail.innerText = localStorage.getItem("Email Value");

function logout() {
  localStorage.clear();
}

//     SCRIPT FOR HOME PAGE
function getAndUpdate() {
  titleEle = document.getElementById("title");
  descriptionEle = document.getElementById("description");
  tit = document.getElementById("title").value;
  des = document.getElementById("description").value;

  if (localStorage.getItem("itemsJson") == null) {
    itemsJsonArray = [];
    itemsJsonArray.push([tit, des]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  } else {
    if (titleEle.value === "" && descriptionEle.value === "") {
      alert("Please enter Title and Description");
    }
    itemsJsonArrayStr = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    itemsJsonArray.push([tit, des]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    titleEle.value = "";
    descriptionEle.value = "";
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemsJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  } else {
    itemsJsonArrayStr = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
  }
  // Display the Table

  let tableBody = document.getElementById("tbody");
  let str = "";
  itemsJsonArray.forEach((element, index) => {
    str += `
        <tr>
            <th>${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button onclick = "deleted(${index})">Delete</button></td>
        </tr>        `;
  });
  tableBody.innerHTML = str;
}

let add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
  console.log("Deleting..", itemIndex);
  itemsJsonArrayStr = localStorage.getItem("itemsJson");
  itemsJsonArray = JSON.parse(itemsJsonArrayStr);
  // Delete the itemIndex element from the array
  itemsJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  update();
}

let clearList = () => {
  if (confirm("Do you really want to clear?"))
    localStorage.removeItem("itemsJson");
  update();
};
