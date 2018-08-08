var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: 1599398398,
    channelSecret: 'e353e26496414696fb85e8db1c80a562',
    channelAccessToken: 'ZKsloqKahDnLX5D218JXiK6k2k6pRAaKm10bHQiXXQWWbAmQAyDYMcir2gPqbfvCChXsQEWQr4uPphvpcA8J1lOWnMcsB9LlgvurrJIUh74AOGxz2IUzmphHjITT1YK2/PeLGw3vftInfqYZ6qaWdgdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});
