$(function(){
	var input=$('#input')
	console.log(window.location.hostname)
	var socket=io.connect(window.location.hostname);
	socket.on('connect',function(){
		console.log('-----------')
		$('#content').append('<li>连接中...</li>')
	});

	socket.on('login',function(data){
		var content='<li>'+data+',欢迎您</li>'
		$('#content').append(content)
	});
	socket.on('emitMes',function(data){
		var content='<li>'+data.time+" "+'我说: '+data.text;
		$('#content').append(content)
	});
	socket.on('otherlogin',function(data){
		var content='<li>'+data.time+" "+data.name+'进入聊天</li>';
		$('#content').append(content)
	});
	socket.on('notice',function(data){
		var content='<li>'+data.time+" "+data.name+'说: '+data.text;
		$('#content').append(content)

	});
	socket.on('loginout',function(data){
		console.log(data)
		var content='<li>'+data.time+" "+data.name+'退出聊天</li>';
		console.log('--------------')
		$('#content').append(content)
	});
	input.keypress(function(e) {
		/* Act on the event */
		if(e.keyCode=='13'){
			var value=$('#input').val()
			socket.emit('message',value);
			$('#input').val('')
		}
	});
})

