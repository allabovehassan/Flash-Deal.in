document.querySelector("#form").addEventListener("submit", check);

let card = "1234567890";
let cvv = "123";
let expiry = "122020";

function check(event) {
  event.preventDefault();

  let ecard = document.querySelector("#card").value;
  let ecvv = document.querySelector("#cvv").value;
  let eexpiry = document.querySelector("#expiry").value;

  if (ecard == card && ecvv == cvv && eexpiry == expiry) {
    let button = document.createElement("button");
    button.innerText = "OTP";
    button.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "../HTML/otp.html";
    });

    document.querySelector("#container").append(button);
  } else {
    alert("Invalid Credentials");
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



