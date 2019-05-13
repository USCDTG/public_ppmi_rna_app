//////////////////////////////////////////////////////////////////////////////////
// Copyright David Wesley Craig 2018, University of Southern California
//////////////////////////////////////////////////////////////////////////////////
const express  = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const path = require('path');
const bodyParser   = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
var debug = require('debug')('ripple:server');
const app      = express();
require('dotenv').config();
var port = normalizePort(process.env.API_PORT || '3000');

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ALLOW CORS (Modify as appropriate)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

//////////////////////////////////////////////////////////////////////////////////
// API JSON Routes

    var GeneposConn=mongoose.createConnection('mongodb://localhost:'  + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB);
    var GenePosSchema = mongoose.Schema({chr:String,first_pos:Number,last_pos:Number},{collection: "gene"});
    var GeneposModel = GeneposConn.model("gene", GenePosSchema);
    function GeneposRestFunc(req, res) {
        var chr=req.params.chr;
        var first_pos=Math.round(req.params.first_pos);
        var last_pos=Math.round(req.params.last_pos);
        GeneposModel.find({"$and": [ { "g_first_pos": { "$gte": first_pos } }, { "g_last_pos": { "$lte": last_pos } }]}, function(err, pos) {
            if (err) { console.log ("error");res.json({})}           
            if (pos) {
                var count = Object.keys(pos).length;
                res.json({genepos:encodeURI(LZString.compressToBase64(JSON.stringify(pos)))});  
            }
        }).limit(500).select({ "_id":0,"gene": 1, "start_pos": 1,"last_pos": 1,"transcripts":1,"PHI":1,"GDI":1,"biotype":1,"first_pos":1,"last_pos":1,"reads":1,"chr":1,"dir":1,"end_pos":1,"start_pos":1});
    }; 
    app.get(process.env.GLOBAL_PUBLIC_API+'/genePos/first_pos/:first_pos/last_pos/:last_pos',GeneposRestFunc); // Public
    // private  Server
    var GenePublicConn=mongoose.createConnection('mongodb://localhost:' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB);
    var GenePublicSchema = mongoose.Schema({},{collection: 'gene_summary' });
    var PublicGeneModel = GenePublicConn.model('gene_detail', GenePublicSchema);
    function PublicGeneFunc(req, res) {
        var mygene=req.params.gene;
        PublicGeneModel.findOne({'gene':req.params.gene}, function(err, gene) {
            if (err) { console.log ("error");res.json({})}           
            if (gene) {
                res.json({gene:encodeURI(LZString.compressToBase64(JSON.stringify(gene)))});     
            } else (res.json({}))                
        }).select({ "_id":0});
    }; 
    app.get(process.env.GLOBAL_PUBLIC_API+'/gene/:gene', PublicGeneFunc); 
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// Server
    app.use(compression()); 
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public',express.static(path.join(__dirname, 'public')));
    app.set('port', port);
    var server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    console.log('ITG RESTful API server started on: ' + port);

    /** Event listeners for HTTP  */
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    function normalizePort(val) {
      var port = parseInt(val, 10);
      if (isNaN(port)) { return val;}
      if (port >= 0) {return port;}
      return false;
    }

    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      debug('Listening on ' + bind);
    }
//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
// JWT  Example
    // JWT via Auth0
    //if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    //  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
    //}
    //app.use(cors());
    //const checkJwt = jwt({
    //  secret: jwksRsa.expressJwtSecret({
    //    cache: true,
    //    rateLimit: true,
    //    jwksRequestsPerMinute: 5,
    //    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    //  }),
    //  audience: process.env.AUTH0_AUDIENCE,
    //  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    //  algorithms: ['RS256']
    //});
//////////////////////////////////////////////////////////////////////////////////
