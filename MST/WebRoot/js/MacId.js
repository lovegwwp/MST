//  请求获取本地设备号
function getMicID() {
    $.ajax({
        url: ajaxBd+'MST/cmdPc',    //不需要网络
        type: "post",
        data:{
            cmdType:3
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.MACID==''){
                $('.kjdangerqq').show();
            }else {
                var MDStr=data.MD5Str;  //MD5加密
                if(MacID){
                    //MacId 本地缓存设备号
                    //data.MACID 抓取本机设备号
                    console.log(MacID);
                    if(MacID==data.MACID){
                        console.log(data.MACID);
                        console.log(data.MD5Str);
                        checkMicId(MacID,MDStr);
                    }else {
                        //本地缓存存在（更换设备导致ID号不同）
                        var xzflog='false';
                        localStorage.setItem('xzsjcflog', JSON.stringify(xzflog));
                        console.log('已经为您缓存下载方案时间戳布尔值');
                        MacID=data.MACID;
                        var MidArr=[];
                        MidArr.push(MacID);
                        localStorage.setItem('micid', JSON.stringify(MidArr));
                        console.log('已经为你储存');
                        checkMicId(MacID,MDStr);
                    }
                }else {
                    console.log('本地缓存设备号为空');      //第一次启动设备给MICID赋值
                    MacID=data.MACID;
                    var MidArr=[];
                    MidArr.push(MacID);
                    localStorage.setItem('micid', JSON.stringify(MidArr));
                    console.log('已经为你储存');
                    checkMicId(MacID,MDStr);
                }
            }
        },
        error:function (err) {
            console.log(err);
            $('.kjdangerqq').show();
        }
    });
}


//服务器    服务器数据库中  ---设备号是否存在
function checkMicId(MacID,MDStr){
    //本地是存在缓存的设备号
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getDevCheck.action',
        type: "post",
        data:{
            macId:MacID,
            MD5Str:MDStr
        },
        dataType: "json",
        success: function (data) {
               console.log(data.info);
            if(data.status=='true'){
                console.log('本地设备号为'+MacID);
                if(data.oldMac==MacID){
                    console.log('服务器存在本地这个设备号');
                    patId=data.info.patId;
                    openExe(); //启动整个项目
                }else {
                    console.log('服务器不存在本地这个设备号');
                    $('.kjdanger').show(); //弹出层
                }
            }else {
                console.log('服务器不存在本地这个设备号');
                $('.kjdanger').show(); //弹出层
            }
        },
        error: function (err) {
            console.log(err);
            openExe(); //启动整个项目
        }
    });
}
//        localStorage.removeItem('micId');  // 清除缓存
