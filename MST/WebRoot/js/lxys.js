/**
 * Created by Administrator on 2017/8/21.
 */
// -------------------联系医生btn
$('.lxys-btn').click(function () {
    $('.lx-main').show().children().hide();
    $('.lx-main-home').hide();
    $('.search-show1').show();
    $('.lx-search').show();
    $('.lx-add-fenzu').show();
    $('.lx-search-test').val('');
});

// ---------------------搜索医生
$('.lx-search-btn').click(function () {
    $('this').attr('disabled',true);
    var lxCondition=$('.lx-search-test').val();
    if(lxCondition==''){
        $('.csqs').show();
    }else {
        $('.search-show1').hide();
        $('.lx-search-show').show();
        $('.search-showList').html('');
        $('.lx-s-loading').show();
        $.when(getYisheng(lxCondition)).done(function (data) {
            console.log(data);//搜索到医生的数组集合[{},{},{}]
            $('.search-showList').html('');
            //搜索到的好友  UI界面效果
            $('.lx-s-loading').hide();

            if(data==null){
                $('.myhy').show();
                var ele=document.getElementsByClassName('myhy-btn')[0];
                ele.onclick=function () {
                    $('.myhy').hide();
                }
            }else if(data.length>0){
                // ----判断翻页
                var eleLen=data.length;
                var fsNum1=parseInt(eleLen/4);   //商
                var fsNum2=eleLen%4;  //余数
                if(fsNum2==0&&fsNum1!=0){
                    $('.lx-s-last-page').html(fsNum1);
                }else {
                    $('.lx-s-last-page').html(fsNum1+1);
                }
                $('.lx-s-first-page').html(1);
                // ----内容
                for(var i=0;i<eleLen;i++){
                    var myclone=$('#lx-search-clone').clone(true);
                    var lxTest=data[i].abstracts;
                    myclone.removeAttr('id');
                    myclone.find('.lx-friend-Pic').attr('src',ajaxStr+data[i].avatar);
                    myclone.find('.int1-name').html(data[i].uname);
                    myclone.find('.ysID').html(data[i].id);
                    for(var h=0;h<data[i].scores;h++){
                        myclone.find('.int1-pingjia').append('<img src="./img/3@2x.png">');
                    }

                    var label=data[i].lableNames;
                    // console.log(label)
                    if(label==null){

                    }else if (label.length>0){
                        var num=1;
                        var newlabel=label.split(',');
                        // console.log(newlabel)
                        for(var j=0;j<newlabel.length;j++){
                            if (num<5){
                                myclone.find('.int1-right-label').append('<div><img class="label-icon" src=./img/label'+num+'.png><span>'+newlabel[j]+'</span></div>')
                            }else {
                                break;
                            }
                            num++;
                        }
                    }
                    myclone.find('.int1-zhiwei').html(data[i].job);
                    myclone.find('.yiyuanmingchengi').html(data[i].dw_name);
                    myclone.find('.keshi').html(data[i].ks_name);
                    if(lxTest==null){

                    }else if(lxTest.length>60){
                        myclone.find('.int1-right-text1').html(lxTest.slice(0,70)+'......[详情]');
                    }else {
                        myclone.find('.int1-right-text1').html(lxTest);
                    }
                    $('.search-showList').append(myclone);
                    $('.search-showList').children().hide();
                }
                var $ele= $('.search-showList').children();
                var $eleLen=$ele.length;
                $ele.eq(0).show();
                $ele.eq(1).show();
                $ele.eq(2).show();
                $ele.eq(3).show();
                $('.lx-search-btn').attr('disabled',false);
                var num=$('.lx-s-last-page').html();
                // console.log(parseInt(num))
                if(parseInt(num)==1){
                    $('.lx-s-goUp').attr('disabled',true);
                    $('.lx-s-goDown').attr('disabled',true);
                }else {
                    $('.lx-s-goDown').attr('disabled',false);
                }
                $('.lx-s-goUp').attr('disabled',true);
            }else {
                $('.myhy').show();
                var ele=document.getElementsByClassName('myhy-btn')[0];
                ele.onclick=function () {
                    $('.myhy').hide();
                }
            }
        })

    }
});

// ------------------------------------------------搜索医生结果
function getYisheng(lxCondition) {
    var defer=$.Deferred();
    $.ajax({
        url:ajaxStr+'MSTYL/getDocsByPat.action',
        data:{
            searchBy:lxCondition
        },
        type:"GET",
        dataType: "json",
        success:function (data) {
            defer.resolve(data);

        },
        error:function (err) {
            console.log(err);
        }
    });
    return defer.promise();
}

$('.lx-s-goDown').click(function () {
    var numPre=parseInt($('.lx-s-first-page').html());
    var numNext=parseInt($('.lx-s-last-page').html());
    $('.lx-s-goUp').attr('disabled',false);
    if(numPre+1==numNext){
        $(".lx-s-goDown").attr("disabled",true).addClass('active');
        $('.lx-s-goUp').removeClass('active');
        $('.lx-s-first-page').html(numPre+1);
    }else {
        $('.lx-s-goDown').addClass('active');
        $('.lx-s-goUp').removeClass('active');
        $('.lx-s-first-page').html(numPre+1);
    }
    var $ele=$('.search-showList').children();
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=4*vv;
    $ele.eq(vvv-4).show();
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
});
$('.lx-s-goUp').click(function () {
    var numPre=parseInt($('.lx-s-first-page').html());
    $(".lx-s-goDown").attr('disabled',false);
    if(numPre==2){
        $(".lx-s-goUp").attr("disabled",true).addClass('active');
        $('.lx-s-goDown').removeClass('active');
        $('.lx-s-first-page').html(numPre-1);
    }else {
        $('.lx-s-goUp').addClass('active');
        $('.lx-s-goDown').removeClass('active');
        $('.lx-s-first-page').html(numPre-1);
    }
    var $ele=$('.search-showList').children();
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=4*vv;
    $ele.eq(vvv-4).show();
    $ele.eq(vvv-3).show();
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
});

// --------------------------------------------编辑分组
$('.lx-edit-fenzu').click(function () {
    $(this).parent('.lx-friendListOne').addClass('zhengzai');
     groupName=$(this).siblings('p').html();
    $('.bianjifenzuList').show().find('input').val(groupName);
});

$('.bianji-quxiao').click(function () {
    $('.search-show1').show();
    $('.lx-search-show').hide();
    $('.bianjifenzuList').hide();
});
$('.bianji-queding').click(function () {
    var b=$(this).parent().siblings('input').val();
    if(b==''){
        $('.csqs').show();
    }else {
        $.ajax({
            url: ajaxStr+'MSTYL/pat/bjfz.action',
            data: {
                newGroupName:b,
                pId:patId,
                groupName:groupName
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                // console.log(data);
                var flog=data.status;
                if(flog=='true'){
                    $('.search-show1').show();
                    $('.bianjifenzuList').hide();
                    $('.lx-search-show').hide();
                    $.when(getUserList()).done(function (data) {
                        getUserListUI(data);
                    });

                } else {
                    $('.fwq_no').show();
                }
            },
            error:function (err) {
                // console.log(err);
                $('.fwq_no').show();
            }
        });

    }
});

//收起分组
// $('body').on('click','.fenzu-mingcheng',function () {
//    $(this).parents('.lx-friendListOne').find('.lx-friend-one').hide(2000);
// });

// ----------------------------------------添加分组
$('.lx-add-fenzu').click(function () {
    $('.tianjiafenzuList').show();
    $('.tjnewfenzu').val('');
});
$('.tianjia-quxiao').click(function () {
    $('.tianjiafenzuList').hide();
});
$('.tianjia-queding').click(function () {
    if($('.fenzuList1').is(':visible')){
        //添加分组正在 添加好友选择分组的页面
        // console.log('当前存在添加好友分组');
        var num=0;
        var tjValue=$('.tjnewfenzu').val();
        var xinzu=document.getElementsByClassName('zu');
        // console.log((xinzu.length));
        if(xinzu.length<7){
            if(tjValue==''){
                $('.csqs').show();
                num=1;
            }else {
                for(var d=0;d<xinzu.length;d++){
                    var zuming=$('.zu').eq(d).find('.fenzu-mingcheng').html();
                    if(tjValue==zuming){
                        var str='此分组已经存在！';
                        $('.lxys_tx').show().find('.lxys_tx_text').html(str);
                        num=1;
                        break;
                    }
                }
            }
            if(num==0){
                $.ajax({
                    url: ajaxStr+'MSTYL/pat/xzfz.action',
                    data: {
                        pId:patId,
                        groupName:tjValue
                    },
                    async: false,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        $('.fenzuList-b1').append('<p class="zuming-Listone">'+tjValue+'</p>');
                        $.when(getUserList()).done(function (data) {
                            getUserListUI(data);
                        });
                    },
                    error:function (err) {
                        console.log(err);
                        $('.fwq_no').show();
                    }
                });
                $('.tianjiafenzuList').hide();
            }
        }else {
            var str='抱歉，您最多添加7个分组!';
            $('.lxys_tx').show().find('.lxys_tx_text').html(str);
            $('.tianjiafenzuList').hide();
        }
    }else if($('.fenzuList').is(':visible')){
        //添加分组正在 移至好友分组的页面
        var num=0;
        var tjValue=$('.tjnewfenzu').val();
        var xinzu=document.getElementsByClassName('zu');
        // console.log((xinzu.length));
        if(xinzu.length<7){
            if(tjValue==''){
                $('.csqs').show()
                num=1;
            }else {
                for(var d=0;d<xinzu.length;d++){
                    var zuming=$('.zu').eq(d).find('.fenzu-mingcheng').html();
                    if(tjValue==zuming){
                        var str='此分组已经存在!';
                        $('.lxys_tx').show().find('.lxys_tx_text').html(str);
                        num=1;
                        break;
                    }
                }
            }
            if(num==0){
                $.ajax({
                    url: ajaxStr+'MSTYL/pat/xzfz.action',
                    data: {
                        pId:patId,
                        groupName:tjValue
                    },
                    async: false,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        var str='添加分组成功!';
                        $('.lxys_tx').show().find('.lxys_tx_text').html(str);
                        $('.fenzuList-b').append('<p class="zuming-Listone">'+tjValue+'</p>');
                        $.when(getUserList()).done(function (data) {
                            getUserListUI(data);
                        });
                    },
                    error:function (err) {
                        console.log(err);
                        $('.fwq_no').show();
                    }
                });
                $('.tianjiafenzuList').hide();
            }
        }else {
            var str='抱歉，您最多添加7个分组!';
            $('.lxys_tx').show().find('.lxys_tx_text').html(str);
            $('.tianjiafenzuList').hide();
        }
    }
    else {
        //单纯添加分组
        var num=0;
        var tjValue=$('.tjnewfenzu').val();
        var xinzu=document.getElementsByClassName('zu');
        // console.log((xinzu.length));
        if(xinzu.length<7){
            if(tjValue==''){
                $('.csqs').show();
                num=1;
            }else {
                for(var d=0;d<xinzu.length;d++){
                    var zuming=$('.zu').eq(d).find('.fenzu-mingcheng').html();
                    if(tjValue==zuming){
                        var str='此分组已经存在,请添加新的分组！';
                        $('.lxys_tx').show().find('.lxys_tx_text').html(str);
                        num=1;
                        break;
                    }
                }
            }
            if(num==0){
                $.ajax({
                    url: ajaxStr+'MSTYL/pat/xzfz.action',
                    data: {
                        pId:patId,
                        groupName:tjValue
                    },
                    async: false,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        // alert('添加分组成功');
                        $.when(getUserList()).done(function (data) {
                            getUserListUI(data);
                        });
                    },
                    error:function (err) {
                        console.log(err);
                        $('.fwq_no').show();
                    }
                });
                $('.tianjiafenzuList').hide();
            }
        }else {
            var str='抱歉，您最多添加7个分组!';
            $('.lxys_tx').show().find('.lxys_tx_text').html(str);
            $('.tianjiafenzuList').hide();
        }
    }

});
// --------获取医生列表信息
function getUserList() {
    $('.lx-my-friendList').html('<div  class="ys-loading" style="text-align: center"><img src="./img/ajax.gif"></div>'); //把原数据去除（包括没有数据的提示）;
    var defer=$.Deferred();
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getPFriend.action',
        data: {
            pId:patId
        },
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log('我的好友列表数据');
            console.log(data);
            defer.resolve(data);
        },
        error: function (err) {
            console.log(err);
            //获取医生列表失败，拿到对应的缓存医生iD Name
            if(YsIdXm.length==0){
                if(JSON.parse(localStorage.getItem('Ysidxm')).length>0){
                    YsIdXm=JSON.parse(localStorage.getItem('Ysidxm'));
                }
            }
            $('.lx-my-friendList').html('<p class="no-shuju">好友列表加载失败,请重新刷新~</p>');
        }
    });
    return defer.promise();
}
// --------医生列表布局
function getUserListUI(data) {
    var fsNum2=data.length;
    if(fsNum2>0){
        $('.lx-my-friendList').html('');
        //包含医生姓名和对应的ID号的对象数组;
        YsIdXm=[];
        for(var b=0;b<data.length;b++){
            if(data[b].docId!=0){
                var obj={
                    docId:'doc'+data[b].docId,
                    name:data[b].uname,
                    pic:data[b].avatar
                };
                YsIdXm.push(obj);
            }
        }
        console.log(YsIdXm);
        // 缓存到本地  防止网速过慢好友列表请求失败,但是聊天信息正常打开，能在本地缓存找到好友名字;
        localStorage.setItem('Ysidxm', JSON.stringify(YsIdXm));

        //医生列表UI界面
        var flog=0;
        var flag=false;
        for (var i = 0; i < data.length; i++) {
            if(flag){
                var fsC = data[i].groupName;
                if(data[i].docId==0){
                    if($('.lx-friendListOne').eq(flog).children().length==2){
                        $('.lx-friendListOne').eq(flog).append('<p class="kz-myhy">该组暂时没有好友</p>');
                        var myclone = $('#lx-fs-clone').clone(true);
                        myclone.removeAttr('id');
                        myclone.find('.fenzu-mingcheng').html(data[i].groupName);
                        myclone.find('.lx-friend-one').remove();
                        myclone.addClass('zu');
                        $('.lx-my-friendList').append(myclone);
                        flog++;
                        myclone.hide();
                    }else{
                        var myclone = $('#lx-fs-clone').clone(true);
                        myclone.removeAttr('id');
                        myclone.find('.fenzu-mingcheng').html(data[i].groupName);
                        myclone.find('.lx-friend-one').remove();
                        myclone.addClass('zu');
                        $('.lx-my-friendList').append(myclone);
                        flog++;
                        myclone.hide();
                    }
                }else if($('.lx-friendListOne').eq(flog).find('.fenzu-mingcheng').html()==data[i].groupName&&$('.lx-friendListOne').eq(flog).children().length==2){
                    var myclone= $('#lx1-fs-clone').clone(true);
                    myclone.removeAttr('id');
                    var abs=data[i].abstracts;
                    // console.log(data[i].dw_name);
                    myclone.find('.lx-friend-Pic').attr('src',ajaxStr+data[i].avatar);
                    myclone.find('.int1-name').html(data[i].uname);
                    myclone.find('.int1-zhiwei').html(data[i].job);
                    myclone.find('.ysID').html(data[i].docId);
                    myclone.find('.sys-yy').html(data[i].dw_name);
                    myclone.find('.sys-ks').html(data[i].ks_name);
                    for(var h=0;h<data[i].scores;h++){
                        myclone.find('.int1-pingjia').append('<img src="./img/3@2x.png">');
                    }

                    // console.log(abs)
                    if(abs==null){

                    }else if(abs.length>70){
                        var abc=abs.slice(0,70);
                        myclone.find('.int1-right-textp').html(abc+'.....');
                    }else {
                        myclone.find('.int1-right-textp').html(abs);
                    }
                    var label=data[i].lableNames;
                    if(label==null){

                    }else{
                        var num=1;
                        var newlabel=label.split(',');
                        // console.log(newlabel)
                        for(var j=0;j<newlabel.length;j++){
                            if (num<5){
                                myclone.find('.int1-right-label').append('<div><img class="label-icon" src=./img/label'+num+'.png><span>'+newlabel[j]+'</span></div>')
                            }else {
                                break;
                            }
                            num++;
                        }
                    }
                    $('.lx-friendListOne').eq(flog).append(myclone);
                }else if ($('.lx-friendListOne').eq(flog).find('.fenzu-mingcheng').html()==data[i].groupName&&$('.lx-friendListOne').eq(flog).children().length==3){
                    var myclone = $('#lx-fs-clone').clone(true);
                    myclone.removeAttr('id');
                    myclone.find('.fenzu-mingcheng').html(data[i].groupName).hide();
                    myclone.find('.lx-edit-fenzu').hide();
                    var abs=data[i].abstracts;
                    myclone.find('.lx-friend-Pic').attr('src',ajaxStr+data[i].avatar);
                    myclone.find('.int1-name').html(data[i].uname);
                    myclone.find('.int1-zhiwei').html(data[i].job);
                    myclone.find('.ysID').html(data[i].docId);
                    myclone.find('.sys-yy').html(data[i].dw_name);
                    myclone.find('.sys-ks').html(data[i].ks_name);
                    for(var h=0;h<data[i].scores;h++){
                        myclone.find('.int1-pingjia').append('<img src="./img/3@2x.png">');
                    }
                    if(abs==null){

                    }else if(abs.length>70){
                        var abc=abs.slice(0,70);
                        myclone.find('.int1-right-textp').html(abc+'.....');
                    }else {
                        myclone.find('.int1-right-textp').html(abs);
                    }
                    var label=data[i].lableNames;
                    if(label==null){

                    }else {
                        var newlabel=label.split(',');
                        var num=1;
                        for(var j=0;j<newlabel.length;j++){
                            if (num<5){
                                myclone.find('.int1-right-label').append('<div><img class="label-icon" src=./img/label'+num+'.png><span>'+newlabel[j]+'</span></div>')
                            }else {
                                break;
                            }
                            num++;
                        }
                    }
                    $('.lx-my-friendList').append(myclone);
                    flog++;
                    myclone.hide();
                }
            }else {
                var myclone = $('#lx-fs-clone').clone(true);
                myclone.removeAttr('id');
                myclone.find('.fenzu-mingcheng').html(data[i].groupName);
                myclone.find('.lx-friend-one').remove();
                myclone.addClass('zu');
                $('.lx-my-friendList').append(myclone);
                flog++;
                flag=true;
                myclone.hide();
            }
        }
        $('.fsClass').find('.fenzu-mingcheng').remove();
        $('.fsClass').find('.lx-edit-fenzu').remove();

        var lastEle=$('.lx-friendListOne:last').children().length;
        if(lastEle==2){
            $('.lx-friendListOne:last').append('<p class="kz-myhy">该组暂时没有好友</p>')
        }

        var $ele=$('.lx-my-friendList').children();

        var eleNum=$ele.length;
        if(eleNum==1){
            $ele.eq(0).show();
        }else if(eleNum==2){
            $ele.eq(0).show();
            $ele.eq(1).show();
        }else{
            $ele.hide();
            $ele.eq(0).show();
            $ele.eq(1).show();
            $ele.eq(2).show();
        }
    }else {
        $('.lx-my-friendList').html(" <p class='no-shuju'>你还没有好友,请添加你的好友~</p>");
    }

    var fsNum1=parseInt(eleNum/3);// 商
    var fsNum2=eleNum%3;//余数
    // console.log(fsNum1)
    if(fsNum2==0&&fsNum1!=0){
        $('.fs-last-page').html(fsNum1);
    }else{
        $('.fs-last-page').html(fsNum1+1)
    }
    if(parseInt($('.fs-last-page').html())==1){
        $('.fs-goDown').attr('disabled',true);
    }else {
        $('.fs-goDown').attr('disabled',false);
    }
    $('.fs-first-page').html(1);
    $('.fs-goUp').attr('disabled',true);
    $('.refurbish-friend').show();   //刷新好友列表按钮；
    $('.lx-friendListOne').eq(1).find('.lx-edit-fenzu').hide();
    $('.lx-friendListOne').eq(1).find('.fenzu-mingcheng').css({
            'backgroundImage': '-webkit-gradient(linear, 0 0, 0 bottom, from(#22f2fa),to(#83f078))',
            '-webkitBackground-clip':'text',
            '-webkitTextFillColor': 'transparent'
    });
}

// -----  对面添加你为好友后的医生刷新列表    //区别在于在信息栏添加 对方添加你为好友的动态getmorexx();
function getUserListadd(docId) {
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getPFriend.action',
        data: {
            pId:patId
        },
        type: "post",
        dataType: "json",
        success: function (data) {
            var fsNum2=data.length;
            // console.log(fsNum2);
            if(fsNum2>0){
                $('.lx-my-friendList').html('');
                //包含医生姓名和对应的ID号的对象数组,环信聊天使用;
                YsIdXm=[];
                for(var b=0;b<data.length;b++){
                    if(data[b].docId!=0){
                        var obj={
                            docId:'doc'+data[b].docId,
                            name:data[b].uname,
                            pic:data[b].avatar
                        };
                        YsIdXm.push(obj);
                    }
                }
                // console.log(YsIdXm);
                // 缓存到本地  防止网速过慢好友列表请求失败,但是聊天信息正常打开，能在本地缓存找到好友名字;
                localStorage.setItem('Ysidxm', JSON.stringify(YsIdXm));

                //医生列表UI界面
                var flog=0;
                var flag=false;
                for (var i = 0; i < data.length; i++) {
                    if(flag){
                        var fsC = data[i].groupName;
                        if(data[i].docId==0){
                            if($('.lx-friendListOne').eq(flog).children().length==2){
                                $('.lx-friendListOne').eq(flog).append('<p class="kz-myhy">该组暂时没有好友</p>');
                                var myclone = $('#lx-fs-clone').clone(true);
                                myclone.removeAttr('id');
                                myclone.find('.fenzu-mingcheng').html(data[i].groupName);
                                myclone.find('.lx-friend-one').remove();
                                myclone.addClass('zu');
                                $('.lx-my-friendList').append(myclone);
                                flog++;
                                myclone.hide();
                            }else{
                                var myclone = $('#lx-fs-clone').clone(true);
                                myclone.removeAttr('id');
                                myclone.find('.fenzu-mingcheng').html(data[i].groupName);
                                myclone.find('.lx-friend-one').remove();
                                myclone.addClass('zu');
                                $('.lx-my-friendList').append(myclone);
                                flog++;
                                myclone.hide();
                            }
                        }else if($('.lx-friendListOne').eq(flog).find('.fenzu-mingcheng').html()==data[i].groupName&&$('.lx-friendListOne').eq(flog).children().length==2){
                            var myclone= $('#lx1-fs-clone').clone(true);
                            myclone.removeAttr('id');
                            var abs=data[i].abstracts;
                            // console.log(data[i].dw_name);
                            myclone.find('.lx-friend-Pic').attr('src',ajaxStr+data[i].avatar);
                            myclone.find('.int1-name').html(data[i].uname);
                            myclone.find('.int1-zhiwei').html(data[i].job);
                            myclone.find('.ysID').html(data[i].docId);
                            myclone.find('.sys-yy').html(data[i].dw_name);
                            myclone.find('.sys-ks').html(data[i].ks_name);
                            for(var h=0;h<data[i].scores;h++){
                                myclone.find('.int1-pingjia').append('<img src="./img/3@2x.png">');
                            }

                            // console.log(abs)
                            if(abs==null){

                            }else if(abs.length>70){
                                var abc=abs.slice(0,70);
                                myclone.find('.int1-right-textp').html(abc+'.....');
                            }else {
                                myclone.find('.int1-right-textp').html(abs);
                            }
                            var label=data[i].lableNames;
                            if(label==null){

                            }else{
                                var num=1;
                                var newlabel=label.split(',');
                                // console.log(newlabel)
                                for(var j=0;j<newlabel.length;j++){
                                    if (num<5){
                                        myclone.find('.int1-right-label').append('<div><img class="label-icon" src=./img/label'+num+'.png><span>'+newlabel[j]+'</span></div>')
                                    }else {
                                        break;
                                    }
                                    num++;
                                }
                            }
                            $('.lx-friendListOne').eq(flog).append(myclone);
                        }else if ($('.lx-friendListOne').eq(flog).find('.fenzu-mingcheng').html()==data[i].groupName&&$('.lx-friendListOne').eq(flog).children().length==3){
                            var myclone = $('#lx-fs-clone').clone(true);
                            myclone.removeAttr('id');
                            myclone.find('.fenzu-mingcheng').html(data[i].groupName).hide();
                            myclone.find('.lx-edit-fenzu').hide();
                            var abs=data[i].abstracts;
                            myclone.find('.lx-friend-Pic').attr('src',ajaxStr+data[i].avatar);
                            myclone.find('.int1-name').html(data[i].uname);
                            myclone.find('.int1-zhiwei').html(data[i].job);
                            myclone.find('.ysID').html(data[i].docId);
                            myclone.find('.sys-yy').html(data[i].dw_name);
                            myclone.find('.sys-ks').html(data[i].ks_name);
                            for(var h=0;h<data[i].scores;h++){
                                myclone.find('.int1-pingjia').append('<img src="./img/3@2x.png">');
                            }
                            if(abs==null){

                            } else if(abs.length>70){
                                var abc=abs.slice(0,70);
                                myclone.find('.int1-right-textp').html(abc+'.....');
                            }else {
                                myclone.find('.int1-right-textp').html(abs);
                            }
                            var label=data[i].lableNames;
                            if(label==null){

                            }else {
                                var newlabel=label.split(',');
                                var num=1;
                                for(var j=0;j<newlabel.length;j++){
                                    if (num<5){
                                        myclone.find('.int1-right-label').append('<div><img class="label-icon" src=./img/label'+num+'.png><span>'+newlabel[j]+'</span></div>')
                                    }else {
                                        break;
                                    }
                                    num++;
                                }
                            }
                            $('.lx-my-friendList').append(myclone);
                            flog++;
                            myclone.hide();
                        }
                    }else {
                        var myclone = $('#lx-fs-clone').clone(true);
                        myclone.removeAttr('id');
                        myclone.find('.fenzu-mingcheng').html(data[i].groupName);
                        myclone.find('.lx-friend-one').remove();
                        myclone.addClass('zu');
                        $('.lx-my-friendList').append(myclone);
                        flog++;
                        flag=true;
                        myclone.hide();
                    }
                }
                $('.fsClass').find('.fenzu-mingcheng').remove();
                $('.fsClass').find('.lx-edit-fenzu').remove();

                var lastEle=$('.lx-friendListOne:last').children().length;
                if(lastEle==2){
                    $('.lx-friendListOne:last').append('<p class="kz-myhy">该组暂时没有好友</p>')
                }
                // console.log(lastEle);

                var ele=document.getElementsByClassName('lx-friendListOne');

                var eleNum=ele.length-1;
                if(eleNum==1){
                    $('.lx-friendListOne').eq(1).show().siblings().hide();
                }else if(eleNum==2){
                    var $ele=$('.lx-friendListOne');
                    $ele.hide();
                    $ele.eq(1).show();
                    $ele.eq(2).show();
                }else{
                    var $ele=$('.lx-friendListOne');
                    $ele.hide();
                    $ele.eq(1).show();
                    $ele.eq(2).show();
                    $ele.eq(3).show();
                }
            }else {
                $('.lx-my-friendList').append(" <p class='no-shuju'>您还没有添加好友~</p>");
            }
            var fsNum1=parseInt(eleNum/3);// 商
            var fsNum2=eleNum%3;//余数
            // console.log(fsNum1)
            if(fsNum2==0){
                $('.fs-last-page').html(fsNum1);
            }else {
                $('.fs-last-page').html(fsNum1+1)
            }
            if(parseInt($('.fs-last-page').html())==1){
                $('.fs-goUp').attr('disabled',true);
                $('.fs-goDown').attr('disabled',true);
            };
            $('.fs-goUp').attr('disabled',true);
            $('.lx-friendListOne').eq(1).find('.lx-edit-fenzu').hide();
            $('.lx-friendListOne').eq(1).find('.fenzu-mingcheng').css('color','#6fd836');
			
			//找到id对应的医生姓名和医生图片
            var ysName,ysImg;
            if(YsIdXm.length>0){   //医生doc对应的医生姓名图片
                var flg=true;
                for(var b=0;b<YsIdXm.length;b++){
                    if(YsIdXm[b].docId==docId){
                        ysName=YsIdXm[b].name;   //通过id号找到对应的医生姓名
                        ysImg=imgUrlStr+YsIdXm[b].pic;     //通过id号找到对应的医生图片
                        flg=false;
                        break;
                    }
                }
                if(flg==true){
                    // console.log('YsIdXm数组存在，没有找到对应医生的姓名,当前医生docId为'+docId);
                    console.log(YsIdXm);
                    console.log(docId);
                    ysName='未知姓名';
                    ysImg='./img/1.png';
                }
            }else {
                console.log('YsIdXm数组为空，没有找到对应医生的姓名');
                ysName='未知姓名';
                ysImg='./img/1.png';
            }
            var datt='同意添加你为好友';
            getmorexx(docId,datt,ysName,ysImg);            
          
        },
        error: function (err) {
            //获取医生列表失败，拿到对应的缓存医生iD Name
            var str='医生列表刷新失败,请手动刷新';
            $('.lxys_tx').show().find('.lxys_tx_text').html(str);
            console.log(err);
            if(YsIdXm.length==0){
                if(JSON.parse(localStorage.getItem('Ysidxm')).length>0){
                    YsIdXm=JSON.parse(localStorage.getItem('Ysidxm'));
                }
            };
            $('.lx-my-friendList').append(" <p class='no-shuju'>好友列表加载失败~</p>");
        }
    });
}
$('.fs-goDown').click(function () {
    $('.refurbish-friend').hide();  //隐藏好友刷新列表
    var numPre=parseInt($('.fs-first-page').html());
    var numNext=parseInt($('.fs-last-page').html());
    $(".fs-goUp").attr('disabled',false);
    if(numPre+1==numNext){
        $(".fs-goDown").attr("disabled",true).addClass('active');
        $('.fs-goUp').removeClass('active');
        $('.fs-first-page').html(numPre+1);
    }else {
        $('.fs-goDown').addClass('active');
        $('.fs-goUp').removeClass('active');
        $('.fs-first-page').html(numPre+1);
    }
    var $ele=$('.lx-friendListOne');
    $ele.hide();
    var vv=parseInt(numPre+1);
    var vvv=3*vv;
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
    $ele.eq(vvv).show();
});
$('.fs-goUp').click(function () {
    var numPre=parseInt($('.fs-first-page').html());
    $(".fs-goDown").attr('disabled',false);
    if(numPre==2){
        $(".fs-goUp").attr("disabled",true).addClass('active');
        $('.fs-goDown').removeClass('active');
        $('.fs-first-page').html(numPre-1);
        $('.refurbish-friend').show(); //隐藏好友刷新列表
    }else {
        $('.fs-goUp').addClass('active');
        $('.fs-goDown').removeClass('active');
        $('.fs-first-page').html(numPre-1);
    }
    var $ele=$('.lx-friendListOne');
    $ele.hide();
    var vv=parseInt(numPre-1);
    var vvv=3*vv;
    $ele.eq(vvv-2).show();
    $ele.eq(vvv-1).show();
    $ele.eq(vvv).show();
});
//
// ---------------------------------------移至分组
$('.friendOne-remove').on('click',function (e) {
    e.stopPropagation();
    e.preventDefault();
    moveId=$(this).parents('.lx-friendListOne').find('.ysID').html();
    // console.log(thiis[0])
    $('.fenzuList').show().siblings().hide();
    $('.fenzuList-b').html('');
    $('.lx-search').show();
    var xinzu=document.getElementsByClassName('zu');
    // console.log(xinzu.length);
    for(var i=0;i<xinzu.length;i++){
        var zuming=$('.zu').eq(i).find('.fenzu-mingcheng').html();
        $('.fenzuList-b').append('<p class="zuming-Listone">'+zuming+'</p>');
    };
});
$('body').on('click','.fenzuList-b p',function () {
    $('.fenzuList-b p').removeClass('active');
    $(this).addClass('active');
    $('.xzfzic').remove();
    $(this).append('<span class="xzfzic">已选</span>');
});

$('.fz-quxiao').click(function () {
    $('.fenzuList').hide();
    $('.lx-search').show();
    $('.search-show1').show();
});
$('.fz-queding').click(function (e) {
    e.stopPropagation();
    var p=$('.fenzuList-a').find('.zuming-Listone.active').length;
    if(p==1){
        var moveGroupName=$('.fenzuList-a').find('.zuming-Listone.active').html();
        console.log(patId);
        console.log(moveGroupName);
        console.log(moveId);
        $.ajax({
            url: ajaxStr+'MSTYL/pat/yzfz.action',
            data: {
                pId:patId,
                newGroupName:moveGroupName,
                docId:moveId
            },
            type: "post",
            dataType: "json",
            success: function (data) {
                // console.log(data);
                $('.fenzuList').hide();
                $('.lx-search').show();
                $('.search-show1').show();
                // alert('添加成功');
                $.when(getUserList()).done(function (data) {
                    getUserListUI(data);
                });
                $('.fenzuList-b').html('');
            },
            error:function (err) {
                // console.log(err);
                $('.fwq_no').show();
            }
        });
    }else {
        $('.csqs').show();
    }
});


// ---------------------------------------发信息 index.js
//---------------------------------------发视频 index.js
// ----------好友列表主动刷新按钮
$('.refurbish-friend').click(function () {
    console.log('为你请求好友列表数据正在刷新');
    $.when(getUserList()).done(function (data) {
        getUserListUI(data);
    });
});
// -----------------------------------------添加好友
$('body').on('click','.friendOne-add',function (e) {
    e.stopPropagation();
    e.preventDefault();
    addPersonId=$(this).parents('.search-showOne').find('.ysID').html();        //添加好友的id
    addPersonName=$(this).parents('.search-showOne').find('.int1-name').html(); //添加好友的姓名
    var lbysID=document.getElementsByClassName('lx-my-friendList')[0].getElementsByClassName('ysID');
    var flog;
    if(lbysID.length==0){  //没有任何一个好友
        $('.fenzuList1').show().siblings().hide();
        $('.lx-search').show();
        $('.fenzuList-b1').html('');
        var xinzu=document.getElementsByClassName('zu');
        for(var i=0;i<xinzu.length;i++){
            var zuming=$('.zu').eq(i).find('.fenzu-mingcheng').html();
            $('.fenzuList-b1').append('<p class="zuming-Listone">'+zuming+'</p>');
        }
    }else {
        for(var k=0;k<lbysID.length;k++){
            if(lbysID[k].innerHTML==addPersonId){
                flog=0;
                var str='该医生已经是您的好友,请勿重复添加';
                $('.lxys_tx').show().find('.lxys_tx_text').html(str);
                break;
            }else {
                flog=1;
            }
        }
        console.log('你准备添加id号为'+addPersonId+'的医生');
        if(flog==1){
            $('.fenzuList1').show().siblings().hide();
            $('.lx-search').show();
            $('.fenzuList-b1').html('');
            var xinzu=document.getElementsByClassName('zu');
            for(var i=0;i<xinzu.length;i++){
                var zuming=$('.zu').eq(i).find('.fenzu-mingcheng').html();
                $('.fenzuList-b1').append('<p class="zuming-Listone">'+zuming+'</p>');
            }
        }
    }

});
$('body').on('click','.fenzuList-b1 p',function () {
    $('.fenzuList-b1 p').removeClass('active');
    $('.xzfzic').remove();
    $(this).append('<span class="xzfzic">已选</span>');
    $(this).addClass('active');
});
$('.fz-quxiao1').click(function () {   //主动添加好友 --取消
    $('.fenzuList1').hide();
    $('.lx-search').show();
    $('.search-show1').show();
    $('.fenzuList-b1').html('');
});
// $('.fz-queding1').click(function () {//主动添加好友 --确定==index.js 179
// });

//对方同意添加你为好友/  向本地服务器发送请求，刷新列表
function addFried(docId,group) {
    console.log('医生环信id为'+docId+';,组名为'+group+'准备刷新本地服务器');
    var id=docId.slice(3,docId.length);
    console.log('医生iD为'+id);
    $.ajax({
        url: ajaxStr+'MSTYL/pat/ssxzfz.action',
        data: {
            pId:patId,
            groupName:group,
            docId:id
        },
        type: "post",
        dataType: "json",
        success: function (data) {
            // alert('向本地服务器添加好友成功');
            getUserListadd(docId) //刷新好友列表②

        },
        error:function (err) {
            console.log(err);
            $('.fwq_no').show();
        }
    });
}
// -------------------------------------------医生详情(好友列表点击)
$('body').on('click','.lx-friend-one',function (e) {
    // $('#lx-ys-mainClone').siblings().remove();
    $('.lx-xq-one').html('');
    $('.lx-main-home').show().addClass('spsp').siblings().hide();
    var ysId=$(this).find('.ysID').html();
    djys=ysId;
    djxm=$(this).find('.int1-name').html();
    // console.log(ysId);
    $('.lx-main').hide();
    $('.xq-loading').show();
    $.when(getYsxq(ysId)).done(function (data) {
        $('.xq-loading').hide();
        $('.lx-main-home').find('.ys-t-fh').append('<div class="xq-up">返回</div>');
        var data=data[0];
        console.log(data);
        if(data.sex=='0'){
            var  sex='women@2x.png'
        }else {
            var  sex='man@2x.png'
        };
        var myclone=$('#lx-ys-mainClone').clone(true);
        myclone.removeAttr('id');
        $('.lx-xq-one').append(myclone);
        myclone.find('.ys-t-pic').attr('src',ajaxStr+data.avatar);
        myclone.find('.ys-sex').attr('src','./img/'+sex);
        myclone.find('.ys-name').html(data.uname);
        myclone.find('.ys-zw').html(data.job);
        myclone.find('.ys-yy').html(data.dw_name);
        myclone.find('.ys-ks').html(data.ks_name);
        myclone.find(".ys-fs1").html(data.totalFw);
        myclone.find('.ys-fs2').html(data.nowFw);
        myclone.find('.ys-pfNum').html(data.scores);
        for(var h=0;h<data.scores;h++){
            myclone.find('.ys-xq-pjxj').append('<img src="./img/3@2x.png">');
        }
        var label=data.lableNames;  //医生标签
        if(label==null){

        }else {
            var num=1;
            var newLabel=label.split(',');
            for(var i=0;i<newLabel.length;i++){
                if (num<5){
                    myclone.find('.ys-bq').append('<div><img src=./img/label'+num+'.png><span>'+newLabel[i]+'</span></div>')
                }else {
                    break;
                }
                num++;
            }
        }

        var abstract=data.abstracts;
        var skill=data.skills;
        var T=abstract+skill;
        // console.log(x.length);
        if(T.length<400){
            console.log('字数和没有超过400');
            myclone.find('.ys-jj').show();
            myclone.find('.ys-sc').show();
            myclone.find('.ys-page2').hide();
            myclone.find('.lxys-fenye').hide();
            myclone.find('.ys-jj-txt').html(abstract);
            myclone.find('.ys-sc-txt').html(skill);
        }else {
            console.log('字数和超过400');
            // var p=x.slice(0,200);
            myclone.find('.ys-jj-txt').html(abstract);
            myclone.find('.yishengText').find('.ys-sc').hide();
            myclone.find('.lxys-fenye').show();
            $('.lxys-goUp').removeClass('active');

            $('.lxys-goUp').click(function () {
                console.log('医生详情点击的了上一页');
                $(this).removeClass('active');
                $('.lxys-goDown').addClass('active');
                $('.yishengText').show();
                $('.ys-page2').hide();
            });
            $('.lxys-goDown').click(function () {
                console.log('医生详情点击的了下一页');
                $(this).removeClass('active');
                $('.lxys-goUp').addClass('active');
                $('.yishengText').hide();
                $('.ys-page2').show().find('.ys-sc-1').html(skill);
            })
        }
    });
});

// -------------------------------------------医生详情(搜索医生列表点击)
$('.search-showOne').click(function (e) {
    $('.lx-main-home').removeClass('spsp')
});


function getYsxq(num) {
    var defer=$.Deferred();
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getDocInfo.action',
        data: {
            id:num
        },
        type: "GET",
        dataType: "json",
        success: function (data) {
            defer.resolve(data);
        },
        error:function (err) {
            console.log(err);
        }
    });
    return defer.promise();
}
$('body').on('click','.xq-up',function () {
    // $('.lx-main-home').hide();
    $('.xq-up').remove();
    $('.lx-main-home').hide();
    $('.lx-main').show();
});
