document.addEventListener("DOMContentLoaded"), function() {
    //vai printar no console se funcionou
    console.log("JavaScript arquivo carregado");
    //vai se conectar ao formulário
    const imgFORM = document.getElementById("imgFORM");
    //vai printar qual fomulário foi conectado
    console.log("Form element", imgFORM);

    if(imgFORM){
        //vai printar se o id estiver certo
        console.log("ID DO FORMULÁRIO ENCONTRADO")

        imgFORM.addEventListener("submit", function(enviar){
            console.log("FORMULÁRIO ENVIADO")

            enviar.preventDefault();
            //PC = Palavra-Chave
            let PC = document.getElementById("PC").value.replace("-", "");

            if (PC == true){
                fetch(`banco.php?PC=${PC}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.erro) {
                        document.getElementById("result").innerHTML = "Palavra-Chave Inválida";
                    }
                })
            }
        })
    }
}