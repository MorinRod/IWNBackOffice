/**
 * Created by ranwahle on 19/09/2016.
 */

var easysoap = require('easysoap');


exports.getUnsubscribedMails = function(){
        //http://www.pulseem.co.il/Pulseem/pulseemservices.asmx
        var params = {
            host: 'www.pulseem.co.il',
            path: '/pulseem/pulseemservices.asmx/GetUnsubscribeEmailClients',
            wsdl: '/pulseem/pulseemservices.asmx?wsdl'

        };
        var soapClient = easysoap.createClient(params);

    // soapClient.getAllFunctions()
    //     .then((functionArray) => { console.log(functionArray); })
    //     .catch((err) => { throw new Error(err); });

        var promise =  soapClient.call({
            method: 'GetUnsubscribeEmailClients',
            attributes: { xmlns: 'http://temuri.org'},
            //params: ['1122000']
            //LZ/o3bdUSfuXjUHxeft4RA=='
            //MHDYVJU2MW4mmsw5KTMfAQ==
            params: {password: 'MHDYVJU2MW4mmsw5KTMfAQ==',
                groups: null,
            StartDate: null, EndDate: null}
        });

    promise.catch(function(err){
        console.error(err);
    })

    return promise;

};
