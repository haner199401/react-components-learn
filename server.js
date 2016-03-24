/**
 * Created by haner on 16/3/24.
 */
var jsonServer = require('json-server'),
    server = jsonServer.create();

//default setting (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

server.get('/commentlist', function(req, res) {
    var data = [];
    for (var i = 1; i < 10; i++) {
        data.push({ author: 'AjaxData' + i, text: '数据' + i });
    }

    res.json({ msg: 'ok', data: data });
});

server.listen(8088);