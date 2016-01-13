var http = require('http');
var url = require('url');
var express = require('express');
var redis = require("redis");
var bodyParser = require('body-parser');
var app = express();

/*
    初始化redis，并挂载到global方便使用
 */

var options = {
    appid:        		 "wxaf10f0eb014eed98",
    appsecret:    		 "648b4b1bbcb20bfe3872664c1a03edb8",
    token:         		 "ROMENS",
    encrypt_key:   		 "QdSnqNxl288HRjy3hl110sQdYrRjKjYxGsRomensJsb",
}

var wxs = require('weixin-service')(options);

global.redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});
redisClient.select(2);
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

app.use(bodyParser.urlencoded({extended: true}));



//app.get('/wechat/notice', wxs.enable());
app.post('/msg/wxpush', wxs.noticeHandle(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('sucess');
    res.end();
}));

//app.get('/wechat/:appid/event', wxs.enable());
//app.post('/wechat/:appid/event', wxs.eventHandle(eventHandle))



app.use(function(err, req, res) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write('服务器繁忙！');
    res.end();
});


console.log('wxfrontier is running on 9099');
http.createServer(app).listen(9099);



