document.querySelector("form").addEventListener("submit", check);

let OTP = "1234";

function check(event) {
  event.preventDefault();
  let eOTP = document.querySelector("#otp").value;

  if (eOTP == OTP) {
    alert("Payment Sucessful");
  } else {
    alert("Payment Declined");
  }
}


// ------------------------------------


let login_Username = localStorage.getItem("lname");
console.log(login_Username);

let xname = "";

if (!login_Username) {
  xname = "Login/Register";
} else {
  xname = login_Username;
}

let userlogo = document.querySelector("#adminlogo");

let xlogo = `<img src="./IMAGES/avatar.png" alt="" />`;

if (login_Username === null) {
} else {
  // xlogo=`<img src="./IMAGES/avatar.png" alt="" /> onclick="window.location.href="./HTML/User_Page.html""`
  userlogo.addEventListener("click", () => {
    window.location.href = "./User_Page.html";
  });
}

let logbox = document.querySelector("#logdiv");

logbox.innerHTML = `
  <p onclick="document.getElementById('id01').style.display='block'" >${xname}</p>

`;
