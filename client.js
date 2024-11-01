const socket = new WebSocket("ws://localhost:8080")

socket.onopen = () => {
    console.log('entrei no onopen')
}
socket.onmessage = (msg) => {
    const aMen = JSON.parse(msg.data);
    const loginDiv = document.querySelector(".login");
    const chatDiv = document.getElementById("chat");
    if(aMen.value == 1){
        const aDiv = document.getElementById('aDiv')
        aDiv.innerHTML = ``
        chatDiv.style.display = "flex";
        
        aMen.list.forEach(element => {
            const txt = document.createElement('p')
            txt.textContent = element
            console.log(element);
            console.log(aMen.list);

            loginDiv.style.display = "none";
            
            
        
            aDiv.innerHTML += `
            <div class="user">
                        <img class='img' src="user.jpg" alt="user">
                        <p>${txt.textContent}</p>
                    </div>`
                });
    }
    console.log({aMen});
    if(aMen.value == 2 || aMen.value==3){
        
        const oChat = document.getElementById('oChat')         
           
        oChat.innerHTML +=`
            <p>${aMen.message}</p>
        `
        console.log('passou');
        
    }
    if (aMen.value === 4) {
        const oChat = document.getElementById('oChat');
        const typingMessage = document.getElementById(`typing-${aMen.user}`);
        
        if (!typingMessage) {
            oChat.innerHTML += `<p id="typing-${aMen.user}">${aMen.user} is typing...</p>`;
        }
        
        setTimeout(() => {
            const typingElement = document.getElementById(`typing-${aMen.user}`);
            if (typingElement) typingElement.remove();
        }, 3000);
    }
            
}

let owner = ''
const enviaMensagem = (type) => {
    if(type == 1){
    const loginDiv = document.getElementsByClassName('login')
    const btnLogin = document.getElementById('btnLogin')

    const oIntupTexto = document.getElementById('oInput')
    const vInput = oIntupTexto.value
    owner = vInput
    if(vInput ==null){
        loginDiv.innerHTML += `
         <p>Nome de usuário obrigatório</p>
        `
    }
    
    socket.send(JSON.stringify({message: vInput, value: type}))
    
    oIntupTexto.value = ""
    }
    if( type == 2){
        const msg = document.getElementById('theMsg')
        const theMsg = msg.value
        

        socket.send(JSON.stringify({message: owner + ' : ' + theMsg, value: type}))

        msg.value = ""
    }
    if (type == 3) {
        const msg = document.getElementById('theMsg')
        const theMsg = msg.value
        const stringParts = theMsg.split(' ')
        console.log('owner', owner);
        
        const data = stringParts.concat()
        data.shift()
        data.shift()
        const message = data.join(' ')
        

        socket.send(JSON.stringify({
            message: owner + ` (somente pra tu ${stringParts[1]}): `  +
            message, 
             value: type, 
             sender: stringParts[1]}))


         msg.value = ""
    }
    if (type == 4){
        const msg = document.getElementById('theMsg')
        const theMsg = msg.value
        socket.send(JSON.stringify({user: owner, value: 4}))
             
    }
}
const checkType = () => {
    const msg = document.getElementById('theMsg')
    const theMsg = msg.value

    theMsg.startsWith('/private')? enviaMensagem(3) : enviaMensagem(2)
}

