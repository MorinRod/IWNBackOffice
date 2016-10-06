/**
 * Created by ranwahle on 05/10/2016.
 */
exports.sendMail = function(mailRequest, callback){

    const url = 'http://pulseemrestservice20161005121445.azurewebsites.net/api/pulseem';

    var http = require('http');
    var json_data = JSON.stringify(mailRequest);
    const options = {
      host:  'pulseemrestservice20161005121445.azurewebsites.net',
        path: '/api/pulseem/SendMail',
        method: 'POST',
        headers: {'content-type': 'application/json',
        'content-length' : Buffer.byteLength(json_data)}

    };

    var post_request = http.request(options, res =>{
        res.setEncoding('utf8');
        res.on('data', data => callback(data));
    });

    post_request.write(json_data);
    post_request.end();

};