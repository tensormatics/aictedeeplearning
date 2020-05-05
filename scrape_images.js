var Scraper = require('images-scraper');
const http = require('http');
const https = require('https');
const fs = require('fs');

const Stream = require('stream').Transform;

const downloadImageToUrl = (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }
      client.request(url, function(response) {                                        
        var data = new Stream();                                                   

        response.on('data', function(chunk) {                                       
          data.push(chunk);                                                         
        });                                                                         

        response.on('end', function() {                                             
          fs.writeFileSync(filename, data.read());                               
        });
        response.on('error', function(err) {                                             
          console.log(err)                              
        });   

    })
};

 
const google = new Scraper({
  puppeteer: {
    headless: false,
  }
});
 
(async () => {
  var label = 'guava'
  const results = await google.scrape(label, 1);
  for(let i=0; i<results.length; i++) {
    console.log('Downloading image'+ i+ "= "+ results[i].url);
    downloadImageToUrl(results[i].url,"file_"+i+ label +"."+results[i].url.split('.').pop())
    }

})();