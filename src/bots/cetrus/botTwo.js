const Crawler = require("crawler");
const Courses = require('../../models/courses');

function botTwo(urlOriginal, institutesId ){
    let c = new Crawler({
        rateLimit: 2000,
        maxConnections: 1,

        callback : function (error, res, done) {
            let subcategory = [];
            let courseId = 1;

            if(error){
                console.log(error);
            }else{
                let $ = res.$;
                
                $('.box-curso-content').each(function(subcategoryIdx){
                    if($($('.box-curso-content a')[subcategoryIdx]).attr('href').length > 0){
                        const courses = new Courses({
                            'institutesId': institutesId, 'coursesId': courseId,'url' : $($('.box-curso-content a')[subcategoryIdx]).attr('href')
                        });
                        courses.save();

                        courseId++;
                    }
                });

                console.log('BotTwo finished');
            }
            done();
        }
    });

    c.queue(urlOriginal);
}

module.exports = botTwo;