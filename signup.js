const email = document.getElementById("email");
const password = document.getElementById("password");
const password_check = document.getElementById("confirm-password");
const sub_button = document.getElementById("submit");
// let allLogin;
// fetch("login.json")
//   .then((response) => response.json())
//   .then((products) => {
//     allLogin = products; // Store the fetched products for search // Display all products initially
//   });
sub_button.addEventListener("click", () => {
  //   const q = allLogin.find((p) => {
  //     p.email == email.value;
  //   });
  if (password.value == password_check.value) {
    fetch(`http://127.0.0.1:3000/signup?+${email.value}+${password.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("the passords doesn't match");
  }
});
