////页面初始化
localStorage.removeItem('addPer');
//添加好友状态缓存初始话
var addperArr=JSON.parse(localStorage.getItem('addPer'));
console.log(addperArr);
if(addperArr){     //添加好友状态
    var addHcPer=addperArr; //全局变量给添加好友使用
}else {
    var addpe=[];
    localStorage.setItem('addPer', JSON.stringify(addpe));
    var addHcPer=[];   //全局变量给添加好友使用
}
console.log(addHcPer);
localStorage.removeItem('addPer');
localStorage.removeItem('addPer');
localStorage.removeItem('addPer');
// 聊天记录初始化，拿到聊天记录
if(JSON.parse(localStorage.getItem('chatxx'))){

}else {
    var chatStart=[];
    localStorage.setItem('chatxx', JSON.stringify(chatStart));
}
// console.log(chatStart)
var ChatHistory=JSON.parse(localStorage.getItem('chatxx'));
// console.log(ChatHistory);
// 下载方案缓存初始化，拿到下载记录缓存
if(JSON.parse(localStorage.getItem('xzdata'))){
    console.log('存在下载缓存');
    var xdata=JSON.parse(localStorage.getItem('xzdata'));
    if(xdata.length>0){
        for(var i=0;i<xdata.length;i++){
            var user=xdata[i].user;
            var name=xdata[i].name;
            var testTime=xdata[i].testTime;
            var time=xdata[i].time;

            $('.xz-List').append('<div class="xz-list-one"> <div><p class="xz-one-yisheng">'+user+'</p></div> <div><p class="xz-one-leimu">'+name+'</p></div> <div><p class="xz-one-zhiding">'+testTime+'</p></div> <div><p class="xz-one-shijian">'+time+'</p></div><div class="zx-one-X">删除</div> </div>')
        }
    }else {
        $('.xz-List').append('<p class="no-shuju">还没有下载数据~</p>')
    }
}else {
    // console.log('不存在下载缓存')
    $('.xz-List').append('<p class="no-shuju">还没有下载数据~</p>');
    var xzStart=[];
    localStorage.setItem('xzdata', JSON.stringify(xzStart));
}
var XZHistory=JSON.parse(localStorage.getItem('xzdata'));
// console.log(XZHistory)



//消息记录缓存
if(window.navigator.onLine==true){
    if(JSON.parse(localStorage.getItem('xxjmhc'))){
        var xxjlhc=localStorage.getItem('xxjmhc');
        var newxxhc=JSON.parse(xxjlhc);
        $('.xiaoxi-home').append(newxxhc);
    }else {
        console.log('消息记录没有缓存');
    }
}

//训练方案消息提醒缓存初始化,拿到消息提醒 --上
if(JSON.parse(localStorage.getItem('faxxtxtop'))){
    console.log('消息提醒上有缓存');
    var faxxtop=JSON.parse(localStorage.getItem('faxxtxtop'));
    if(faxxtop.user){
        console.log(faxxtop.ysname);
        $('.xl-contentright1>p').append(' <label class=fa_'+faxxtop.user+'><span class="fa-user">'+faxxtop.ysname+'</span><span>发来信息提醒 :</span><span class="fa-user-xx">'+faxxtop.data+'</span></label>');
    }else {}
}else {
    console.log('消息上没有提醒有缓存');
    var faXxTxtop={};
    localStorage.setItem('faxxtxtop', JSON.stringify(faXxTxtop));
}
var FaXxtop=JSON.parse(localStorage.getItem('faxxtxtop'));
// console.log(FaXxtop);


//训练方案消息提醒缓存初始化,拿到消息提醒 --下
if(JSON.parse(localStorage.getItem('faxxtxbot'))){
    console.log('消息下提醒有缓存');
    var faxxbot=JSON.parse(localStorage.getItem('faxxtxbot'));
    if(faxxbot.user){
        $('.xl-contentright2>p').append(' <label class=fa_'+faxxtop.user+'><span class="fa-user">'+faxxbot.ysname+'</span><span>发来信息提醒 :</span><span class="fa-user-xx">'+faxxbot.data+'</span></label>');
    }else {}
}else {
    console.log('消息下没有提醒有缓存');
    var faXxTxbot={};
    localStorage.setItem('faxxtxbot', JSON.stringify(faXxTxbot));
}
var FaXxbot=JSON.parse(localStorage.getItem('faxxtxbot'));
// localStorage.removeItem('fasc');
//观看训练视频时长初始化为空
if(JSON.parse(localStorage.getItem('fasc'))){       //存在
    console.log('存在视频时长缓存');
    console.log(JSON.parse(localStorage.getItem('fasc')))
}else {
    console.log('不存在视频时长缓存');
    var Fasc=[0];
    localStorage.setItem('fasc', JSON.stringify(Fasc));//不存在，记录本次时长
}
// localStorage.removeItem('spnosc');
//视频聊天时长初始化为空
if(JSON.parse(localStorage.getItem('spnosc'))){
    //存在
    console.log('存在视频聊天时长缓存'+JSON.parse(localStorage.getItem('spnosc')));
    // console.log(JSON.parse(localStorage.getItem('spnosc')))
}else {
    console.log('不存在视频聊天时长缓存');
    var Faspsc=[0];
    localStorage.setItem('spnosc', JSON.stringify(Faspsc));//不存在，记录本次时长
}

//训练方案字体缓存判断
if(JSON.parse(localStorage.getItem('font'))){
    console.log('存在字体缓存');
    console.log(JSON.parse(localStorage.getItem('font')))
}else {
    console.log('不存在字体缓存');
    var Font=['Microsoft YaHei','#f1f1f1','.35'];
    localStorage.setItem('font', JSON.stringify(Font));
    console.log('已经缓存字体');
}
// -----向服务器发送训练观看时长（在线）--exe08
function fsExesc(week,day,time,dID,type,exeTime,wsecond) {
    var second=parseInt(wsecond);
    console.log('类型'+type);
    console.log('已经为你发送训练观看缓存'+second+'秒');
    $.ajax({
        url:ajaxStr+'MSTYL/pat/computeTestPercent.action',
        data:{
            pID:patId,
            week:week,
            day:day,
            time:time,
            dID:dID,
            type:type,
            vedioTime:exeTime,
            watchTime:second,
        },
        type:"POST",
        dataType: "json",
        success:function (data) {
            console.log(data);
            if(data.status=='true'){
                var Fasc=[0];           //清空本地缓存的训练观看时长
                localStorage.setItem('fasc', JSON.stringify(Fasc));
                console.log('发送观看视频时长成功，本地观看视频时长为0秒');
                var sysc=parseInt($('.fa-syxlsc').html());
                var gksc=parseInt(data.time);
                var num=sysc-gksc;
                if(num<=0){
                    $('.fa-syxlsc').html(0).css('color','red');    //训练时长 剩余时间红色
                    checkXLSC(0);                                      //消息界面出现提示充值
                }else if(0<num&&num<=10){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(10);                                      //消息界面出现提示充值
                }else if(10<num&&num<=20){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(20);                                      //消息界面出现提示充值
                }else if(20<num&&num<=30){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(30);                                      //消息界面出现提示充值
                } else {
                    $('.fa-syxlsc').html(num);
                }
            }else {
                //服务器返回false
                var bdfssc=JSON.parse(localStorage.getItem('fasc'));
                console.log('发送观看视频时长失败,缓存总时长为'+bdfssc[0]+'秒');   //继续缓存在本地
            }
        },
        error:function (err) {
            // console.log(err);
            var bdfssc=JSON.parse(localStorage.getItem('fasc'));
            console.log('发送观看视频时长失败,本地存在缓存总时长为'+bdfssc[0]+'秒');   //继续缓存在本地
        }
    })
}

// -----向服务器发送训练观看时长（在线）
function fsXlsc(week,day,time,dID,type,wsecond,videoPlay,videoCount,videoFisrtTime) {
    var videoFisrt=parseInt(videoFisrtTime);
    var second=parseInt(wsecond);
    console.log('类型'+type);
    console.log('初始化时长'+videoFisrtTime);
    console.log('已经为你发送训练观看缓存'+second+'秒');
    $.ajax({
        url:ajaxStr+'MSTYL/pat/computePercent.action',
        data:{
            pID:patId,
            week:week,
            day:day,
            time:time,
            dID:dID,
            type:type,
            vedioTime:videoFisrt,
            watchTime:second,
            bfTime:videoPlay,
            spLen:videoCount
        },
        type:"POST",
        dataType: "json",
        success:function (data) {
            console.log(data);
            if(data.status=='true'){
                var Fasc=[0];           //清空本地缓存的训练观看时长
                localStorage.setItem('fasc', JSON.stringify(Fasc));
                console.log('发送观看视频时长成功，本地观看视频时长为0秒');
                var sysc=parseInt($('.fa-syxlsc').html());
                var gksc=parseInt(data.time);
                var num=sysc-gksc;
                if(num<=0){
                    $('.fa-syxlsc').html(0).css('color','red');    //训练时长 剩余时间红色
                    checkXLSC(0);                                      //消息界面出现提示充值
                }else if(0<num&&num<=10){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(10);                                      //消息界面出现提示充值
                }else if(10<num&&num<=20){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(20);                                      //消息界面出现提示充值
                }else if(20<num&&num<=30){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(30);                                      //消息界面出现提示充值
                } else {
                    $('.fa-syxlsc').html(num);
                }
            }else{
                //服务器返回false
                var bdfssc=JSON.parse(localStorage.getItem('fasc'));
                console.log('发送观看视频时长失败,缓存总时长为'+bdfssc[0]+'秒');   //继续缓存在本地
            }
        },
        error:function (err) {
            // console.log(err);
            var bdfssc=JSON.parse(localStorage.getItem('fasc'));
            console.log('发送观看视频时长失败,本地存在缓存总时长为'+bdfssc[0]+'秒');   //继续缓存在本地
        }
    })
}
// -----向服务器发送训练观看时长(离线状态)
function fsxlsphc(playTime){
    console.log('已经为你发送训练观看缓存'+playTime+'秒');
    $.ajax({
        url:ajaxStr+'MSTYL/pat/upVedioTime.action',
        data:{
            id:patId,
            videoTime :playTime
        },
        type:"POST",
        dataType: "json",
        success:function (data){
            console.log(data);
            if(data.status=='true'){
                console.log('缓存训练时长发送成功');
                var Fasc=[0];    //清空本地缓存的训练观看时长
                localStorage.setItem('fasc', JSON.stringify(Fasc));
                console.log('本地观看视频缓存已经清空为0秒');
                var sysc=parseInt($('.fa-syxlsc').html());
                // console.log('个人中心页面显示的剩余观看视频时长为'+sysc+'秒');
                var gksc=parseInt(data.time);
                var num=sysc-gksc;
                if(num<=0){
                    $('.fa-syxlsc').html(0).css('color','red');    //训练时长 剩余时间红色
                    checkXLSC(0);                                      //消息界面出现提示充值
                }else if(0<num&&num<=10){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(10);                                      //消息界面出现提示充值
                }else if(10<num&&num<=20){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(20);                                      //消息界面出现提示充值
                }else if(20<num&&num<=30){
                    $('.fa-syxlsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkXLSC(30);                                      //消息界面出现提示充值
                } else {
                    $('.fa-syxlsc').html(num);
                }
            }else {
                //服务器返回false
                console('发送失败，观看时长缓存继续存在在本地，时长为'+playTime+'秒');
            }
        },
        error:function (err) {
            console.log(err);
            console.log('发送失败，观看时长缓存继续存在在本地,时长为'+playTime+'秒');
        }
    })
}

// -----向服务器发送视频聊天时长(在线状态)；
function fsxllthc(playTime) {
    console.log('发送视频聊天时长为'+playTime+'秒');
    console.log('id为'+patId);
    console.log(playTime);
    $.ajax({
        url:ajaxStr+'MSTYL/pat/upTalkTime.action',
        data:{
            id:patId,
            talkTime:playTime
        },
        type:"GET",
        success:function (data){
            console.log(data);
            if(data.status=='true'){
                console.log('视频聊天时长发送成功');
                var Faspsc=[0]; //清空视频聊天时长
                localStorage.setItem('spnosc', JSON.stringify(Faspsc));
                console.log('本地视频聊天缓存已经清空');
                var spsc=parseInt($('.fa-sythsc').html());
                var yspksc=parseInt(data.time);
                var num=spsc-yspksc;
                if(num<=0){
                    $('.fa-sythsc').html(0).css('color','red');    //训练时长 剩余时间红色
                    checkSPSC();                                      //消息界面出现提示充值
                }else if(0<num&&num<=10){
                    $('.fa-sythsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkSPSC(10);                                      //消息界面出现提示充值
                }else if(10<num&&num<=20){
                    $('.fa-sythsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkSPSC(20);                                      //消息界面出现提示充值
                }else if(20<num&&num<=30){
                    $('.fa-sythsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkSPSC(30);                                      //消息界面出现提示充值
                }else {
                    $('.fa-sythsc').html(num);
                }
            }else {
                //服务器返回false
                console('发送失败，视频聊天时长缓存继续存在在本地为'+playTime+'秒');

            }
        },
        error:function (err) {
            console.log(err);
            console.log('发送失败，视频聊天时长缓存继续存在在本地为'+playTime+'秒');
        }
    })
}

// -----向服务器发送视频聊天时长(离线状态)；
function fsxllthclx(playTime) {
    console.log('发送视频聊天时长为'+playTime+'秒');
    $.ajax({
        url:ajaxStr+'MSTYL/pat/upTalkTime.action',
        data:{
            id:patId,
            talkTime:playTime
        },
        type:"GET",
        dataType: "json",
        success:function (data){
            if(data.status=='true'){
                console.log('视频聊天时长发送成功');
                var Faspsc=[0]; //清空视频聊天时长
                localStorage.setItem('spnosc', JSON.stringify(Faspsc));
                console.log('本地视频聊天缓存已经清空，时长为0');
                var spsc=parseInt($('.fa-sythsc').html());
                var yspksc=parseInt(data.time);
                var num=spsc-yspksc;
                if(num<=0){
                    $('.fa-sythsc').html(0).css('color','red');    //训练时长 剩余时间红色
                    checkSPSC();                                      //消息界面出现提示充值
                }else if(num>0&&num<=30){
                    $('.fa-sythsc').html(num).css('color','red');  //训练时长 剩余时间红色
                    checkSPSC();                                      //消息界面出现提示充值
                }else {
                    $('.fa-sythsc').html(num);
                }
            }else {
                var spltsc=JSON.parse(localStorage.getItem('spnosc'));
                console.log('视频时长发送失败，视频通话时长缓存继续存在在本地为'+spltsc[0]+'秒')
            }
        },
        error:function (err) {
            console.log(err);
            var spltsc=JSON.parse(localStorage.getItem('spnosc'));
            console.log('视频时长发送失败，视频通话时长缓存继续存在在本地为'+spltsc[0]+'秒')
        }
    })
}

function checkSchc() {      //向服务器发送本地未完成的视频观看/视频聊天时长
    // console.log(JSON.parse(localStorage.getItem('fasc')))
    // console.log(JSON.parse(localStorage.getItem('spnosc')))
    var Fasc=JSON.parse(localStorage.getItem('fasc'));//查看观看训练时长本地是否存在缓存    [4]
    var Fasp=JSON.parse(localStorage.getItem('spnosc'));//查看观看视频聊天时长本地是否存在缓存[0]
    console.log('本地观看视频缓存为'+Fasc[0]+'秒');
    console.log('本地视频聊天缓存为'+Fasp[0]+'秒');
    if(Fasc==null||Fasc==undefined){
        console.log('本地没有训练缓存时长');
    }else if(Fasc[0]!=0){
        console.log('存在观看训练缓存时长'+Fasc);
        var playtime=parseInt(Fasc[0]);
        fsxlsphc(playtime);     //发送视频观看时长
        // console.log('执行发送视频观看时长')
    }else {
        console.log('本地没有训练缓存时长为'+Fasc[0]+"秒");
    }
    if(Fasp==null||Fasp==undefined){
        console.log('本地没有视频聊天缓存时长');
    }else if(Fasp[0]!=0){
        console.log('存在视频聊天缓存时长'+Fasp[0]+'秒');
        var playtime=parseInt(Fasp[0]);
        fsxllthclx(playtime);     //发送视频观看时长
        // console.log('执行发送视频观看时长')
    }else {
        console.log('本地没有视频聊天缓存时长为'+Fasp[0]+'秒');
    }
}


//绑定点击事件
//    -----nav 选择对应的界面

$('.nav>button').click(function () {
    $('.chatList').hide();
    $('.shipingList').hide();
    $('.pc-contentList').hide().siblings().show();
    $(".xtszbtnList").slideUp("slow");
    var contentNum;
    contentNum=$(this).index();
    // console.log(contentNum);
    $('.nav>button').removeClass('active-under1 active-under2');
    $('.xtsz-btn').removeClass('active-under2');
    if(contentNum==0||contentNum==3){
        $(this).addClass('active-under1');
    }else {
        $(this).addClass('active-under2');
    }
    $('.content>div').eq(contentNum).show().siblings().hide();
    $('.xq-up').remove();
});




$('.xtsz-btn').click(function () {          //点击系统设置
    $('.chatList').hide();
    $('.shipingList').hide();
    $('.nav>button').removeClass('active-under1 active-under2');
    $(this).addClass('active-under2');
    $('.xtsz-content').show().siblings().hide();
    $(".xtszbtnList").slideToggle("slow");
    $('.xq-up').remove();
});


$('.hdzx').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(".xtszbtnList").slideUp("slow");
    $(this).css('color','#55d8de').siblings().css('color','#fff');
    $('.hdzx-content').show().siblings().hide();
    zbopenhdzx();

});
$('.aboutus').click(function (e) {
    e.stopPropagation();
    $(".xtszbtnList").slideUp("slow");
    $(this).css('color','#55d8de').siblings().css('color','#fff');
    $('.aboutus-content').show().siblings().hide();
});

$('.qchc').click(function (e) {
    e.stopPropagation();
    $(".xtszbtnList").slideUp("slow");
    $(this).css('color','#55d8de').siblings().css('color','#fff');
    $('.qchc-content').show().siblings().hide();
});


$('.jcgx').click(function (e) {
    e.stopPropagation();
    $(".xtszbtnList").slideUp("slow");
    $(this).css('color','#55d8de').siblings().css('color','#fff');
    $('.xtsjgx').show();
    $('.xtsjgx-ck').html('<p>正在检测中...</p> <div class="xt-jiance"><img src="img/ajax.gif"><button class="check-no">取消</button></div>');
    $.when(checkNewestBanben()).done(function (data) {
        // $('.xtsjgx-ck').html('<p>正在检测中...</p> <div class="xt-jiance"><img src="img/ajax.gif"></div>')
        if(data.status=='true'){
            // alert('data.status');
            $('.xtsjgx-ck').html('<p>检测到您的系统可以更新,是否更新？</p><div class="xtsjgxbtn clearfix"> <button class="xtsjgx-yes-no">取消</button> <button class="xtsjgx-yes-yes">确定</button> </div>')
        }else {
            $('.xtsjgx-ck').html(' <p>检测到您得系统是最新版本!</p> <button class="xtsjgx-no-btn">确定</button>')
        }
    })

});

function zbopenhdzx(){ //----准备开启互动中心
    //alert('准备启动互动中心');
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getYxzx.action',
        data:{
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            //返回true   操作成功！false  操作失败！
            if(data){
                console.log('准备开启互动中心返回值为')
                console.log(data)
                var video=data.data.vedio;
                console.log(video)
                $.when(openhdzx(video)).done(function (data) {
                    if(data.status=='true'){
                        console.log('启动成功');
                    }
                })
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}
function openhdzx(video){ //----互动中心开启
    var defer=$.Deferred();
    //alert('开始启动启动第三方exe');
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:10,
            exeUrl:video
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            defer.resolve(data);
            //返回true   操作成功！false  操作失败！
        },
        error:function (err) {
            console.log(err);
        }
    });
    return defer.promise();
}


$('body').on('click','.check-no',function () {
    $('.xtsjgx').hide();
});
$('body').on('click','.xtsjgx-no-btn',function () {
    $('.xtsjgx').hide();
});
$('body').on('click','.xtsjgx-yes-no',function () {
    $('.xtsjgx').hide();
});
$('body').on('click','.xtsjgx-yes-yes',function () {
    // $('.xtsjgx').hide();
    $('.xtsjgx-ck').html('<p>正在为你下载安装,请勿操作计算机...</p> <div class="xt-jiance"><img src="img/ajax.gif"></div>');
    $.when(loadNewestBan(filenameBb)).done(function (data) {
        if(data.status=='true'){
            $('.xtsjgx-ck').html(' <p>已经为您更新至最新版本，请重新启动</p> <button class="xtsjgx-no-btn">确定</button>');
        }else {
            $('.xtsjgx-ck').html(' <p>安装失败！</p> <button class="xtsjgx-no-btn">确定</button>')
        }
    })
});
// ---- 网络状态点击消失
$('.wlzt button').click(function () {
   $('.wlzt').hide();
});

// -------------------
$("input").focus(function(){
    $(this).val('');
});

// 检测消息界面是否存在训练时长不足的提醒
function checkXLSC(time) {
    $('.xiaoxi-home').find('.no-shuju').remove();  //清除没有数据的提醒
    console.log('检测剩余时长，消息界面及时提醒');
    if(20<time&&time<=30){
        var sytime=30
    }else if(10<time&&time<=20){
        var sytime=20
    }else if(0<time&&time<=10){
        var sytime=10
    }else if(time==0){
        var sytime=0
    }
    // ----消息的时间显示（时间戳）
    var timeList=getInforTime();         //获取时间对象
    var bztime = timeList.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
    var xxtime = getTimeText(bztime);    //对时间进行判断  区别今天/昨天/过去

    var $ele= $('#xxCZXL');
    if ($ele.length == 1) {
        console.log('存在训练时长不足的提醒');
        $ele.find('.sytime').html(sytime);
        $ele.find('.xx_bzTime').html(bztime);
        $ele.find('.xx_Time').html(xxtime);
        var clone = $ele.parents('.xxXx-one').clone(true);
        $ele.parents('.xxXx-one').remove();
        $('.xiaoxi-home').prepend(clone);
        getxxList(); //刷新消息列表
    } else {
        console.log('不存在训练时长不足的提醒');
        $('.xiaoxi-home').prepend('<div class="xxXx-one"><div class="text-inform clearfix" id="xxCZXL"><div class="text-inform-img"><img src=' + './img/Recharge.png' + '> </div> <div class="text-inform-text"> <p class="text-inform-title">友情提示:</p> <p> <span  class="text-inform-remind">您的训练剩余时长不足<span class="sytime">'+sytime+'</span>分钟，为了保证你正常使用训练方案，请尽快充值。</span> <span class="xx_Time">' + xxtime + '</span><span class="xx_bzTime" style="display: none">'+bztime+'</span></p> </div></div><div class="xx-X">删除</div></div>');
        console.log('消息列表已经生成,训练时长不足的提醒');
        getxxList(); //刷新消息列表
    }
    // -------消息界面的最新消息缓存
    var $ele = $('.xiaoxi-home').html();
    localStorage.setItem('xxjmhc', JSON.stringify($ele));
}
// -------------------------------------------------------------
//  检测消息界面是否存在视频时长不足的提醒
function checkSPSC(time) {
    console.log('检测剩余时长，消息界面及时提醒');
    $('.xiaoxi-home').find('.no-shuju').remove();  //清除没有数据的提醒
    if(20<time&&time<=30){
        var sytime=30
    }else if(10<time&&time<=20){
        var sytime=20
    }else if(0<time&&time<=10){
        var sytime=10
    }else if(time==0){
        var sytime=0
    }
    // ----消息的时间显示（时间戳）
    var timeList=getInforTime();         //获取时间对象
    var bztime = timeList.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
    var xxtime = getTimeText(bztime);    //对时间进行判断  区别今天/昨天/过去

    var $ele= $('#xxSPXL');
    if ($ele.length == 1) {
        console.log('存在视频时长不足的提醒');
        $ele.find('.sytime').html(sytime);
        $ele.find('.xx_bzTime').html(bztime);
        $ele.find('.xx_Time').html(xxtime);
        var clone = $ele.parents('.xxXx-one').clone(true);
        $ele.parents('.xxXx-one').remove();
        $('.xiaoxi-home').prepend(clone);
        getxxList(); //刷新消息列表
    } else {
        console.log('不存在视频时长不足的提醒');
        $('.xiaoxi-home').prepend('<div class="xxXx-one"><div class="text-inform clearfix" id="xxSPXL"><div class="text-inform-img"><img src=' + './img/Recharge.png' + '> </div> <div class="text-inform-text"> <p class="text-inform-title">友情提示:</p> <p> <span  class="text-inform-remind">您的视频通话剩余时长不足<span class="sytime">'+sytime+'</span>分钟，为了保证你正常使用视频通话，请尽快充值。</span> <span class="xx_Time">' + xxtime + '</span><span class="xx_bzTime" style="display: none">'+bztime+'</span></p> </div></div><div class="xx-X">删除</div></div>');
        console.log('消息列表已经生成,视频时长不足的提醒');
        getxxList(); //刷新消息列表
    }
    // -------消息界面的最新消息缓存
    var $ele = $('.xiaoxi-home').html();
    localStorage.setItem('xxjmhc', JSON.stringify($ele));
}
function checkNewestBanben() {   //检测服务器更新信息(1)
    var defer=$.Deferred();
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getPatXtgx.action',
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data){
                var size=data.byteSize;
                filenameBb=data.src;
                $.ajax({
                    url: ajaxBd+'MST/upWar',
                    data:{
                        size:size,
                        upType:1
                    },
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        defer.resolve(data);
                        // console.log(data.status=='true')
                        // if (data.status){
                        //                                   //有更新，可以下载
                        // }else {
                        //                                 //没有更新，不能下载
                        // }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            }//判断空
        },
        error: function (err) {
            console.log(err)
            $('.wlzt').show();
        }
    });
    return defer.promise();
}
// function checkNewestBan(type,size,filename) {   //检测最新版本 (2)是否与本地匹配
//     $.ajax({
//         url: ajaxBd+'MST//upWar',
//         data:{
//             size:size,
//             upType:type
//         },
//         type: "POST",
//         dataType: "json",
//         success: function (data) {
//             console.log(data.status)
//             if (data.status=='true'){
//                 loadNewestBan(2,filename); //有更新，可以下载
//             }else {
//                                             //没有更新，不能下载
//             }
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
function loadNewestBan(filename) {  //下载最新版本 (3)
    var defer=$.Deferred();
    $.ajax({
        url: ajaxBd+'MST/upWar',
        type: "POST",
        data:{
            fileName:filename,
            upType:2

        },
        dataType: "json",
        success: function (data) {
            defer.resolve(data);
            console.log(data);
            // if (data.status=='true'){
            //     //成功
            // }
        },
        error: function (err) {
            console.log(err)
        }
    });
    return defer.promise();
}

$('.no_videoChat_btn_btn').click(function () { //医生拒绝了你的视频请求
    $('.no_videoChat').hide();
});

$('.gdsp_btn_btn').click(function () {//对方已经挂断的视频
$('.gdsp').hide();
});
$('.gbqtsp_btn_btn').click(function () { //请您先关闭视频聊天窗口再试
$('.gbqtsp').hide();
});

$('.fwq_no_btn_btn').click(function () {//服务器开小差
$('.fwq_no').hide();
});
$('.csqs_btn_btn').click(function () { //参数缺失
$('.csqs').hide();
});
$('.scbz_btn_btn').click(function () {  //服务器开小差
$('.scbz').hide();
});
$('.lxys_tx_btn_btn').click(function () { //添加分组上限提示
$('.lxys_tx').hide();
});
$('.wlzt_ok-btn').click(function () {  //联网提醒
    $('.wlzt_ok').hide();
});      

// $('.xiazai').attr("href",'http://dl.360safe.com/360zip_setup_3.2.0.2200.exe');
// window.location.href='http://dl.360safe.com/360zip_setup_3.2.0.2200.exe'