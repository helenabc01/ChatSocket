# Atividade de WebSocket 

Entregas obrigatórias:
- **Histórico** : Modifique o servidor para que o histórico de mensagens não seja perdido quando o servidor for
reiniciado.
- **Mensagens Privadas**: Adicione suporte para envio de mensagens privadas. Os usuários devem poder enviar
mensagens apenas para um destinatário específico, utilizando o comando /private nomeDoUsuario
mensagem. A mensagem privada não deve ser vista por outros clientes.
- **Lista de usuários**: Implemente uma funcionalidade que exiba uma lista de todos os usuários atualmente
conectados ao chat, atualizando essa lista em tempo real. A lista deve ser exibida no cliente e ser atualizada
quando novos usuários entrarem ou saírem do chat
- **Notificações**: Adicione uma funcionalidade que notifique os usuários quando alguém estiver digitando uma
mensagem. Quando um cliente começar a digitar no campo de entrada, os outros usuários devem receber
uma notificação de "Usuário X está digitando...".

### O que é websocket?
WebSocket é um protocolo de comunicação que permite a troca de dados em tempo real entre cliente e servidor por meio de uma conexão contínua

### Quando usar?
WebSocket é usado em aplicações de comunicação em tempo real (onde é fundamental que mensagens sejam enviadas e recebidas de maneira imediata)
- **Chats**: permitindo que as mensagens sejam enviadas
e recebidas de forma imediata, sem a necessidade
de múltiplas requisições HTTP.
- **Jogos Multiplayer Online**: permitem que o servidor
envie atualizações instantâneas para todos os
jogadores.
- **Notificações em Tempo Real:** plataformas de trading
ou dashboards que monitoram métricas ao vivo, os
WebSockets são úteis para enviar notificações e
atualizações assim que os eventos ocorrem.
