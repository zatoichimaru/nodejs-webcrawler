const Crawler = require("crawler");
const Contents = require('../../models/contents');

function botTwo(urlOriginal, institutesId, coursesId, urlCourses){
    let c = new Crawler({
        rateLimit: 2000,
        maxConnections: 1,

        callback : function (error, res, done) {

            if(error){
                console.log(error);
            }else{
                let $ = res.$;
                
                let title = $('.topo-conteudo-curso h1').text().trim();

                if($('#print-area div div div div table')){
                    $('#print-area div div div div table').remove();
                }

                if($('#coordenadores')){
                    $('#coordenadores').remove();
                }
                
                let content = $('#print-area div div div div').text().trim().replace(/<[^>]*>/g, '');
                let information = !$('#tabinformacoes div div div') ? '' : $('#tabinformacoes div div div').text().trim().replace(/<[^>]*>/g, '');
                let programation = !$('#tabprogramacao div div div') ? '' : $('#tabprogramacao div div div').text().trim().replace(/<[^>]*>/g, '');

                let workload = !$('.descricao_curso_interna p').eq(0) ? '' : $('.descricao_curso_interna p').eq(0).text().trim(); //carga horaria
                let accessTime = !$('.descricao_curso_interna p').eq(1)? '' : $('.descricao_curso_interna p').eq(1).text().trim(); //Tempo de acesso
                let indicatedFor = !$('.descricao_curso_interna p').eq(2) ? '' :$('.descricao_curso_interna p').eq(2).text().trim(); //indicado por
                let coordinator = !$('.descricao_curso_interna p').eq(3) ? '' : $('.descricao_curso_interna p').eq(3).text().trim(); //coordenador

                if($('.descricao_curso_interna p a')){
                    $('.descricao_curso_interna p a').eq(4).removeAttr('href');
                }

                let specialGuests = !$('.descricao_curso_interna p').eq(4) ? '' : $('.descricao_curso_interna p').eq(4).text().trim(); //convodado especial
                let paymentInstallments = !$('.valor-ead-parcela') ? '' : $('.valor-ead-parcela').text().trim(); //bandeiras pagamento
                let paymentFlag = !$('.descricao_curso_interna p img') ? '' : $('.descricao_curso_interna p img').eq(10).attr('alt'); //bandeiras pagamento
                let price = !$('.valor-ead-avista') ? '' : $('.valor-ead-avista').text(); //preço

                let splitLocation = $('.footer div div div p').eq(0).text().trim().split('-');
                let splitState = splitLocation[2].trim().split(' ');

                let state = splitState[0].trim().substr(0,1) + "" + splitState[1].trim().substr(0,1);
                let street = splitLocation[0].trim();
                let district = splitLocation[1].trim();
                let city = splitLocation[2].trim();
                let zipCode = splitLocation[3].replace(/[^0-9]/g,'') + "" + splitLocation[4].replace(/[^0-9]/g,'');
    
                const contents = new Contents({
                    'institutesId':institutesId,
                    'coursesId': coursesId,
                    'title': title, 
                    'url': urlCourses,
                    'content': content + '<br /><br />' + information + '<br /><br />' + programation,
                    'workload' : workload,
                    'accessTime': accessTime, 
                    'indicatedFor': indicatedFor,
                    'coordinator' : coordinator,
                    'specialGuests': specialGuests, 
                    'paymentInstallments': paymentInstallments,
                    'paymentFlag' : paymentFlag,
                    'price': price, 
                    'city': city,
                    'state' : state,
                    'district' : district,
                    'street' : street,
                    'zipcode' : zipCode
                });

                contents.save();

                console.log('BotTree finished');

            }
            done();
        }
    });

    c.queue(urlOriginal);
}

module.exports = botTwo;