const email = document.getElementById("email");
const password = document.getElementById("password");
const sub_button = document.getElementById("submit");
const Response = document.getElementById("res");

sub_button.addEventListener("click", () => {
  const loginData = {
    email: email.value,
    password: password.value,
  };
  fetch(`http://127.0.0.1:3000/login?+${email.value}+${password.value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (response.ok) {
        Response.innerText = "sucess";
        window.location.href = "/";
      } else {
        Response.innerText = "failed";
      }

      console.log(response);
    })
    .catch((error) => console.error("Error:", error));
});
