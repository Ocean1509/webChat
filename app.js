const http=require('http');
const express=require('express');
const app=express();
const path=require('path');
const server=http.createServer(app);
const fs=require('fs');
const io=require('socket.io').listen(server);
console.log(__dirname);
console.log(path.join(__dirname,'static'))
app.use(express.static(path.join(__dirname,'static')))
server.listen(process.env.PROT||8080);
//设置日志级别
io.set('log level', 1); 
app.get('/',(req,res)=>{
	res.sendfile(__dirname+'/index.html');
});

//WebSocket连接监听
io.on('connection', function (socket) {
	var client={
		// socket:socket,
		name:false,
		text:'',
		time:''
	}
  	socket.emit('connect');
	socket.on('message',(msg)=>{
		console.log(msg)
		if(!client.name){	
			client.name=msg;
			socket.emit('login',client.name);
			socket.broadcast.emit('otherlogin',{name:client.name,time:getTime()})
		}else{
			client.text=msg;
			client.time=getTime();
			socket.emit('emitMes',client);
			socket.broadcast.emit('notice',client)

		}
	});
	socket.on('disconnect',()=>{
		console.log('--------------')
		socket.broadcast.emit('loginout',{name:client.name,time:getTime()})
	});
});



const getTime=()=>{
	var date=new Date();
	return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}