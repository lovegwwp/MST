
// -------------------------------------------练习方案btn按钮
$('.xlfa-btn').click(function () {
    $('.xl-main').show().siblings().hide();
    $('.xl-content').eq(2).show().siblings().hide();
});
//测评按钮
$('.xl-cepingBtn').click(function () {
    $('.pc-contentList').show().siblings().hide();
});


//  评测翻页按钮
$('.pc-goDown').click(function () {
    var numPre=parseInt($('.pc-first-page').html());
    var numNext=parseInt($('.pc-last-page').html());
    $(".pc-goUp").attr('disabled',false);
    if(numPre==numNext-1){
        $(".pc-goDown").attr("disabled",true).addClass('active');
        $('.pc-goUp').removeClass('active');
        $('.pc-first-page').html(numPre+1);
    }else {
        $('.pc-goDown').addClass('active');
        $('.pc-goUp').removeClass('active');
        $('.pc-first-page').html(numPre+1);
    }
    // console.log('点击了')
});
$('.pc-goUp').click(function () {
    var numPre=parseInt($('.pc-first-page').html());
    var numNext=parseInt($('.pc-last-page').html());
    $(".pc-goDown").attr('disabled',false);
    if(numPre==2){
        $(".pc-goUp").attr("disabled",true).addClass('active');
        $('.pc-goDown').removeClass('active');
        $('.pc-first-page').html(numPre-1);
    }else {
        $('.pc-goUp').addClass('active');
        $('.pc-goDown').removeClass('active');
        $('.pc-first-page').html(numPre-1);
    }
    // console.log('点击了')
});
// -------------------------------------------------------进入充值页面
$('.xl-th-chongzhi').click(function () {
    $(".xunlian-contentList").hide();
    $(".grzx-content").show();
    $('.chongzhi-sp').show().siblings().hide();
    $('.grzx-btn').addClass('active-under2');
    $('.xlfa-btn').removeClass('active-under1');
});
$('.xl-sp-chongzhi').click(function () {
    $(".xunlian-contentList").hide();
    $(".grzx-content").show();
    $('.chongzhi-xl').show().siblings().hide();
    $('.grzx-btn').addClass('active-under2');
    $('.xlfa-btn').removeClass('active-under1');
});
// ------------------------------------------------------右上角测评页
$('.small-ceping').click(function () {
    $('.small-ceping').removeClass('active');
    $(this).addClass('active');
    $('.small-pc-main').show().siblings().hide();
    var ele=$(this).parents('.xl-days-one');
    var week=ele.find('.xl-week').html();
    var day=ele.find('.xl-day').html();
    var time=ele.find('.xl-time').html();
    $('.small-pc-main').find('.spc-main-title').html('第'+week+'周'+'第'+day+'天'+'第'+time+'次');
});

// -------------测评页翻页
$('.small-pc-goDown').click(function () {
    var numPre=parseInt($('.small-pc-first-page').html());
    var numNext=parseInt($('.small-pc-last-page').html());
    $(".small-pc-goUp").attr('disabled',false);
    if(numPre==numNext-1){
        $(".small-pc-goDown").attr("disabled",true).addClass('active');
        $('.small-pc-goUp').removeClass('active');
        $('.small-pc-first-page').html(numPre+1);
    }else {
        $('.small-pc-goDown').addClass('active');
        $('.small-pc-goUp').removeClass('active');
        $('.small-pc-first-page').html(numPre+1);
    }
    // console.log('点击了')
});
$('.small-pc-goUp').click(function () {
    var numPre=parseInt($('.small-pc-first-page').html());
    $(".small-pc-goDown").attr('disabled',false);
    if(numPre==2){
        $(".small-pc-goUp").attr("disabled",true).addClass('active');
        $('.small-pc-goDown').removeClass('active');
        $('.small-pc-first-page').html(numPre-1);
    }else {
        $('.small-pc-goUp').addClass('active');
        $('.small-pc-goDown').removeClass('active');
        $('.small-pc-first-page').html(numPre-1);
    }
    // console.log('点击了')
});
var newFaData=[];    //新方案的集合（根据不同医生区别）
var Percentage=[];   //观看时长数组[72,387,244,0,0]
var TypeNum=[];       //一组视频个数[16,20,10,20,13]
var circleArr=[];       //下肢百分比集合
// ----------------------------------------------------------------
function getxllist(obj,xlItem) {
    FaData=obj;
    // console.log(obj);
    for(var t=0;t<obj.length;t++){
        var  data=obj[t].jhList;        //医生类型
        for(var u=0;u<data.length;u++){
            newFaData.push(data[u]);
        }
        // console.log(newFaData);
        var arrTypeList=[];
        for(var r=0;r<data.length;r++){
            arrTypeList.push(data[r].type);
        }
        // console.log(arrTypeList);
        for(var i=0;i<arrTypeList.length;i++){
            for(var j=i+1;j<arrTypeList.length;j++){
                if(arrTypeList[i]===arrTypeList[j]){
                    arrTypeList.splice(j,1);
                    j--;
                }
            }
        }
        //console.log(arrTypeList);  //['上肢','口型','语言']
        var newArr=[];
        var num=arrTypeList.length;
        for(var m=0;m<arrTypeList.length;m++){
            var arr=[];
            newArr.push(arr);
        }
        for(var p=0;p<arrTypeList.length;p++){
            var arr=0;
            Percentage.push(arr);
            for(var n=0;n<data.length;n++){
                if(arrTypeList[p]===data[n].type){
                    if(isNaN(data[n].xlPercent)){
                        data[n].xlPercent= 0
                    }
                    var oldPercent=(data[n].xlPercent)*100;
                    var newPercent=toDecimal(oldPercent);
                    var nemlen=Percentage.length-1;  //Percentage数组的下标（循环过程中在递增）
                    Percentage[nemlen]=parseInt(Percentage[nemlen])+newPercent;  // Percentage数组的[[视频百分比之和],[视频百分比之和]]
                    newArr[p].push(data[n]);     //newArr 记录同一个类型视频的个数 放入数组
                }
            }
        };
        // console.log(Percentage);
        // console.log(newArr);
        for(var h=0;h<newArr.length;h++){
            var len=newArr[h].length;
            TypeNum.push(len);
        }
        // console.log(newArr);
        var _arrTypeList=[];
        for(var u=0;u<arrTypeList.length;u++){
            _arrTypeList.push(arrTypeList[u])
        }
        //_arrTypeList=["01", "03", "04"]
        // console.log(_arrTypeList);
        // console.log(xlItem);
        for(var j=0;j<arrTypeList.length;j++){
            for(var y=0;y<xlItem.length;y++){
                if(arrTypeList[j]==xlItem[y].type){
                    arrTypeList[j]=xlItem[y].name;
                    break;
                }
            }
        }
        //arrTypeList=["上肢", "口型", "眼睛"]
        // console.log(newArr);
        // console.log(arrTypeList)
        if(num>0){
            for(var a=0;a<num;a++){
                var myclone2=$('#xl-one-clone').clone(true);
                myclone2.removeAttr('id');
                myclone2.find('.type-btn').html(arrTypeList[a]);
                myclone2.find('.typeItem').html(_arrTypeList[a]);
                if(newArr[a].length>0&&newArr[a].length<4){
                    var myclone3=$('#three-day').clone(true);
                    myclone3.removeAttr('id');
                    for(b=0;b<newArr[a].length;b++){
                        var myclone4=$('#one-time').clone(true);
                        myclone4.removeAttr('id');
                        myclone4.find('.xl-week').html(newArr[a][b].week);
                        myclone4.find('.xl-day').html(newArr[a][b].day);
                        myclone4.find('.xl-time').html(newArr[a][b].time);
                        myclone4.find('.xl-dID').html(newArr[a][b].dID);
                        myclone4.find('.xl-watchTime').html(newArr[a][b].watchTime);
                        myclone4.find('.xl-type').html(newArr[a][b].item);
                        //观察视频时长转化分秒
                        var theTimeS = parseInt(newArr[a][b].watchTime);// 秒
                        var theTimeM = 0;                             // 分
                        if(theTimeS<=60){
                            myclone4.find('.xl-data').html(theTimeS+'<span class="xl-datafh">"</span>')
                        } else if(theTimeS > 60) {
                            theTimeM = parseInt(theTimeS/60);
                            theTimeS = parseInt(theTimeS%60);
                            myclone4.find('.xl-data').html(theTimeM+"<span class='xl-datafh'>'</span>"+theTimeS+'<span class="xl-datafh">"</span>')
                        }
                        myclone3.append(myclone4);
                    };
                }else {
                    var myclone3=$('#more-three-day').clone(true);
                    myclone3.removeAttr('id');
                    myclone3.children().eq(0).find('.xl-week').html(newArr[a][0].week);
                    myclone3.children().eq(0).find('.xl-day').html(newArr[a][0].day);
                    myclone3.children().eq(0).find('.xl-time').html(newArr[a][0].time);
                    myclone3.children().eq(0).find('.xl-dID').html(newArr[a][0].dID);
                    myclone3.children().eq(0).find('.xl-watchTime').html(newArr[a][0].watchTime);
                    myclone3.children().eq(0).find('.xl-type').html(newArr[a][0].item);
                    //观察视频时长转化分秒
                    var theTimeS = parseInt(newArr[a][0].watchTime);// 秒
                    var theTimeM = 0;                             // 分
                    if(theTimeS<=60){
                        myclone3.children().eq(0).find('.xl-data').html(theTimeS+'<span class="xl-datafh">"</span>');
                    } else if(theTimeS > 60) {
                        theTimeM = parseInt(theTimeS/60);
                        theTimeS = parseInt(theTimeS%60);
                        myclone3.children().eq(0).find('.xl-data').html(theTimeM+"<span class='xl-datafh'>'</span>"+theTimeS+'<span class="xl-datafh">"</span>')
                    }

                    myclone3.children().eq(1).find('.xl-week').html(newArr[a][1].week);
                    myclone3.children().eq(1).find('.xl-day').html(newArr[a][1].day);
                    myclone3.children().eq(1).find('.xl-time').html(newArr[a][1].time);
                    myclone3.children().eq(1).find('.xl-dID').html(newArr[a][1].dID);
                    myclone3.children().eq(1).find('.xl-watchTime').html(newArr[a][1].watchTime);
                    myclone3.children().eq(1).find('.xl-type').html(newArr[a][1].item);
                    var theTimeS = parseInt(newArr[a][1].watchTime);// 秒
                    var theTimeM = 0;                             // 分
                    if(theTimeS<=60){
                        myclone3.children().eq(1).find('.xl-data').html(theTimeS+'<span class="xl-datafh">"</span>');
                    } else if(theTimeS > 60) {
                        theTimeM = parseInt(theTimeS/60);
                        theTimeS = parseInt(theTimeS%60);
                        myclone3.children().eq(1).find('.xl-data').html(theTimeM+"<span class='xl-datafh'>'</span>"+theTimeS+'<span class="xl-datafh">"</span>')
                    }

                    for(var c=2;c<newArr[a].length;c++){
                        var myclone4=$('#one-time').clone(true);
                        myclone4.removeAttr('id');
                        myclone4.find('.xl-week').html(newArr[a][c].week);
                        myclone4.find('.xl-day').html(newArr[a][c].day);
                        myclone4.find('.xl-time').html(newArr[a][c].time);
                        myclone4.find('.xl-dID').html(newArr[a][c].dID);
                        myclone4.find('.xl-watchTime').html(newArr[a][c].watchTime);
                        myclone4.find('.xl-type').html(newArr[a][c].item);

                        //观察视频时长转化分秒
                        var theTimeS = parseInt(newArr[a][c].watchTime); // 秒
                        var theTimeM = 0;                                // 分
                        if(theTimeS<=60){
                            myclone4.find('.xl-data').html(theTimeS+'<span class="xl-datafh">"</span>')
                        } else if(theTimeS > 60) {
                            theTimeM = parseInt(theTimeS/60);
                            theTimeS = parseInt(theTimeS%60);
                            myclone4.find('.xl-data').html(theTimeM+"<span class='xl-datafh'>'</span>"+theTimeS+'<span class="xl-datafh">"</span>')
                        }

                        myclone3.find('.xl-more-list').append(myclone4);
                    }
                    myclone3.find('.xl-more-list').append('<div class="xl-shouqiList"> <button class="xl-shouqi" style="text-align: center">收起 <div class="xl-shouqi-scroll"><img src="./img/up.png"><img src="./img/down.png"></div> </button> </div>')
                }
                myclone2.find('.xl-days-btnList').append(myclone3);
                myclone2.find('.type-btn').html(arrTypeList[a]);
                myclone2.find('.typeItem').html(_arrTypeList[a]);
                $('.xl-content-left').append(myclone2);
            }
            $('.small-ceping').eq(0).addClass('active');
            $('.type-btn').eq(0).addClass('xl-xuanzhong1');
            $('.xl-days-one-btn').eq(0).addClass('xl-xuanzhong2');
        }
    }
    var dateArr=[];
    for(var e=0;e<newFaData.length;e++){
        dateArr.push(newFaData[e].createdAt);
    }
    var maxNum=(Math.max.apply(null, dateArr));  //下载方案时间戳
    var maxNumArr=[maxNum];
    localStorage.setItem('xzfadate', JSON.stringify(maxNumArr));
    console.log('获取到训练方案更改的时间戳'+JSON.parse(localStorage.getItem('xzfadate'))[0]);
    //console.log(Percentage);   //观看时长数组[72,387,244,0,0]
    //console.log(TypeNum);      //一组视频个数[16,20,10,20,13]

    //计算上肢,下肢百分比
    for(var g=0;g<Percentage.length;g++){
        var per=parseInt(Percentage[g]/TypeNum[g]);
        circleArr.push(per);
    }
    var circleLen=$('.circleChart').length;
    // console.log(circleLen)
    for(var p=0;p<circleLen;p++){
        $('.circleChart').eq(p).attr("id",p+'_circle');
    }
    var $ele=$('.xl-content-left').find('.xl-one ');
    var eleLen=$ele.length;
    $ele.hide();
    $ele.eq(0).show();
    $ele.eq(1).show();
    $ele.eq(2).show();
    var a=parseInt(eleLen/3);   //商
    var b=eleLen%3;   //余数
    if(b==0&&a!=0){
        $('.xl-last-page').html(a);
        // console.log('训练方案页码'+a)
    }else {
        $('.xl-last-page').html(a+1);
    }
    if($('.xl-last-page').html()==1){
        $('.xl-goUp').attr('disabled',true);
        $('.xl-goDown').attr('disabled',true);
    };
    
    $('.xl-goUp').attr('disabled',true);
    var hcItem=JSON.parse(localStorage.getItem('gkxlfajl'));
    var typeList=$('.xl-days-one');
    console.log(hcItem);
    if(typeList==null||hcItem==null||hcItem==undefined){

    }else {
        for(var t=0;t<typeList.length;t++){
            if(typeList.eq(t).find('.xl-type').html() == hcItem[1] && typeList.eq(t).find('.xl-dID').html() == hcItem[0]){
                console.log(typeList.eq(t).find('.xl-type').html())
                console.log(hcItem[1]);
                console.log(hcItem[0]);
                $('.xl-days-one-btn').eq(t).addClass('hcys').append('<span class="xlfa-ts">(上次观看到此)</span>');
                break;
            }
        }
    }
    getnewxlfn();//获取是否有新的训练方案需要下载
}
// --------------------------------------------------------环形进度

function cirle(ele,cirleNum1) {
    var bodyFs=parseInt($('body').css('font-size'));
    var cirleFS=2*bodyFs;
    $(ele).find('.circleChartNum').html(cirleNum1+"%");
    $(ele).circleChart({
        size: cirleFS,
        value: cirleNum1,
        color: "#e7c300",
        backgroundColor: "#111d25",
        startAngle: 175
    });
}
function circlefn() {
    // console.log(circleArr);
    for(var t=0;t<circleArr.length;t++){
        if(circleArr[t]==0){
            circleArr[t]=0.1;
        }
    }//将0转化为0.1避免报错
    var cirleStart=setInterval(function () {
        for (var i = 0; i < circleArr.length; i++) {
            var bodyFs = parseInt($('body').css('font-size'));
            var num = bodyFs / 100;
            var wanchengWidth = 1530 * num;
                if (parseInt($('.wancheng').css('width')) > wanchengWidth) {
                    // alert('相同')
                    clearInterval(cirleStart);
                    var num = $('.circleChart').length - 1;
                    for (var t = 0; t < num; t++) {
                        var ele = '#' + t + '_circle';
                        var cirleNum1 = circleArr[t];
                        cirle(ele, cirleNum1);
                    }
                    var $ele=$('.circleChartNum');
                    for(var k=0;k<$ele.length;k++){
                        if($('.circleChartNum').eq(k).html()=='0.1%'){
                            $('.circleChartNum').eq(k).html('0%');
                            // console.log('存在等于0.1%')
                        }
                    }
                }
            }
    },50)
}

//保留小数点后面两位数
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x*100)/100;
    return f;
}

//获取训练方案
function getxlfn(xlItem) {
    // console.log(patId);
    $.ajax({
        url:ajaxStr+'MSTYL/pat/getPatJh.action',
        data:{
            pID :patId
        },
        type:"POST",
        async:false,
        dataType: "json",
        success:function (data) {
            console.log(data);
            if(data.length>0){
                localStorage.setItem('fahc',JSON.stringify(data));
                console.log('请求的训练方案成功');
                getxllist(data,xlItem);
            }else {
                console.log('请求的训练方案没有数据')
            }
        },
        error:function (err) {
            console.log(err);
            //断网缓存训练方案
            var newfahc=JSON.parse(localStorage.getItem('fahc'));
            // console.log(newfahc);
            if(newfahc==null){
                console.log('检测到断网，拿到训练方案缓存，但是为空')
            } else if(newfahc.length>0){
                getxllist(newfahc,xlItem);
                console.log('检测到断网，为你拿到本地训练缓存方案')
            }
        }
    });
}
//获取训练方案类型
function getItem(){
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getAllTitles.action',
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log('请求的训练方案类型成功');
            xlItem=data.typeTile;
            getxlfn(xlItem);  //获取训练方案
            console.log(data);
            if(data.typeTile.length>0){
                localStorage.setItem('fatype',JSON.stringify(data.typeTile));
                console.log('请求的训练方案类型为你成功缓存在本地');
            }else {
                console.log('请求的训练方案类型为空')
            }
        },
        error: function (err) {
            console.log(err);
            //断网缓存训练方案类型
            var newfatype=JSON.parse(localStorage.getItem('fatype'));
            console.log(newfatype);
            if(newfatype==null){
                console.log('检测到断网，拿到训练方案类型缓存，但是为空')
            } else {
                console.log('检测到断网，为你拿到本地训练类型');
                var xlItem=newfatype;
                getxlfn(xlItem);  //获取训练方案
            }
        }
    });
}
var xzcount=0;
// ----------------------------------提醒有新方案需要下载
function getnewxlfn() {
    var xzblog=JSON.parse(localStorage.getItem('xzsjcflog'));
    if(xzblog=='false'){
        var newDate=0
    }else {
        var newDate=xzSJC;
        console.log('发送服务器时间戳'+xzSJC)
    }
    console.log('下载视频发送服务器时间戳'+newDate);
    $.ajax({
        url:ajaxStr+'MSTYL/pat/getPatLoad.action',
        data:{
            pID:patId,
            sjc:newDate
        },
        type:"POST",
        dataType: "json",
        success:function (data) {
            var allData=data.length;
            console.log(data);
            if (data == null) {
                console.log('没有最新数据');
                circlefn();
                //环形进度条
            } else if (data.length > 0) {
                //有下载内容区

                var len=data.length;
                console.log('视频下载的长度为'+len);
                $('.xfatx').show();   //开机页弹出新训练需要下载
                var bodyFs = parseInt($('body').css('font-size'));
                var num = bodyFs / 100;
                var kjwanchengWidth = 1530 * num;
                var xzwanchengWidth = 1487 * num;
                var xzStart = setInterval(function () {
                    if (parseInt($('.wancheng').css('width')) > kjwanchengWidth) {
                        // console.log('开机进度条完毕');
                        clearInterval(xzStart);
                        $('.xfatx').hide();
                        $('.xfaxz').show();
                        var num=14.98/data.length;   //100%进度条 一份的进度条长度数
                        for(var k=0;k<data.length;k++) {
                            var video = data[k].vedio;
                            // console.log(video);
                            xiazaifa(video,len,xzwanchengWidth,num);
                        }
                    }
                }, 200);

            } else {
                console.log('没有下载数据');
                //setTimeout(circlefn,500);//环形进度条
                circlefn();
            }
        },
        error:function (err) {
            console.log(err);
            //setTimeout(circlefn,200);//环形进度条
            circlefn();
        }
    });
}

function xiazaifa(video,len,xzwanchengWidth,num) { // num  100%进度条 一份的进度条长度数
	console.log(num);
    $.ajax({                            //循环数组下载对应视频
        url:ajaxBd+'MST/Load',
        type:"GET",
        data:{
            fileName:video
        },
        success:function (data) {
            if(data.status=='true'){
                xzcount++;
                var leng=num*xzcount+'rem';
                console.log('运动长度');
                console.log(leng);
                $('.xzwancheng').animate({width: leng,}, 1000);
                console.log(xzcount);
               
                if(xzcount==len){
                    console.log('下载完毕。执行了开机');
                    kaiqi(xzwanchengWidth);
                    return;
                }
            }else {
                alert('下载错误，第'+count+'个文件下载失败');
                xzcount++;
                var leng=num*xzcount+'rem';
                console.log('运动长度');
                console.log(leng);
                $('.xzwancheng').animate({width: leng,}, 1000);
               
                if(xzcount==len){
                    console.log('下载完毕。执行了开机');
                    kaiqi(xzwanchengWidth);
                    return;
                }
            }
        },
        error:function (err) {
            console.log(err);
            alert('下载错误，第'+count+'个文件下载失败');
            xzcount++;
            var leng=num*xzcount+'rem';
            console.log('运动长度');
            console.log(leng);
            $('.xzwancheng').animate({width: leng,}, 1000);
            if(xzcount==len){
                console.log('下载完毕。执行了开机');
                kaiqi(xzwanchengWidth);
                return;
            }
        }
    });
}

function kaiqi(xzwanchengWidth) {
    $('.xzwancheng').animate({width: '14.98rem',}, 1000);
    var opentime = setInterval(function () {
        if (parseInt($('.xzwancheng').css('width')) > xzwanchengWidth) {   //下载页面进度条完毕
            clearInterval(opentime);
            $('.xfaxz').hide();
            circlefn();//环形进度条
            var xzblog=JSON.parse(localStorage.getItem('xzsjcflog'));
            if(xzblog=='false'){
                var sjc=0
            }else {
                var sjc=xzSJC;
                console.log('发送服务器时间戳'+xzSJC)
            }
            console.log('下载记录发送服务器时间戳'+sjc);
            getxzhistory(patId,sjc);  //下载记录  xz.js
            var xzflog='true';
            localStorage.setItem('xzsjcflog', JSON.stringify(xzflog));
        }
    }, 200);
}

$('.xz-quxiao').click(function () {
    $('.xfaxz').hide();
    getXzList();  //xz.js
    circlefn();//环形进度条

});
// -----------------------------------------------------第几周第几天第几次--
$('.xl-days-one-btn').click(function () {
	$('.zx-text').html('');
	$('.xlsp-tab').css({
        transition: 'all 1s ease-out',
        left:'0px'
    });
    $('.xlsp-tab').find('.xlsp-tab-open-close').find('img').attr('src','./img/guan.png');
	
    var xlsy=$('.fa-syxlsc').html();
    if(parseInt(xlsy)<=0){                           //训练时长 按钮全部设置为不可点击
        var text='观看训练方案时长不足,请充值后进入！';
        $('.scbztext').html(text);
        $('.scbz').show();
    }else {
        if($('.hoshowtime').length){  //好友列表视频存在
            $('.gbqtsp').show();
        }else {
            $('.shipingList').html('');
            $('.fagktxsc').find('.xlgktime').html('');
            
            var fatype=$(this).parents('.left-btn').find('.typeItem').html();
            var secondone = 1;
            var Fascjl;   //储存观看时长的数组(包括缓存时长的和)
            var _this = $(this);
            // ------- 开始计时收费
            //检测本地是否存在之前未成功发送的缓存时长
            var bdfssc = JSON.parse(localStorage.getItem('fasc'));  //拿到本地观看视频的缓存;
            if (JSON.parse(localStorage.getItem('fasc'))[0]!= 0){    //判断本地是否已经存在过缓存
                // console.log('本地存在观看视频发送失败的缓存为' + bdfssc[0] + '秒');
                var oldFasc = parseInt(bdfssc[0]);
                var JFtime = setInterval(function (){
                    secondone++;
                    Fascjl = [];
                    Fascjl.push(secondone + oldFasc);                        //不存在，记录本次时长
                    localStorage.setItem('fasc', JSON.stringify(Fascjl));    //防止意外关机导致的计时器没有缓存
                    // console.log('当前观看训练方案计时器记录时长为' + secondone + '秒');
                    // console.log('由于存在缓存，当前观看训练方案总时长为' + Fascjl[0] + '秒');
                    var mo=secondone%1800;
                    if(mo==0){
                        var fz=(secondone/1800)*30;
                        $('.fagktxsc').find('.xlgktime').html(fz);
                        $('.fagktxsc').slideDown();
                        setTimeout(function () {
                            $('.fagktxsc').slideUp();
                        },4000)
                    }
                }, 1000);
            } else {
                // console.log('本地不存在观看视频发送失败的缓存，时长为' + bdfssc[0] + '秒');
                var JFtime = setInterval(function () {
                    secondone++;
                    Fascjl = [];
                    Fascjl.push(secondone);                                         //不存在，记录本次时长
                    localStorage.setItem('fasc', JSON.stringify(Fascjl));         //防止意外关机导致的计时器没有缓存
                    // console.log('当前观看训练方案计时器记录时长为' + secondone + '秒');
                    // console.log('由于没有缓存，当前观看训练方案总时长为' + Fascjl[0] + '秒');
                    var mo=secondone%1800;
                    if(mo==0){
                        var fz=(secondone/1800)*30;
                        $('.fagktxsc').find('.xlgktime').html(fz);
                        $('.fagktxsc').slideDown();
                        setTimeout(function () {
                            $('.fagktxsc').slideUp();
                        },4000)
                    }
                }, 1000);
            }
            var startWatchTime = parseInt($(this).find('.xl-watchTime').html());
            var week = $(this).find('.xl-week').html();
            var day = $(this).find('.xl-day').html();
            var time = $(this).find('.xl-time').html();
            var dID = $(this).find('.xl-dID').html();
            var type = $(this).parents('.xl-one').find('.typeItem').html();
            var item = $(this).find('.xl-type').html();
            var toid = 'doc' + dID;     //训练

            $('.tab-main-title').append('<span style="display: none">' + toid + '</span>');
            $('.xlsp').show();
            if(fatype=='08'){        //08 == 游戏训练
                var eleK = document.getElementsByClassName('fa-sp-start')[0]; //绑定视频聊天   开始和关闭
                eleK.onclick = function () { //开启视频
                    CheckfaSpOpen(toid);
                };
                var eleG = document.getElementsByClassName('fa-sp-end')[0];
                eleG.onclick = function () { //关闭视频
                    CheckfaSpClose();
                };
                // console.log(newFaData);
                for (var i = 0; i < newFaData.length; i++) {
                    if (newFaData[i].item == item) {
                        break;
                    }
                }
                var arr = newFaData[i];
                var data = arr.spEntity.spList;       //exe 数组列表;
                var exeCount=data.length;

                for (var i = 0; i < data.length; i++) {
                    $('.xlsp').find('.xlsp-tab-list').append('<button class="tab-one">' + data[i].titles + '</button>');
                    var myclone = $('#tab-main-clone3').clone(true);
                    myclone.removeAttr('id');
                    myclone.find('.tab-main-title').html(data[i].titles);
                    $('.xlsp').find('.xlsp-content').append(myclone);

                }
                $('.xlsp').find('.tab-one').eq(0).addClass('xuanzhong');
                $('.xlsp').find('.tab-main').eq(0).show().siblings().hide();

                //拿到缓存样式
                faZiTi();
                // ------------------------tab切换
                var exeTime=0;
                $('.xlsp-tab-list>button').click(function () {
                    var title=$(this).html();
                    console.log(title);
                    $('.xlsp-tab-list>button').removeClass('xuanzhong tabPlaying');
                    $(this).addClass('xuanzhong tabPlaying');
                    var indedx = $(this).index();
                    $('.xlsp-content').find('.tab-main').hide();
                    $('.xlsp-content').find('.tab-main').eq(indedx).show();
                    
                    var exeUrl=data[indedx].vedio;
                    var exestr=data[indedx].vedioTime;
                    if (exestr==null||exestr==""||exestr.length==1) {
                    	exeMode=1;
                    	exeTime=300;
					}else{
                        var exeMode=exestr.slice(0,1);               //第一个exe文件的总时长（取一个）；
                        exeTime=exestr.slice(1,exestr.length);        //第一个exe文件的总时长（取一个）；
                    }
                    console.log('难易程度'+exeMode);
                    console.log(exeTime);
                    console.log(exeUrl);
                    var vobj={
                        week:week,
                        day:day,
                        time:time,
                        dID:dID,
                        titles:title
                    };
                    operateExe(exeUrl,exeTime,exeMode, vobj)   //开启exe
                });
                // ----------------字体设置
                $('.tab-ztxz').click(function (e) {
                    e.stopPropagation();
                    $('.ziti-home').show();
                });
                // --------------关闭视频窗口
                var eleClose = document.getElementsByClassName('tab-gbck')[0];
                eleClose.onclick = function () {
                    var num=8; //测评
                    CloseFa(num,exeTime);
                };
            }else {
                //非08类型(非exe)
                var eleK = document.getElementsByClassName('fa-sp-start')[0]; //绑定视频聊天   开始和关闭
                eleK.onclick = function () {
                    CheckfaSpOpen(toid);
                };
                var eleG = document.getElementsByClassName('fa-sp-end')[0];
                eleG.onclick = function () {
                    CheckfaSpClose();
                };
                for (var i = 0; i < newFaData.length; i++) {
                    if (newFaData[i].item == item) {
                        break;
                    }
                }
                var arr = newFaData[i];
                console.log(arr);
                var videoPlay = arr.bfTime;              //第几周第几天第几次列表的   播放次数（循环;
                $('.bfcs').html(videoPlay);              //显示播放次数
                var olddata = arr.spEntity.spList;       //播放视频 数组列表（tab标题 对应视频）;
                var index=0;                             //初始话默认先放第一组视频
                for (var x = 0; x < olddata.length; x++) {
                    $('.xlsp').find('.xlsp-tab-list').append('<button class="tab-one">' + olddata[x].titles + '</button>');
                }
                creatVideo(olddata,index,videoPlay);   //初始化index=0
                
                //缓存字体
                faZiTi();
                $('.xlsp').find('.tab-one').eq(0).addClass('xuanzhong tabPlaying');
                // ------------------------tab切换
                $('.xlsp-tab-list>button').click(function () {
                    var index= $(this).index();
                    $('.xlsp-tab-list>button').removeClass('xuanzhong tabPlaying');
                    $(this).addClass('xuanzhong tabPlaying');
                    creatVideo(olddata,index,videoPlay);
                });
                // ----------------字体设置
                $('.tab-ztxz').click(function (e) {
                    e.stopPropagation();
                    $('.ziti-home').show();
                });
                // --------------关闭视频窗口
                var eleClose = document.getElementsByClassName('tab-gbck')[0];
                eleClose.onclick = function () {
                    var num=1;
                    CloseFa(num);
                }
            }
            //记录观看的第几周第几天第几次 开机提醒
            var ItemAr=[dID,item];
            console.log(ItemAr)
            localStorage.setItem('gkxlfajl', JSON.stringify(ItemAr));

            //点击任意按钮取消 颜色标记
            $('.xlfa-ts').remove();
            function CloseFa(num,exeTime) {//关闭训练方案==视频训练
                if ($('.fashowtime').length) { //通过视频显示计时器判断视频聊天窗口是否存在
                    $('.gbqtsp').show();
                    //存在当前页面视频窗口//关闭计时器
                } else {
                    $('.xlsp').hide();
                    //关闭暂停视频
                    clearInterval(JFtime);   //清除计时器
                    // console.log('观看训练视频时长'+Fascjl[0]);//获取观看视频时长（秒）
                    var newWatctTime = startWatchTime + secondone;
                    _this.find('.xl-watchTime').html(newWatctTime);   //训练视频按钮右边显示的时间数
                    //观察视频时长转化分秒
                    var theTimeS = parseInt(newWatctTime);// 秒
                    var theTimeM = 0;                     // 分
                    if (theTimeS <= 60) {
                        _this.siblings('.xl-data').html(theTimeS + '<span class="xl-datafh">"</span>'); //显示分秒
                    } else if (theTimeS > 60) {
                        theTimeM = parseInt(theTimeS / 60);
                        theTimeS = parseInt(theTimeS % 60);
                        _this.siblings('.xl-data').html(theTimeM + "<span class='xl-datafh'>'</span>" + theTimeS + '<span class="xl-datafh">"</span>')//显示分秒
                    }
                    $('.xlsp').find('.sp-room').children().remove();        //清空视频训练窗口视频聊天
                    $('.xlsp').find('.xlsp-tab-list').children().remove();  //清空tab
                    $('.xlsp').find('.xlsp-content').children().remove();   //清空内容
                    // ----
                    console.log(Fascjl);
                    var wsecond = Fascjl[0];
                    console.log('观看视频时长共计' + wsecond + '秒,准备发送');
                    if(num==8){
                        console.log('exe程序个数'+exeCount);
                        console.log(type+','+exeTime+','+wsecond);
                        console.log('执行fsExesc');
                        fsExesc(week, day, time, dID, type, exeTime,wsecond); //向服务器发送观看视频时长      home.js
                    }else {
                        fsXlsc(week, day, time, dID, type, wsecond, videoPlay,videoCount, videoFisrtTime);  //向服务器发送观看视频时长      home.js
                        console.log(type+','+wsecond+','+videoPlay+','+videoCount+','+videoFisrtTime);
                        console.log('执行fsXlsc')
                    }
                }
            }
        }
    }

});
//exe 打开 operate
var spIndex=0;   //tab 的下标 ---》对应数组的下标数据
function creatVideo(olddata,index,videoPlay) {  //index  tab下标 -》拿到json数组的元素
    spIndex=index;
    console.log('现在播放的tab下标为'+spIndex);
    console.log('creatVideo');
    console.log(olddata);
    console.log(index);
    var data=olddata[index];
    
    if(data){
    	console.log(data);
        var VideoSrc=data.vedio;//第一组视频;
        if(VideoSrc){
            var videoArr = VideoSrc.split(',');
        }else {
            var videoArr = [];
        }
        console.log('当前视频个数为');
        console.log(videoArr);
        //tab菜单显示完整
        var num = 1;
        var videoClassList = [];       //  一组视频的class类名路径集合
        var srcArr = [];              //  一组视频的src路径集合
        $('.xlsp-content').html('');  //清空元素；
        if(videoArr.length>1){   //默认从第一个开始
            // 1 1 2 默认播放
            var videoSrc1=videoArr[0];
            var videoSrc2=videoArr[1];
            for(var k=0;k<3;k++){
                for(var j=0;j<videoPlay;j++){
                    if(k==0){
                        var videoOne = num + '_video';
                        var myclone = $('#tab-main-clone').clone(true);
                        myclone.addClass('videoPlay-home');
                        myclone.removeAttr('id');
                        myclone.find('.tab-main-title').html(data.titles);
                        myclone.find('.video-js').addClass(videoOne);
                        videoClassList.push(videoOne);
                        srcArr.push('../../'+videoSrc1);//视频链接数组
                        num++;
                        console.log(videoClassList);
                        $('.xlsp').find('.xlsp-content').append(myclone);
                    }else if(k==1){
                        var videoOne = num + '_video';
                        var myclone = $('#tab-main-clone').clone(true);
                        myclone.addClass('videoPlay-home');
                        myclone.removeAttr('id');
                        myclone.find('.tab-main-title').html(data.titles);
                        myclone.find('.video-js').addClass(videoOne);
                        videoClassList.push(videoOne);
                        srcArr.push('../../'+videoSrc2);//视频链接数组
                        num++;
                        console.log(videoClassList)
                        $('.xlsp').find('.xlsp-content').append(myclone);
                    }else if(k==2){
                        var videoOne = num + '_video';
                        var videoTwo = num + 1 + '_video';
                        var myclone = $('#tab-main-clone2').clone(true);
                        myclone.removeAttr('id');
                        myclone.addClass('videoPlay-home');
                        myclone.find('.tab-main-title').html(data.titles);
                        myclone.find('.video-js').eq(0).addClass(videoOne);
                        myclone.find('.video-js').eq(1).addClass(videoTwo);
                        $('.xlsp').find('.xlsp-content').append(myclone);
                        num += 2;
                        console.log(videoClassList);
                        //默认放入2个视频到播放数组
                        videoClassList.push(videoOne);
                        videoClassList.push(videoTwo);
                        srcArr.push('../../'+videoSrc1); //视频链接数组
                        srcArr.push('../../'+videoSrc2); //视频链接数组
                    }
                }
            }
        }else if(videoArr.length==1){
            // 1    默认播放
            var videoSrc=videoArr[0];
            for(var j=0;j<videoPlay;j++){ //循环
                console.log(videoSrc);
                var videoOne = num + '_video';
                var myclone = $('#tab-main-clone').clone(true);
                myclone.addClass('videoPlay-home');
                myclone.removeAttr('id');
                myclone.find('.tab-main-title').html(data.titles);
                myclone.find('.video-js').addClass(videoOne);
                videoClassList.push(videoOne);
                srcArr.push('../../'+videoSrc); //视频链接数组
                num++;
                $('.xlsp').find('.xlsp-content').append(myclone);
                // console.log(videoClassList);
            }
        }else if(videoArr.length==0){}
        $('.xlsp').find('.videoPlay-home').eq(0).addClass('videoPlaying').siblings().hide();
        videoCount=videoClassList.length;

        for(var i=0;i<videoClassList.length;i++){
            vidjs(srcArr,videoClassList,i,olddata,videoPlay,videoArr);
        }
        getVideoPlay();             //视频播放和暂停同时绑定
        videoEvent(videoPlay);      //给每个视频绑定一个事件（播放顺序）;
    }
}





function operateExe(exeUrl,exeTime,exeMode,vobj){ //第三方训练= ----开启
    console.log('第三方训练= ----开启');
    console.log(exeUrl);
    console.log(exeTime);
    console.log(exeMode);
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:7,
            exeUrl: exeUrl,  //第三方训练exe路径
            exeTime:exeTime, //启动时间
            exeMode:exeMode  //启动困难模式
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var ttime=parseInt(exeTime)*1000+10000;
            //返回true   操作成功！false  操作失败！
            if(data.status=='true'){
                console.log('启动成功');
                setTimeout(function () {
                    readExe(exeUrl,vobj)
                },ttime)
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}
// function closeExe(exeUrl){ //第三方训练= ----关闭--   不用
//     $.ajax({
//         url: ajaxBd+'MST/cmdPc',
//         data:{
//             cmdType:8,
//             exeUrl: exeUrl,  //第三方训练exe路径
//         },
//         type: "POST",
//         dataType: "json",
//         success: function (data) {
//             console.log(data);
//             //返回true   操作成功！false  操作失败！
//             if(data.status=='true'){
//                 console.log('关闭成功');
//             }
//         },
//         error:function (err) {
//             console.log(err);
//         }
//     })
// }
function readExe(exeUrl,vobj){ //第三方训练= ----关闭之后==5S后=找文件读取内容-
    console.log('传参对象为');
    console.log(vobj);
    console.log('路径为'+exeUrl);
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:9,
            exeUrl: exeUrl,  //第三方训练exe路径
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            //true   操作成功！ info 返回信息false  操作失败！空“”
            if(data.status=='true'){
                console.log('读取成功');
                var text=data.info;
                pctext(text,vobj);
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}

function pctext(text,vobj) {
    $.ajax({
        url: ajaxStr+'MSTYL/pat/upPcComment.action',
        data:{
            pID:patId,
            week:vobj.week,
            day:vobj.day,
            time:vobj.time,
            dID:vobj.dID,            //当前指定医生id
            type:'08',        //当前操作病人id
            titles:vobj.titles,     //视频名称
            comments:text  //评测内容
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            if(data.status=='true'){
                console.log('pctext启动成功')
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}


//video.js初始化
function vidjs(srcArr,videoClassList,i,olddata,videoPlay,videoArr) {
    console.log('视频初始化长度为');
   /* console.log(videoArr.length);
    if(videoArr.length==2){
        var vlen=3*videoPlay;
    }else if(videoArr.length==1){
        var vlen=1*videoPlay;
    }
    console.log(vlen);*/
    var eleS = $('.' + videoClassList[i]).find('source');
    $(eleS).attr('src',srcArr[i]);
    var ele = document.getElementsByClassName(videoClassList[i])[0];
    $(eleS).attr('src',srcArr[i]);
    videojs(ele, {}, function() {
        // videojs.log('播放器已经准备好了!');
        jmSrc(srcArr,videoClassList,i);
        this.on('ended', function() {
            var vlen=$('.videoPlay-home').length;
            // console.log('视频总长度为'+vlen)
            // var a=$('.videoPlaying').index();
            // console.log('当前播放视频下标'+a);
            if($('.videoPlaying').index()==vlen-1){//上肢全部视频播放完毕
                var len=$('.tab-one').length;
                // console.log('tab的长度为'+len);
                // console.log(spIndex);
                // console.log(len);
                var index=spIndex+1;
                if(index<len) {
                    console.log('播放下标为'+spIndex+'的数组');
                    creatVideo(olddata,index,videoPlay);
                    $('.xlsp').find('.tab-one').removeClass('xuanzhong tabPlaying').eq(index).addClass('xuanzhong tabPlaying');
                }else {
                    // alert('播放结束下面没有可以播放的视频了');
                }
            }
            console.log('播放结束了啊！！！！！！！！！！！！！！！')
        });
    });
}
function jmSrc(srcArr,videoClassList,index) {
    console.log('执行加密');
    var xhr = new XMLHttpRequest();//创建XMLHttpRequest对象
    xhr.open('GET', srcArr[index], true);//配置请求方式、请求地址以及是否同步
    xhr.responseType = 'blob';//设置请求结果类型为blob
    xhr.onload = function (e) {  //请求成功回调函数
        if (this.status == 200) {//请求成功
            //获取blob对象
            var blob = this.response;
            var ele=$('.' + videoClassList[index]).find('source')[0];
            $(ele).attr('src',URL.createObjectURL(blob));
            $(".vjs-tech").eq(index).attr("src", URL.createObjectURL(blob));
            if(index==videoClassList.length-1){   
                var videoPlayNum=0;				   //第一个视频加密成功开始播放
                autoPlay(videoPlayNum);           //默认从0开始 // 视频初始化完毕，开始自动播放
                if(videoClassList.length==4){
                    // console.log('有4个视频类，禁音下标2');
                    videojs($(".vjs-tech").eq(3)[0]).volume(0);
                }else if(videoClassList.length==8){
                    // console.log('有8个视频类，禁音下标4,6');
                    videojs($(".vjs-tech").eq(5)[0]).volume(0);
                    videojs($(".vjs-tech").eq(7)[0]).volume(0);
                }else if(videoClassList.length==12){
                    // console.log('有12个视频类，禁音下标6,8,10');
                    videojs($(".vjs-tech").eq(7)[0]).volume(0);
                    videojs($(".vjs-tech").eq(9)[0]).volume(0);
                    videojs($(".vjs-tech").eq(11)[0]).volume(0);
                }
            }
        }
    };
    xhr.send();
}
//训练方案字体缓存
function faZiTi() {
    var newfont = JSON.parse(localStorage.getItem('font'));
    $('.xlsp-tab button').css({
        'color': newfont[1],
        'fontFamily': newfont[0],
        'fontSize': newfont[2] + 'rem'
    });
    $('.xlsp-content>div>p').css({
        'color': newfont[1],
        'fontFamily': newfont[0],
        'fontSize': newfont[2] + 0.15 + 'rem'
    });
}

// function vtabChange(olddata,index,videoPlay,_this) {
//     console.log(olddata);
//     $('.xlsp-tab-list>button').removeClass('xuanzhong');
//     _this.addClass('xuanzhong');
//     creatVideo(olddata,index,videoPlay);
// }
//tab切换函数（exe测评）
// 初始化视频 设置2个视频同时播放/暂停。
function getVideoPlay(){
    var i=0;
    var eleLen=$('.videoPlay-home');
    // console.log(eleLen.length);
    for(var i=0;i<eleLen.length;i++){
        // console.log('绑定$(.videoPlay-home)的下表'+i)
        if($('.videoPlay-home').eq(i).find('.videoc').hasClass('videoList2')){
            // console.log('存在videoList2');
            var eleOne=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(0)[0];
            var eleTwo=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(1)[0];
            eleOne.addEventListener('pause',function(){
                var index=$(this).parents('.videoPlay-home').index();
                videojs($('.videoPlay-home').eq(index).find('.vjs-tech').eq(1)[0]).pause();

            });
            eleTwo.addEventListener('pause',function(){
                var index=$(this).parents('.videoPlay-home').index();
                // console.log(index)
                videojs($('.videoPlay-home').eq(index).find('.vjs-tech').eq(0)[0]).pause();
            });
            eleOne.addEventListener('play',function(){
                var index=$(this).parents('.videoPlay-home').index();
                // console.log(index)
                videojs($('.videoPlay-home').eq(index).find('.vjs-tech').eq(1)[0]).play();
                // videojs(this).play();
            });
            eleTwo.addEventListener('play',function(){
                var index=$(this).parents('.videoPlay-home').index();
                // console.log(index)
                videojs($('.videoPlay-home').eq(index).find('.vjs-tech').eq(0)[0]).play();
                // videojs(this).play();
            });
            // console.log('同时暂停绑定');
        }else {}
    }
}

//初始化视频，给视频播放绑定事件
function videoEvent(num) {
    var i=0;
    var eleLen=$('.videoPlay-home');
    for(var i=0;i<eleLen.length;i++){
        if($('.videoPlay-home').eq(i).find('.videoc').hasClass('videoList2')){
            var eleOne=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(0)[0];
            var eleTwo=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(1)[0];
            eleOne.addEventListener('play',function(){
                var playStart=$(this).parents('.videoPlay-home').index();
                videoPlaySX(playStart,false,num);
            });
        }else {
            var ele=$('.videoPlay-home').eq(i).find('.vjs-tech')[0];
            ele.addEventListener('play',function(){
                var playStart=$(this).parents('.videoPlay-home').index();
                // console.log(playStart);
                videoPlaySX(playStart,false,num);
            });
        }
    }
}
//训练方案自动播放默认(O)
function autoPlay(i) {
    console.log('从第1个视频开始播放');
    var eleLen=$('.videoPlay-home');
    if(i<eleLen.length){
        if($('.videoPlay-home').eq(i).find('.videoc').hasClass('videoList2')){
            var eleOne=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(0)[0];
            videojs(eleOne).play();
        }else {
            var ele=$('.videoPlay-home').eq(i).find('.vjs-tech')[0];
            videojs(ele).play();
        }
    }else {
        return
    }
}
    //给时间绑定一个播放顺序
function videoPlaySX(i,flag,num) {
    // alert('播放次数num'+num);
    // alert('i为'+i);
    // console.log('videoPlaySX'+num);
    // console.log('绑定了顺序执行');
        var flag=flag;
        var eleLen=$('.videoPlay-home');
        if(i<eleLen.length){
            if($('.videoPlay-home').eq(i).find('.videoc').hasClass('videoList2')){
                // console.log('当前是2个视频同时在播放');
                var eleOne=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(0)[0];
                var eleTwo=$('.videoPlay-home').eq(i).find('.vjs-tech').eq(1)[0];
                if(flag==true){
                    videojs(eleOne).play();
                    flag=true;
                }
                setTimeout(function () {
                    var allTimeA=videojs(eleOne).duration(); //视频左的总时长
                    var allTimeB=videojs(eleTwo).duration();  //视频右的总时长
                    // console.log(allTimeA);
                    videoFisrtTime=allTimeA;
                    console.log(allTimeB);
                    //视频左 播放完毕的回调
                    videojs(eleOne).on('ended', function() {
                            console.log('视频左，播放结束了!');
                            videojs(eleOne).load();
                            videojs(eleTwo).load();
                            i++;
                            if(i<eleLen.length){
                                if(i>0){
                                    $('.videoPlay-home').eq(i-1).removeClass('videoPlayed');
                                }
                                $('.videoPlay-home').removeClass('videoPlaying').eq(i).addClass('videoPlaying').show().siblings().hide();
                                console.log('当前视频页面的下标为'+i);
                                var index=parseInt(i/num)*num;
                                console.log(index);
                                // $('.tab-one').removeClass('xuanzhong').eq(index).addClass('xuanzhong tabPlaying');
                                videoPlaySX(i,true,num);
                            }else{
                                return;
                            }
                        });
                    //视频右 播放完毕的回调
                    videojs(eleTwo).on('ended', function() {
                            console.log('视频右，播放结束了!');
                            videojs(eleOne).load();
                            videojs(eleTwo).load();
                            i++;
                            if(i<eleLen.length){
                                if(i>0){
                                    $('.videoPlay-home').eq(i-1).removeClass('videoPlayed');
                                }
                                $('.videoPlay-home').removeClass('videoPlaying').eq(i).addClass('videoPlaying').show().siblings().hide();
                                // console.log('当前视频页面的下标为'+i);
                                // var index=parseInt(i/num)*num;
                                // console.log(index);
                                // $('.tab-one').removeClass('xuanzhong tabPlaying').eq(index).addClass('xuanzhong tabPlaying');
                                videoPlaySX(i,true,num);
                            }else{
                                return;
                            }
                        })
                },1000)

            }else {
                console.log('当前是1个视频同时在播放');
                var ele=$('.videoPlay-home').eq(i).find('.vjs-tech')[0];
                if(flag==true){
                    videojs(ele).play();
                    flag=true;
                }
                setTimeout(function () {
                    var allTime=videojs(ele).duration();
                    videoFisrtTime=allTime;
                    console.log(allTime)
                },1000);
                videojs(ele).on('ended', function() {
                    console.log('播放结束');
                    videojs(ele).load();
                    i++;
                    if(i<eleLen.length){
                        if(i>0){
                            $('.videoPlay-home').eq(i-1).removeClass('videoPlayed');
                        }
                        $('.videoPlay-home').removeClass('videoPlaying').eq(i).addClass('videoPlaying').show().siblings().hide();
                        console.log('当前视频页面的下标为'+i);
                        var index=parseInt(i/num)*num;
                        console.log(index);
                        videoPlaySX(i,true,num);
                    }else{
                        return;
                    }
                })
            }
        }else {
            return
        }
    }
// -------------------------------------训练页面
$('.type-btn').click(function () {
    $('.type-btn').removeClass('xl-xuanzhong1');
    $(this).addClass('xl-xuanzhong1');
});
$('.xl-days-one-btn').click(function () {
    $('.xl-days-one-btn').removeClass('xl-xuanzhong2');
    $(this).addClass('xl-xuanzhong2');
});

$('.xl-more-btn').click(function () {
    var eleLen=$(this).parents('.more-btn').find('.xl-more-list').children().length;
    /*console.log('长度为');
    console.log(eleLen);*/
    if(eleLen>4){
        // console.log("滚动条");
        $(this).hide();
        $(this).parents('.more-btn').find('.xl-more-list').css('width','5.5rem').find('.xl-data').css('right','.33rem');
        $(this).parents('.xl-one').find('.xl-shouqi').hide();
        $(this).parents('.xl-one').find('.xl-shouqi').show(1000);
        $(this).parents('.more-btn').find('.xl-more-listout').slideToggle(500);
    }else {
        // console.log("不存在滚动条");
        $(this).hide();
        $(this).parents('.more-btn').find('.xl-more-listout').css('width','5.2rem');
        $(this).parents('.xl-one').find('.xl-shouqi').hide();
        $(this).parents('.xl-one').find('.xl-shouqi').show(1000);
        $(this).parents('.more-btn').find('.xl-more-listout').slideToggle(500);
    }
});


$('body').on('click','.xl-shouqi',function () {
    $(this).parents('.more-btn').find('.xl-more-btn').show();
    $(this).parents('.xl-one').find('.xl-shouqi').hide();
    setTimeout(function () {
        $(this).parents('.xl-days-btnList').find('.xl-more-list').css('width','5.9rem');
    },500);
    $(this).parents('.more-btn').find('.xl-more-listout').slideToggle(500);
});

// ------------------------------------------字体设置
$('.zt-queding').click(function (e) {
    e.stopPropagation();
    var colorNum=$(".zitiPage-yanse").find(".xuanzhong").css('backgroundColor');   //字体颜色
    var fontfam=$(".zitiPage-ziti").find(".xuanzhong").find('span').html();
    var fonts=$('.zitiPage-zihao').find(".xuanzhong").find('label').html();
    $('.ziti-home').hide();
    var newfonts=toDecimal(fonts);
    $('.xlsp-tab button').css({
        'color':colorNum,
        'fontFamily':fontfam,
        'fontSize':newfonts+'rem'
    });
    $('.xlsp-content>div>p').css({
        'color':colorNum,
        'fontFamily':fontfam,
        'fontSize':newfonts+0.15+'rem'
    });
    // console.log(newfonts);
    // console.log(newfonts+0.15+'rem');
    var Font=[fontfam,colorNum,newfonts];
    localStorage.setItem('font', JSON.stringify(Font));
});
// -------------------------------------------------------字体设置btn样式
$('.zitiPage-ziti>button').click(function () {
    $(this).addClass('xuanzhong').siblings().removeClass('xuanzhong')
});
$('.zitiPage-zihao>button').click(function () {
    $(this).addClass('xuanzhong').siblings().removeClass('xuanzhong')
});
$('.zitiPage-yanse>button').click(function () {
    $(this).addClass('xuanzhong').siblings().removeClass('xuanzhong')
});
// ------------------------------------------------tab左侧出现隐藏

$('.xlsp-tab-open-close').click(function () {
    if($('.xlsp-tab').css('left')=='0px'){
        $('.xlsp-tab').css({
            transition: 'all 1s ease-out',
            left:'-3.754rem'
        });
        $(this).find('img').attr('src','./img/kai.png')
    }else {
        $('.xlsp-tab').css({
            transition: 'all 1s ease-out',
            left:'0px'
        });
        $(this).find('img').attr('src','./img/guan.png')
    }
});


// ------------------------训练页面翻页
$('.xl-goDown').click(function () {
    var numPre=parseInt($('.xl-first-page').html());
    var numNext=parseInt($('.xl-last-page').html());
    $(".xl-goUp").removeAttr('disabled');
    if(numPre==numNext-1){
        $(".xl-goDown").attr("disabled","disabled").addClass('active');
        $('.xl-goUp').removeClass('active');
        $('.xl-first-page').html(numPre+1);
    }else {
        $('.xl-goDown').addClass('active');
        $('.xl-goUp').removeClass('active');
        $('.xl-first-page').html(numPre+1);
        // console.log(numPre+1);
    }
    var $ele=$('.xl-one');
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=3*vv;
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
    $('.small-ceping').removeClass('active');
    $('.type-btn').removeClass('xl-xuanzhong1');
    $('.xl-days-one-btn').removeClass('xl-xuanzhong2');
    $ele.eq(vvv-3).find('.small-ceping').eq(0).addClass('active');
    $ele.eq(vvv-3).find('.type-btn').eq(0).addClass('xl-xuanzhong1');
    $ele.eq(vvv-3).find('.xl-days-one-btn').eq(0).addClass('xl-xuanzhong2');
});
$('.xl-goUp').click(function () {
    var numPre=parseInt($('.xl-first-page').html());
    var numNext=parseInt($('.xl-last-page').html());
    $(".xl-goDown").removeAttr('disabled');
    if(numPre==2){
        $(".xl-goUp").attr("disabled","disabled").addClass('active');
        $('.xl-goDown').removeClass('active');
        $('.xl-first-page').html(numPre-1);
    }else {
        $('.xl-goUp').addClass('active');
        $('.xl-goDown').removeClass('active');
        $('.xl-first-page').html(numPre-1);
    }
    var $ele=$('.xl-one');
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=3*vv;
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
    $('.small-ceping').removeClass('active');
    $('.type-btn').removeClass('xl-xuanzhong1');
    $('.xl-days-one-btn').removeClass('xl-xuanzhong2');
    $ele.eq(vvv-3).find('.small-ceping').eq(0).addClass('active');
    $ele.eq(vvv-3).find('.type-btn').eq(0).addClass('xl-xuanzhong1');
    $ele.eq(vvv-3).find('.xl-days-one-btn').eq(0).addClass('xl-xuanzhong2');
});