<?php
header('Content-Type: application/json');

// Simulando um banco de dados com CPFs cadastrados
$cpfCadastrados = ['12345678901', '98765432109'];

$data = json_decode(file_get_contents('php://input'), true);

if (in_array($data['cpf'], $cpfCadastrados)) {
    echo json_encode(['cadastrado' => true]);
} else {
    echo json_encode(['cadastrado' => false]);
}
?>
