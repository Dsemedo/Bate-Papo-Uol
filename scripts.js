let servidor = "https://mock-api.driven.com.br/api/v6/uol";

let usuario;

inicioChat();

function inicioChat(){
    enviarNome();

}


console.log(inicioChat);

function enviarNome(){
    const usuario = prompt("Digite o seu nome de usuário:");
    const post = axios.post(`${servidor}/participants`, {name: usuario})
    post.then(buscarDados);
    post.catch(reiniciarTudo);
}

console.log(enviarNome);

function buscarDados(){
    const promessa = axios.get(`${servidor}/messages`);
    promessa.then(carregarMsgs);
}


console.log(buscarDados);

function reiniciarTudo(){
    window.location.reload()
}


console.log(reiniciarTudo);

function continuarOnline(){
    axios.post(`${servidor}/status`, {name: usuario});
}


console.log(continuarOnline);

function carregarMsgs(resposta){
    console.log(resposta.data);
    let msgTamanho = resposta.data.length;
    for(let i=0; msgTamanho > i; i++){
        const from = (resposta.data[i].from);
        const text = (resposta.data[i].text);
        const time = (resposta.data[i].time);
        const to = (resposta.data[i].to);
        let type = (resposta.data[i].type);
       
        let adicionarMsg = document.querySelector(".conteudo")
        if (type == "status"){
            adicionarMsg.innerHTML += `
            <div class="mensagens status">
            <span class= "horario">
            (${time})
            </span>
                    <div class="texto">
                    <strong>
                    ${from}
                    </strong>
                    <span>
                    ${text}
                    </span>
                    </div>
            </div>`     
        } else if (type == "message"){
            
            adicionarMsg.innerHTML += `
            <div class="mensagens todos">
            <span class= "horario">
            (${time})
            </span>
                    <div class="texto">
                    <span>
                    <strong>${from}</strong> para ${to} ${text}
                    </span>
                    </div>
                </div>  ` 
        }else if (type == "private_message") {
            
            adicionarMsg.innerHTML += `
            <div class="mensagens private">
                    <span class= "horario">
                    (${time})
                    </span>
                    <div class="texto">
                    <span>
                    <strong>${from}</strong> para ${to} ${text}
                    </span>
                    </div>
                </div>  ` 
        }
    }
}

console.log(carregarMsgs)

function enviarMsg(){
    const input = document.querySelector(".input-msg").value;
    const msg = {
        from: usuario,
        to: "Todos",
        text: input,
        type: "message"
    }
    if (msg){

        document.querySelector(".input-msg").value = "";
        const promessa = axios.post(`${servidor}/messages`, msg);
        promessa.then(buscarDados);
        promessa.catch(deuRuim);
    }
   
}

function deuRuim(){
    alert("Deu ruim")
}

console.log(enviarMsg);
