document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o JavaScript foi carregado
    console.log("JavaScript arquivo carregado");
    
    // Conecta ao formulário
    const imgFORM = document.getElementById("imgFORM");
    console.log("Form element", imgFORM);

    if(imgFORM){
        console.log("ID DO FORMULÁRIO ENCONTRADO");

        imgFORM.addEventListener("submit", function(enviar){
            console.log("FORMULÁRIO ENVIADO");
            enviar.preventDefault();
            
            // PC = Palavra-Chave
            let PC = document.getElementById("PC").value.trim();
            
            if (PC) {
                console.log("Buscando por:", PC);
                
                fetch(`banco.php?PC=${encodeURIComponent(PC)}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.erro) {
                        document.getElementById("result").innerHTML = `<p style="color: red;">${data.erro}</p>`;
                    } else if (data.URL) {
                        document.getElementById("result").innerHTML =
                        `<img src="${data.URL}" alt="Imagem de ${PC}" class="displayed-image">`;
                    } else {
                        document.getElementById("result").innerHTML = "<p>Nenhuma imagem encontrada.</p>";
                    }
                })
                .catch((error) => {
                    console.error("Erro:", error);
                    document.getElementById("result").innerHTML = "<p>Erro ao buscar imagem. Tente novamente.</p>";
                });
            } else {
                document.getElementById("result").innerHTML = "<p>Por favor, insira uma palavra-chave.</p>";
            }
        });
    }
});