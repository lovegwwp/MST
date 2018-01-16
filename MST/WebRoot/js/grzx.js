
//                               个人中心导航
$('.grzx-btn').click(function () {
    $('.grzx-content').show().siblings().hide();
    $('.gr-home').show();
    $('.grzx-home').eq(0).show().siblings().hide();
    $(".chongzhi-sp").hide();
    $(".chongzhi-xl").hide();
});

// ------------------------------------------------点击进入充值界面
$('.tonghua-chongzhi').click(function () {
    $('.chongzhi-sp').show().siblings().hide();
});
$('.xunlian-chongzhi').click(function () {
    $('.chongzhi-xl').show().siblings().hide();
});
// --------------------------------------------充值选择
$('body').on('click','.cz-priceOne',function () {
    $(this).addClass('cz-active').siblings().removeClass('cz-active');
});
// --------------------------------------------------训练 充值分页

function getxlfy1() {
   var $ele=$('.cz-priceList-sp').children();
   if($ele.length<5){
       $ele.eq(0).show();
       $ele.eq(1).show();
       $ele.eq(2).show();
       $ele.eq(3).show();
       $ele.eq(4).show();
   }else if($ele.length>5){
       $ele.hide();
       $ele.eq(0).show();
       $ele.eq(1).show();
       $ele.eq(2).show();
       $ele.eq(3).show();
       $ele.eq(4).show();
   }
    $ele.eq(0).addClass('cz-active');
    var eleLen=$ele.length;
    var fsNum1=parseInt(eleLen/5);// 商
    var fsNum2=eleLen%5;         //余数
    if(fsNum2==0&&fsNum1!=0){
        $('.cz-last-page1').html(fsNum1);
    }else {
        $('.cz-last-page1').html(fsNum1+1);
    }
    $('.cz-first-page1').html(1);

    if($('.cz-last-page1').html()==1){
        $('.cz-goUp1').attr('disabled',true);
        $('.cz-goDown1').attr('disabled',true);
    }
    $('.cz-goUp1').attr('disabled',true);
}

function getxlfy2() {
    var $ele=$('.cz-priceList-xl').children();
    if($ele.length<5){
        $ele.eq(0).show().addClass('cz-active');
        $ele.eq(1).show();
        $ele.eq(2).show();
        $ele.eq(3).show();
        $ele.eq(4).show();
    }else if($ele.length>5){
        $ele.hide();
        $ele.eq(0).show().addClass('cz-active');
        $ele.eq(1).show();
        $ele.eq(2).show();
        $ele.eq(3).show();
        $ele.eq(4).show();
    }
    // $ele.eq(0).addClass('cz-active');
    var eleLen=$ele.length;
    var fsNum1=parseInt(eleLen/5);// 商
    var fsNum2=eleLen%5;         //余数
    if(fsNum2==0&&fsNum1!=0){
        $('.cz-last-page2').html(fsNum1);
    }else {
        $('.cz-last-page2').html(fsNum1+1);
    }
    $('.cz-first-page2').html(1);

    if($('.cz-last-page2').html()==1){
        $('.cz-goUp2').attr('disabled',true);
        $('.cz-goDown2').attr('disabled',true);
    }
    $('.cz-goUp2').attr('disabled',true);
}

$('.cz-goDown1').click(function () {
    var numPre=parseInt($('.cz-first-page1').html());
    var numNext=parseInt($('.cz-last-page1').html());
    $(".cz-goUp1").attr('disabled',false);

    if(numPre+1==numNext){
        $(".cz-goDown1").attr("disabled",true).addClass('active');
        $('.cz-goUp1').removeClass('active');
        $('.cz-first-page1').html(numPre+1);
    }else {
        $('.cz-goDown1').addClass('active');
        $('.cz-goUp1').removeClass('active');
        $('.cz-first-page1').html(numPre+1);
    }
    var $ele=$('.cz-priceList-sp').children();
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=5*vv;
    $ele.eq(vvv-5).show().addClass('cz-active').css('marginLeft','0');
    $ele.eq(vvv-4).show().removeClass('cz-active');
    $ele.eq(vvv-3).show().removeClass('cz-active');
    $ele.eq(vvv-2).show().removeClass('cz-active');
    $ele.eq(vvv-1).show().removeClass('cz-active');
});

$('.cz-goUp1').click(function () {
    var numPre=parseInt($('.cz-first-page1').html());
    // var numNext=parseInt($('.cz-last-page1').html());
    $(".cz-goDown1").attr('disabled',false);
    if(numPre==2){
        $(".cz-goUp1").attr("disabled",true).addClass('active');
        $('.cz-goDown1').removeClass('active');
        $('.cz-first-page1').html(numPre-1);
    }else {
        $('.cz-goUp1').addClass('active');
        $('.cz-goDown1').removeClass('active');
        $('.cz-first-page1').html(numPre-1);
    }
    var $ele=$('.cz-priceList-sp').children();
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=5*vv;
    $ele.eq(vvv-5).show().addClass('cz-active').css('marginLeft','0');
    $ele.eq(vvv-4).show().removeClass('cz-active');
    $ele.eq(vvv-3).show().removeClass('cz-active');
    $ele.eq(vvv-2).show().removeClass('cz-active');
    $ele.eq(vvv-1).show().removeClass('cz-active');
});

// -----------------------------
$('.cz-goDown2').click(function () {
    var numPre=parseInt($('.cz-first-page2').html());
    var numNext=parseInt($('.cz-last-page2').html());
    $(".cz-goUp2").attr('disabled',false);
    if(numPre+1==numNext){
        $(".cz-goDown2").attr("disabled",true).addClass('active');
        $('.cz-goUp2').removeClass('active');
        $('.cz-first-page2').html(numPre+1);
    }else {
        $('.cz-goDown2').addClass('active');
        $('.cz-goUp2').removeClass('active');
        $('.cz-first-page2').html(numPre+1);
    }
    var $ele=$('.cz-priceList-xl').children();
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=5*vv;
    $ele.eq(vvv-5).show().addClass('cz-active').css('marginLeft','0');
    $ele.eq(vvv-4).show().removeClass('cz-active');
    $ele.eq(vvv-3).show().removeClass('cz-active');
    $ele.eq(vvv-2).show().removeClass('cz-active');
    $ele.eq(vvv-1).show().removeClass('cz-active');
});

$('.cz-goUp2').click(function () {
    var numPre=parseInt($('.cz-first-page2').html());
    $(".cz-goDown2").attr('disabled',false);
    if(numPre==2){
        $(".cz-goUp2").attr("disabled",true).addClass('active');
        $('.cz-goDown2').removeClass('active');
        $('.cz-first-page2').html(numPre-1);
    }else {
        $('.cz-goUp2').addClass('active');
        $('.cz-goDown2').removeClass('active');
        $('.cz-first-page2').html(numPre-1);
    }
    var $ele=$('.cz-priceList-xl').children();
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=5*vv;
    $ele.eq(vvv-5).show().addClass('cz-active').css('marginLeft','0');
    $ele.eq(vvv-4).show().removeClass('cz-active');
    $ele.eq(vvv-3).show().removeClass('cz-active');
    $ele.eq(vvv-2).show().removeClass('cz-active');
    $ele.eq(vvv-1).show().removeClass('cz-active');
});


// -------------------------------------------------

//充值金额数据
function getCz() {
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getZfszBy.action',
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data){
                var THCZ=data.TH;
                var XLCZ=data.SP;
                for(var i=0;i<THCZ.length;i++){
                    $('.cz-priceList-sp').append('<div class="cz-priceOne"> <p class="cz-type">视频通话</p> <p><span class="cz-money">'+THCZ[i].modelMoney+'</span><span>元</span></p> <p><span class="cz-minute">'+THCZ[i].modelTime+'</span><span>分钟</span></p> </div>')
                }
                for(var i=0;i<XLCZ.length;i++){
                    $('.cz-priceList-xl').append('<div class="cz-priceOne"> <p class="cz-type">训练时长</p> <p><span class="cz-money">'+XLCZ[i].modelMoney+'</span><span>元</span></p> <p><span class="cz-minute">'+XLCZ[i].modelTime+'</span><span>分钟</span></p> </div>')
                }
            }
            getxlfy1();
            getxlfy2();
        },
        error: function (err) {
            console.log('检测到断网,充值数据请求失败');
        }
    })
}



// --------------------------------------------选择地址

$(".xuanzedizhi").click(function (e) {
    $('#city').attr('disabled',false).val('');
    SelCity($('#city')[0],e);
    $('#city').attr('disabled',true);
    $('.jiedao').attr('disabled',false).val('');
    $('.add-queren').show();
});

$('.add-queren').click(function () {
    var sheng=$('.br-address').find('input').eq(3).val();
    var shi=$('.br-address').find('input').eq(2).val();
    var qu=$('.br-address').find('input').eq(1).val();
    var jiedao=$('.jiedao').val();
    if(sheng&&shi&&qu&&jiedao){
        console.log(sheng);
        console.log(shi);
        console.log(qu);
        console.log(jiedao);
        $(this).hide('2000');
        $('.jiedao').attr('disabled',true);
        $.ajax({
            url: ajaxStr+'MSTYL/pat/upPatbyPat.action',
            data:{
                province:sheng,
                city:shi,
                area:qu,
                addr:jiedao,
                id:patId
            },
            type: "POST",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.status=='true'){
                    console.log('更新地址成功');
                    getGrxinxi();
                }else {
                    $('.fwq_no').show();
                }

            },
            error:function (err) {
                console.log(err);
                $('.fwq_no').show();
            }
        })
    }else {
        $('.csqs').show();
    }
});

//
function getGrxinxi() {
    $.ajax({
        url: ajaxStr+'MSTYL/getMe.action',
        async: false,
        type: "GET",
        data:{
            account:MacID
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data){
                localStorage.setItem('Grzx',JSON.stringify(data));
                console.log('个人中心已经缓存');
                GrzxUI(data);
                checkSchc();    //检测是否存在本地缓存时长(放在此处避免延迟导致的时长减双倍);
            }else {
                console.log('获取到的个人中心资源为空');
            }

            // console.log(data);
        },
        error:function (err) {
            console.log('没有加载到个人数据');
            var grzx=localStorage.getItem('Grzx');
            var OldGrzx=JSON.parse(grzx);
            if(OldGrzx==null){
                console.log('检测到断网，拿到个人中心缓存，但是为空')
            }else if(OldGrzx){
                GrzxUI(OldGrzx);
            }
        }
    });
}

function GrzxUI(data) {
    myImg=data.avatar;   //我的头像
    $('.grzx-xinxi').siblings().remove();
    $('.ess-userld').html(data.id);
    $('.ess-username').html(data.uname);
    if(data.sex==0){
        var sex='女';
    }else {
        var sex='男';
    }
    //第一页(基础信息)Ul
    meName=data.uname
    meAge=data.age;
    meSex=sex;
    meId=data.id;
    console.log(meName)
    console.log(meAge)
    console.log(sex)
    console.log(meId)
    $('.ess-usersex').html(sex);
    $('.ess-userage').html(data.age);
    $('.ess-MshebeiID').html(data.account);
    var address=data.province+'-'+data.city+"-"+data.area;
    $('#city').val(address);
    $('.jiedao').val(data.addr);
    $('.essCase-userid').html(data.blId);
    $('.essCase-userlishou').html(data.ls);
    $('.essCase-userhuance').html(data.hc);
    $('.essCase-userbuwei').html(data.cxbw);
    $('.essCase-userdaxiao').html(data.cxdx);
    var date=data.zdList;
    console.log(date);
    console.log(date.length);
    // 第二页Ul
    for(var i=0;i<date.length;i++){
        $('.grzx-main').append('<div class="grzx-home" style="display: none" > <div class="grzx-home-one"> <div class="grzx-home-text1 clearfix"> <p class="ess-leshiList clearfix"> <span class="ess-keshi">住院科室</span> <span class="ess-userkeshi">'+date[i].ksName+'</span> </p> <p> <span class="ess-bingqu">病区</span> <span class="ess-userbingqu">'+date[i].bq+'</span> </p> </div> <div class="grzx-home-text2 clearfix"> <p class="ess-jiben">基本情况</p> <p class="ess-userjiben" >'+date[i].jbqk+'</p> </div> <div class="grzx-home-text3 clearfix"> <p class="ess-zhenduan">诊断</p> <p class="ess-userzhenduan">'+date[i].zd+'</p> </div> </div> </div>')
    }

    //账号剩余时长
    $('.cz-userzhanghao1').html(MacID); //充值账号
    $('.cz-userzhanghao2').html(MacID);//充值账号
    // -----训练方案  通话时长
    $('.fa-sythsc').html(data.talkTime);
    console.log('视频通话时长剩余时长'+data.talkTime);
    if(20<data.talkTime&&data.talkTime<=30){
        $('.fa-sythsc').css('color','red');            //训练时长 剩余时间红色;
        checkSPSC(30);                                      //消息界面出现提示充值
    }else if(10<data.talkTime&&data.talkTime<=20){
        $('.fa-sythsc').css('color','red');            //训练时长 剩余时间红色;
        checkSPSC(20);                                      //消息界面出现提示充值
    }else if(0<data.talkTime&&data.talkTime<=10){
        $('.fa-sythsc').css('color','red');            //训练时长 剩余时间红色;
        checkSPSC(10);                                      //消息界面出现提示充值
    }else if(data.talkTime<=0){
        $('.fa-sythsc').html(0);
        $('.fa-sythsc').css('color','red');
        checkSPSC(0);                                      //消息界面出现提示充值
    }
    //---训练方案  训练时长
    $('.fa-syxlsc').html(data.videoTime);
    console.log('训练方案观看剩余剩余时长'+data.videoTime);
    if(20<data.videoTime&&data.videoTime<=30){
        $('.fa-syxlsc').css('color','red');            //训练时长 剩余时间红色
        checkXLSC(30);                                      //消息界面出现提示充值
    }else if(10<data.videoTime&&data.videoTime<=20){
        $('.fa-syxlsc').css('color','red');            //训练时长 剩余时间红色
        checkXLSC(20);                                      //消息界面出现提示充值
    }else if(0<data.videoTime&&data.videoTime<=10){
        $('.fa-syxlsc').css('color','red');            //训练时长 剩余时间红色
        checkXLSC(10);                                      //消息界面出现提示充值
    } else if(data.videoTime<=0){
        $('.fa-syxlsc').html(0);
        $('.fa-syxlsc').css('color','red');
        $('.xl-days-one-btn').attr('disabled',true);  //训练时长 按钮全部设置为不可点击
        checkXLSC(0);                                      //消息界面出现提示充值
    }
    getgrzxfy();
}

// --------------------------------------------个人中心分页
//点击支付

$('.cz-zhifu').click(function () {
    var $ele=$(this).parents('.chongzhi').find('.cz-active:visible');
    $('.payMenoy').show();
    $('.payLoading').show();
    var money=$ele.find('.cz-money').html();    //充值金额
    var minute=$ele.find('.cz-minute').html();  //充值时长
    var type=$ele.find('.cz-type').html();
    if(type=='视频通话'){
        type=3
    }else {
        type=2
    }
    console.log('充值金额'+money+',时长'+minute+'，类型'+type+',设备号'+MacID);
    $.when(getQrcodestr(money,type,minute,MacID)).done(function (data) {
        console.log(data);
        $('.payLoading').hide();
        $('.pay-code').show();
        if(data.status=='true'){
            var str=data.qrcode;
            var bodyFs=parseInt($('body').css('font-size'));
            $("#codeShow").empty();
            $('.pay-time').html('30:00') ;
            $("#codeShow").qrcode({
                render: "table",
                width: 3.6*bodyFs,
                height:3.6*bodyFs,
                text: str
            });
            Countdown();
        }else {
            $('.payMenoy').find('.pay-code').html('<p style="line-height: 7rem;font-size: .4rem;text-align: center">很遗憾，此用户不存在~</p>');
            //关闭二维码页面
            var ele=document.getElementsByClassName('payMenoy-X')[0];
            ele.onclick=function () {
                $('.payMenoy').hide();
                $('.payLoading').hide();
                $('.pay-code').hide();
            }
        }
    });

});

//显示支付二维码
function showQrcode(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
};
//后台获取str
function getQrcodestr(money,type,minute,MacID) {
    var defer=$.Deferred();
    $.ajax({
        url: ajaxStr+'MSTYL/pat/wxpay.action',
        data: {
            money:money,
            type:type,
            timeAccount:minute,
            macId :MacID,
        },
        type: "post",
        dataType: "json",
        success: function (data) {
            console.log(data);
            defer.resolve(data);
        },
        error: function (error) {
            console.log('error');
            $('.payLoading').hide();
            $('.pay-code').show().html('<p style="line-height: 7rem;font-size: .4rem;text-align: center">服务器开了小差，请重新确认~</p>');
            //关闭二维码页面
            var ele=document.getElementsByClassName('payMenoy-X')[0];
            ele.onclick=function () {
                $('.payMenoy').hide();
                $('.payLoading').hide();
                $('.pay-code').hide();
            }
        }
    });
    return defer.promise();
}
//二维码支付计时器
function Countdown() {
    var x = 30, interval;
    var d = new Date("1111/1/1,0:" + x + ":0");
    interval = setInterval(function() {
        var m = d.getMinutes();
        var s = d.getSeconds();
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
         $('.pay-time').html(m + ":" + s) ;
        if (m == 0 && s == 0) {
            clearInterval(interval);
            $('.payMenoy').hide();
            return;
        }
        d.setSeconds(s - 1);
    }, 1000);
    //关闭二维码页面
    var ele=document.getElementsByClassName('payMenoy-X')[0];
    ele.onclick=function () {
        clearInterval(interval);
        $('.payMenoy').hide();
        $('.payLoading').hide();
        $('.pay-code').hide();
    }
}

//个人中心分页数
function getgrzxfy() {
    var grnum=$('.grzx-home').length;
    $('.gr-last-page').html(grnum);
    if(grnum==1){
        $('.gr-goUp').attr('disabled',true);
        $(".gr-goDown").attr('disabled',true);
    }else {
        $('.gr-goUp').attr('disabled',true);
    };
};

$('.gr-goDown').click(function () {
    var numPre=parseInt($('.gr-first-page').html());
    var numNext=parseInt($('.gr-last-page').html());
    $('.gr-goUp').attr('disabled',false);
    if(numPre+1==numNext){
        $(".gr-goDown").attr("disabled",true).addClass('active');
        $('.gr-goUp').removeClass('active');
        $('.gr-first-page').html(numPre+1);
    }else {
        $('.gr-goDown').addClass('active');
        $('.gr-goUp').removeClass('active');
        $('.gr-first-page').html(numPre+1);
    }
    $('.grzx-home').eq(numPre).show().siblings().hide();
});
$('.gr-goUp').click(function () {
    var numPre=parseInt($('.gr-first-page').html());
    $(".gr-goDown").attr('disabled',false);
    if(numPre==2){
        $(".gr-goUp").attr("disabled",true).addClass('active');
        $('.gr-goDown').removeClass('active');
        $('.gr-first-page').html(numPre-1);
    }else {
        $('.gr-goUp').addClass('active');
        $('.gr-goDown').removeClass('active');
        $('.gr-first-page').html(numPre-1);
    }
    $('.grzx-home').eq(numPre-2).show().siblings().hide()
});

