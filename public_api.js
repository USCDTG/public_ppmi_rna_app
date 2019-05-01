//////////////////////////////////////////////////////////////////////////////////
// Copyright David Wesley Craig 2018, University of Southern California
//////////////////////////////////////////////////////////////////////////////////
const express  = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
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
                console.log( count)   
            }
        }).limit(500).select({ "_id":0,"gene": 1, "start_pos": 1,"last_pos": 1,"transcripts":1,"PHI":1,"GDI":1,"biotype":1,"first_pos":1,"last_pos":1,"reads":1,"chr":1,"dir":1,"end_pos":1,"start_pos":1});
    }; 
    app.get(process.env.GLOBAL_PUBLIC_API+'/genePos/first_pos/:first_pos/last_pos/:last_pos',GeneposRestFunc); // Public
    // private  Server
    var GenePublicConn=mongoose.createConnection('mongodb://localhost:' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB);
    var GenePublicSchema = mongoose.Schema({},{collection: 'gene_summary' });
    va = GenePublicConn.model('gene_detail', GenePublicSchema);
    function PrivateGeneFunc(req, res) {
        var mygene=req.params.gene;
        PrivateGeneModel.findOne({'gene':req.params.gene}, function(err, gene) {
            if (err) { console.log ("error");res.json({})}           
            if (gene) {
                console.log('my gene was '+ mygene)
                res.json({gene:encodeURI(LZString.compressToBase64(JSON.stringify(gene)))});     
            } else (res.json({}))                
        }).select({ "_id":0});
    }; 
    app.get(process.env.GLOBAL_PUBLIC_API+'/gene/:gene', PrivateGeneFunc); 
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// Server
    app.use(compression()); 
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
