const Crawler = require("crawler");
const Institutes = require('../../models/Institutes');
const fs = require('fs');

function botOne(urlOriginal, nameInstitute){
    let c = new Crawler({
        rateLimit: 2000,
        maxConnections: 1,

        callback : function (error, res, done) {
            let objectCourse = [];
            let contador = 1;

            if(error){
                console.log(error);
            }else{
                let $ = res.$;

                $('#print-area a').each(function(idx){
                    objectCourse.push({ 'institutesId' : contador, name: nameInstitute, course: $(this).text().trim(), OriginalURL : urlOriginal, url: $(this).attr('href').trim() });
                    const institutes = new Institutes({ 'institutesId' : contador, name: nameInstitute, course: $(this).text().trim(), url: $(this).attr('href').trim() });
                    institutes.save();
                    contador++;
                });

                console.log('BotOne finished');
            }
            done();
        }
    });

    c.queue(urlOriginal);
}

module.exports = botOne;