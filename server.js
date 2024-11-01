const WebSocket = require("ws");

//servidor WebSocket na porta 8080
const server = new WebSocket.Server({ port: 8080 });
const oMap = new Map();
const listinhaa = [];
//cliente se conect
server.on("connection", (ws) => {
  console.log("novo cliente conectado!");

  ws.on("message", (msg) => {
    const oMsg = JSON.parse(msg);
    if (oMsg.value == 1) {
      oMap.set(ws, oMsg.message);
      console.log(oMsg.message, "entrou no chat");
      if (oMap.has(ws)) {
        const list = [];
        oMap.forEach((e) => {
          console.log(e);

          list.push(e);
        });
        broadcast(JSON.stringify({ list, value: 1 }));
      }

      listinhaa.map((element) => {
        let targetSocket = null;

        if (element.type == 3) {
          oMap.forEach((username, socket) => {
            console.log(
              { element, username },
              typeof username,
              typeof element.sender,
              element.sender == username,
              ws
            );
            if (username === element.sender && socket == ws) {
              targetSocket = socket;
            }
          });
          console.log({ targetSocket });

          if (!!targetSocket) {
            targetSocket.send(
              JSON.stringify({ message: element.value, value: element.type })
            );
          }
        } else {
          ws.send(
            JSON.stringify({ message: element.value, value: element.type })
          );
        }
      });
    }
    if (oMsg.value == 2) {
      broadcast(JSON.stringify({ message: oMsg.message, value: 2 }));
    }
    if (oMsg.value == 3) {
      console.log({ oMsg });
      sendToUser(
        oMsg.sender,
        JSON.stringify({ message: oMsg.message, value: 3 })
      );
    }
    if (oMsg.value == 4) {
      console.log({ oMsg });
      broadcast(JSON.stringify({ user: oMap.get(ws), value: 4 }));
    }
    if (oMsg.value != 4 && oMsg.value != 1) {
      if (oMsg.value != 3) {
        listinhaa.push({
          //popula lista de histórico das mensagens privadas
          value: oMsg.message,
          type: oMsg.value,
          sender: oMap.get(ws),
        });
      } else {
        listinhaa.push({
          //popula lista de histórico das mensagens públicas
          value: oMsg.message,
          type: oMsg.value,
          sender: oMsg.sender,
        });
      }
    }
  });

  ws.on("close", () => {
    const user = oMap.get(ws);
    if (user) {
      oMap.delete(ws);
      const list = [];
      oMap.forEach((e) => {
        list.push(e);
      });
      broadcast(JSON.stringify({ list, value: 1 }));
    }
  });
});

const broadcast = (msg) => {
  for (const iMap of oMap.keys()) {
    iMap.send(msg);
  }
};
const sendToUser = (targetUser, msg) => {
  let targetSocket = null;

  oMap.forEach((username, socket) => {
    if (username === targetUser) {
      targetSocket = socket;
    }
  });

  if (targetSocket) {
    targetSocket.send(msg);
  } else {
    console.log(`Usuário ${targetUser} não encontrado.`);
  }
};
