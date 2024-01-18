/*setTimeout(() => {
    console.log("Diego")
},2000)*/

function enviarEmail(para, corpo, callback) {
    setTimeout(() => {
        console.log(`
        Para: ${para}
        -------------------------
        ${corpo}
        -------------------------
        De: Diego Max
        `)
        callback("OK", 5, "8s")
    },8000)
}

console.log("Inicio do envio do e-mail!")
enviarEmail("diego@email.com", "Esse é o corpo do email", (status, amount, time) => {
    console.log(`
    Status: ${status}
    Contatos: ${amount}
    Tempo de envio: ${time}
    `)
    console.log("Tudo OK!")
})
