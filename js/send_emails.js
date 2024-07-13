document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const message = document.getElementById('inputMessage').value;
    const date = document.getElementById('inputDate').value; // Captura el valor del campo de fecha

    fetch('send_email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}&date=${encodeURIComponent(date)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            var successToast = new bootstrap.Toast(document.getElementById('successToast'));
            successToast.show();
            document.getElementById('contactForm').reset();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
