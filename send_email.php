<?php
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
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
    $subject = "Nuevo mensaje de formulario de contacto web";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/html; charset=UTF-8";

    $body = "<html><body style='font-family: Arial, sans-serif;'>";
    $body .= "<h2 style='color: #0066cc;'>Nuevo mensaje de formulario web</h2>";
    $body .= "<p><strong style='color: #333;'>Nombre:</strong> " . $name . "</p>";
    $body .= "<p><strong style='color: #375ccb;'>Correo electrónico:</strong> " . $email . "</p>";
    $body .= "<p><strong style='color: #151616;'>Fecha de reunion deseada:</strong> " . $date . "</p>";
    $body .= "<p><strong style='color: #333;'>Mensaje:</strong></p>";
    $body .= "<p style='margin-left: 20px;'>" . nl2br($message) . "</p>";
    $body .= "</body></html>";


    // Agregar los archivos adjuntos al cuerpo del correo si existen
    if (!empty($uploadedFiles)) {
        foreach ($uploadedFiles as $file) {
            $body .= "<p>Archivo adjunto: <a href='" . $file . "'>" . basename($file) . "</a></p>";
        }
    }

    // Intentar enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Correo enviado correctamente."]);
    } else {
        // Capturar el mensaje de error específico
        $error_message = error_get_last()['message'];
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo: " . $error_message]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>
