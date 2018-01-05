/**
 * Created by Administrator on 2017/9/13.
 */

function getXzList() {                       //下载界面UI(启动完毕)
    $(".xz-but-down").attr('disabled',false);
    var $ele=$('.xz-List').children();
    var eleLen=$ele.length;
    // console.log(eleLen);
    if(eleLen==0){
        $('.xz-List').append('<p class="no-shuju">暂时没有下载记录！</p>')
    }else if(eleLen<=4){
        $ele.eq(0).show();
        $ele.eq(1).show();
        $ele.eq(2).show();
        $ele.eq(3).show();
    }else if(eleLen>4){
        $ele.hide();
        $ele.eq(0).show();
        $ele.eq(1).show();
        $ele.eq(2).show();
        $ele.eq(3).show();
    }
    var fsNum1=parseInt(eleLen/4);// 商
    var fsNum2=eleLen%4;         //余数
    if(fsNum2==0&&fsNum1!=0){
        $('.xzBut-last-page').html(fsNum1);
    }else {
        $('.xzBut-last-page').html(fsNum1+1);
    }
    $('.xzBut-first-page').html(1);
    if(parseInt($('.xzBut-last-page').html())==1){
        $('.xz-but-up').attr('disabled',true);
        $('.xz-but-down').attr('disabled',true);
    }
    $('.xz-but-up').attr('disabled',true);
}

function getXxXzList() {              //点击删除重新加载下载界面 UI
    console.log('已经为你重新布局');
    $(".xz-but-down").attr('disabled',false);
    var $ele=$('.xz-List').children();
    var eleLen=$ele.length;

    var fsNum1=parseInt(eleLen/4);// 商
    var fsNum2=eleLen%4;         //余数
    if(fsNum2==0&&fsNum1!=0){
        $('.xzBut-last-page').html(fsNum1);
    }else {
        $('.xzBut-last-page').html(fsNum1+1);
    }

    var numl= parseInt($('.xzBut-first-page').html());  //当前页
    var numa= parseInt($('.xzBut-last-page').html());   //总页数
    //判断总页数是否小于当前页
    if(numa>=numl){
        var num=4*numl;
        $ele.eq(num-4).show();
        $ele.eq(num-3).show();
        $ele.eq(num-2).show();
        $ele.eq(num-1).show();
    }else {
        //上一页页数与总页数保持一致
        console.log('下一页没有数据了，上一页就是最后一页');
        $('.xzBut-first-page').html(numa);
        var num=4*numa;
        $ele.eq(num-4).show();
        $ele.eq(num-3).show();
        $ele.eq(num-2).show();
        $ele.eq(num-1).show();
    }
    var newnuml= parseInt($('.xzBut-first-page').html());  //当前页
    if(newnuml==numa){                                          //上一页和下一页相同
        $('.xz-but-down').attr('disabled',true);  //下一页不可点击
    }
    if(newnuml==1){                                 //上一页为1
        $('.xz-but-up').attr('disabled',true); //上一页不可点击
    }else {
        $('.xz-but-up').attr('disabled',false);
    }
    if(parseInt(numa)==1){                           //下一页为1
        $('.xz-but-up').attr('disabled',true);
        $('.xz-but-down').attr('disabled',true); //上一页/下一页都不可点击
    }else {
        $('.xz-but-down').attr('disabled',false);
    };
}

$('.xz-but-down').click(function () {
    var numPre=parseInt($('.xzBut-first-page').html());
    var numNext=parseInt($('.xzBut-last-page').html());
    $('.xz-but-up').attr('disabled',false);
    if(numPre+1==numNext){
        $(".xz-but-down").attr("disabled",true).addClass('active');
        $('.xz-but-up').removeClass('active');
        $('.xzBut-first-page').html(numPre+1);
    }else {
        $('.xz-but-down').addClass('active');
        $('.xz-but-up').removeClass('active');
        $('.xzBut-first-page').html(numPre+1);
    }
    var $ele=$('.xz-List').children();
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=4*vv;
    $ele.eq(vvv-4).show();
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
});
$('.xz-but-up').click(function () {
    var numPre=parseInt($('.xzBut-first-page').html());
    $(".xz-but-down").attr('disabled',false);
    if(numPre==2){
        $(".xz-but-up").attr("disabled",true).addClass('active');
        $('.xz-but-down').removeClass('active');
        $('.xzBut-first-page').html(numPre-1);
    }else {
        $('.xz-but-up').addClass('active');
        $('.xz-but-down').removeClass('active');
        $('.xzBut-first-page').html(numPre-1);
    }
    var $ele=$('.xz-List').children();
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=4*vv;
    $ele.eq(vvv-4).show();
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
});
$('.xz-add').click(function () {
   $('.xz-List').prepend('<div class="xz-list-one"> <div><p class="xz-one-yisheng">大脑袋</p></div> <div><p class="xz-one-leimu">下肢</p></div> <div><p class="xz-one-zhiding">2017年7月2日  下午03：12</p></div><div><p class="xz-one-shijian">2017年7月2日  下午03：12</p></div> <div class="zx-one-X">删除</div></div>')
    getXzList();
});
$('body').on('click','.zx-one-X',function () {
    var time=$(this).parents('.xz-list-one').find('.xz-one-shijian').html();

    $(this).parents('.xz-list-one').remove();

    getXxXzList();  //重新布局下载界面
    for(var i=0;i<XZHistory.length;i++){
        if(XZHistory[i].time==time){
            break
        }
    }
    XZHistory.splice(i,1);
    localStorage.setItem('xzdata', JSON.stringify(XZHistory));
    //判断下载方案是否被全部删除
    if($('.xz-List').children().length==0){
        $('.xz-List').append('<p class="no-shuju">还没有下载数据~</p>')
    }
});

function clearxz() {
    localStorage.removeItem('xzdata');
    console.log('清除成功')
}

function getxzhistory(patId,sjc) {
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getPatLoadHistory.action',
        data: {
            pID: patId,
            sjc: sjc
        },
        type: "POST",
        dataType: "json",
        success: function (Data) {
            console.log(Data);
            for(var i=0;i<Data.length;i++){
                var time=getInforTime();
                var data1=time.nowtime.year+'年'+time.nowtime.month+'月'+time.nowtime.day+'日';
                var data2=getTimeText(time.time);
                var data=data1+data2;    //本地时间
                var name=Data[i].uname;
                var time=Data[i].cjsj;
                var type=Data[i].type;
                if(xlItem.length){
                    for(var k=0;k<xlItem.length;k++){
                        if(type==xlItem[k].type){
                            type=xlItem[k].name;
                            break;
                        }
                    }
                }else {
                    var faType= JSON.parse(localStorage.getItem('fatype'));
                    if(faType.length){
                        for(var j=0;j<xlItem.length;j++){
                            if(type==xlItem[j].type){
                                type=xlItem[j].name;
                                break;
                            }
                        }
                    }
                }
                var xzData={
                    user:name,          //医生
                    name:type,          //类型
                    testTime:time,      //制定时间
                    time:data           //下载时间
                };
                console.log(xzData);
                getxzone(xzData)
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
}
//下载的方案展示
function getxzone(xzData) {
    $('.xz-List').find('.no-shuju').remove();
    $('.xz-List').prepend('<div class="xz-list-one"> <div><p class="xz-one-yisheng">'+xzData.user+'</p></div> <div><p class="xz-one-leimu">'+xzData.name+'</p></div> <div><p class="xz-one-zhiding">'+xzData.testTime+'</p></div><div><p class="xz-one-shijian">'+xzData.time+'</p></div> <div class="zx-one-X">删除</div></div>');
    // var CompId=JSON.parse(localStorage.getItem('micId'));
    getXzList();  //刷新下载方案界面
    XZHistory.push(xzData);
    localStorage.setItem('xzdata', JSON.stringify(XZHistory));
    // console.log(XZHistory);
}

$('.wancheng').animate({width: '7rem',}, 1000 );