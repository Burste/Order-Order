var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: 1599398398,
    channelSecret: 'e353e26496414696fb85e8db1c80a562',
    channelAccessToken: 'ZKsloqKahDnLX5D218JXiK6k2k6pRAaKm10bHQiXXQWWbAmQAyDYMcir2gPqbfvCChXsQEWQr4uPphvpcA8J1lOWnMcsB9LlgvurrJIUh74AOGxz2IUzmphHjITT1YK2/PeLGw3vftInfqYZ6qaWdgdB04t89/1O/w1cDnyilFU='
});

var orderStatus = false;
var orderList = [];

const commandList = {
    "start": "------ 開始點餐 ------\n ex: order Felix 芒果冰沙 無糖去冰",
    "end": "------ 點餐結束 ------",
    "list": "------ 點餐明細 ------",
    "help": "------ 指令列表 ------\n order start //開始點餐\n order end //點餐結束\n order list //列出點餐明細"
};

bot.on('message', function(event) {
    // console.log(event); //把收到訊息的 event 印出來看看
    var replyMsg = "";
    var msg = "";
    if(event.message.type = 'text') {
        if(event.message.text.includes("order")) {
            msg = event.message.text.split(" ");
        }
        if(msg[0] === "order") {
            if(commandList.hasOwnProperty(msg[1])) {
                switch(msg[1]) {
                    case "start":
                        if(!orderStatus) {
                            replyMsg = commandList[msg[1]];
                        }
                        orderStatus = true;
                        break;
                    case "end":
                        if(orderStatus) {
                            replyMsg += commandList[msg[1]]+"\n";
                            for(var i=0;i<orderList.length;i++) {
                                replyMsg += orderList[i]+"\n";
                            }
                        }
                        orderStatus = false;
                        orderList = [];
                        break;
                    case "list":
                        if(orderStatus) {
                            console.log(orderList);
                            replyMsg += commandList[msg[1]]+"\n";
                            for(var i=0;i<orderList.length;i++) {
                                replyMsg += orderList[i]+"\n";
                            }
                        }
                        break;
                    default:
                        replyMsg = commandList[msg[1]];
                }
            }else{
                if(orderStatus) {
                    console.log(`${msg[1]} ${msg[2]} ${msg[3] ? msg[3] : ""}`);
                    orderList.push(`${msg[1]} ${msg[2]} ${msg[3] ? msg[3] : ""}`);
                    replyMsg = msg[1]+" Order Done";
                }
            }
        }
    }
    event.reply(replyMsg).then(function(data) {
        // success
        console.log(replyMsg);
    }).catch(function(error) {
        // error
        console.log('error');
    });
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});
