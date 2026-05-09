document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault() // Evitar que el formulario se envíe de forma convencional

    // Abrir el modal de confirmación
    const modal = document.getElementById("whatsappModal")
    modal.showModal()
  })

document.getElementById("cancelWspBtn").addEventListener("click", function () {
  const modal = document.getElementById("whatsappModal")
  modal.close()
})

document
  .getElementById("continueWspBtn")
  .addEventListener("click", function () {
    const name = document.getElementById("inputName").value
    const email = document.getElementById("inputEmail").value
    const message = document.getElementById("inputMessage").value
    const date = document.getElementById("inputDate").value // Captura el valor del campo de fecha

    // Número telefónico extraído del pie de página del sitio
    const telefono = "5491147874712"
    const texto = `Hola, mi nombre es ${name}.\nMi email es: ${email}.\nFecha sugerida: ${date}\nNos contactamos para consultar: ${message}`
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(texto)}`

    // Abre la ventana de WhatsApp
    window.open(url, "_blank")

    const modal = document.getElementById("whatsappModal")
    modal.close()
    document.getElementById("contactForm").reset()
  })
