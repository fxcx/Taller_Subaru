<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    $date = isset($_POST['date']) ? $_POST['date'] : '';

    // Directorio donde se guardarán los archivos subidos
    $targetDir = "uploads/";

    // Manejo de archivos adjuntos
    $uploadedFiles = [];
    $uploadErrors = [];

    if (!empty($_FILES['files']['name'][0])) {
        // Recorre cada archivo subido
        foreach ($_FILES['files']['name'] as $key => $fileName) {
            $targetFile = $targetDir . basename($fileName);
            $fileType = pathinfo($targetFile, PATHINFO_EXTENSION);

            // Verifica si es un archivo real o una carga falsa
            if (move_uploaded_file($_FILES['files']['tmp_name'][$key], $targetFile)) {
                $uploadedFiles[] = $targetFile;
            } else {
                $uploadErrors[] = $_FILES['files']['name'][$key] . ' no se pudo subir.';
            }
        }
    }

    // Construir el cuerpo del correo
    $to = "info@subaru.com.ar"; // Cambia esto por tu email
    $subject = "Nuevo mensaje de formulario de contacto";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/html; charset=UTF-8";

    $body = "<p>Fecha deseada: " . $date . "</p>" .
            "<p>" . $message . "</p>";

    // Agregar los archivos adjuntos al cuerpo del correo si existen
    if (!empty($uploadedFiles)) {
        foreach ($uploadedFiles as $file) {
            $body .= "<p>Archivo adjunto: <a href='" . $file . "'>" . basename($file) . "</a></p>";
        }
    }

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Correo enviado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>
