document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const message = document.getElementById('inputMessage').value;
    const date = document.getElementById('inputDate').value; // Captura el valor del campo de fecha
    const files = document.getElementById('inputFiles').files;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('date', date);

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
    }

    fetch('send_email.php', {
        method: 'POST',
        body: formData
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
        alert('no se pudo enviar el correo correctamente', {message:error});
    });
});
