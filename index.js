var http  = require('http')
var webSocket = require('ws')


var socketServer = new webSocket.Server({ port: 3000, perMessageDeflate: false})

var streamServer = http.createServer( function(req, res) {
	res.connection.setTimeout(0)
	req.on('data', function(data) {
		socketServer.clients.forEach(function each(client) {
			if(client.readyState === webSocket.OPEN) {
				client.send(data)
			}
		})
	})
}).listen(2000)

console.log('开启websocket服务')
console.log('开启http服务')