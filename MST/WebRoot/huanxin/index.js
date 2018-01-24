var mp3Blob;
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
});
conn.listen({
    onOpened: function ( message ) {          //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
        console.log('连接成功');
        conn.setPresence();
        console.log('设置上线状态');
    },
    onClosed: function ( message ) {
        console.log('连接关闭')
    },         //连接关闭回调
    onTextMessage: function ( message ) {
        console.log(message);
        var othUser=message.from;
        $('.ltjlmy').remove();
        //找到id对应的医生姓名和医生图片
        var ysName,ysImg;
        if(YsIdXm.length>0){   //医生doc对应的医生姓名图片
            var flg=true;
            for(var b=0;b<YsIdXm.length;b++){
                if(YsIdXm[b].docId==othUser){
                    ysName=YsIdXm[b].name;   //通过id号找到对应的医生姓名
                    ysImg=imgUrlStr+YsIdXm[b].pic;     //通过id号找到对应的医生图片
                    flg=false;
                    break;
                }
            }
            if(flg==true){
                console.log('YsIdXm数组存在，没有找到对应医生的姓名,当前医生docId为'+othUser);
                console.log(YsIdXm);
                console.log(othUser);
                console.log(YsIdXm[0].docId);
                ysName='未知姓名';
                ysImg='./img/1.png';
            }
        }else {
            console.log('YsIdXm数组为空，没有找到对应医生的姓名');
            ysName='未知姓名';
            ysImg='./img/1.png';
        }
        //判断训练方案是否存在当前医生的消息提醒
        var FaXxNum=1;
        if($('.fa_'+othUser).length==1){
            //存在当前用户的信息在训练方案页面
            $('.fa_'+othUser).find('.fa-user').html(ysName);   //存在也替换姓名,医生更换姓名刷新
            $('.fa_'+othUser).find('.fa-user-xx').html(message.data);
            console.log('方案消息存在当前用户');
            FaXxtop={
                user:othUser,  //医生id
                ysname:ysName,  //医生姓名
                data:message.data  //消息内容
            };
            localStorage.setItem('faxxtxtop', JSON.stringify(FaXxtop));

        } else if($('.xl-contentright1>p').html()==''){
            // console.log('方案上消息为空');
            $('.xl-contentright1>p').append(' <label class=fa_'+othUser+'><span class="fa-user">'+ysName+'</span><span>发来信息提醒 :</span><span class="fa-user-xx">'+message.data+'</span></label>');
            FaXxtop={
                user:othUser,
                ysname:ysName,
                data:message.data
            };
            localStorage.setItem('faxxtxtop', JSON.stringify(FaXxtop));
        }else if($('.xl-contentright2>p').html()==''){
            // console.log('方案下消息为空');
            $('.xl-contentright2>p').append(' <label class=fa_'+othUser+'><span class="fa-user">'+ysName+'</span><span>发来信息提醒 :</span><span class="fa-user-xx">'+message.data+'</span></label>');
            FaXxbot={
                user:othUser,
                ysname:ysName,
                data:message.data
            };
            localStorage.setItem('faxxtxbot', JSON.stringify(FaXxbot));
        } else {
            // console.log('方案消息都不为空');
            // console.log('方案消息不存在当前用户');
            if(FaXxNum==1){
                $('.xl-contentright1>p').html(' <label class=fa_'+othUser+'><span class="fa-user">'+ysName+'</span><span>发来信息提醒 :</span><span class="fa-user-xx">'+message.data+'</span></label>');
                FaXxNum=2;
                FaXxtop={
                    user:othUser,
                    ysname:ysName,
                    data:message.data
                };
                localStorage.setItem('faxxtxtop', JSON.stringify(FaXxtop));
            }
            else if(FaXxNum==2){
                $('.xl-contentright2>p').html(' <label class=fa_'+othUser+'><span class="fa-user">'+ysName+'</span><span>发来信息提醒 :</span><span class="fa-user-xx">'+message.data+'</span></label>');
                FaXxNum=1;
                FaXxbot={
                    user:othUser,
                    ysname:ysName,
                    data:message.data
                };
                localStorage.setItem('faxxtxbot', JSON.stringify(FaXxbot));
            }
        };

        // -------消息界面的没有数据提示消失
        $('.xiaoxi-home').find('.no-shuju').remove();

        // ----消息的时间显示（时间戳）
        var timeList=getInforTime();         //获取时间对象
        var bztime = timeList.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
        var xxtime = getTimeText(bztime);    //对时间进行判断  区别今天/昨天/过去

        // ---------判断消息界面是否存在                           ！对方发来消息，由此可以进入聊天窗口    (ysName:'对应医生的姓名';ysImg:'对应医生的图片');
        var $ele= $('#' + message.from);
        if ($ele.length == 1) {
            //当前医生消息界面提醒存在;
            console.log('存在当前用户消息提醒');
            $ele.find('.pic-inform-user').html(ysName);      //防止医生替换姓名.获取最新的姓名
            $ele.find('img').attr('src',ysImg);              //防止医生替换图片，获取最新的图片
            $ele.find('.pic-inform-textT').html(message.data);
            $ele.find('.xx_bzTime').html(bztime);
            $ele.find('.xx_Time').html(xxtime);
            var clone = $ele.parents('.xxXx-one').clone(true);
            $ele.parents('.xxXx-one').remove();
            $('.xiaoxi-home').prepend(clone);
            getxxList(); //刷新消息列表
        } else {
            //当前医生消息界面提醒不存在，为你创建;
            console.log('不存在当前用户消息提醒');
            $('.xiaoxi-home').prepend(`<div class="xxXx-one">
            								<div class="pic-inform clearfix" id="${message.from}">
            									<div class="pic-inform-pic"> 
            										<div class="xx-noRead" style="display: none">0</div>
            										<img src="${ysImg}">
            									</div> 
            									<div class="pic-inform-text"> 
            										<p class="pic-inform-user">${ysName}</p> 
            										<p> 
            											<span class="pic-inform-textT">${message.data}</span> 
            											<span class="xx_Time">${xxtime}</span>
            											<span class="xx_bzTime" style="display: none">${bztime}</span>
            										</p> 
            									</div>
            								</div>
            								<div class="xx-X">删除</div>
            							</div>`);
            getxxList(); //刷新消息列表
        }
        // console.log('测试')
        var xxtime=timeHide(timeList,xxtime,othUser); //对2分钟以内的时间隐藏
        // ------
        // ---判断聊天室界面是否存在,  默认生成隐藏的聊天窗口
        var id = message.from + '_x';
        if ($('#' + id).length == 1) {
            // console.log('已经存在聊天窗口');

        } else {
            // console.log('不存在聊天窗口');
            $('.chatList').append(`<div class="chatroom" id="${id}"> 
            							<p class="xx-name">${ysName}</p> 
            							<div class="xx-ck"> 
            								<div class="xx-ck-home"></div> 
            							</div> 
            							<div class="chat-value clearfix">
            								<button class="lookHistory">查看聊天记录</button> 
            								<button class="xx-fasong">发送</button> 
            								<input type="text" placeholder="请输入要发送的信息" class="send-value">
            								<div class="yy_send">
        										<button class="voice_record snarl-demo waves-button" onclick=funStart("${id}")>录制</button>
    											<button class="voice_send snarl-demo waves-button" onclick=funStop("${id}","${othUser}")>发送</button>
        									</div>		
            							</div> 
            							<button class="xx-sp"><img src="./img/video@2x.png">视频通话</button>
            							</div>`)
        }
        // 低于2分钟不显示时间的样式
        if(xxtime==''){
            bztime='';
            $('#' + id).find('.xx-ck-home').append(`<div class="xx-othUser clearfix">
            											<div class="othImg">
            												<img src="${ysImg}">
            											</div> 
            											<div class="xx-otext"> 
            												<p class="othText">${message.data }</p> 
            												<img src="./img/sanjiaol.png"> 
            											</div> 
            										</div>`);
        }else {
            $('#' + id).find('.xx-ck-home').append(`<div class="xx-othUser clearfix">
            											<p class="xx-time">
            												<span>${xxtime}</span>
            											</p> 
            											<div class="othImg">
            												<img src="${ysImg}">
            											</div> 
            											<div class="xx-otext"> 
            												<p class="othText">${message.data}</p>
            												<img src="./img/sanjiaol.png"> 
            											</div> 
            										</div>`);
        }
        // --消息未读判断 //
        if ($('#' + id).is(':visible') || $('chatList').is(':visible')) {//消息已读
            // console.log('当前聊天窗口显示');
            $('#' + message.from).find('.xx-noRead').html(0).hide();
            
        } else { //消息未读
            // console.log('当前聊天窗口隐藏');
            var num = $('#' + message.from).find('.xx-noRead').html();
            var num = parseInt(num);
            var newNum = num + 1;
            $('#' + message.from).find('.xx-noRead').html(newNum).show(); 
        };
        var xxone={}  ;      //当前信息对象
 		xxone={
                User:message.from,
                data:message.data,
                time:bztime
        };
        
        var chatBox = $('#' + id).find('.xx-ck-home')[0];
        chatBox.scrollTop = chatBox.scrollHeight;
        
        
        // -------聊天窗口历史消息缓存(对方)
        //index.html 1030
		saveHcXxO(message.from,xxone);  //缓存消息（接收文本）

        // -------消息界面的最新消息缓存
        var $ele = $('.xiaoxi-home').html();
        localStorage.setItem('xxjmhc', JSON.stringify($ele));
        //  在home.js  92 获取缓存 //  index.js
    },
    //收到文本消息
    onEmojiMessage: function ( message ) {
        // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
        // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
        // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
               console.log('Emoji');
               var data = message.data;
               for(var i = 0 , l = data.length ; i < l ; i++){
                   console.log(data[i]);
               }
    },   //收到表情消息
    onPictureMessage: function ( message ) {

    }, //收到图片消息
    onCmdMessage: function ( message ) {
        //对方同意添加你为好友的，在这里通知（命令消息带过来id和组名）
        console.log(message);
        var str=message.action;
        var arr=str.split("@$");
        console.log(arr);
        if(arr==null){}else if(arr.length>0){
            if(arr[0]=='01'){       // 01 代表对方同意添加你为好友
                var ysname=arr[1];  //医生姓名
                var docId=arr[2];   //医生环信ID
                var group=arr[3];   //医生组名
                $('.add-uesrname').html(ysname);
                $('.addFriend').show();
                var addClose=document.getElementsByClassName('addFriend-btn-bt')[0];
                addClose.onclick=function () {
                    $('.addFriend').hide();
                };
                if(addHcPer.length>0){
                    for(var i=0;i<addHcPer.length;i++){
                        if(addHcPer[i].docId==docId){
                            console.log(addHcPer[i]);
                            addHcPer[i].type='2';      //2代表已经互相成为好友（修改状态）
                            console.log(docId+'对方同意，互为好友，状态发生改变2');
                            break;
                        }
                    }
                }else {
                    console.log('本地没有该好友的ID')//此种情况不存在
                }
                localStorage.setItem('addPer', JSON.stringify(addHcPer));
                addHcPer=JSON.parse(localStorage.getItem('addPer'));
                console.log(addHcPer);
                addFried(docId,group);   //走自己的服务器添加好友① -> 刷新好友②
            }else if(arr[0]=='11'){       //11 对方删除你好友
                // console.log('对方删除你好友，修改医生ID状态');
                var docId=arr[2];
                if(addHcPer.length>0){
                    for(var i=0;i<addHcPer.length;i++){
                        if(addHcPer[i].docId==docId){
                            console.log(addHcPer);
                            addHcPer[i].type='0';        //0代表已经拒绝，可以重复添加(状态修改)
                            break;
                        }
                    }
                }else {
                    console.log('本地没有该好友的ID')//此种情况不存在
                }
                localStorage.setItem('addPer', JSON.stringify(addHcPer));
                addHcPer=JSON.parse(localStorage.getItem('addPer'));
                console.log(addHcPer);
                setTimeout(function () {     //   延迟刷新好友列表
                    $.when(getUserList()).done(function (data) {
                        getUserListUI(data);
                    });
                    console.log('3秒已经刷新本地服务器')
                },3000)
            }else if(arr[0]=='12'){      //12 对方拒绝你的好友请求
                console.log('对方拒绝添加你为好友，修改医生ID状态');
                var docId=arr[2];
                var yName=arr[1];
                if(addHcPer.length>0){
                    for(var i=0;i<addHcPer.length;i++){
                        if(addHcPer[i].docId==docId){
                            addHcPer[i].type='0';       //0代表已经拒绝，可以重复添加(状态修改)
                            console.log(addHcPer);
                            break;
                        }
                    }
                }else {
                    console.log('本地没有该好友的ID')//此种情况不存在
                }
                $('.no_accFriend_uesrname').html(yName);
                $('.no_accFriend').show();
                localStorage.setItem('addPer', JSON.stringify(addHcPer));
                addHcPer=JSON.parse(localStorage.getItem('addPer'));
                console.log(addHcPer);
            } else if(arr[0]=='10'){     // 10 代表医生分享资讯消息给你
                //alert('对方给你分享了最新资讯');   //医生分享消息给病人
                var yName=arr[1];
                console.log(yName);
                $('.zx_fx').show().find('.zx_fx_uesrname').html(yName);
                setTimeout(function () {
                    var page=1;
                    getzxone(page);       //刷新资讯列表
                },2000);

            }else if(arr[0]=='04'){    // 医生发送视频请求
                var ysname=arr[1];  //医生姓名
                var docId=arr[2];   //医生环信ID
                var sjc=parseInt(arr[3]);
                var yssrc=imgUrlStr+arr[4];
                console.log('医生姓名'+ysname);
                console.log('医生环信ID'+docId);
                console.log('时间戳'+sjc);
                console.log('图片地址'+yssrc);
                if($('acc-sp').is(':visible')|| $('.hoshowtime').length==1||$('.fashowtime').length==1){
                    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                        if(data){
                            var ysname=arr[1];  //医生姓名
                            var fwcsjc=data.sjc;
                            fssptc(fwcsjc,ysname);   //此时康复者正在视频通话中
                        }
                    });
                }else {
                    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                        if(data){
                            var fwcsjc=data.sjc;
                            var nmbfwcsjc=parseInt(fwcsjc);
                            console.log(fwcsjc);
                            console.log(nmbfwcsjc);
                            console.log('时间戳值相减等于'+(nmbfwcsjc-sjc));
                            if(nmbfwcsjc-sjc<40){
                                $('.acc-sp').show().find('.accsp-text').html(ysname);
                                $('.acc-sp').find('.sp_type').html('1');   //1 视频请求类型   普通视频聊天
                                $('.acc-sp').find('.accsp_type').html('医生,邀请你进入视频聊天.....');
                                $('.thtsls').append('<audio src="./sp.mp3" autoplay="autoplay" preload="auto">您的浏览器不支持audio属性，请更换浏览器再进行浏览。 </audio>')
                                setTimeout(function () {
                                    $('.acc-sp').hide();
                                    $('.thtsls').html('');
                                },30000);
                                $('.acc-sp').find('.yes-accsp-docid').html(docId);
                            }else {
                                console.log('有医生发了视频请求但是时间戳大于40s不显示界面不显示')
                            };
                            var data='[视频聊天]';
                            getmorexx(docId,data,ysname,yssrc);
                        }
                    });
                }
            }else if(arr[0]=='05'){ //对方拒绝你的视频请求（你发起请求）
                var yName=arr[1];
                if($('.hoshowtime').length){
                    $('.no_videoChat_uesrname').html(yName);
                    $('.no_videoChat').show();    //弹出层
                    setTimeout(function () {
                        $('.no_videoChat').hide();    //弹出层
                    },4000);
                    setTimeout(function () {
                        clearInterval(pertime); //清除检测用户加入的定时器
                        client.leave(function () {
                            $('.video-big').html('<div id="agora_local" class="videoBig-agora_localId"></div>');
                            $('.otherPerson').remove();
                            $('.bigsfck').remove();
                            clearTimeout(hoshowflag); //关闭显示时间的计时器
                            $('.hoshowtime').remove();
                            clearInterval(chatTimer1); //关闭计算时间的计时器
                            var spltsc=JSON.parse(localStorage.getItem('spnosc'));  //拿到本地视频缓存时长
                            fsxllthc(spltsc[0]);       //发送聊天时长
                            console.log("好友列表房间退出成功！！！！！！！！");
                            $('#join').css('backgroundImage','url(./img/answer.png)');
    						$('#leave').css('backgroundImage','url(./img/waiting.png)');

                        }, function (err) {
                            console.log("好友列表房间退出失败！！！！！！！！");
                        });
                        clearInterval(pertime);
                        setTimeout(function () {
                            $('.shipingList').hide();   //视频层隐藏
                        },1500)
                    },1000)

                }else if($('.fashowtime').length){
                    $('.no_videoChat_uesrname').html(yName);
                    $('.no_videoChat').show();    //弹出层
                    $('.ltsp-zt').html('对方已经挂断！');
                    //关闭聊天窗口
                    setTimeout(function () {
                        client.leave(function () {
                            $('.xlsp-main').find('.videoList2').find('.videoList2_one').removeClass('active');
                            $('.xlsp-main').find('.videoList2').removeClass('active');
                            $('.fa-sp-end').parents('.xlsp-main').find('.videoList2').find('.video-js').removeClass('active');
                            $('.fa-sp-end').parents('.xlsp-main').find('.videoList').find('.video-js').removeClass('active');
                            $('.videoSProm').css('width','2rem');
                            clearTimeout(fashowflag);   //关闭显示时间的计时器
                            $('.xlsp').find('.sp-room').children().remove();
                            clearInterval(chatTimer2);  //关闭计算时间的计时器
                            var spltsc=JSON.parse(localStorage.getItem('spnosc'));  //拿到本地视频缓存
                            var chatTime=spltsc[0];
                            fsxllthc(chatTime);       //发送时长
                            console.log("训练方案房间退出成功！！！！！！！！");
                            $('.fa-sp-start').css('backgroundImage','url(./img/answer.png)');
    						$('.fa-sp-end').css('backgroundImage','url(./img/waiting.png)');
                        }, function (err) {
                            console.log("训练方案房间退出失败！！！！！！！！");
                        });
                        clearInterval(pertimesm);
                    },1000)
                }
            }else if(arr[0]=='06') {  //对方提前挂断视频请求（对方发起请求）
                if($('.acc-sp').is(':visible')){
                    $('.acc-sp').hide();
                    $('.thtsls').html('');
                }
            }else if(arr[0]=='13'){    //对方正在视频通话
                var yName=arr[1];
                alert(yName+'对方正在视频通话，请稍后再试');
                Checkleave();
                CheckfaSpClose();
            }else if(arr[0]=='100'){                 //医生给你分享商品
                var ysname=arr[1];                   //医生姓名
                var ysimg=imgUrlStr+arr[2];          //医生头像
                var ysid=arr[3];                    //医生id
                var patId=arr[4];                  //环信id
                var spId=arr[5];                  //商品id
                var spmc=arr[6];                  //商品名称
                var splj=arr[7];                  //商品链接
                $('.ysfx_Box').append( '<div class="ysfx_cptx"> <div class="ysfx_cptx-ck"> <p class="ysfx_cptx_uesr"><span class="ysfx_cptx_uesrname">'+ysname+'</span><span>给你分享了</span><span class="cptx_name">一个新的商品！</span></p> <p>请前往消息界面查看详情</p> <div class="ysfx_cptx-btn clearfix"> <button class="ysfx_cptx_btn_btn">确定</button> </div> </div> </div>');
                // ----消息的时间显示（时间戳）
                var timeList=getInforTime();         //获取时间对象
                var bztime = timeList.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
                var xxtime = getTimeText(bztime);    //对时间进行判断  区别今天/昨天/过去
                $('.xiaoxi-home').prepend('<div class="xxXx-one"><div class="ys-fxcp clearfix"><div class="ys-fxcp-pic"><img src=' + ysimg + '> </div> <div class="ys-fxcp-textbox"> <p class="ys-fxcp-user">' + ysname + '</p> <p> <span></span><span class="ys-fxcp-text">给你分享的商品 :'+spmc+'（点击查看二维码）</span><span class="spname" style="display: none">'+spmc+'</span> <span class="splj" style="display: none">'+splj+'</span><span class="xx_Time">' + xxtime + '</span><span class="xx_bzTime" style="display: none">'+bztime+'</span></p> </div></div><div class="xx-X">删除</div></div>');
                getxxList(); //刷新消息列表
                // -------消息界面的最新消息缓存
                var $ele = $('.xiaoxi-home').html();
                localStorage.setItem('xxjmhc', JSON.stringify($ele));
            }else if(arr[0]==123){    //医生向康复者发送虚拟视频请求
                var dId=arr[1];       //医生ID
                var docId=arr[2];    //医生环信ID
                var ysname=arr[3];  //医生姓名
                var sjc=parseInt(arr[4]); //时间戳
                var yssrc=imgUrlStr+arr[5];
                console.log('医生ID'+dId);
                console.log('医生环信ID'+docId);
                console.log('医生姓名'+ysname);
                console.log('时间戳'+sjc);
                console.log('图片地址'+yssrc);
                if($('acc-sp').is(':visible')||$('.hoshowtime').length==1||$('.fashowtime').length==1){
                    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                        if(data){
                            var fwcsjc=data.sjc;
                            fssptc(fwcsjc,ysname);   //此时康复者正在视频通话中
                        }
                    });
                } else {
                    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                        if(data){
                            var fwcsjc=data.sjc;
                            var nmbfwcsjc=parseInt(fwcsjc);
                            console.log(sjc);
                            console.log(nmbfwcsjc);
                            if(nmbfwcsjc-sjc<40){
                                $('.acc-sp').show().find('.accsp-text').html(ysname);
                                $('.acc-sp').find('.sp_type').html('2'); //2 视频请求类型   虚拟视频聊天
                                $('.acc-sp').find('.accsp_type').html('医生,邀请你进入评测通道.....');
                                $('.acc-sp').find('.sp_SRC').html(message.action); //评测地址
                                $('.thtsls').append('<audio src="./sp.mp3" autoplay="autoplay" preload="auto">您的浏览器不支持audio属性，请更换浏览器再进行浏览。 </audio>')
                                setTimeout(function () {
                                    $('.acc-sp').hide();
                                    $('.thtsls').html('');
                                },30000);
                                $('.acc-sp').find('.yes-accsp-docid').html(docId);
                            }else {
                                console.log('有医生发了视频请求但是时间戳大于40s不显示界面不显示')
                            };
                            var data='[视频聊天]';
                            getmorexx(docId,data,ysname,yssrc);
                        }
                    });
                }
            }
        }
    },     //收到命令消息
    onAudioMessage: function ( message ) {   //收到音频消息
    	console.log(message);
    	var othUser=message.from;
    	$('.ltjlmy').remove();    
        //找到id对应的医生姓名和医生图片
        var ysName,ysImg;
        if(YsIdXm.length>0){   //医生doc对应的医生姓名图片
            var flg=true;
            for(var b=0;b<YsIdXm.length;b++){
                if(YsIdXm[b].docId==othUser){
                    ysName=YsIdXm[b].name;   //通过id号找到对应的医生姓名
                    ysImg=imgUrlStr+YsIdXm[b].pic;     //通过id号找到对应的医生图片
                    flg=false;
                    break;
                }
            }
            if(flg==true){
                console.log('YsIdXm数组存在，没有找到对应医生的姓名,当前医生docId为'+othUser);
                console.log(YsIdXm);
                console.log(othUser);
                console.log(YsIdXm[0].docId);
                ysName='未知姓名';
                ysImg='./img/1.png';
            }
        }else {
            console.log('YsIdXm数组为空，没有找到对应医生的姓名');
            ysName='未知姓名';
            ysImg='./img/1.png';
        }
    
    	var options = { url: message.url };
    		options.onFileDownloadComplete = function ( response ) { 
      		//音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
      		var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
      		console.log(objectURL);
   			 // -------消息界面的没有数据提示消失
        $('.xiaoxi-home').find('.no-shuju').remove();

        // ----消息的时间显示（时间戳）
        var timeList=getInforTime();         //获取时间对象
        var bztime = timeList.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
        var xxtime = getTimeText(bztime);    //对时间进行判断  区别今天/昨天/过去

        // ---------判断消息界面是否存在                           ！对方发来消息，由此可以进入聊天窗口    (ysName:'对应医生的姓名';ysImg:'对应医生的图片');
        var $ele= $('#' + message.from);
        if ($ele.length == 1) {
            //当前医生消息界面提醒存在;
            console.log('存在当前用户消息提醒');
            $ele.find('.pic-inform-user').html(ysName);      //防止医生替换姓名.获取最新的姓名
            $ele.find('img').attr('src',ysImg);              //防止医生替换图片，获取最新的图片
            $ele.find('.pic-inform-textT').html('[语音消息]');
            $ele.find('.xx_bzTime').html(bztime);
            $ele.find('.xx_Time').html(xxtime);
            var clone = $ele.parents('.xxXx-one').clone(true);
            $ele.parents('.xxXx-one').remove();
            $('.xiaoxi-home').prepend(clone);
            getxxList(); //刷新消息列表
        } else {
            //当前医生消息界面提醒不存在，为你创建;
            console.log('不存在当前用户消息提醒');
            $('.xiaoxi-home').prepend(`<div class="xxXx-one">
            								<div class="pic-inform clearfix" id="${message.from}">
            									<div class="pic-inform-pic"> 
            										<div class="xx-noRead" style="display: none">0</div>
            										<img src="${ysImg}">
            									</div> 
            									<div class="pic-inform-text"> 
            										<p class="pic-inform-user">${ysName}</p> 
            										<p> 
            											<span class="pic-inform-textT">[语音消息]</span> 
            											<span class="xx_Time">${xxtime}</span>
            											<span class="xx_bzTime" style="display: none">${bztime}</span>
            										</p> 
            									</div>
            								</div>
            								<div class="xx-X">删除</div>
            							</div>`);
            getxxList(); //刷新消息列表
        }
        
        var xxtime=timeHide(timeList,xxtime,othUser); //对2分钟以内的时间隐藏
        // ------
        // ---判断聊天室界面是否存在,  默认生成隐藏的聊天窗口
        var id = message.from + '_x';
        if ($('#' + id).length == 1) {
            // console.log('已经存在聊天窗口');

        } else {
            // console.log('不存在聊天窗口');
            $('.chatList').append(`<div class="chatroom" id="${id}"> 
            							<p class="xx-name">${ysName}</p> 
            							<div class="xx-ck"> 
            								<div class="xx-ck-home"></div> 
            							</div> 
            							<div class="chat-value clearfix">
            								<button class="lookHistory">查看聊天记录</button> 
            								<button class="xx-fasong">发送</button> 
            								<input type="text" placeholder="请输入要发送的信息" class="send-value">
            								<div class="yy_send">
        										<button class="voice_record snarl-demo waves-button" onclick=funStart("${id}")>录制</button>
    											<button class="voice_send snarl-demo waves-button" onclick=funStop("${id}","${othUser}")>发送</button>
        									</div>	
            							</div> 
            							<button class="xx-sp"><img src="./img/video@2x.png">视频通话</button>
            						</div>`)
        }
        // 低于2分钟不显示时间的样式
        if(xxtime==''){
            bztime='';
            $('#' + id).find('.xx-ck-home').append(`<div class="xx-othUser clearfix">
            											<div class="othImg">
            												<img src="${ysImg}">
            											</div> 
            											<div class="xx-otext"> 
            												<div class="othText">
            													<p class="weixinAudio Aud">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
            												</div>
            												<img src="./img/sanjiaol.png"> 
            											</div> 
            										</div>`);
        }else {
            $('#' + id).find('.xx-ck-home').append(`<div class="xx-othUser clearfix">
            											<p class="xx-time">
            												<span>${xxtime}</span>
            											</p> 
            											<div class="othImg">
            												<img src="${ysImg}">
            											</div> 
            											<div class="xx-otext"> 
            												<div class="othText">
            													<p class="weixinAudio Aud">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
            												</div>
            												<img src="./img/sanjiaol.png"> 
            											</div> 
            										</div>`);
            										
        	}
   			
   			console.log($('.Aud').length)
   			$('.Aud').weixinAudio({
				autoplay:false,
				src:objectURL,
			});	
			
			$('.weixinAudio').removeClass('Aud');
//			console.log($('.Aud').length)
			var xxone={};      //当前信息对象
   			xxone={
                User:message.from,
                data:objectURL,
                time:bztime
        	};
			
			saveHcXxO(message.from,xxone);  //缓存消息（接收语音）
			
			// --消息未读判断 //
        	if ($('#' + id).is(':visible') || $('chatList').is(':visible')) {//消息已读
            	// console.log('当前聊天窗口显示');
            	$('#' + message.from).find('.xx-noRead').html(0).hide();
            
        	} else { //消息未读
            	// console.log('当前聊天窗口隐藏');
            	var num = $('#' + message.from).find('.xx-noRead').html();
            	var num = parseInt(num);
            	var newNum = num + 1;
            	$('#' + message.from).find('.xx-noRead').html(newNum).show(); 
        	};
			
			var chatBox = $('#' + id).find('.xx-ck-home')[0];
        	chatBox.scrollTop = chatBox.scrollHeight;
    	};  

    	options.onFileDownloadError = function () {
      		//音频下载失败 
    	};  
    	//通知服务器将音频转为mp3
    	options.headers = { 
      		'Accept': 'audio/mp3'
    	};

    	WebIM.utils.download.call(conn, options);
    },   //收到音频消息
    onLocationMessage: function ( message ) {},//收到位置消息
    onFileMessage: function ( message ) {},    //收到文件消息
    onVideoMessage: function (message) {
    	
        // var node = document.getElementById('privateVideo');
        // var option = {
        //     url: message.url,
        //     headers: {
        //         'Accept': 'audio/mp4'
        //     },
        //     onFileDownloadComplete: function (response) {
        //         var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
        //         node.src = objectURL;
        //     },
        //     onFileDownloadError: function () {
        //         console.log('File down load error.')
        //     }
        // };
        // WebIM.utils.download.call(conn, option);
    },   //收到视频消息
    //加好友函数回调;
    onPresence: function ( message ) {
        console.log(message);
        var e=message;
        console.log(message);
        var str=e.status;
        if (e.type === 'subscribe') {
            console.log('对方加你为好友');
            var arr=str.split("@$");
            var ysname=arr[0];   //对方医生的姓名;
            var group=arr[1];    //组名
//          var docId=arr[2];    //对方医生的环信ID;
            $('.acc-username').html(ysname);
            $('.accF').append('<div class="accFriend accFriend'+e.from+'"> <div class="accFriend-ck"> <p class="acc-user"><span class="acc-username">'+ysname+'</span>医生请求添加您为好友!</p> <div class="accFriend-btn clearfix"><button class="accFriend-no">拒绝</button> <button class="accFriend-yes active">同意</button> </div> </div> </div>');
            var accOk=document.getElementsByClassName('accFriend'+e.from)[0].getElementsByClassName('accFriend-yes')[0];
            var accNo=document.getElementsByClassName('accFriend'+e.from)[0].getElementsByClassName('accFriend-no')[0];
            accOk.onclick=function () {
                $(this).parents('.accFriend').remove();
                accFriendOk(e,group,ysname);          //走环信同意添加好友（双向添加）
            };
            accNo.onclick=function () {
                $(this).parents('.accFriend').remove();
                accFriendONo(e);       //走环信拒绝添加好友          index 485
            };
        }else if (e.type === 'subscribed'&&e.status){
            console.log('对方同意添加你为好友[环信自带提醒,非命令]');
        }else if (e.type === 'unsubscribed'){
            // var docId=e.from;
            // checkRefuseFriend(docId); //判断对方是否拒绝/删除
        }
    },                                       //添加好友提醒！！！处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function ( message ) {
        console.log('处理好友申请');
        console.log(message);
    },         //处理好友申请
    onInviteMessage: function ( message ) {},  //处理群组邀请
    onOnline: function () {
        console.log('环信提示联网了');
        $('.xx-fasong').attr('disabled',false);
        $('.send-value').html('请输入要发送的信息').attr('disabled',false);
        $('.wlzt').hide();
        $('.dwdwdw').hide();
    },                  //本机网络连接成功
    onOffline: function () {
        console.log('环信提示断网了');
        $('.xx-fasong').attr('disabled',true);
        $('.send-value').html('网络未连接，消息无法发送').attr('disabled',true);
        $('.wlzt').show();
        $('.dwdwdw').show();
    },                 //本机网络掉线
    onError: function ( message ) {
        console.log('失败回调')
    },          //失败回调
    onBlacklistUpdate: function (list) {       //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onReceivedMessage: function(message){
        console.log('收到消息送达客户端回执')
    },    //收到消息送达客户端回执
    onDeliveredMessage: function(message){
        console.log('收到消息送达服务器回执')
    },   //收到消息送达服务器回执
    onReadMessage: function(message){
        console.log('收到消息已读回执')
    },        //收到消息已读回执
    onCreateGroup: function(message){
        console.log('创建群组成功回执')
    },        //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function(message){
        console.log('果用户在A群组被禁言')
    }        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});
//  消息时间戳

//缓存信息对方
function saveHcXxO(message,xxone){
	 var othUser=message;  //环信ID
	 if(ChatHistory){    //历史消息缓存
            if(ChatHistory.length>0){
                var flog=false;
                for(var k=0;k<ChatHistory.length;k++){
                    if(ChatHistory[k].othUser==othUser) {
                        ChatHistory[k].data.push(xxone);
                        if(ChatHistory[k].data.length>100){   //判断当前用户的聊天信息数是否达到100条，及时清除
                            ChatHistory[k].data.shift();
                            console.log(ChatHistory[k].othUser+'的缓存数已经满了')
                        }
                        flog=false;
                        break;
                    }else {
                        flog=true;
                    }
                }
                if(flog==true){
                    var Userobj={
                        othUser:othUser,
                        data:[]
                    };
                    Userobj.data.push(xxone);
                    ChatHistory.push(Userobj);
                }
            }else {
                var Userobj={
                    othUser:othUser,
                    data:[]
                };
                Userobj.data.push(xxone);
                ChatHistory.push(Userobj);
            }
        }else {
            console.log('聊天缓存对象不存在')
        };
        localStorage.setItem('chatxx', JSON.stringify(ChatHistory));
        console.log(ChatHistory);
}


//----获取信息接收和发送的时间
function getInforTime() {
    var date = new Date();
    // var secondAll=date.getHours() * 60 * 60 * 1000 + date.getMinutes() * 60 * 1000 +date.getSeconds() * 1000;
    var year = date.getFullYear();

    var month = date.getMonth()+1;
    if(parseInt(month)<10){
        month='0'+month;
    }
    var day = date.getDate();
    if(parseInt(day)<10){
        day='0'+day;
    }
    var hour = date.getHours();
    if(parseInt(hour)<10){
        hour='0'+hour;
    }
    var minute = date.getMinutes();
    if(parseInt(minute)<10){
        minute='0'+minute
    }
    var second = date.getSeconds();
    if(parseInt(second)<10){
        second='0'+second
    }
    return time={
        time:year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second,
        nowtime:{
            year:year,
            month:month,
            day:day,
            hour:hour,
            minute:minute
        }
    }
}
// 信息发送和接收的时间和当前的时间做对比
function getTimeText(argument) {
    if(argument==''){
        return argument;
    }else {
        var timeS = argument;
        var todayT = '';
        var yestodayT = '';
        var timeCha = new Date().getTime() - new Date(timeS).getTime() - 1000;
//    console.log(timeCha);
        timeS = timeS.slice(-8);
        todayT = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;
//    console.log(todayT)
        yestodayT = todayT + 24 * 60 * 60 * 1000;
        if (timeCha > yestodayT) {
            return argument.slice(0, 10);
        };
        if (timeCha > todayT && timeCha < yestodayT) {
            return timeS.slice(0, 2) > 12 ? '昨天 下午' + (timeS.slice(0, 2) == 12 ? 12 : timeS.slice(0, 2) ) + timeS.slice(2, 5) : '昨天 上午' + timeS.slice(0, 5);
        }
        if (timeCha < todayT) {
            return timeS.slice(0, 2) >= 12 ? '下午' + (timeS.slice(0, 2) == 12 ? 12 : timeS.slice(0, 2) ) + timeS.slice(2, 5) : '上午' + timeS.slice(0, 5);
        }
    }
}

//开机将消息列表的时间更新为转化
function xxTime() {
    var ele=$('.xx_bzTime');
    if(ele.length){
        // console.log('存在旧消息');
        for(var i=0;i<ele.length;i++){
            var time=ele.eq(i).html();
            // console.log(time);
            var newTime=getTimeText(time);
            // console.log(newTime);
           $('.xx_Time').eq(i).html(newTime);
        }
    }
}
function timeHide(timeList,xxtime,othUser) {
    if (checkTime.length == 0) {
        var obj = {
            othUser: othUser,
            time: {
                year: timeList.nowtime.year,
                month: timeList.nowtime.month,
                day: timeList.nowtime.day,
                hour: timeList.nowtime.hour,
                minute: parseInt(timeList.nowtime.minute) + 1
            }
        };
        checkTime.push(obj);
        console.log('checkTime不存在,正创建该用户时间对象');
        return xxtime;
    } else {
        var flog = false;
        for (var i = 0; i < checkTime.length; i++) {
            if (checkTime[i].othUser == othUser) {
                if (timeList.nowtime.year == checkTime[i].time.year && timeList.nowtime.month == checkTime[i].time.month && timeList.nowtime.day == checkTime[i].time.day && timeList.nowtime.hour == checkTime[i].time.hour && parseInt(timeList.nowtime.minute) <= parseInt(checkTime[i].time.minute)) {
                    console.log('该用户时间存在,时间距离上次未超出2分钟，隐藏')
//                  console.log(timeList.nowtime.minute);
//                  console.log(checkTime[i].time.minute);
                    flog = false;
                    return xxtime = '';
                } else {
                    checkTime[i].time.year = timeList.nowtime.year;
                    checkTime[i].time.month = timeList.nowtime.month;
                    checkTime[i].time.day = timeList.nowtime.day;
                    checkTime[i].time.hour = timeList.nowtime.hour;
                    checkTime[i].time.minute = parseInt(timeList.nowtime.minute) + 1;
                    console.log('该用户时间存在,但是时间已经超出2分钟，显示');
                    flog = false;
                    return xxtime;
                }

            } else {
                flog = true
            }
        }
        if (flog == true) {
            var obj = {
                othUser: othUser,
                time: {
                    year: timeList.nowtime.year,
                    month: timeList.nowtime.month,
                    day: timeList.nowtime.day,
                    hour: timeList.nowtime.hour,
                    minute: parseInt(timeList.nowtime.minute) + 1
                }
            };
            checkTime.push(obj);
            console.log('checkTime存在,但是不存在该用户的时间');
            return xxtime;
        }
    }
}


// ---------- 聊天方法(登陆环信)
// function.js

//  聊天窗口点击发送消息
var sendPrivateText = function (toID,Id) {
    var sendVal=$('#'+Id).find('.send-value').val();
    $('#'+Id).find('.send-value').val('');
    if(sendVal!==''){
    	$('.ltjlmy').remove();
        // ----时间戳
        var timeList=getInforTime();
        var bztime = timeList.time;          // 2017-09-14 13:46:22 获取标准时间
        var xxtime = getTimeText(bztime);

        var xxtime=timeHide(timeList,xxtime,toID);//对时间进行判断
        // timeHide(timeList);
        // ----- 本人发送消息
        var id = conn.getUniqueId();
        // 生成本地消息id
        var msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: sendVal,                  // 消息内容
            to: toID, // 接收消息对象（用户id）
            roomType: false,
            success: function (id, serverMsgId) {
                console.log('send private text Success');
            },
            fail: function(e){
                console.log("Send private text error");
            }
        });
        msg.body.chatType = 'singleChat';
        conn.send(msg.body);
        var meImg=myImg;  //用户自己的图片
        if(xxtime==''){
            bztime='';
            $('#'+Id).find('.xx-ck-home').append(`<div class="xx-meUser clearfix">
            											<div class="meImg">
            												<img src="${meImg}">
            											</div>
            											<div class="xx-mtext"> 
            												<p class="meText">${sendVal}</p> 
            												<img src="./img/sanjiaor.png"> 
            											</div> 
            										</div>`);
        }else {
            $('#'+Id).find('.xx-ck-home').append(`<div class="xx-meUser clearfix">
            											<p class="xx-time">
            												<span>${xxtime}</span>
            											</p>
            											<div class="meImg">
            												<img src="${meImg}">
            											</div> 
            											<div class="xx-mtext">
            												<p class="meText">${sendVal}</p> 
            												<img src="./img/sanjiaor.png"> 
            											</div>
            										</div>`);
        }
        var chatBox=$('#'+Id).find('.xx-ck-home')[0];
        chatBox.scrollTop = chatBox.scrollHeight;
//
        //创建缓存消息对象
        var xxobj={    //本人消息对象 ()
            User:'me',
            time:bztime,
            data:sendVal
        };
        //发送的消息缓存  （本人）
        saveHcXxO(toID,xxobj)  //发送文本
    }
};

//测试  删除聊天记录
$('.delchat').click(function () {
    localStorage.removeItem('chatxx');
});
// 测试加对方为好友
function addFriends(docId,docName) {
    var meid='pat'+meId;
    var obj={
        img:myImg,
        state:'5',
        age:meAge,
        sex:meSex,
        name:meName,
        uuid:meid,
        type:'5',
        groupName:addgroupName
    };
    var strJson=JSON.stringify(obj);
    conn.subscribe({
        to: docId,
        // Demo里面接收方没有展现出来这个message，在status字段里面
        message:strJson//携带参数
    });
    console.log('主动添加对方为好友，已经添加'+docName+',对方的环信id为:'+docId+'请耐心等待验证');
    $('.qqadd_Friend_uesrname').html(docName);
    $('.qqadd_Friend').show();

};
// 主动添加对方为好友
$('.addtest').click(function () {
    var docId='fuguannnan1';
    // var docId='doc55';
    var docName='张三';
    var docGroupName='我的好友';
    // addFriends(docId);
    checkAddFriend(docId,docName,docGroupName);
});

function checkAddFriend(docId,docName,docGroupName) {   //添加好友 进行时间验证，防止重复添加
    $.when(getTimesjc()).done(function (data) {         //从服务器请求时间戳
        if(data){
            var fwcsjc=data.sjc;
            if(addHcPer.length>0){
                var flg=true;
                for(var i=0;i<addHcPer.length;i++){
                    if(addHcPer[i].docId==docId){
                        flg=false;
                        var dName=addHcPer[i].docName;
                        var dtype=addHcPer[i].type;
                        var dtime=addHcPer[i].time;  //上次
                        if(dtype=='1'){     //0：已经添加过，对方已经拒绝  1：已经添加过，对方未回复
                            $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                                var newfwcsjc=data.sjc;
                                addHcPer[i].time=fwcsjc;  //本地缓存时间为最新的
                                addFriends(docId,docName);
                                //对方信息消息忽视判断 时间戳
//                              if(fwcsjc-dtime>1*60*60){
                                    //时间至少相差6小时，可以重复添加
                                    
//                                  console.log('至少6小时前添加过'+dName+'为好友，可以重复添加');
//                              }else {
//                                  //时间一天之内，不可以重复添加
//                                  alert('您今天已经添加过'+dName+'为好友，请等待对方回复');
//                                  console.log(addHcPer)
//                              }
                            });
                        }else {
                            console.log('数组存在,找到该医生ID，'+dName+'已经拒绝，可以重复添加');
                            addHcPer[i].type='1'; //改变状态
                            console.log(docId+'对方拒绝，状态发生改变1');
                            console.log(addHcPer);
                            localStorage.setItem('addPer', JSON.stringify(addHcPer));
                            addFriends(docId,docName);
                        }
                        break;
                    }
                }
                if(flg==true){
                    var addObj={
                        docId:docId,
                        docName:docName,
                        docgroup:docGroupName,
                        time:fwcsjc,
                        type:'1'
                    };
                    addHcPer.push(addObj);
                    console.log('数组存在但是没有找到该ID,可以添加');
                    addFriends(docId,docName);
                }
            }else {
                var addObj={
                    docId:docId,
                    docName:docName,
                    docgroup:docGroupName,
                    time:fwcsjc,
                    type:'1'    //已经添加
                };
                addHcPer.push(addObj);
                console.log('数组不存在也没有该ID,可以添加');
                addFriends(docId,docName);
            }
            localStorage.setItem('addPer', JSON.stringify(addperArr));
        }
    });
}

// 搜索好友列表，添加好友进入新的分组确定按钮
$('.fz-queding1').click(function () {   //主动添加好友 --确定
    if($('.fenzuList-a1').find('.zuming-Listone.active').length==1){
        var docId='doc'+addPersonId;    //医生对应的环信账号
        addgroupName=$('.fenzuList-a1').find('.zuming-Listone.active').find('label').html();
        console.log('点击新分组确定按钮');
        console.log('添加的组名为'+addgroupName);
        console.log('添加的人名为'+addPersonName);
        console.log('医生环信ID为'+docId);
        $('.fenzuList1').hide();
        $('.search-show1').show();
        $('.fenzuList-b1').html('');
        checkAddFriend(docId,addPersonName,addgroupName);              //确定添加对方为好友，走环信通知
    }else {
        $('.csqs').show();
    }
});


//同意添加对方为好友
function accFriendOk(e,group,docName) {
    // 同意添加为好友
    var docId=e.from;
    console.log('对方的环信账号为'+e.from);
    if (e.type === 'subscribe') {
        /*同意添加好友操作的实现方法*/
        conn.subscribed({
            to: e.from,
            message : '[resp:true]',
        });
        conn.subscribe({//需要反向添加对方好友
            to: e.from,
            message : '[resp:true]',
        });
    }
    console.log('发送过去的组名'+group);
    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
        if(data){
            var fwcsjc=data.sjc;
            console.log(fwcsjc);
            if(addHcPer.length>0){
                var flg=true;
                for(var i=0;i<addHcPer.length;i++){
                    if(addHcPer[i].docId==docId){
                        flg=false;
                        addHcPer[i].type='2'; //互为好友
                        break;
                    }
                }
                if(flg==true){
                    var addObj={
                        docId:e.from,
                        docName:docName,
                        docgroup:group,
                        time:fwcsjc,
                        type:'2'
                    };
                    addHcPer.push(addObj);
                    console.log('数组存在但是没有找到该ID,添加状态2');
                }
            }else {
                var addObj={
                    docId:e.from,
                    docName:docName,
                    docgroup:group,
                    time:fwcsjc,
                    type:'2'
                };
                addHcPer.push(addObj);
                console.log('数组不存在也没有该ID,添加状态2');
            }
        }
    });
    localStorage.setItem('addPer', JSON.stringify(addperArr));
    setTimeout(function () {   //   延迟刷新好友列表
        $.when(getUserList()).done(function (data) {
            getUserListUI(data);
        });
        console.log('3秒已经刷新本地服务器');
    },3000)
}
//拒绝添加对方为好友
function accFriendONo(e) {   //拒绝添加对方为好友
    console.log(e);
    if (e.type === 'subscribe') {
        /*拒绝添加好友的方法处理*/
        conn.unsubscribed({
            to: e.from,
            message : '拒绝添加好友'
        });
    }
}
// ！！！好友列表发信息，打开聊天室
$('.friendOne-send').click(function (e) {
    e.stopPropagation();
    $('.chatList').show();
    var ysName=$(this).parents('.lx-friend-one').find('.int1-name').html();  //获取最新的医生姓名
    var docId=$(this).parents('.lx-friend-one').find('.ysID').html();
    var ToId="doc"+docId;
    var id=ToId+'_x';
    // --------   判断聊天窗口是否存在;
    if($('#'+id).length==1){
        $('#'+id).find('.xx-name').html(ysName);  //防止窗口已经存在后医生修改姓名，刷新列表后导致的姓名不匹配
        $('#'+id).show().siblings().hide();
    }else {
        $('.chatList').append(`<div class="chatroom" id="${id}"> 
        							<p class="xx-name">${ysName}</p> 
        						<div class="xx-ck"> 
        							<div class="xx-ck-home"></div>
        						</div> 
        						<div class="chat-value clearfix">
        							<button class="lookHistory">查看聊天记录</button> 
        							<button class="xx-fasong">发送信息</button> 
        							<input type="text" placeholder="请输入要发送的信息" class="send-value"> 
        							<div class="yy_send">
        								<button class="voice_record snarl-demo waves-button" onclick=funStart("${id}")>录制</button>
    									<button class="voice_send snarl-demo waves-button" onclick=funStop("${id}","${ToId}")>发送</button>
        							</div>
        						</div> 
        						<button class="xx-sp"><img src="./img/video@2x.png">视频通话</button>
        					</div>`)
        $('#'+id).show().siblings().hide();
    };
    // ---------
    if($('#'+ToId).length==1){
        $('#'+ToId).find('.xx-noRead').html(0).hide();
    }
    // -----发送消息按钮绑定事件
    var btn=$('#'+id).find('.xx-fasong')[0];
    btn.onclick=function () {
        sendPrivateText(ToId,id);
    };
    //  -----查看聊天记录按钮绑定事件
    var lookbtn=$('#'+id).find('.lookHistory')[0];
    lookbtn.onclick=function () {
      lookHistory(ToId,id);
    };
});

function drawmeyy(toID,Id,url){
	  // ----时间戳
        var timeList=getInforTime();
        var bztime = timeList.time;          // 2017-09-14 13:46:22 获取标准时间
        var xxtime = getTimeText(bztime);

        var xxtime=timeHide(timeList,xxtime,toID);//对时间进行判断
        
        var meImg=myImg;  //用户自己的图片
        if(xxtime==''){
            bztime='';
            $('#'+Id).find('.xx-ck-home').append(`<div class="xx-meUser clearfix">
            											<div class="meImg">
            												<img src="${meImg}">
            											</div>
            											<div class="xx-mtext"> 
            												<div class="meText">
            													<p class="weixinAudio Aud">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
            												</div>
            												<img src="./img/sanjiaor.png"> 
            											</div> 
            										</div>`);
            	$('.Aud').weixinAudio({
					autoplay:false,
					src:url,
				});	
				console.log(url)
				$('.weixinAudio').removeClass('Aud');
        }else {
            $('#'+Id).find('.xx-ck-home').append(`<div class="xx-meUser clearfix">
            											<p class="xx-time">
            												<span>${xxtime}</span>
            											</p>
            											<div class="meImg">
            												<img src="${meImg}">
            											</div> 
            											<div class="xx-mtext">
            												<div class="meText">
            													<p class="weixinAudio Aud">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
            												</div>
            												<img src="./img/sanjiaor.png"> 
            											</div>
            										</div>`);
            	$('.Aud').weixinAudio({
					autoplay:false,
					src:url,
				});	
				console.log(url)
				$('.weixinAudio').removeClass('Aud');										
        }
        var chatBox=$('#'+Id).find('.xx-ck-home')[0];
        chatBox.scrollTop = chatBox.scrollHeight;
//
        //创建缓存消息对象（发送语音）
			xxone={
                User:toID,
                data:url,
                time:bztime
        	};
			
		saveHcXxO(toID,xxone);  //缓存消息
//	
	
		
}	

function postyy(content,ToId){
	$.ajax({
  			url: 'http://121.40.29.64:8081/MSTYL/pat/addChatVedio.action',
  			type: 'post',
  			data:{
  				myJson:content
  			},
  			dataType:'json',
  			success: function(data){
  				console.log(data)
  				if(data.status=='true'){
  					 fsyypd(ToId);
  				}
  			},
  			error:function(err){
  				console.log(err)
  			}
	});
}


//！！！通过消息界面打开聊天室
$(".xiaoxi-home").on("click",'.pic-inform',function(){
    console.log('已经通过消息界面打开对面的聊天室');

    $('.xiaoxi-home').children().hide();
    $('.chatList').show();

    var ToId=$(this).attr('id');
    var ysName=$(this).find('.pic-inform-user').html();  //医生的姓名(信息界面提醒的医生姓名一直都是最新的):
    var id=ToId+'_x';
    $('#'+id).show().siblings().hide();
    $(this).find('.xx-noRead').html(0).hide();

    // --------   判断聊天窗口是否存在;
    if($('#'+id).length==1){
        console.log('存在当前对象聊天窗口');
        $('#'+id).find('.xx-name').html(ysName);   //打开的聊天窗口p标签 医生姓名替换
        $('#'+id).show().siblings().hide();
    }else {
        console.log('不存在当前对象聊天窗口');
        $('.chatList').append(`<div class="chatroom" id="${id}"> 
        							<p class="xx-name">${ysName}</p> 
        							<div class="xx-ck"> 
        								<div class="xx-ck-home"></div> 
        							</div> 
        							<div class="chat-value clearfix">
        								<button class="lookHistory">查看聊天记录</button> 
        								<button class="xx-fasong">发送信息</button> 
        								<input type="text" placeholder="请输入要发送的信息" class="send-value">
        								<div class="yy_send">
        									<button class="voice_record snarl-demo waves-button" onclick=funStart("${id}")>录制</button>
    										<button class="voice_send snarl-demo waves-button" onclick=funStop("${id}","${ToId}")>发送</button>
        								</div>
        							</div>
        							<button class="xx-sp"><img src="./img/video@2x.png">视频通话</button>
        						</div>`);
        $('#'+id).show().siblings().hide();
    };
    // -----发送消息按钮绑定事件
    var btn=$('#'+id).find('.xx-fasong')[0];
    btn.onclick=function () {
        sendPrivateText(ToId,id);
    };
    //  -----查看聊天记录按钮绑定事件
    var lookbtn=$('#'+id).find('.lookHistory')[0];
    lookbtn.onclick=function () {
        lookHistory(ToId,id);
    };
    // ------缓存消息界面消息
    var $ele = $('.xiaoxi-home').html();
    localStorage.setItem('xxjmhc', JSON.stringify($ele));

});
// -------查看历史消息记录
function lookHistory(ToId,id) {
//	ToId doc62 
//	id   doc62_x
	console.log(ChatHistory)
    var meImg=myImg;           //本人(患者)的头像
    //找到id对应的医生姓名和医生图片(查看聊天记录只需要找到对应的医生图片)
    var ysName,ysImg;
    if(YsIdXm.length>0){   //医生doc对应的医生图片
        var flg=true;
        for(var b=0;b<YsIdXm.length;b++){
            if(YsIdXm[b].docId==ToId){
                ysImg=imgUrlStr+YsIdXm[b].pic;     //通过id号找到对应的医生图片
                flg=false;
                break;
            }
        }
        if(flg==true){
            console.log('YsIdXm数组存在，没有找到对应医生的图片，当前医生docId为'+ToId);
            console.log(YsIdXm);
            ysImg='./img/1.png';
        }
    }else {
        console.log('YsIdXm数组为空，没有找到对应医生的图片');
        ysImg='./img/1.png';
    }

    var flog=false;
    for(var i=0;i<ChatHistory.length;i++){
        if(ChatHistory[i].othUser==ToId){
        	
        	console.log(ChatHistory[i])
            var len=$('#'+id).find('.xx-ck-home').children().length;  //当前页面存在多少条聊天记录
            var data=ChatHistory[i].data; //缓存数据
            var hclen=ChatHistory[i].data.length;   //缓存数据长度
            console.log(len) ;
            console.log(hclen);
            if(hclen>=len){
//          var num=parseInt()
            // ---添加聊天记录到聊天页面
            for(var j=hclen-len-1;j>-1;j--){
            	var textData=data[j].data;
                if(data[j].User=='me'){
                    var time=data[j].time;
                    // console.log(time)
                    var newTime=getTimeText(time);
                   
                    if(newTime==''){
                    	if(textData.slice(0,5)!='blob:'){
                    		//文本
                    		$('.xx-ck-home').prepend(`<div class="xx-meUser clearfix">
                    									<div class="meImg">
                    										<img src="${meImg}">
                    									</div> 
                    									<div class="xx-mtext"> 
                    										<p class="meText">${textData}</p> 
                    										<img src="./img/sanjiaor.png"> 
                    									</div> 
                    								</div>`)
                    	}else{
                    		//音频
                    		$('.xx-ck-home').prepend(`<div class="xx-meUser clearfix" style="display:none">
                    									<div class="meImg">
                    										<img src="${meImg}">
                    									</div> 
                    									<div class="xx-mtext"> 
                    										<div class="meText">
                    											<p class="weixinAudio Aud">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
                    										</div>
                    										<img src="./img/sanjiaor.png"> 
                    									</div> 
                    								</div>`)
//                  		$('.Aud').weixinAudio({
//								autoplay:false,
//								src:textData,
//							});	
//			
//							$('.weixinAudio').removeClass('Aud');
                    	}
                        
                    }else {
                    	if(textData.slice(0,5)!='blob:'){
                    		//文本
                    		$('.xx-ck-home').prepend(`<div class="xx-meUser clearfix">
                    									<p class="xx-time">
                    										<span>${newTime}</span>
                    									</p> 
                    									<div class="meImg">
                    										<img src="${meImg}">
                    									</div> 
                    									<div class="xx-mtext"> 
                    										<p class="meText">${textData}</p> 
                    										<img src="./img/sanjiaor.png"> 
                    									</div> 
                    								</div>`)
                    	}else{
                    		//语音
                    		$('.xx-ck-home').prepend(`<div class="xx-meUser clearfix" style="display:none">
                    									<p class="xx-time">
                    										<span>${newTime}</span>
                    									</p> 
                    									<div class="meImg">
                    										<img src="${meImg}">
                    									</div> 
                    									<div class="xx-mtext"> 
                    										<div class="meText">
                    											<p class="weixinAudio Aud">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
                    										</div>
                    										<img src="./img/sanjiaor.png"> 
                    									</div> 
                    								</div>`)
//                  		
//                  		$('.Aud').weixinAudio({
//								autoplay:false,
//								src:textData,
//							});	
//			
//							$('.weixinAudio').removeClass('Aud');
                    	}
                        
                    }
                }else {
                    var time=data[j].time;
                    var newTime=getTimeText(time);
                    if(newTime==''){
                    	if(textData.slice(0,5)!='blob:'){
                    		//文本
                    		$('.xx-ck-home').prepend(`<div class="xx-othUser clearfix"> 
                    										<div class="othImg">
                    											<img src="${ysImg}">
                    										</div> 
                    										<div class="xx-otext"> 
                    											<p class="othText">${textData}</p> 
                    											<img src="./img/sanjiaol.png"> 
                    										</div> 
                    									</div>`)
                    	}else{
                    		//语音
                    		$('.xx-ck-home').prepend(`<div class="xx-othUser clearfix" style="display:none"> 
                    										<div class="othImg">
                    											<img src="${ysImg}">
                    										</div> 
                    										<div class="xx-otext"> 
                    											<div class="othText">
                    												<p class="weixinAudio Aud">
																		<audio src="" id="media" width="1" height="1" preload></audio>
																		<span id="audio_area" class="db audio_area">
																			<span class="audio_wrp db">
																				<span class="audio_play_area">
																					<i class="icon_audio_default"></i>
																					<i class="icon_audio_playing"></i>
            																	</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																		</span>
																	</p>
                    											</div>
                    											<img src="./img/sanjiaol.png"> 
                    										</div> 
                    									</div>`)
//                  		$('.Aud').weixinAudio({
//								autoplay:false,
//								src:textData,
//							});	
//			
//							$('.weixinAudio').removeClass('Aud');
                    	}
                        
                    }else {
                   
                    	console.log(textData)
                    	if(textData.slice(0,5)!='blob:'){
                    		//文本
                    		$('.xx-ck-home').prepend(`<div class="xx-othUser clearfix">
                    									<p class="xx-time">
                    										<span>${newTime}</span>
                    									</p> 
                    									<div class="othImg">
                    										<img src="${ysImg}">
                    									</div>
                    									<div class="xx-otext"> 
                    										<p class="othText">${textData}</p> 
                    										<img src="./img/sanjiaol.png">
                    									</div> 
                    								</div>`)
                    	}else{
                    		//语音
                    		$('.xx-ck-home').prepend(`<div class="xx-othUser clearfix" style="display:none">
                    									<p class="xx-time">
                    										<span>${newTime}</span>
                    									</p> 
                    									<div class="othImg">
                    										<img src="${ysImg}">
                    									</div>
                    									<div class="xx-otext"> 
                    										<div class="othText">
                    											<p class="weixinAudio">
																	<audio src="" id="media" width="1" height="1" preload></audio>
																	<span id="audio_area" class="db audio_area">
																		<span class="audio_wrp db">
																			<span class="audio_play_area">
																				<i class="icon_audio_default"></i>
																				<i class="icon_audio_playing"></i>
            																</span>
																			<span id="audio_length" class="audio_length tips_global"></span>
																			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
																		</span>
																	</span>
																</p>
                    										</div>
                    										<img src="./img/sanjiaol.png"> 
                    									</div> 
                    								</div>`)
//                  		console.log($('.Aud').length)
//                  		console.log(textData)
//                  		$('.Aud').weixinAudio({
//								autoplay:false,
//								src:textData,
//							});	
//							
//							$('.weixinAudio').removeClass('Aud');
//							console.log($('.Aud').length)
                    	}
                        
                    }
                }
            };
            flog=false;
            break;
            }
        }else {
            flog=true;   //不存在聊天记录
        }
    }
    if(flog==true){
    	console.log('没有更多聊天记录');
        $('#'+id).find('.xx-ck-home').html('').append('<p class="xx-time ltjlmy">还没有更多聊天记录~</p>')
    }
    //是否出现滚动条
    var chatBox=$('#'+id).find('.xx-ck-home')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
}
function gdsptx(docId) {
    //拒绝对方视频请求
    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
        var fwqsjc=data.sjc;
        if(fwqsjc){
            console.log('挂断视频请求'+docId);
            //患者给医生发送扩展字段（命令消息过去）
            var uuid='pat'+meId;
            var id = conn.getUniqueId();            //生成本地消息id
            var msg = new WebIM.message('cmd', id); //创建命令消息
            var str={
                uuid:uuid,
                portraitUrl:myImg,
                age:meAge,
                sex:meSex,
                name:meName,
                time:parseInt(fwqsjc),
                type:4,
            };
            var spStr= JSON.stringify(str);
            var spJson={
                type:0,
                json:spStr
            };
            var spJsonStr=  JSON.stringify(spJson);
            console.log(spJsonStr);
            msg.set({
                msg: 'msg',                            //组名加本人id
                to: docId,                              //接收消息对象
                action : spJsonStr,                    //用户自定义，cmd消息必填
                ext :{'extmsg':'extends messages'},    //用户自扩展的消息内容（群聊用法相同）
                success: function ( id,serverMsgId ) {
                    console.log('挂断视频请求已经发送成功')
                }//消息发送成功回调
            });
            conn.send(msg.body);
        }
    });
}
function fssptx(docId,sjc) {
    //患者给医生发送扩展字段（命令消息过去）
    console.log('医生环信ID为'+docId);
    var uuid='pat'+meId;
    var id = conn.getUniqueId();            //生成本地消息id
    var msg = new WebIM.message('cmd', id); //创建命令消息
    var str={
        uuid:uuid,
        portraitUrl:myImg,
        age:meAge,
        sex:meSex,
        name:meName,
        time:sjc,
        type:3
    };
    var spStr= JSON.stringify(str);
    var spJson={
        type:0,
        json:spStr
    };
    var spJsonStr=  JSON.stringify(spJson);
    console.log(spJsonStr);
    msg.set({
        msg: 'msg',                            //组名加本人id
        to: docId,                              //接收消息对象
        action : spJsonStr,                    //用户自定义，cmd消息必填
        ext :{'extmsg':'extends messages'},    //用户自扩展的消息内容（群聊用法相同）
        success: function ( id,serverMsgId ) {
            console.log('发送成功')
        }//消息发送成功回调
    });
    conn.send(msg.body);
}
function jrsptx(docId,sjc) {  //患者进入视频聊天
    //患者给医生发送扩展字段（命令消息过去）
    console.log('医生环信ID为'+docId);
    var uuid='pat'+meId;
    var id = conn.getUniqueId();            //生成本地消息id
    var msg = new WebIM.message('cmd', id); //创建命令消息
    var str={
        uuid:uuid,
        portraitUrl:myImg,
        age:meAge,
        sex:meSex,
        name:meName,
        time:sjc,
        type:6
    };
    var spStr= JSON.stringify(str);
    var spJson={
        type:0,
        json:spStr
    };
    var spJsonStr=  JSON.stringify(spJson);
    console.log(spJsonStr);
    msg.set({
        msg: 'msg',                            //组名加本人id
        to: docId,                              //接收消息对象
        action : spJsonStr,                    //用户自定义，cmd消息必填
        ext :{'extmsg':'extends messages'},    //用户自扩展的消息内容（群聊用法相同）
        success: function ( id,serverMsgId ) {
            console.log('发送成功')
        }//消息发送成功回调
    });
    conn.send(msg.body);
}
function lksptx(docId,sjc) {  //患者离开视频聊天
    //患者给医生发送扩展字段（命令消息过去）
    console.log('医生环信ID为'+docId);
    var uuid='pat'+meId;
    var id = conn.getUniqueId();            //生成本地消息id
    var msg = new WebIM.message('cmd', id); //创建命令消息
    var str={
        uuid:uuid,
        portraitUrl:myImg,
        age:meAge,
        sex:meSex,
        name:meName,
        time:sjc,
        type:7
    };
    var spStr= JSON.stringify(str);
    var spJson={
        type:0,
        json:spStr
    };
    var spJsonStr=  JSON.stringify(spJson);
    console.log(spJsonStr);
    msg.set({
        msg: 'msg',                            //组名加本人id
        to: docId,                              //接收消息对象
        action : spJsonStr,                    //用户自定义，cmd消息必填
        ext :{'extmsg':'extends messages'},    //用户自扩展的消息内容（群聊用法相同）
        success: function ( id,serverMsgId ) {
            console.log('发送成功')
        }//消息发送成功回调
    });
    conn.send(msg.body);
}
function fssptc(docId,sjc) {  //患者正在视频视频聊天  返回给医生
    //患者给医生发送扩展字段（命令消息过去）
    console.log('医生环信ID为'+docId);
    var uuid='pat'+meId;
    var id = conn.getUniqueId();            //生成本地消息id
    var msg = new WebIM.message('cmd', id); //创建命令消息
    var str={
        uuid:uuid,
        portraitUrl:myImg,
        age:meAge,
        sex:meSex,
        name:meName,
        time:sjc,
        type:8
    };
    var spStr= JSON.stringify(str);
    var spJson={
        type:0,
        json:spStr
    };
    var spJsonStr=  JSON.stringify(spJson);
    console.log(spJsonStr);
    msg.set({
        msg: 'msg',                            //组名加本人id
        to: docId,                              //接收消息对象
        action : spJsonStr,                    //用户自定义，cmd消息必填
        ext :{'extmsg':'extends messages'},    //用户自扩展的消息内容（群聊用法相同）
        success: function ( id,serverMsgId ) {
            console.log('发送成功')
        }//消息发送成功回调
    });
    conn.send(msg.body);
}


function fsyypd(docId) {  //患者正在发送语音片段  返回给医生
    //患者给医生发送扩展字段（命令消息过去）
    console.log('医生环信ID为'+docId);
    var uuid='pat'+meId;
    var id = conn.getUniqueId();            //生成本地消息id
    var msg = new WebIM.message('cmd', id); //创建命令消息
    var str={
            uuid:uuid,
            name:meName,
            portraits:myImg
    };
    var spStr= JSON.stringify(str);
    var spJson={
        type:6,
        json:spStr
    };
    var spJsonStr=  JSON.stringify(spJson);
    console.log(spJsonStr);
    msg.set({
        msg: 'msg',                            //组名加本人id
        to: docId,                              //接收消息对象
        action : spJsonStr,                    //用户自定义，cmd消息必填
        ext :{'extmsg':'extends messages'},    //用户自扩展的消息内容（群聊用法相同）
        success: function ( id,serverMsgId ) {
            console.log('发送成功')
        }//消息发送成功回调
    });
    conn.send(msg.body);
}
// ----------------- 消息窗口 发送视频       //appID声网
$('body').on('click','.xx-sp',function () {
	var yyimg=$('.yy_tx').length;
	if(yyimg>0){
		alert('当前正在发送语音,请关闭');
		return;
	}
	var $ele=$(this).parents('.chatroom').attr('id');
    var ele=$ele.substring(0,$ele.length-2);
    var newDoc=parseInt(ele.slice(3));
    var ysName=$(this).siblings('.xx-name').html();   //医生的姓名
     // console.log(ele)
    if($('#'+ele+'_sp').length){            //判断当前用户视频窗口是否存在
        $('.chatList').hide();
        $('.shipingList').show();
        console.log('存在该用户视频窗口');
        $('#'+ele+'_sp').show().find('.sp-name>p').html(ysName);
    }else {
        if($('.hoshowtime').length){
            $('.gbqtsp').show();
        }else {
            $('.chatList').hide();       //隐藏信息聊天界面
            $('.shipingList').show().children().remove(); //显示视频聊天界面
           	 $('.shipingList').append(' <div class="shipingroom"> <div class="sp-user" id='+ele+'_sp'+'> <div class="sp-name"> <p>'+ysName+'</p> </div> <div class="sp-ck"> <div class="sp-ck-home"> <div id="div_device" class="panel panel-default" style="display:none"> <div class="select"> <label for="audioSource">Audio source: </label><select id="audioSource"></select> </div> <div class="select"> <label for="videoSource">Video source: </label><select id="videoSource"></select> </div> </div> <div id="div_join" class="panel panel-default"> <div class="panel-body"> <div style="display: none"><label>请选择房间: </label><input id="channel" class="big-channel" type="text" value='+newDoc+' size="4"/></div> <input id="videoCheck" class="videoBtn-big" type="checkbox" checked style="display: none"/> <button id="join" class="btn btn-primary" ></button> <button id="leave" class="btn btn-primary" ></button> <input id="key" type="text" value='+swAppId+' size="36" style="display: none" /> </div> </div> </div> <div id="video" class="video-big"> <div id="agora_local" class="videoBig-agora_localId"></div> </div> </div> </div> <button class="sp-liaotiao">发送</button> </div >')
            var eleK=document.getElementById('join');
            eleK.onclick=CheckJoin;
            var eleG=document.getElementById('leave');
            eleG.onclick=Checkleave;
            console.log('不存在该用户视频窗口，已经为你创建')
        }
    }
});
// ------------------视频窗口 发送消息
$('body').on('click','.sp-liaotiao',function () {
    var user=$(this).siblings('.sp-user').attr('id');
    var ysName=$(this).siblings('.sp-user').find('.sp-name>p').html();
    var newUser=user.substring(0,user.length-3);
    $('.chatList').show();
    $('.shipingList').hide();
    var id=newUser+'_x';
    // --------   判断聊天窗口是否存在;
    if($('#'+id).length==1){
        console.log('存在当前对象聊天窗口');
        $('#'+id).find('.xx-name').html(ysName);
        $('#'+id).show().siblings().hide();
    }else {
        console.log('不存在当前对象聊天窗口');
        $('.chatList').append(`<div class="chatroom" id="${id}"> 
        							<p class="xx-name">${ysName}</p> 
        							<div class="xx-ck"> 
        								<div class="xx-ck-home"></div> 
        							</div> 
        							<div class="chat-value clearfix">
        								<button class="lookHistory">查看聊天记录</button> 
        								<button class="xx-fasong">发送信息</button> 
        								<input type="text" placeholder="请输入要发送的信息" class="send-value"> 
        								<div class="yy_send">
        									<button class="voice_record snarl-demo waves-button" onclick=funStart("${id}")>录制</button> 
        									<button class="voice_send snarl-demo waves-button" onclick =funStop("${id}","${newUser}")> 发送 </button>
        								</div>
        							</div>
        							<button class="xx-sp"><img src="./img/video@2x.png">视频通话</button>
        						</div>`);
        $('#'+id).show().siblings().hide();
    };
    if($('#'+newUser).length==1){
        $('#'+newUser).find('.xx-noRead').html(0).hide();
    }
    
        // -----发送消息按钮绑定事件
//  var btn=$('#'+id).find('.yy_send')[0];
//  btn.onmousedown=function () {   //按下录音
//  	$('.yy_tx').remove();
//      $('#'+id).find('.xx-ck-home').append(`<div class="yy_tx">
//												<img class="thyying" src="./img/yy.jpg" />
//											</div>`);
//											
//		funStart();
//		yyTime=setInterval(function(){
//			yytime++;
//			console.log(yytime)
//		},1000)
//  };
//  btn.onmouseup=function () {   	//抬起发送录音
//     	$('.yy_tx').remove();
//     	funStop(id,newUser);	
//  };
    
    
    
    // -----发送消息按钮绑定事件
    var btn=$('#'+id).find('.xx-fasong')[0];
    btn.onclick=function () {
        sendPrivateText(newUser,id);
    };
    //  -----查看聊天记录按钮绑定事件
    var lookbtn=$('#'+id).find('.lookHistory')[0];
    lookbtn.onclick=function () {
        lookHistory(newUser,id);
    };
});
// ------------------好友列表，发送视频
$('.friendOne-video').click(function (e) {
    e.stopPropagation();
    var ysName=$(this).parents('.lx-friend-one').find('.int1-name').html();  //直接拿到最新的医生姓名
    var docId=parseInt($(this).parents('.lx-friend-one').find('.ysID').html());     //医生ID
    var ToId="doc"+docId;
    var id=ToId+'_s';
    if($('#'+ToId+'_sp').length){              //判断当前用户视频窗口是否存在
        $('.chatList').hide();
        $('.shipingList').show();
        console.log('存在视频窗口');
        $('#'+ToId+'_sp').show().find('.sp-name>p').html(ysName);
        console.log('存在该用户视频聊天窗口');
    }else {
        if($('.hoshowtime').length){
            $('.gbqtsp').show();
        }else {
            $('.chatList').hide();
            $('.shipingList').show().children().remove();
            console.log('开始创建视频元素');
            $('.shipingList').append(' <div class="shipingroom"> <div class="sp-user" id='+ToId+'_sp'+'> <div class="sp-name"> <p>'+ysName+'</p> </div> <div class="sp-ck"> <div class="sp-ck-home"> <div id="div_device" class="panel panel-default" style="display:block"> <div class="select"> <label for="audioSource">Audio source: </label><select id="audioSource"></select> </div> <div class="select"> <label for="videoSource">Video source: </label><select id="videoSource"></select> </div> </div> <div id="div_join" class="panel panel-default" > <div class="panel-body"> <div style="display: none"><label>请选择房间: </label><input id="channel" class="big-channel" type="text" value='+docId+' size="4"/></div> <input id="videoCheck" class="videoBtn-big" type="checkbox" checked style="display: none"/> <button id="join" class="btn btn-primary"  data-ripple="ripple"></button> <button id="leave" class="btn btn-primary"  data-ripple="ripple"></button> <input id="key" type="text" value='+swAppId+' size="36" style="display: none" /> </div> </div> </div> <div id="video" class="video-big"> <div id="agora_local" class="videoBig-agora_localId"></div> </div> </div> </div> <button class="sp-liaotiao">发送</button> </div >')
            var eleK=document.getElementById('join');
            eleK.onclick=CheckJoin;
            var eleG=document.getElementById('leave');
            eleG.onclick=Checkleave;
            console.log('不存在该用户视频聊天窗口，已经为你创建');
        }
    }

});

//信息页面展示 添加好友，发起视频提醒
function getmorexx(docId,data,ysname,yssrc) {
    //医生同意添加好友
    //消息界面提示 【对方成功添加你为好友】/【发起视频】
    // -------消息界面的没有数据提示消失
    $('.xiaoxi-home').find('.no-shuju').remove();
    // ----消息的时间显示（时间戳）
    var timeList=getInforTime();         //获取时间对象
    var bztime = timeList.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
    var xxtime = getTimeText(bztime);    //对时间进行判断  区别今天/昨天/过去
    // console.log(data)
    if(data=='[视频聊天]'){               //视频提醒出现在聊天对话消息中
        var id = docId + '_x';
        var xxtime=timeHide(timeList,xxtime,docId); //对2分钟以内的时间隐藏

        // ---判断聊天室界面是否存在   !!!!!
        if ($('#' + id).length == 1) {
            console.log('已经存在聊天窗口');
        } else {
            console.log('不存在聊天窗口');
            $('.chatList').append(`<div class="chatroom" id="${id }"> 
            							<p class="xx-name">${ysname}</p> 
            							<div class="xx-ck"> 
            								<div class="xx-ck-home"></div> 
            							</div> 
            							<div class="chat-value clearfix">
            								<button class="lookHistory">查看聊天记录</button> 
            								<button class="xx-fasong">发送信息</button> 
            								<input type="text" placeholder="请输入要发送的信息" class="send-value"> 
            								<div class="yy_send">
        										<button class="voice_record snarl-demo waves-button" onclick=funStart("${id}")>录制</button>
    											<button class="voice_send snarl-demo waves-button" onclick=funStop("${id}","${docId}")>发送</button>
        									</div>		
            									
        									</div>
            								</div>
            							</div> 
            							<button class="xx-sp"><img src="./img/video@2x.png">视频通话</button>
            						</div>`)
        }
        // 低于2分钟不显示时间的样式
        // var othUserImg=$('#'+docId).find('img').attr('src');    //找到对应医生的图片;
        // console.log('当前医生头像为'+othUserImg);
        if(xxtime==''){
            bztime='';
            $('#' + id).find('.xx-ck-home').append('<div class="xx-othUser clearfix"><div class="othImg"><img src='+yssrc+'></div> <div class="xx-otext"> <p class="othText">' + data + '</p> <img src="./img/sanjiaol.png"> </div> </div>');
        }else {
            $('#' + id).find('.xx-ck-home').append('<div class="xx-othUser clearfix"><p class="xx-time"><span>'+xxtime+'</span></p> <div class="othImg"><img src='+yssrc+'></div> <div class="xx-otext"> <p class="othText">' + data + '</p> <img src="./img/sanjiaol.png"> </div> </div>');
        }
        var chatBox = $('#' + id).find('.xx-ck-home')[0];
        chatBox.scrollTop = chatBox.scrollHeight;
//
        // --消息未读判断 //
        var xxone={}  ;      //当前信息对象

        if ($('#' + id).is(':visible') || $('chatList').is(':visible')) {
            // console.log('当前聊天窗口显示');
            $('#' + docId).find('.xx-noRead').html(0).hide();
            //消息已读
            xxone={
                User:docId,
                data:'[视频聊天]',
                time:bztime
            };
        } else {
            // console.log('当前聊天窗口隐藏');
            var num = $('#' + docId).find('.xx-noRead').html();
            var num = parseInt(num);
            var newNum = num + 1;
            $('#' + docId).find('.xx-noRead').html(newNum).show();
            //消息未读
            xxone={
                User:docId,
                data:'[视频聊天]',
                time:bztime
            };
        }
        saveHcXxO(docId,xxone)     

        // -------消息界面的最新消息缓存
        var $ele = $('.xiaoxi-home').html();
        localStorage.setItem('xxjmhc', JSON.stringify($ele));

    }
    // ---------判断消息界面是否存在
    var timeListA=getInforTime();         //获取时间对象
    var bztimeA = timeListA.time;          // 2017-09-14 13:46:22 获取时间对象--标准时间
    var xxtimeA = getTimeText(bztimeA);    //对时间进行判断  区别今天/昨天/过去
    var $ele= $('#' + docId);
    if ($ele.length == 1) {
        console.log('存在当前用户消息提醒');
        $ele.find('.pic-inform-textT').html(data);
        $ele.find('.xx_bzTime').html(bztimeA);
        $ele.find('.xx_Time').html(xxtimeA);
         //防止延迟导致的姓名图片 underfined
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
        $ele.find('.pic-inform-user').html(ysName);
        $ele.find('img').attr("src",ysImg);      
        var clone = $ele.parents('.xxXx-one').clone(true);
        $ele.parents('.xxXx-one').remove();
        $('.xiaoxi-home').prepend(clone);
        getxxList(); //刷新消息列表
    } else {
        console.log('不存在当前用户消息提醒');
        $('.xiaoxi-home').prepend('<div class="xxXx-one"><div class="pic-inform clearfix" id=' + docId+ '><div class="pic-inform-pic"> <div class="xx-noRead" style="display: none">0</div> <img src=' + yssrc + '> </div> <div class="pic-inform-text"> <p class="pic-inform-user">' + ysname + '</p> <p> <span class="pic-inform-textT">'+data+'</span> <span class="xx_Time">' + xxtimeA + '</span><span class="xx_bzTime" style="display: none">'+bztimeA+'</span></p> </div></div><div class="xx-X">删除</div></div>');
        getxxList(); //刷新消息列表
    }
}

// ---- 视频 拒绝邀请
$('.no-accsp').click(function () {
    var docId=$('.acc-sp').find('.yes-accsp-docid').html();
    gdsptx(docId);   //拒绝视频的函数
    $('.acc-sp').hide();
    $('.thtsls').html('');
});
// ---- 视频 接受邀请
$('.yes-accsp').click(function () {
     //接受视频的函数（走声网）  //拿到医生环信ID
    $('.thtsls').html('');
    var ysname=$('.acc-sp').find('.accsp-text').html();
    var docId=$('.acc-sp').find('.yes-accsp-docid').html(); //医生环信ID
    var newDocId=parseInt(docId.slice(3));  //医生ID
    console.log('对方的环信ID号为'+docId);
    $('.acc-sp').hide();
    var sptype=$('.acc-sp').find('.sp_type').html();
    if(sptype==2){
        var g=2; //虚拟视频聊天
        var str=$('.acc-sp').find('.sp_SRC').html();
        var arr=str.split("@$");
        xnObj={
            dId:arr[1],           //医生ID
            docId:arr[2],       //医生环信ID
            ysname:arr[3],      //医生姓名
            pcname:arr[6],      //评测名
            pcurl:arr[7],      //评测地址
        };
        console.log(xnObj);
    }else {
        var g=1; //普通视频聊天
    }
    if($('.xlsp').is(':visible')){
        console.log('正在训练方案视频观看中');
        var syTime=$('.fa-sythsc').html();
        if($('.fashowtime').length){
            $('.gbqtsp').show();
        }else {
            if(parseInt(syTime)<=0){
                var text='视频聊天时长不足,请充值后进入！';
                $('.scbztext').html(text);
                $('.scbz').show();
            } else {
                console.log('训练方案check完毕正在为你开启视频聊天');
                var t=2;
                if(g==1){        //g==1普通视频
                    creatxlltroom(docId,t,g);   //在训练方案中创建视频房间
                }else {          //g==2虚拟视频
                    $.when(openNX()).done(function (data) {
                        if(data.status=='true'){
                            console.log('开启成功');
                            creatxlltroom(docId,t,g);   //在训练方案中创建视频房间
                        }
                    })
                }
            }
        }
    }else {
        //其他情况发开好友列表的视频聊天
        $('.chatList').hide();
        $('.shipingList').show();                   //页面展示可能存在问题！！！
        if($('#'+docId+'_sp').length){              //判断当前用户视频窗口是否存在
            console.log('已经存在该好友列表的视频聊天窗口');
            $('#'+docId+'_sp').show().find('.sp-name>p').html(ysname);
            var syTime=$('.fa-sythsc').html();
            if($('.hoshowtime').length){
                $('.gbqtsp').show();
            }else {
                if(parseInt(syTime)<=0){
                    var text='视频聊天时长不足,请充值后进入！';
                    $('.scbztext').html(text);
                    $('.scbz').show();
                }else {
                    console.log('好友列表check完毕正在为你创建窗口');
                    var t=2;
                    if(g==1){        //g==1普通视频
                        join(t,g);  //加入房间
                    }else {          //g==2虚拟视频
                        $.when(openNX()).done(function (data) {
                            if(data.status=='true'){
                                console.log('开启成功');
                                join(t,g);  //加入房间
                            }
                        })
                    }
                }
            }
        } else {
            $('.shipingList').children().remove();
            $('.shipingList').append(' <div class="shipingroom"> <div class="sp-user" id='+docId+'_sp'+'> <div class="sp-name"> <p>'+ysname+'</p> </div> <div class="sp-ck"> <div class="sp-ck-home"> <div id="div_device" class="panel panel-default" style="display:block"> <div class="select"> <label for="audioSource">Audio source: </label><select id="audioSource"></select> </div> <div class="select"> <label for="videoSource">Video source: </label><select id="videoSource"></select> </div> </div> <div id="div_join" class="panel panel-default" > <div class="panel-body"> <div style="display: none"><label>请选择房间: </label><input id="channel"  class="big-channel" type="text" value='+newDocId+' size="4"/></div> <input id="videoCheck" class="videoBtn-big" type="checkbox" checked style="display: none"/> <button id="join" class="btn btn-primary" data-ripple="ripple"></button> <button id="leave" class="btn btn-primary"  data-ripple="ripple"></button> <input id="key" type="text" value='+swAppId+' size="36" style="display: none" /> </div> </div> </div> <div id="video" class="video-big"> <div id="agora_local" class="videoBig-agora_localId"></div> </div> </div> </div> <button class="sp-liaotiao">发送</button> </div >')
            var eleK=document.getElementById('join');
            eleK.onclick=CheckJoin;
            var eleG=document.getElementById('leave');
            eleG.onclick=Checkleave;
            var syTime=$('.fa-sythsc').html();
            if($('.hoshowtime').length){
                $('.gbqtsp').show();
            }else {
                if(parseInt(syTime)<=0){
                    var text='视频聊天时长不足,请充值后进入！';
                    $('.scbztext').html(text);
                    $('.scbz').show();
                }else {
                    console.log('好友列表check完毕正在为你创建窗口');
                    var t=2;
                    if(g==1){        //g==1普通视频
                        join(t,g);  //加入房间
                    }else {          //g==2虚拟视频
                        $.when(openNX()).done(function (data) {
                            if(data.status=='true'){
                                console.log('开启成功');
                                join(t,g);  //加入房间
                            }
                        })
                    }
                }
            }
        }
    }
});

function openNX(){ //虚拟摄像头----开启--
    var defer=$.Deferred();
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:1,
            exeUrl: xnObj.pcurl,  //第三方训练exe路径
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            defer.resolve(data);
            //true   操作成功！ info 返回信息false  操作失败！空“”
        },
        error:function (err) {
            console.log(err);
        }
    });
    return defer.promise();
}
function closeNX(){ //虚拟摄像头----关闭--
    var defer=$.Deferred();
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:2,
            exeUrl: xnObj.pcurl,  //第三方训练exe路径
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
function readXNtext() {//---评测 --5秒后-查找文件是否存在-- 评测 关闭== 轮询==找文件--返回评测信息---
    var defer=$.Deferred();
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:6,
            exeUrl: xnObj.pcurl,  //第三方训练exe路径
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            defer.resolve(data);
            //true   操作成功！如果存在 返回信息 pcInfofalse  操作失败！
        },
        error:function (err) {
            console.log(err);
        }
    });
    return defer.promise();
}
function xnContain(time,text) { //病人 具体视频评测内容-
    var defer=$.Deferred();
    $.ajax({
        url: ajaxBd+'MSTYL/pat/savePcResult.action',
        data:{
            exeUrl: xnObj.pcurl,        //第三方训练exe路径
            pId: patId,                  //当前登录病人ID
            dId:xnObj.dId,                     //当前制定医生ID
            pcTime:time,                 //评测时间
            title:xnObj.pcname,                 //视频名称
            pcInfo:text                    //评测内容
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            defer.resolve(data);
            //true   操作成功！如果存在 返回信息 pcInfofalse  操作失败！
            if(data.status=='true'){
                console.log('操作成功');
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
    return defer.promise();
}


// 单聊发送音频消息
var sendPrivateAudio = function () {
    var id = conn.getUniqueId();                   // 生成本地消息id
    var msg = new WebIM.message('audio', id);      // 创建音频消息
    var input = document.getElementById('audio');  // 选择音频的input
    var file = WebIM.utils.getFileUrl(input);      // 将音频转化为二进制文件
    var allowType = {
        'mp3': true,
        'amr': true,
        'wmv': true
    };
    if (file.filetype.toLowerCase() in allowType) {
        var option = {
            apiUrl: WebIM.config.apiURL,
            file: file,
            to: 'username',                       // 接收消息对象
            roomType: false,
            chatType: 'singleChat',
            onFileUploadError: function () {      // 消息上传失败
                console.log('onFileUploadError');
            },
            onFileUploadComplete: function () {   // 消息上传成功
                console.log('onFileUploadComplete');
            },
            success: function () {                // 消息发送成功
                console.log('Success');
            },
            flashUpload: WebIM.flashUpload
        };
        msg.set(option);
        conn.send(msg.body);
    }
};

// 命令消息
// var id = conn.getUniqueId();            //生成本地消息id
// var msg = new WebIM.message('cmd', id); //创建命令消息
//
// msg.set({
//     msg: 'msg',
//     to: 'username',                       //接收消息对象
//     action : 'action'                     //用户自定义，cmd消息必填
//     ext :{'extmsg':'extends messages'}    //用户自扩展的消息内容（群聊用法相同）
//     success: function ( id，serverMsgId ) {}//消息发送成功回调
// });
//
// if ( /*如果是发送到群组*/ ) {
//     msg.setGroup('groupchat');
// } else if ( /*如果是发送到聊天室*/ ) {
//     msg.body.roomType = true;
//     msg.setGroup('groupchat');
// }
//
// conn.send(msg.body);

