/**
 * Created by Administrator on 2017/9/29 0029.
 */
function getJJ() {
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getPatXtNews.action',
        type: "POST",
        dataType: "json",
        success: function (data) {

            $('.xt-text').html(data.contents)    //公司介绍
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function banbenhao() {  //获取设备版本号
    // var ajaxStr='http://121.40.29.64:8081/';
    $.ajax({
        url: ajaxStr+'MSTYL/pat/getPatXtgx.action',
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data) {
                console.log('当前设备版本号为');
                console.log(data.titles);
                $('.banbenNum').html(data.titles)
                //v1.0.0
            }
        },
        error:function (err) {
            console.log(err)
        }

    });
}

$('.qchc_OK').click(function(){	
	$('.qchc_result').html('');
	var val=$('.qchc_password').val();
	if(val!=666666){
		$('.qchc_result').show().html('密码不正确');
	}else{
		$('.qchc_result').show().html('密码正确，正在为你清理...');
		$('.qchc_OK').attr('disabled',true);
		qlhcsj();
	}
});
$(".qchc_password").focus(function(){ 
	$('.qchc_result').hide().html('');
});


function qlhcsj(){
	 $.ajax({
        url: ajaxBd+'MST/cmdPc',
        data:{
            cmdType:12,
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.status=="true"){  //删除成功
            	$('.qchc_result').show().html('清理成功！');
            	$('.qchc_OK').attr('disabled',false);
            }else{
            	$('.qchc_result').show().html('清理失败！请稍后重试');
            	$('.qchc_OK').attr('disabled',false);
            }
            //返回true   操作成功！false  操作失败！
        },
        error:function (err) {
            console.log(err);
            $('.qchc_result').show().html('清理失败！请稍后重试');
            $('.qchc_OK').attr('disabled',false);
        }
    });
}