
//
$('.xx-btn').click(function () {
   $('.xiaoxi-home').show();
   var $ele= $('.xiaoxi-home').children();
    $ele.eq(0).show();
    $ele.eq(1).show();
    $ele.eq(2).show();
    $ele.eq(3).show();
    $ele.eq(4).show();
});

function getxxList() {                     //消息界面UI
    $(".xx-but-down").attr('disabled',false);
    var $ele=$('.xiaoxi-home').children();
    var eleLen=$ele.length;
    // console.log(eleLen);
    if(eleLen==0){
        $('.xiaoxi-home').append('<p class="no-shuju">暂时还未收到消息~</p>')
    }else if(eleLen<=5){
        $ele.eq(0).show();
        $ele.eq(1).show();
        $ele.eq(2).show();
        $ele.eq(3).show();
        $ele.eq(4).show();
    }else if(eleLen>5){
        $ele.hide();
        $ele.eq(0).show();
        $ele.eq(1).show();
        $ele.eq(2).show();
        $ele.eq(3).show();
        $ele.eq(4).show();
    }
    var fsNum1=parseInt(eleLen/5);// 商
    var fsNum2=eleLen%5;         //余数
    if(fsNum2==0&&fsNum1!=0){
        $('.xxBut-last-page').html(fsNum1);
    }else {
        $('.xxBut-last-page').html(fsNum1+1);
    }
    $('.xxBut-first-page').html(1);
    if($('.xxBut-last-page').html()==1){
        $('.xx-but-up').attr('disabled',true);
        $('.xx-but-down').attr('disabled',true);
    }
    $('.xx-but-up').attr('disabled',true);
}

function getdelxxList() {   //点击删除重新加载信息界面UI
    console.log('已经为你重新布局');
    $(".xx-but-down").attr('disabled',false);
    var $ele=$('.xiaoxi-home').children();
    var eleLen=$ele.length;

    var fsNum1=parseInt(eleLen/5);// 商
    var fsNum2=eleLen%5;         //余数
    if(fsNum2==0&&fsNum1!=0){
        $('.xxBut-last-page').html(fsNum1);
    }else {
        $('.xxBut-last-page').html(fsNum1+1);
    }

    var numl= parseInt($('.xxBut-first-page').html());  //当前页
    var numa= parseInt($('.xxBut-last-page').html());   //总页数
    //判断总页数是否小于当前页
    if(numa>=numl){
        var num=5*numl;
        $ele.eq(num-5).show();
        $ele.eq(num-4).show();
        $ele.eq(num-3).show();
        $ele.eq(num-2).show();
        $ele.eq(num-1).show();
    }else {
        //上一页页数与总页数保持一致
        console.log('下一页没有数据了，上一页就是最后一页');
        $('.xxBut-first-page').html(numa);
        var num=5*numa;
        $ele.eq(num-5).show();
        $ele.eq(num-4).show();
        $ele.eq(num-3).show();
        $ele.eq(num-2).show();
        $ele.eq(num-1).show();
    }
    var newnuml= parseInt($('.xxBut-first-page').html());  //当前页
    if(newnuml==numa){                                          //上一页和下一页相同
        $('.xx-but-down').attr('disabled',true);  //下一页不可点击
    }
    if(newnuml==1){                                 //上一页为1
        $('.xx-but-up').attr('disabled',true); //  上一页不可点击
    }else {
        $('.xx-but-up').attr('disabled',false);
    }
    if(parseInt(numa)==1){                           //下一页为1
        $('.xx-but-up').attr('disabled',true);
        $('.xx-but-down').attr('disabled',true); //上一页/下一页都不可点击
    };
}


$('.xx-but-down').click(function () {
    var numPre=parseInt($('.xxBut-first-page').html());
    var numNext=parseInt($('.xxBut-last-page').html());
    $('.xx-but-up').attr('disabled',false);
    if(numPre+1==numNext){
        $(".xx-but-down").attr("disabled",true).addClass('active');
        $('.xx-but-up').removeClass('active');
        $('.xxBut-first-page').html(numPre+1);
    }else {
        // console.log('ccccc')
        $('.xx-but-down').addClass('active');
        $('.xx-but-up').removeClass('active');
        $('.xxBut-first-page').html(numPre+1);
    }
    var $ele=$('.xiaoxi-home').children();
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=5*vv;
    $ele.eq(vvv-5).show();
    $ele.eq(vvv-4).show();
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
});
$('.xx-but-up').click(function () {
    var numPre=parseInt($('.xxBut-first-page').html());
    $(".xx-but-down").attr('disabled',false);
    if(numPre==2){
        $(".xx-but-up").attr("disabled",true).addClass('active');
        $('.xx-but-down').removeClass('active');
        $('.xxBut-first-page').html(numPre-1);
    }else {
        $('.xx-but-up').addClass('active');
        $('.xx-but-down').removeClass('active');
        $('.xxBut-first-page').html(numPre-1);
    }
    var $ele=$('.xiaoxi-home').children();
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=5*vv;
    $ele.eq(vvv-5).show();
    $ele.eq(vvv-4).show();
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
});
$('body').on('click','.xx-X',function (e) {
    e.stopPropagation;
    $(this).parents('.xxXx-one').remove();
    getdelxxList();   //刷新信息界面
    var $ele = $('.xiaoxi-home').html();
    localStorage.setItem('xxjmhc', JSON.stringify($ele));
});
$('body').on('mouseenter','.xxXx-one',function (e) {
    $(this).find('.xx-X').fadeIn(0);
});
$('body').on('mouseleave','.xxXx-one',function (e) {
    $(this).find('.xx-X').fadeOut(0);
});

$('body').on('click','.ys-fxcp',function () {
    var str=$(this).find('.splj').html();
    var spname=$(this).find('.spname').html();
    $('.fxMoney').show();
    $('.fx-name').html(spname);
    var bodyFs=parseInt($('body').css('font-size'));
    $("#fxpay").empty();
    $("#fxpay").qrcode({
        render: "table",
        width: 3.6*bodyFs,
        height:3.6*bodyFs,
        text: str
    });
});
$('.fxpay-X').click(function () {
    $('.fxMoney').hide();
});
// --------------
// $('#addEle').click(function () {
//     $('.xiaoxi-home').prepend('<div class="xxXx-one"><div class="pic-inform clearfix"><div class="pic-inform-pic"> <div class="xx-noRead" style="display: none"></div> <img src=' + './img/2.png' + '> </div> <div class="pic-inform-text"> <p class="pic-inform-user">111111111</p> <p> <span class="pic-inform-textT">wwwwwwwwwwwwwwwwwww</span> <span class="xx_Time"></span><span class="xx_bzTime" style="display: none"></span></p> </div></div><div class="xx-X">删除</div></div>');
//     getxxList();
// });
