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