var request = require('request');
var MD5 = require('md5');
//公司的网络有代理才需要该代码，否则请取消
var HttpsProxyAgent = require('https-proxy-agent');

//执行的AML语句
var requestAML = '<AML><Item type="Garment" action="get"><Relationships><Item type="Garment Style Contains Option" action="get"><related_id><Item type="Garment Style Option" action="get"><cn_plu>11161006525</cn_plu><colorway><Item type="Colorway" action="get"></Item></colorway></Item></related_id></Item></Relationships></Item></AML>';

//命令空间，调用方法，编码方式
var nameSpace = "http://www.aras-corp.com/";
var remoteMethod = "ApplyAML";
var characterEncoding = "UTF-8";
//SOAP主体信息
var SOAPmessage = "<SOAP-ENV:Envelope xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/' encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'><SOAP-ENV:Body><" + remoteMethod + " xmlns:m='" + nameSpace + "'>" + requestAML + "</" + remoteMethod + "></SOAP-ENV:Body></SOAP-ENV:Envelope>";

//SOAP地址
var url = 'http://getazdevnt002.chinacloudapp.cn/InnovatorTestServer/Server/InnovatorServer.aspx';

var requestOpetion = {
    agent: new HttpsProxyAgent('http://192.168.27.4:8083'),//公司的网络有代理才需要该代码，否则请取消
    method: 'POST',
    headers: {
        'Content-Length': Buffer.byteLength(SOAPmessage),
        'Content-Type': 'text/xml; charset=' + characterEncoding + '\'',
        'SOAPAction': 'ApplyAML',

        'AUTHUSER': 'admin',//登陆的用户名
        'AUTHPASSWORD': MD5('innovator'),//登陆口令
        'DATABASE': 'Esquel_PLM'//连接的DB
    },
    body: SOAPmessage
}
request(url, requestOpetion, function (err, response, body) {
    console.log('error:', err); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Prin
})