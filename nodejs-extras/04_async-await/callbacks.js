function enviarEmail(corpo, para,callback){
    setTimeout(() => {

        // ...... Lógica

        var deuErro = false;

        if(deuErro){
            callback(12,"O Envio do e-mail falhou!");
        }else{
            callback(12);
        }
    },2000)
}

console.log("Inicio do envio de e-mail!")

enviarEmail("Oi, seja bem vindo ao Guia","victor@udemy.com", (time, erro) => {
    if(erro == undefined){ // OK
        console.log("TUDO OK!");
        console.log(`Tempo: ${time}s`)
    }else{ // Opa, deu um erro!
        console.log("Ocorreu um erro: " + erro)
    }
});

