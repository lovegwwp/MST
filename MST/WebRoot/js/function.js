    var MacID;
    var patId;

   // var WI=$(window).width(); //浏览器当前窗口可视区域宽度
   // var Fs=WI/1920*100+'px';
   // $('body').css({
   //     fontSize:Fs
   // });
   // $('html').css({
   //     fontSize:Fs
   // });
if(window.localStorage) //判断本地缓存总容量
{
    var HCSY= 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
    if(HCSY<512000){   //本地缓存少于500k，对部分缓存进行清除
        alert('你的本地缓存快满了，已经为你清除部分缓存');
        localStorage.removeItem('chatxx');  //删除聊天记录
        localStorage.removeItem('xxjmhc');  //删除消息界面
        localStorage.removeItem('xzdata');  //删除下载界面
    }
}
// 聊天设备号缓存，拿到设备号
//聊天设备号缓存，拿到设备号
if(JSON.parse(localStorage.getItem('micid'))){
    var MacId=JSON.parse(localStorage.getItem('micid'));
    MacID=MacId[0];
    console.log('本地设备号缓存存在');
}else {
    //设备号不存在
    console.log('本地设备号缓存不存在')
}


// 下载方案时间戳，发送到服务器
if(JSON.parse(localStorage.getItem('xzfadate'))){
    var xzSJC=JSON.parse(localStorage.getItem('xzfadate'))[0];
    console.log('上一次储存时间戳'+xzSJC)
    console.log('存在下载方案时间戳')
}else {
    var xzfa=[0];
    localStorage.setItem('xzfadate', JSON.stringify(xzfa));
    console.log('已经为您缓存下载方案时间戳')
}
if(JSON.parse(localStorage.getItem('xzsjcflog'))){
    console.log('存在下载方案时间戳布尔值')
}else {
    var xzflog='false';
    localStorage.setItem('xzsjcflog', JSON.stringify(xzflog));
    console.log('已经为您缓存下载方案时间戳布尔值')
}

// '10AE-BE35-149A-A2C7'
//var MacID='1234-1234-1234-1234';   // 设备Id                  !!!!!!!!!!!!!!!!!!!!!!测试 放在最前面
//var patId=25;                      //我的Id                   !!!!!!!!!!!!!!!!!!!!!!测试 放在最前面
var myImg='';                      //我的头像
var meName='';
var meAge='';
var meSex='';
var meId='';
var xlItem;                        //训练类型
var fwqSjc='';
var videoFisrtTime;                 //播放视频的初始时长
var swAppId='d7901a8d70ac4adfb81dcab13522e9ef';                            //声网appId

var VideoChating='';
var addPersonId;                         //添加好友的医生环信id号
var addPersonName;                       //添加好友的医生姓名
var addgroupName;                       //添加好友的医生组名

var zxPage=1,zxTextTitle=[],zxTextDetail=[],zxTextData=[],zxTextPic=[];  //联系咨询 保存医生详情页的数据
var groupName;                      //编辑组名；
var moveId;                         //移至医生名；
var checkTime=[];                   //时间对比
var YsIdXm=[];                      //医生列表医生id号对应的医生的姓名
//视频计时器
var pertime;                    //检测用户加入(大)
var pertimesm;                  //检测用户加入(小)
var chatTimer1=0,chatTimer2=0;        //大视频聊天计时器编号 1:联系医生视频（大）  2训练方案视频（小）
var chatTime1=0,chatTime2=0;     //小视频聊天计时器     1:联系医生视频 （大） 2训练方案视频（小）
// var secondone=0;                  //训练方案观看视频初始话
var videoCount=0;                //第几周几天几次训练方案播放视频的个数
var filenameBb;                 //版本号
var djys='';                 //医生详情的医生id
var djxm='';                 //医生详情的医生姓名
var imgUrlStr='http://121.40.29.64:8081/';
var ajaxStr='http://121.40.29.64:8081/';
//var ajaxStr='http://192.168.0.28:8080/';
var ajaxBd='http://127.0.0.1:8080/';

var spZT='1';             //视频状态  1普通 2虚拟
var xnObj='';           //虚拟视频的obj值

var bdCamera=0;  //本地摄像头  下标默认为0
var xnCamera=1;  //虚拟摄像头  下标默认为0

(function () {
    $.ajax({
        url: ajaxStr +'MSTYL/pat/getKaiji.action',
        data: {
            pId: patId
        },
        type: "GET",
        dataType: "json",
        success: function (data) {
            var data=data.data;
            console.log(data);
            var pic=data.pic;
            var text=data.contents;
            var title=data.title;
            $('.kaiJi-picList').find('img').attr('src',pic);
            $('.kaiJi-text').html(text);
            $('.kaiJi-title').html(title);
        },
        err: function () {
            console.log(err);
        }
    })
})();

//开机网络灯判断
if(window.navigator.onLine==true){
    $('.wangluodeng img').attr('src','./img/youwangluo.png');
}else{
    $('.wangluodeng img').attr('src','./img/meiwangluo.png')
}

//绑定视频热键（开启/关闭）
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e.ctrlKey && e.altKey && e.keyCode==66 ){   //开启视频    // alert("你按下了ctrl+aut+b");
        if($('.acc-sp').is(':visible')){
            alert('有医生正在呼叫你，请挂断后在发起视频请求')
        }else {
            //判断当前是否在训练界面
            if($('.xlsp').is(':visible')){
                // alert('当前在观看视频页面');
                var doc=$('.tab-main-title').find('span').html();
                CheckfaSpOpen(doc)
            }else if($('.spsp').is(':visible')){   //判断是否在医生详情页面
                //其他情况发开好友列表的视频聊天
                var docId='doc'+djys;
                $('.chatList').hide();
                $('.shipingList').show();
                if($('#'+docId+'_sp').length){              //判断当前用户视频窗口是否存在
                    console.log('已经存在该好友列表的视频聊天窗口');
                    $('#'+docId+'_sp').show().find('.sp-name>p').html(djxm);
                    join();  //加入房间
                }else {
                    if($('.hoshowtime').length){
                        $('.gbqtsp').show();
                    }else {
                        $('.shipingList').children().remove();
                        $('.shipingList').append(' <div class="shipingroom"> <div class="sp-user" id='+docId+'_sp'+'> <div class="sp-name"> <p>'+djxm+'</p> </div> <div class="sp-ck"> <div class="sp-ck-home"> <div id="div_device" class="panel panel-default" style="display:block"> <div class="select"> <label for="audioSource">Audio source: </label><select id="audioSource"></select> </div> <div class="select"> <label for="videoSource">Video source: </label><select id="videoSource"></select> </div> </div> <div id="div_join" class="panel panel-default" > <div class="panel-body"> <div style="display: none"><label>请选择房间: </label><input id="channel"  class="big-channel" type="text" value='+djys+' size="4"/></div> <input id="videoCheck" class="videoBtn-big" type="checkbox" checked style="display: none"/> <button id="join" class="btn btn-primary" data-ripple="ripple"></button> <button id="leave" class="btn btn-primary"  data-ripple="ripple"></button> <input id="key" type="text" value='+swAppId+' size="36" style="display: none" /> </div> </div> </div> <div id="video" class="video-big"> <div id="agora_local" class="videoBig-agora_localId"></div> </div> </div> </div> <button class="sp-liaotiao">发送</button> </div >')
                        var eleK=document.getElementById('join');
                        eleK.onclick=CheckJoin;
                        var eleG=document.getElementById('leave');
                        eleG.onclick=Checkleave;
                        console.log('不存在该用户视频聊天窗口，已经为你创建');
                        join();  //加入房间
                    }
                }
            } else {
                //alert('当前不在观看视频页面');   //展示好友列表
                $('.chatList').hide();
                $('.shipingList').hide();
                $('.nav>button').removeClass('active-under1 active-under2');
                $('.xtsz-btn').removeClass('active-under2');
                $('.lxys-btn').addClass('active-under2');
                $('.lianxi-content').show().siblings().hide();
                $('.lx-main').show().children().hide();
                $('.lx-main-home').hide();
                $('.search-show1').show();
                $('.lx-search').show();
                $('.lx-add-fenzu').show();
                $('.lx-search-test').val('');
                $(".xtszbtnList").slideUp("slow");
            }
        }

    }
    if (e.ctrlKey && e.altKey && e.keyCode == 69 ) { //关闭视频
        // alert("你按下了ctrl+ait+e");
        if($('.xlsp').is(':visible')){
            // alert('当前在观看视频页面');
            if($('.fashowtime').length){
                faCloseSp();
            }else {
                // alert('训练方案没有开启视频通话');
            }
        }else {
            if($('.hoshowtime').length){
                // alert('关闭好友列表视频聊天');
                leave();
            }else {
                // alert('暂时没有视频聊天窗口')
            }
        }
    }
};
//   获取设备ID     本地缓存--抓取本机--服务器返回(设备号比较)
   getMicID();

// 当设备号无异常,判断网络状态;

//启动整个项目！！
//开机检测缓存时长在grzx.js 277 避免延迟导致的双倍时长的误差;
function openExe(){
      if(window.navigator.onLine==true){
          $('.wangluodeng img').attr('src','./img/youwangluo.png');
          // var userip=returnCitySN['cip'];
          //向服务器发送ip地址
          $.ajax({
              url: ajaxBd+'MST/cmdPc',
              data: {
                  cmdType:4
              },
              type: "POST",
              dataType: "json",
              success: function (data) {
                  console.log(data);
                  var IP=data.PCIP;
                  console.log(data.PCIP);
                  $.ajax({
                      url: ajaxStr+'MSTYL/upDevIp.action',
                      data: {
                          macId:MacID,
                          patIP:IP
                      },
                      async: true,
                      type: "POST",
                      dataType: "json",
                      success: function (data) {
                          console.log('ip地址发送成功');
                      },
                      error:function (error) {
                          console.log(error);
                      }
                  });
              },
              error:function (error) {
                  // console.log(error);
              }
          });
      }else{
          $('.wangluodeng img').attr('src','./img/meiwangluo.png')
      }
      var EventUtil = {
          addHandler: function (element, type, handler) {
              if (element.addEventListener) {
                  element.addEventListener(type, handler, false);
              } else if (element.attachEvent) {
                  element.attachEvent("on" + type, handler);
              } else {
                  element["on" + type] = handler;
              }
          }
      };
      // 网络断开和连接的判断
      EventUtil.addHandler(window, "online", function () {
          $('.wlzt').hide();
          loginHX();                                           //网络正常重新连接环信
          var Fasc=JSON.parse(localStorage.getItem('fasc'));//查看观看训练时长本地是否存在缓存
          var Fasp=JSON.parse(localStorage.getItem('spnosc'));//查看观看视频聊天时长本地是否存在缓存
          if(Fasc==null||Fasc==undefined){
              console.log('本地没有训练缓存时长')
          }else if(Fasc[0]!=0){
              console.log('存在观看训练缓存时长'+Fasc);
              var playtime=parseInt(Fasc[0]);
              fsxlsphc(playtime);     //发送视频观看时长
              console.log('执行发送观看训练时长')
          }else{
              console.log('不存在观看训练缓存，时长为'+Fasc[0]+'秒');
          }
          if(Fasp==null||Fasp==undefined){
              console.log('本地没有视频聊天缓存时长')
          }else if(Fasp[0]!=0){
              console.log('存在视频聊天缓存时长'+Fasp[0]+'秒');
              var playtime=parseInt(Fasc[0]);
              fsxllthclx(playtime);     //发送视频观看时长
              console.log('执行发送视频观看时长')
          }else {
              console.log('不存在视频聊天缓存，时长为'+Fasp[0]+'秒');
          }
      });
      EventUtil.addHandler(window, "offline", function () {
          $('.wangluotext').html('网络未连接');
          $('.wlzt').show();
      });
      //按钮水波纹初始化
      $(document).on('ready', function() {
          Waves.init();
          Waves.attach('.snarl-demo');
      });
      getCameraIndex();  //获取摄像头下标
      
      //获取服务器时间戳
      getTimesjc();
      //获取训练类型---再获取训练方案
      getItem();

      //获取是否有新的训练方案需要下载
      //getnewxlfn();  //xlfa.js  322

      //获取联系咨询信息
      getzxone(zxPage);

      //获取医生列表 getUserListUI(data);  //UI界面布局
      $.when(getUserList()).done(function (data) {
          getUserListUI(data);
      });

      //获取下载列表
      getXzList();

      //获取消息列表
      getxxList();

      //获取个人中心列表
      getGrxinxi();
      getCz();   //充值金额/时长 选择

      // 获取公司简介
      getJJ();
      banbenhao();  //获取设备版本号

      //登陆环信
      // 登陆账号
    function loginHX() {
        var options = {
            apiUrl: WebIM.config.apiURL,
            // user: 'fuguannan3',
            // pwd: 'guannan19930126',
            // appKey: 'easemob-demo#chatdemoui'
            user: 'pat'+patId,
            pwd: '16cf3923b28b3cb6000c3e1f33f8fe2e',
            appKey: '1123170901115984#mst'
        };
        conn.open(options);
        console.log('环信账号为pat'+patId)
    }
      loginHX();
      //开机将消息列表的时间更新
      xxTime();
      //开机页面进度条
      var bodyFs=parseInt($('body').css('font-size'));
      var num=bodyFs/100;
      var wanchengWidth=1525*num;
      $('.wancheng').animate({width: '15.4rem'}, 2000);
      var opentime=setInterval(function () {
//            console.log($('.wancheng').css('width'));
//            console.log(wanchengWidth);
          if( parseInt($('.wancheng').css('width'))>wanchengWidth){
              clearInterval(opentime);
              setTimeout(function () {
                  $('.kaiJi').hide();
                  $('.box').show();
              },400)
          }
      },200);
  }
//openExe();


function getTimesjc() {
    var defer=$.Deferred();
    $.ajax({
        url: ajaxStr+'MSTYL/getSjc.action',
        data: {},
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data.sjc);
            fwqSjc=data.sjc;
            defer.resolve(data);
        },
        err: function (err) {
            console.log(err)
        }
    })
    return defer.promise();
};
