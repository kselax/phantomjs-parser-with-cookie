var webpage=require('webpage');
var fs=require('fs');
var system=require('system');
 
var page=webpage.create();

// ==== SETTINGS =======================================

var url=system.args[1];         //url c которого парсим
var file=system.args[2];        //сохраняется html страница
var file_cook=system.args[3];   //сохраняется cookies
var time_wait=system.args[4];   //время аякса (таймер)

var login="tieo@mail.ru";
var pass="assa11";

/**
* при удаче возвращает success
*/

//=======================================================

phantom.clearCookies();         //очищаем cookies
get_cookies(file_cook, false);  //установка cookies

page.settings.resourceTimeout=15000;    // время ожидания
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0';

page.open(url,function(status){
    if(status==="success"){
        console.log("success");
        page.render('img2.png');
        fs.write(file, page.content,'w');

        setTimeout(function(){
            put_cookies(file_cook);  //сохраняем куки в файл 
            phantom.exit();
        },time_wait);
    }
    else{
        console.log("not success");
        phantom.exit();
    }
});




function put_cookies(path_file){
    /*
    *   функция принимает путь к файл куда сохранятся будут куки
    */

    if(path_file===undefined)
        path_file='cook.txt';

    // console.log('path_file '+path_file);

    // сохраняем куки в массив
    var mass=new Array();
    phantom.cookies.forEach(function(cookie, i) {
        for (var key in cookie) {
            // console.log('[cookie:' + i + '] ' + key + ' = ' + cookie[key]);
            mass[mass.length]=i+' = '+key+' = '+cookie[key];
        }
    });

    // console.log(mass.length);

    var cookie=""; //хранит куки в виде строки
    for(var i=0; i<mass.length; i++){
        // console.log("i= "+mass[i]);
        cookie+=mass[i];
        if(i!=mass.length-1)
            cookie+=' ; ';
    }
    
    fs.write(path_file, cookie,'w');    //запись в файл
}

function get_cookies(path_file, debug){
    /**
    * Функция устанавливает cookies
    * принимает путь к файлу с cookies
    * и принимает page (page=webpage.create();)
    * return void;
    * need :
    * var fs=require('fs');
    * урл для опправки debug и debug true
    * //http://www.html-kit.com/tools/cookietester/
    */

    if(path_file===undefined){
        path_file='cook.txt';
    }

    // если нету файла c cookies то return
    if (!fs.exists(path_file))
        return; 
    
    // читаем файл с cookies
    var cookie1 = fs.read(path_file);
    var mass1=cookie1.split(' ; ');
    if(mass1.length<0)
        return;

    if(debug==true)
        console.log(mass1.length);

    var m_cookies=new Object(); //массив cookies
    m_cookies[Object.keys(m_cookies).length]=new Object();
    for(var i=0,j=0; i<mass1.length; i++){
        var mass3=mass1[i].split(' = ');
        if(mass3[0]==j){
            m_cookies[j][mass3[1]]=mass3[2];
        //    console.log('mass1= i= '+i+' j= '+j+' '+mass1[i]);
        }
        else if(mass3[0]>j){
            j++;    //увеличиваем счетчик
            m_cookies[Object.keys(m_cookies).length]=new Object();
            m_cookies[j][mass3[1]]=mass3[2];
        //    console.log('mass1= i= '+i+' j= '+j+' '+mass1[i]);
        }
    }

    if(debug==true)
        console.log(Object.keys(m_cookies).length);

    // добавляем cookies в файл
    for(var key in m_cookies){
        if(debug==true){
            // console.log("\n"+key+'=>'+m_cookies[key]);
            // m_cookies[key]['name']='TestCookie_Name_201312174009';
            // m_cookies[key]['value']='TestCookie_Value_164009';
            // m_cookies[key]['domain']='www.html-kit.com';
             //m_cookies[key]['domain']='.demo.mtao.biz';
    //      m_cookies[key]['path']='/';
            // m_cookies[key]['httponly']='true';
            // m_cookies[key]['secure']='false';
       //     m_cookies[key]['expires']=(new Date()).getTime() + (1000 * 60 * 60);
            // console.log(key+" "+m_cookies[key]['name']);
            for(var key1 in m_cookies[key])
                console.log(" ----"+key1+'=>'+m_cookies[key][key1]);
        }
        
        phantom.addCookie(m_cookies[key]);
    }
}