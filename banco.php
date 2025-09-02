<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Verifica se a palavra-chave foi fornecida
if (!isset($_GET['PC']) || empty(trim($_GET['PC']))) {
    echo json_encode(['erro' => 'Palavra-chave não fornecida']);
    exit;
}

$keyword = trim($_GET['PC']);

// SUA CHAVE DE ACESSO DA UNSPLASH AQUI
// Você precisa se registrar em https://unsplash.com/developers
// e obter uma chave de acesso
$accessKey = '2czgJbifNIvGj2Em_Zsx7Og8RUQzb0aY1nWQV2I_Ksc';

// URL da API do Unsplash para buscar imagens
$url = "https://api.unsplash.com/search/photos?query=" . urlencode($keyword) . "&per_page=1";

// Configuração da requisição cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Client-ID ' . $accessKey,
    'Accept-Version: v1'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(['erro' => 'Erro ao conectar com a API do Unsplash']);
    exit;
}

$data = json_decode($response, true);

// Verifica se encontrou resultados
if (isset($data['results']) && count($data['results']) > 0) {
    $firstImage = $data['results'][0];
    $imageUrl = $firstImage['urls']['regular']; // Usa a versão regular da imagem
    
    echo json_encode([
        'URL' => $imageUrl,
        'keyword' => $keyword,
        'description' => isset($firstImage['description']) ? $firstImage['description'] : 'Sem descrição',
        'photographer' => $firstImage['user']['name']
    ]);
} else {
    echo json_encode(['erro' => 'Nenhuma imagem encontrada para: ' . $keyword]);
}
?>