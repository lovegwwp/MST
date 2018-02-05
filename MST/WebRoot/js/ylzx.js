
//    ---------资讯页面
function getZX(zxPage) {
    var defer=$.Deferred();
    $.ajax({
        url:ajaxStr+'MSTYL/pat/getPatNews.action',
        data:{
            page:zxPage,
            rows:3,
            id:patId
        },
        type:"GET",
        dataType: "json",
        success:function(data1){
            defer.resolve(data1);
        },
        error:function (err) {
            $('.zx-list').append(" <p class='no-shuju'>没有加载到数据~</p>");
            console.log(err)
        }
    });
    return defer.promise();
}
function getzxone(page) {
    $.when(getZX(page)).done(function (data1) {
       $('.zx-list').html('');
        console.log(data1);
        console.log('资讯列表清除成功');
        $('.zx-jindu').hide();
        var data=data1.rows;
        var zxLP=data1.total/3;  //商
        var zxLP1=data1.total%3; //余数
        // console.log(data)
        if(zxLP1==0&&zxLP!=0){
            zxLP=parseInt(zxLP);
        }else {
            zxLP=parseInt(zxLP)+1;
        }
        
        
        if(data.length>0){
            zxTextTitle=[];zxTextDetail=[];zxTextData=[];zxTextPic=[];

            for(var i=0;i<data.length;i++){
            	var zxPic=data[i].pics;
            	var t=zxPic.substr(-3);
            	
            	var zxData=data[i].xgsj;
            	var zxData=zxData.slice(0,zxData.length-3);
                var zxTitle=data[i].titles;
                var zxText = data[i].contents;
                
              
                if(zxText.length>90){
                	var h=zxText.slice(0,80);
                    var ele=`<p class="zx-list-textDescribe">${h}<b>......[详情]</b></p>`;
                
                }else {
                	var ele=`<p class="zx-list-textDescribe">${zxText}</p>`;
                }
                
            	if(t=='mp3'){

            		$('.zx-list').append(`<div class="zx-list-one">
            					<b>mp3</b>
                                <div class="zx-list-pic">
                                    <img src="./img/yp.png">
                                </div>
                                <div class="zx-list-text">
                                    <p class="zx-list-textTitle">${zxTitle}</p>
                                    ${ele}
                                </div>
                                <div class="zx-list-data">
                                    <p>${zxData}</p>
                                </div>
                            </div>`)
            	}else if(t=='mp4'){
            		$('.zx-list').append(`<div class="zx-list-one">
            					<b>mp4</b>
                                <div class="zx-list-pic">
                                    <img src="./img/sp.png">
                                </div>
                                <div class="zx-list-text">
                                    <p class="zx-list-textTitle">${zxTitle}</p>
                                    ${ele}
                                </div>
                                <div class="zx-list-data">
                                    <p>${zxData}</p>
                                </div>
                            </div>`)

            	}else{
            		$('.zx-list').append(`<div class="zx-list-one">
            					<b>pic</b>
                                <div class="zx-list-pic">
                                    <img src="${ajaxStr+zxPic}">
                                </div>
                                <div class="zx-list-text">
                                    <p class="zx-list-textTitle">${zxTitle}</p>
                                    ${ele}
                                </div>
                                <div class="zx-list-data">
                                    <p>${zxData}</p>
                                </div>
                            </div>`)
            	}
                zxTextTitle.push(zxTitle);
                zxTextDetail.push(zxText);
                zxTextData.push(zxData);
                zxTextPic.push(zxPic);
            }
        }else {
            $('.zx-list').append(" <p class='no-shuju'>没有加载到数据~</p>");
        }
        $('.zx-last-page').html(zxLP);
        if(parseInt(zxLP)==1){
            $('.zx-goUp').attr('disabled',true);
            $('.zx-goDown').attr('disabled',true);
        }
    })
}

$('.zx-goUp').attr('disabled',true);

$('.zx-goDown').click(function () {
    $('.zx-goUp').attr('disabled',false);
    var numPre=parseInt($('.zx-first-page').html());
    var numNext=parseInt($('.zx-last-page').html());
    if(numPre==numNext-1){
        $(".zx-goDown").attr("disabled",true);
    }
    $('.zx-goDown').addClass('active');
    $('.zx-goUp').removeClass('active');
    $('.zx-first-page').html(numPre+1);
    $('#zx-clone').siblings().remove();
    $('.zx-jindu').show();
    getzxone(numPre+1);

            // --------
});
$('.zx-goUp').click(function () {
    $(".zx-goDown").attr('disabled',false);
    var numPre=parseInt($('.zx-first-page').html());
    var numNext=parseInt($('.zx-last-page').html());
    if(numPre==2){
        $(".zx-goUp").attr("disabled",true);
    }
    $('.zx-goUp').addClass('active');
    $('.zx-goDown').removeClass('active');
    $('.zx-first-page').html(numPre-1);
    $('#zx-clone').siblings().remove();
    $('.zx-jindu').show();
    getzxone(numPre-1);
        // console.log(numPre-1);

});

$('body').on('click','.zx-list-one',function () {
    $('.zx-home').hide();
    $('.zx-text').show().html('');
    var num=$(this).index();
    var type=$(this).find('b').html();
    
    if(type=='pic'){
    	$('.zx-text').append(` <button class="zx-fanhui">返回</button>
    								<div class="zxpic_main clearfix">
    									<div class="zxpic_title">
    										<p class="zx-title">${zxTextTitle[num]}</p>
                    						<p class="zx-data">${zxTextData[num]}</p>
    									</div>
    									<div class="zx-pic">
                    						<img src="${ajaxStr+zxTextPic[num]}">
                    					</div>
    								</div>
                    				<p class="zx-detail">${zxTextDetail[num]}</p>`)
    	
    }else if(type=='mp3'){
    	$('.zx-text').append(` <button class="zx-fanhui">返回</button>
    								<div class="zxmp_main clearfix">
    									<div>
    										<p class="zx-title">${zxTextTitle[num]}</p>
                    						<p class="zx-data">${zxTextData[num]}</p>
    									</div>
    									<div class="zxmp_mp3">
                    						<audio preload="auto" controls style="display:block;margin:0 auto;margin-bottom:.3rem"> 
												<source src="${ajaxStr+zxTextPic[num]}" />
											</audio>
                    					</div>
    								</div>
                    			<p class="zx-detail">${zxTextDetail[num]}</p>`)
    }else {
    	$('.zx-text').append(` <button class="zx-fanhui">返回</button>
    							<div class="zxvdo_main clearfix">
    								<div class="zxvdo_title">
    									<p class="zx-title">${zxTextTitle[num]}</p>
                    					<p class="zx-data">${zxTextData[num]}</p>
    								</div>
    								<div class="zxvdo_vid">
    									<video class="video-js" controls preload="auto" poster="./img/poster.jpg">
                                    		<source src="${ajaxStr+zxTextPic[num]}" type="video/mp4">
                                    		<source src="${ajaxStr+zxTextPic[num]}" type="video/webm">
                                    		<source src="${ajaxStr+zxTextPic[num]}" type="video/ogg">
                                    		<p class="vjs-no-js">
                                        		To view this video please enable JavaScript, and consider upgrading to a web browser that
                                        		<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                                    		</p>
                                		</video>
    								</div>
                                </div>
                    			<p class="zx-detail">${zxTextDetail[num]}</p>`);
                    
        	var ele=document.getElementsByClassName('zx-text')[0].getElementsByClassName('video-js')[0];
            console.log(ele);
            videojs(ele, {}, function() {
            videojs.log('播放器已经准备好了!');
            this.on('ended', function() {
                videojs.log('播放结束了!');
            });
        });            
    	
    }
   
});
$('.ylzx-btn').click(function () {
    $('.zx-home').show();
    $('.zx-text').hide();
});

$('body').on('click','.zx-fanhui',function () {
    $('.zx-text').hide();
    $('.zx-home').show();
});
