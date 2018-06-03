export default ((wsUrl) => {
    let ws;
    ws = new WebSocket(wsUrl)
    ws.onopen = () => {
console.log('webSocked open ')
     }
     ws.onmessage = m => {
         console.log(m.data)
     }
})('ws://localhost:3000')