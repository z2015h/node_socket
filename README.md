# node_socket
node和socket.io搭建p2p实时消息发送

文档目录

node_modules -------- 依赖库

public       -------- 静态资源库: html、js、css、img

* views       -------- 页面文件夹
 
* stylesheets -------- 样式文件夹
 
* vendor      -------- 页面依赖库文件夹
 
* javascript  -------- 页面js文件夹
 
* images      -------- 图片文件夹
 
app.js       -------- express配置

socketServer.js ----- socket配置

启动服务

npm run start

说明

本demo里在每个静态页面里写死了个用户，如果是动态用户需自动将静态页面里js的注册当前用户换成动态变量
