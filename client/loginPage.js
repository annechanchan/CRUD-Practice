console.log('hi');

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    const signInButton = document.createElement("Button");
    body.appendChild(signInButton);
    signInButton.innerText = "Sign In";

    function handleSubmit() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log('Username: ', username, 'Password: ', password)

        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('Data: ', data)

            })
            .catch((err) => console.log('POST REQUEST ERROR: ', err));
    }


    signInButton.addEventListener('click', handleSubmit);


});

console.log('hi');