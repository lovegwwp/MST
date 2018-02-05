
// AgoraRTC	使用 AgoraRTC 对象创建客户端(Client)和音视频流(Stream)对象
// Client	提供 AgoraRTC 核心功能的 web 客户端对象
// Stream	通话中的本地或远程音视频流
var client, localStream, camera, microphone;
function join(t,g) {                //大视频进入            g==2 虚拟聊天  g==1普通聊天
    getDevices();                   //拿到视频源 音频源
    if(t==2){     //主动接听
        var strt='正在建立连接...';
    }else {    //主动呼叫
        var strt='正在呼叫...';
        t=1;
    }
    if(g==2) {
        // alert('虚拟视频');
        spZT=2;
    }else {
        // alert('普通视频');
        spZT=1;
    }
    document.getElementById("videoCheck").disabled = true;
    var dynamic_key = null;
    var sjc;
    var strDoc=$('.big-channel').val();
    var newDoc=parseInt($('.big-channel').val());   //'20'
    var docId='doc'+strDoc;
    VideoChating='doc'+strDoc;   //正在视频聊天的医生环信ID
    client = AgoraRTC.createClient({mode: 'interop'}); 
    if(g==2){
    	$('.video-big #agora_local').hide();
    }
    client.init(key.value, function () { //key.value   声网APPID
        // 初始化客户端对象(init)
        client.join(dynamic_key,strDoc,null, function(uid) {
            console.log("User " + uid + " 加入房间成功！！！！！");
           
            $('#join').css('backgroundImage','url(./img/waiting.png)')
    		$('#leave').css('backgroundImage','url(./img/refuse.png)')
            
            $('.sp-ck-home').append('<div class="bigsfck"><img src="./img/switch@3x.png"></div><div class="otherPerson"> <p class="ltsp-zt">'+strt+'</p> </div><p class="hoshowtime"></p>');
            // console.log('之前的null为uid为'+newDoc);
            if (document.getElementById("videoCheck").checked){
                var audioSelect = document.querySelector('select#audioSource');
                var videoSelect = document.querySelector('select#videoSource');
                
                
                var indexvideo;
                var Vsource=$("#videoSource option");
                var sbarr=[];   //接收所有设备空数组
				var qcArr=[];   //接收去重设备空数组
				
				for(var i=0;i<Vsource.length;i++){	
					var numb=0;
					var eleLen=Vsource.eq(i).html();
					for(var j=0;j<eleLen.length;j++){
						var numb=numb+eleLen.charCodeAt(j)
					}
					sbarr.push(numb);
				}
				console.log(sbarr)            //所有设备的数组排序
				var newqcArr=quchong(sbarr,qcArr).sort(NumAscSort);//去重完的数组排序 
				console.log(newqcArr);
  
                if(g==2) {
                    // alert('虚拟视频');
					var textContain=newqcArr[xnCamera];
					for(var p=0;p<sbarr.length;p++){
						if(sbarr[p]==textContain){
							indexvideo=p;
							break
						}
					}
                    console.log('！！！！！！！！大视频，虚拟视频，下标为'+indexvideo);
                }else {
                    // alert('普通视频');
                    var textContain=newqcArr[bdCamera];
					for(var p=0;p<sbarr.length;p++){
						if(sbarr[p]==textContain){
							indexvideo=p;
							break
						}
					}
                    console.log('！！！！！！！！！大视频，普通视频，下标为'+indexvideo);
                }
           
                var SeSource=$('#videoSource option:eq('+indexvideo+')').val();
                camera = SeSource;
                console.log('camera的值为');
                console.log(camera);
                microphone = audioSource.value;
                console.log('microphone的值为');
                console.log(microphone);
                localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    cameraId: camera, microphoneId: microphone,
                    video: document.getElementById("videoCheck").checked,
                    screen: false
                });
                if (document.getElementById("videoCheck").checked) {
                    localStream.setVideoProfile('720p_3');
                }
                localStream.init(function() {
                    console.log("getUserMedia successfully");
                    localStream.play('agora_local');

                    client.publish(localStream, function (err) {
                        console.log("Publish local stream error: " + err);
                    });

                    client.on('stream-published', function (evt) {
                        console.log("Publish local stream successfully");
                    });
                }, function (err) {
                    console.log("getUserMedia failed", err);
                });
            }
            showTimeCost(2);
            getviedoChat1();    //计算时长
            checkPerJion();     // 检测用户的加入
            $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                if(data){
                    var fwcsjc=data.sjc;
                    var sjc=parseInt(fwcsjc);                     //t==1  主动呼叫   t==2同意进入
                    if(t==1){
                        console.log('发送呼叫对方进入房间的提示');
                        fssptx(docId,sjc);           //发送视频通过穿透消息告诉对方//type:3
                        console.log('发送提示')
                    }else {
                        console.log('发送我进入房间的提示');
                        jrsptx(docId,sjc);                       //type:6
                    }

                }
            });

        }, function(err) {
            console.log("Join channel failed", err);
        });
    }, function (err) {
        console.log("AgoraRTC client init failed", err);
    });
    channelKey = ""; //动态需要注释
    client.on('error', function(err) {
        console.log("Got error msg:", err.reason);
        if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
            client.renewChannelKey(channelKey, function(){
                console.log("Renew channel key successfully");
            }, function(err){
                console.log("Renew channel key failed: ", err);
            });
        }
    });
    client.on('stream-added', function (evt) {
        var stream = evt.stream;
        console.log("New stream added: " + stream.getId());  //对方成功加入房间的回调
        $('.ltsp-zt').html('');
        clearInterval(pertime); //清除检查用户进入房间的定时器
        console.log("Subscribe ", stream);
        client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
        });
    });
    client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        console.log("Subscribe remote stream successfully: " + stream.getId());
        if ($('div#video #agora_remote'+stream.getId()).length === 0) {
            $('div#video').append('<div class="bigOtherPic" id="agora_remote'+stream.getId()+'"style=""></div>');
            // --------------------------------小窗口
        }
        stream.play('agora_remote' + stream.getId());
    });
    client.on('stream-removed', function (evt) {
        var stream = evt.stream;
        stream.stop();
        $('#agora_remote' + stream.getId()).remove();
        console.log("Remote stream is removed " + stream.getId()); //对方中断视频（非正常情况 回调）
        $('.gdsp').show();
        leave();               //关闭视频窗口
        setTimeout(function () {
            $('.gdsp').hide();     //主动关闭弹出层
        },3000);
    });
    client.on('peer-leave', function (evt) {
        var stream = evt.stream;
        if (stream) {
            stream.stop();
            $('#agora_remote' + stream.getId()).remove();
            console.log(evt.uid + " leaved from this channel");  //对方退出房间的回调（正常情况 回调）
            $('.gdsp').show();
            leave();               //关闭视频窗口
            setTimeout(function () {
                $('.gdsp').hide();     //主动关闭弹出层
            },3000);
        }
    });
}
//绑定好友界面进入聊天室
function leave() {  //大视频退出
	localStream.close();
    clearInterval(pertime); //清除检测用户加入的定时器
    // $('#leave').attr('disabled',true);
    // document.getElementById("leave").disabled = true;
    client.leave(function () {
            // console.log("Leavel channel successfully");
            $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                if(data){
                    var fwcsjc=data.sjc;
                    var sjc=parseInt(fwcsjc);
                    lksptx(VideoChating,sjc);     //离开视频发送透传
                }
            });
            $('.video-big').html('<div id="agora_local" class="videoBig-agora_localId"></div>');
            $('.otherPerson').remove();
            $('.bigsfck').remove();
            clearTimeout(hoshowflag); //关闭显示时间的计时器;
            $('.hoshowtime').remove();
            clearInterval(chatTimer1); //关闭计算时间的计时器;
            var spltsc=JSON.parse(localStorage.getItem('spnosc'));  //拿到本地视频缓存时长
            if(spltsc[0]!=0){
                fsxllthc(spltsc[0]);       //发送聊天时长
            }
            if($('.xx-btn').is('.active-under2')){
            	$('.shipingList').hide();   //视频层隐藏
            	$('.xiaoxi-home').show();
   				var $ele= $('.xiaoxi-home').children();
    			$ele.eq(0).show();
    			$ele.eq(1).show();
    			$ele.eq(2).show();
    			$ele.eq(3).show();
    			$ele.eq(4).show();
            }else{
            	$('.shipingList').hide();   //视频层隐藏
            }
            console.log('好友列表视频退出成功！！！！！！！！！！！！！！');
            $('#join').css('backgroundImage','url(./img/answer.png)');
    		$('#leave').css('backgroundImage','url(./img/waiting.png)');
        }, function (err) {
        console.log("Leave channel failed");
    });
    if(spZT==2){  //虚拟视频
        $.when(closeNX(chatTime1)).done(function (data) {
            if(data.status=='true'){
                console.log('虚拟摄像头关闭成功');
                setTimeout(function(){
                    console.log('开始读取虚拟文件');
                    $.when( readXNtext()).done(function (data) {
                        console.log(data);
                        if(data.status=='true'){
                            console.log('虚拟读取文件成功');
                            var text=data.pcInfo;
                            console.log('发送的时长为'+chatTime1+'具体视频评测内容');
                            $.when( xnContain(chatTime1,text)).done(function (data) {
                                if(data.status=='true'){
                                    console.log('具体视频评测内容操作成功');
                                    chatTime1=0;   //大视频当前计时器初始化
                                }
                            })
                        }
                    });
                },5000)
            }
        });
        spZT=1;
    }
}

function publish() {
    document.getElementById("publish").disabled = true;
    document.getElementById("unpublish").disabled = false;
    client.publish(localStream, function (err) {
        console.log("Publish local stream error: " + err);
    });
}

function unpublish() {
    document.getElementById("publish").disabled = false;
    document.getElementById("unpublish").disabled = true;
    client.unpublish(localStream, function (err) {
        console.log("Unpublish local stream failed" + err);
    });
}

function getDevices() {
    var audioSelect = document.querySelector('select#audioSource');
    var videoSelect = document.querySelector('select#videoSource');
    AgoraRTC.getDevices(function (devices) {
        for (var i = 0; i !== devices.length; ++i) {
            var device = devices[i];
            var option = document.createElement('option');
            option.value = device.deviceId;
            if (device.kind === 'audioinput') {
                option.text = device.label || 'microphone ' + (audioSelect.length + 1);
                audioSelect.appendChild(option);
            } else if (device.kind === 'videoinput') {
                option.text = device.label || 'camera ' + (videoSelect.length + 1);
                videoSelect.appendChild(option);
            } else {
                console.log('Some other kind of source/device: ', device);
            }
        }
    });
}
//好友列表 --开启视频检测
function CheckJoin() {       //通过视频的计时器得到视频页面是否存在
    var syTime=$('.fa-sythsc').html();
    if(wlstatus=='false'){
    	$('.wlyjdk').show();
    	setTimeout(function(){
    		$('.wlyjdk').hide();
    	},1000);
    	return;
    }
    if($('.hoshowtime').length){
        $('.gbqtsp').show();
        return;
    }
    if(parseInt(syTime)<=0){
        var text='视频聊天时长不足,请充值后进入！';
        $('.scbztext').html(text);
        $('.scbz').show();
        return;
    }
    console.log('好友列表check完毕正在为你创建窗口');
    join();  
}
// 好友列表 --关闭视频检测
function Checkleave() {       //通过视频的计时器得到视频页面是否存在
    if($('.hoshowtime').length||$('#agora_local').children().length){
        console.log('好友列表check完毕存在正在视频聊天的对象,正为你关闭');
        leave();
    }else {
        console.log('好友列表check完毕不存在视频聊天的对象，退出按键无效');
    }
}
//训练方案 --开启视频检测
function CheckfaSpOpen(toid){//开启训练视频对视频是否存在做判断
    var syTime=$('.fa-sythsc').html();
    if(wlstatus=='false'){
    	$('.wlyjdk').show();
    	setTimeout(function(){
    		$('.wlyjdk').hide();
    	},1000);
    	return;
    }
    if($('.fashowtime').length){
        $('.gbqtsp').show();
        return;
    }
    if(parseInt(syTime)<=0){
        var text='视频聊天时长不足,请充值后进入！';
        $('.scbztext').html(text);
        $('.scbz').show();
        return;
    } 
    console.log('训练方案check完毕正在为你开启视频聊天');
    creatxlltroom(toid)
}
// 训练方案 --挂断视频检测
function CheckfaSpClose() {
    //关闭训练视频对视频是否存在做判断
    if($('.fashowtime').length||$('#agora_local').children().length){
        console.log('训练方案check完毕正在为你关闭视频聊天');
        faCloseSp();
    }else {
        console.log('训练方案check完毕没有开启视频通话,退出按键无效');
    }
}
//创建训练方案视频聊天窗口
function creatxlltroom(toid,t,g) {              //toid:'doc20'(房间号);    1:普通视频  2，虚拟视频
    if(t==2){
        var strr='正在建立连接...';        //2 接受请求
    }else {
        var strr='正在呼叫...';           //1 主动呼叫
        t=1;
    }
    if(g==2) {
        // alert('虚拟视频');
        spZT=2;
    }else {
        // alert('普通视频');
        spZT=1;
    }
    var SmallVide = '<div id="div_device" class="panel panel-default" style="display:none"><div class="select"> <label for="audioSource">Audio source: </label><select id="audioSource"></select> </div> <div class="select"> <label for="videoSource">Video source: </label><select id="videoSource"></select></div> </div> <div id="div_join" class="panel panel-default"> <div class="panel-body"> <div><input id="channel" class="xl-channel" type="text" value=' + toid + ' size="4" style="display: none"/></div> <input id="videoCheck" class="videoBtn-big" type="checkbox" checked style="display: none"/> <input id="key" type="text" value="d7901a8d70ac4adfb81dcab13522e9ef" size="36" style="display: none" /> </div> </div> <div id="video" class="video-small"> <div id="agora_local" class="videoBig-agora_localId"></div> <div id="localVideo"></div></div>'
    $('.xlsp').find('.sp-room').append(SmallVide);
    document.getElementById("videoCheck").disabled = true;
    getDevices();                         //拿到视频源 音频源

    var dynamic_key = null;
    var newDoc=toid.slice(3);    //房间号
    console.log('房间号为'+newDoc);
    VideoChating=toid;   //正在视频聊天的医生环信ID
    client = AgoraRTC.createClient({mode: 'interop'});
    // 初始化客户端对象(init)
    // console.log($('#key').length);
    if(g==2){
    	$('.video-small #agora_local').hide();
    }
    client.init(key.value, function () {
        client.join(dynamic_key, newDoc, null, function (uid) {
            console.log("User " + uid + " 加入房间成功！！！！！");
            $('.fa-sp-start').css('backgroundImage','url(./img/waiting.png)')
    		$('.fa-sp-end').css('backgroundImage','url(./img/refuse.png)')

            
            $('.xlsp-main').find('.videoList2').find('.videoList2_one').addClass('active');
            $('.xlsp-main').find('.videoList2').addClass('active');
            $('.xlsp-main').find('.videoList2').find('.video-js').addClass('active');
            $('.xlsp-main').find('.videoList').find('.video-js').addClass('active');
            $('.videoSProm').css('width', '4.5rem');
            $('.sp-room').append('<div class="smsfck"><img src="./img/switch@3x.png"></div><div class="otherxlPerson"> <p class="ltsp-zt">'+strr+'</p> </div><p class="fashowtime"></p>');
            // console.log('训练方案之前的channel key为'+toid);
            if (document.getElementById("videoCheck").checked) {
                var audioSelect = document.querySelector('select#audioSource');
                var videoSelect = document.querySelector('select#videoSource');
                console.log('摄像头类型/下标！！！！！！！！！！！！！！');
                
                
                
                var indexvideo;
                var Vsource=$("#videoSource option");
                var sbarr=[];   //接收所有设备空数组
				var qcArr=[];   //接收去重设备空数组
				
				for(var i=0;i<Vsource.length;i++){	
					var numb=0;
					var eleLen=Vsource.eq(i).html();
					for(var j=0;j<eleLen.length;j++){
						var numb=numb+eleLen.charCodeAt(j)
					}
					sbarr.push(numb);
				}
				console.log(sbarr)            //所有设备的数组排序
				var newqcArr=quchong(sbarr,qcArr).sort(NumAscSort);//去重完的数组排序 
				console.log(newqcArr);
                if(g==2) {
                    // alert('虚拟视频');
                    var textContain=newqcArr[xnCamera];
					for(var p=0;p<sbarr.length;p++){
						if(sbarr[p]==textContain){
							indexvideo=p;
							break
						}
					}
					console.log('!!!!!!!!!!!!!!!!!!!!!!!!!小视频，虚拟视频，下标为'+indexvideo);
                }else {
                    // alert('普通视频');
                    var textContain=newqcArr[bdCamera];
					for(var p=0;p<sbarr.length;p++){
						if(sbarr[p]==textContain){
							indexvideo=p;
							break
						}
					}
					console.log('!!!!!!!!!!!!!!!!!!!!小视频，普通视频，下标为'+indexvideo);
                }
                console.log('小视频');
                var SeSource=$('#videoSource option:eq('+indexvideo+')').val();
                camera = SeSource;
                console.log(camera);
                microphone = audioSource.value;
                localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    cameraId: camera,
                    microphoneId: microphone,
                    video: document.getElementById("videoCheck").checked,
                    screen: false
                });
                if (document.getElementById("videoCheck").checked) {
                    localStream.setVideoProfile('720p_3');
                }
                localStream.init(function () {
                    console.log("getUserMedia successfully");
                    localStream.play('agora_local');

                    client.publish(localStream, function (err) {
                        console.log("Publish local stream error: " + err);
                    });

                    client.on('stream-published', function (evt) {
                        console.log("Publish local stream successfully");
                    });
                }, function (err) {
                    console.log("getUserMedia failed", err);
                });
            }
            showTimeCost(1);    //显示通话时长  XX:XX:XX
            getviedoChat2();     //计算时长
            checkPerJionsm();    // 检测用户的加入
            $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                if(data){
                    var fwcsjc=data.sjc;
                    var sjc=parseInt(fwcsjc);  //t==1  主动呼叫   t==2同意进入
                    if(t==1){
                        fssptx(toid,sjc);           //发送视频通过穿透消息告诉对方type3
                        console.log('发送提示')
                    }else {
                        jrsptx(toid,sjc);    //type:6
                    }
                }
            });
        }, function (err) {
            console.log("Join channel failed", err);
        });
    }, function (err) {
        console.log("AgoraRTC client init failed", err);
        $('.xlsp').find('.sp-room').children().remove();
    });

    client.on('error', function (err) {
        console.log("Got error msg:", err.reason);
        if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
            client.renewChannelKey(channelKey, function () {
                console.log("Renew channel key successfully");
            }, function (err) {
                console.log("Renew channel key failed: ", err);
            });
        }
    });
    client.on('stream-added', function (evt) {
        var stream = evt.stream;
        console.log("New stream added: " + stream.getId());
        console.log("Subscribe ", stream);
        client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
        });
    });
    client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        console.log("Subscribe remote stream successfully: " + stream.getId());
        if ($('div#video #agora_remote' + stream.getId()).length === 0) {
            $('div#video').append('<div class="smallOtherPic" id="agora_remote' + stream.getId() + '"style=""></div>');
            // --------------------------------小窗口
        }
        stream.play('agora_remote' + stream.getId());
    });
    client.on('stream-removed', function (evt) {
        var stream = evt.stream;
        stream.stop();
        $('#agora_remote' + stream.getId()).remove();   //对方中断视频（非正常情况 回调）
        console.log("Remote stream is removed " + stream.getId());
        $('.gdsp').show();
        faCloseSp();               //关闭视频窗口
        setTimeout(function () {
            $('.gdsp').hide();     //主动关闭弹出层
        },3000);
    });
    client.on('peer-leave', function (evt) {
        var stream = evt.stream;
        if (stream) {
            stream.stop();
            $('#agora_remote' + stream.getId()).remove();
            console.log(evt.uid + " leaved from this channel"); //对方退出房间的回调（正常情况 回调）
            $('.gdsp').show();
            faCloseSp();               //关闭视频窗口
            setTimeout(function () {
                $('.gdsp').hide();     //主动关闭弹出层
            },3000);
        }
    });
}

function faCloseSp() {
    // $('.fa-sp-end').attr('disabled',true);    //视频关闭不可点击
    $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
        if(data){
            var fwcsjc=data.sjc;
            var sjc=parseInt(fwcsjc);
            lksptx(VideoChating,sjc);     //离开视频发送透传
        }
    });
    localStream.close();
    client.leave(function () {
        console.log("Leavel channel successfully");
        $('.xlsp-main').find('.videoList2').find('.videoList2_one').removeClass('active');
        $('.xlsp-main').find('.videoList2').removeClass('active');
        $('.xlsp').find('.xlsp-main').find('.videoList2').find('.video-js').removeClass('active');
        $('.xlsp').find('.xlsp-main').find('.videoList').find('.video-js').removeClass('active');
        $('.videoSProm').css('width','2rem');
        clearTimeout(fashowflag);   //关闭显示时间的计时器
        $('.xlsp').find('.sp-room').children().remove();
        clearInterval(chatTimer2);  //关闭计算时间的计时器
        var spltsc=JSON.parse(localStorage.getItem('spnosc'));  //拿到本地视频缓存时长
        if(spltsc[0]!=0){
            fsxllthc(spltsc[0]);       //发送聊天时长
        }
        console.log('训练方案视频退出成功！！！！！！！！！！！！！！');
        $('.fa-sp-start').css('backgroundImage','url(./img/answer.png)');
    	$('.fa-sp-end').css('backgroundImage','url(./img/waiting.png)');
    }, function (err) {
        console.log("Leave channel failed");
    });
    clearInterval(pertimesm);
    if(spZT==2){  //虚拟视频
        $.when(closeNX()).done(function (data) {
            if(data.status=='true'){
                console.log('虚拟摄像头关闭成功');
                setTimeout(function(){
                    console.log('开始读取虚拟文件');
                    console.log(xnObj.pcurl);
                    $.when( readXNtext()).done(function (data) {
                        if(data.status=='true'){
                            console.log('虚拟读取文件成功');
                            var text=data.pcInfo;
                            console.log('发送的时长为'+chatTime2+'具体视频评测内容');
                            $.when( xnContain(chatTime2,text)).done(function (data) {
                                if(data.status=='true'){
                                    console.log('具体视频评测内容操作成功');
                                    chatTime2=0;//小视频当前计时器初始化
                                }
                            })
                        }
                    });
                },5000)
            }
        });
        spZT=1;
    }
};
// -----
function getviedoChat1() {      //大视频聊天计时器
    chatTime1=0;      //视频聊天计时器初始化为0;
    var Spscjl;         //储存视频聊天时长的数组(包括缓存时长的和)
    var spltsc=JSON.parse(localStorage.getItem('spnosc'));  //拿到本地视频缓存

    if(spltsc[0]!=0){
        console.log('本地存在视频聊天发送失败的缓存为'+spltsc[0]+'秒');
        var oldFasp=parseInt(spltsc[0]);
        chatTimer1=setInterval(function () {
            Spscjl=[];
            chatTime1++;
            Spscjl.push(chatTime1+oldFasp);
            localStorage.setItem('spnosc', JSON.stringify(Spscjl));             //防止意外关机导致的计时器没有缓存
            /*console.log('当前视频聊天计时器记录时长为'+chatTime1+'秒');*/
           /* console.log('由于存在缓存，当前视频聊天总时长为'+Spscjl[0]+'秒');*/
        },1000)
    }else {
        console.log('本地不存在视频聊天发送失败的缓存为'+spltsc[0]+'秒');
        chatTimer1=setInterval(function () {
            Spscjl=[];
            chatTime1++;
            Spscjl.push(chatTime1);
            localStorage.setItem('spnosc', JSON.stringify(Spscjl));             //防止意外关机导致的计时器没有缓存
           /* console.log('当前视频聊天计时器记录时长为'+chatTime1+'秒');*/
           /* console.log('由于存在缓存，当前视频聊天总时长为'+Spscjl[0]+'秒');*/
        },1000)
    }
}
function getviedoChat2() {  //小视频聊天计时器
    chatTime2=0;         //视频聊天计时器初始化为0;
    var Spscjl;         //储存视频聊天时长的数组(包括缓存时长的和)
    var spltsc=JSON.parse(localStorage.getItem('spnosc'));  //拿到本地视频缓存
    if(spltsc[0]!=0){
        console.log('本地存在视频聊天发送失败的缓存为'+spltsc[0]+'秒');
        var oldFasp=parseInt(spltsc[0]);
        chatTimer2=setInterval(function () {
            Spscjl=[];
            chatTime2++;
            Spscjl.push(chatTime2+oldFasp);
            localStorage.setItem('spnosc', JSON.stringify(Spscjl));             //防止意外关机导致的计时器没有缓存
            console.log('当前视频聊天计时器记录时长为'+chatTime2+'秒');
            console.log('由于存在缓存，当前视频聊天总时长为'+Spscjl[0]+'秒');
        },1000)
    }else {
        console.log('本地不存在视频聊天发送失败的缓存为'+spltsc[0]+'秒');
        chatTimer2=setInterval(function () {
            Spscjl=[];
            chatTime2++;
            Spscjl.push(chatTime2);
            localStorage.setItem('spnosc', JSON.stringify(Spscjl));             //防止意外关机导致的计时器没有缓存
            console.log('当前视频聊天计时器记录时长为'+chatTime2+'秒');
            console.log('由于存在缓存，当前视频聊天总时长为'+Spscjl[0]+'秒');
        },1000)
    }
}
$('body').on('click','.bigsfck',function () {
    if($('.video-big #agora_local').hasClass("active")){
        $('.video-big #agora_local').removeClass('active');
    }else {
        $('.video-big #agora_local').addClass('active');
    }
    if($('.bigOtherPic').length){
        // alert('存在')
        if($('.video-big #agora_local').hasClass("active")){
            $('.bigOtherPic').addClass('active');
        }else {
            $('.bigOtherPic').removeClass('active');
        }
    }else {
        // alert('不存在')
        if($('.video-big #agora_local').hasClass("active")){
            $('.otherPerson').addClass('active')
        }else {
            $('.otherPerson').removeClass('active')
        }
    }
})
$('body').on('click','.smsfck',function () {
    if($('.video-small #agora_local').hasClass("active")){
        $('.video-small #agora_local').removeClass('active');
    }else {
        $('.video-small #agora_local').addClass('active');
    }
    if($('.smallOtherPic').length){
        // alert('存在')
        if($('.video-small #agora_local').hasClass("active")){
            $('.smallOtherPic').addClass('active');
        }else {
            $('.smallOtherPic').removeClass('active');
        }
    }else {
        // alert('不存在')
        if($('.video-small #agora_local').hasClass("active")){
            $('.otherxlPerson').addClass('active')
        }else {
            $('.otherxlPerson').removeClass('active')
        }
    }
});



//大视频检测用户加入
function checkPerJion() {
    var count=1;
    pertime=setInterval(function () {
        count++;
        if($('.bigOtherPic').length){
            console.log('检测发现有用户进入，为你清除计时器');
            clearInterval(pertime);
            $('.otherPerson').remove();
            return;
        }
        if(count==30){
            clearInterval(pertime);
            $('.ltsp-zt').html('对方没有接听！');
            $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                    if(data){
                        var fwcsjc=data.sjc;
                        lksptx(VideoChating,fwcsjc);
                        var docId=VideoChating.slice(3,VideoChating.length);
                        var newfwcsjc= fwcsjc-30;
                		ysspmjt(docId,newfwcsjc);
                    }
            });
            //关闭聊天窗口
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
                },2000);
            },2000)
        }
    },1000)
}
//小视频检测用户加入
function checkPerJionsm() {
    var count=1;
    pertimesm=setInterval(function () {
        count++;
        if($('.smallOtherPic').length){
            console.log('检测发现有用户进入，为你清除计时器');
            clearInterval(pertimesm);
            $('.otherxlPerson').remove();
            return;
        }
        if(count==30){
            clearInterval(pertimesm);
            $('.ltsp-zt').html('对方没有接听！');
            //关闭聊天窗口
            setTimeout(function () {
                $.when(getTimesjc()).done(function (data) {       //从服务器请求时间戳
                    if(data){
                        var fwcsjc=data.sjc;
                        lksptx(VideoChating,fwcsjc);
                        var docId=VideoChating.slice(3,VideoChating.length)
                        var newfwcsjc= fwcsjc-30;
                		ysspmjt(docId,newfwcsjc);
                    }
                });
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
            },2000)
        }
    },1000)
}


//正计时 ，显示时间XX:XX:XX  (训练方案显示)(主视频界面显示)
var fashowflag,hoshowflag;
function showTimeCost(data) {
    if(data==1){
        var hour = 0, minute = 0, second = 0;
        var t = 0;
        studyTime();
        function studyTime() {
            hour=Math.floor(t/60/60);
            minute=Math.floor(t/60%60);
            second=Math.floor(t%60);
            if(hour<10){
                hour = "0" + hour;
            }
            if(minute<10){
                minute = "0" + minute;
            }
            if(second<10){
                second = "0" + second;
            }
            $('.fashowtime').html(hour +":"+minute+":"+second);

            t = t + 1;
            fashowflag = setTimeout(studyTime, 1000);
        }
    }else {
        var hour = 0, minute = 0, second = 0;
        var t = 0;
        studyTime();
        function studyTime() {
            hour=Math.floor(t/60/60);
            minute=Math.floor(t/60%60);
            second=Math.floor(t%60);
            if(hour<10){
                hour = "0" + hour;
            }
            if(minute<10){
                minute = "0" + minute;
            }
            if(second<10){
                second = "0" + second;
            }
            $('.hoshowtime').html(hour +":"+minute+":"+second);

            t = t + 1;
            hoshowflag = setTimeout(studyTime, 1000);
        }
    }
}

function getCameraIndex(){ //获取摄像头下标= ----开启
    console.log('获取摄像头下标');
    $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:11,
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.status=='true'){
                console.log('启动成功');
                bdCamera=data.bdCamera;
                xnCamera=data.xnCamera;
                console.log('本地摄像头下标为');
                console.log(data.bdCamera);
                console.log(bdCamera)
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
}



//audioSelect.onchange = getDevices;
//videoSelect.onchange = getDevices;
//getDevices();



function NumAscSort(a,b){
	 return b - a;
	}
	function quchong(event,qcArr) {
	    for (var i = 0; i < event.length; i++) {
	        if (qcArr.indexOf(event[i]) == -1) qcArr.push(event[i]);
	    }
	    return qcArr;
	};


	

	//医生视频没接听
	function ysspmjt(docId,sjc){
		console.log('检测状态');
		jsspstatus='false';
		var i=1;
		var ysjt=setInterval(function(){
			i++;
			console.log(i)
			if(i==20){
				console.log(i);
				ysspmjtfwq(docId,sjc);
				clearInterval(ysjt);
				jsspstatus=='false';
				return;
			}
			if(jsspstatus=='true'){
				clearInterval(ysjt);
				jsspstatus=='false';
				return;
			}
		},1000)
	}
	//医生视频没接听发送到服务器
	function ysspmjtfwq(docId,sjc){
		console.log(docId+','+meId+','+meName+','+sjc+','+myImg+','+meSex+','+meAge)
		$.ajax({
	        url: ajaxStr+'MSTYL/pat/addHuanxin.action',
	        data: {
	        	toId:docId,
	        	fromId:meId,
	        	fromName:meName,
	        	fromSjc:sjc,
	        	fromAvatar:myImg,
	        	fromSex:meSex,
	        	fromAge:meAge,
	        	type:0 	
	        },
	        type: "POST",
	        dataType: "json",
	        success: function (data) {
				console.log(data);
	        },
	        err: function (err) {
	            console.log(err)
	        }
	   });
	}
