////==========发送即时语音
		var Timer;
		var yyTime;   //发送语音计时器
    	var timede=0;
    	var mp3Blob;
        var recorder = new MP3Recorder({
            debug:true,
            funOk: function () {
                console.log('初始化成功');
            },
            funCancel: function (msg) {
                console.log(msg);
                recorder = null;
            }
        });
        
        function funStart(id) {
            console.log('录音开始...');
            $('.voice_record').attr('disabled',true)
            $('.voice_send').attr('disabled',false);
            $('#'+id).find('.voice_record').html('录制中');
            recorder.start();
            $('.yy_tx').remove();
  			$('#'+id).find('.xx-ck-home').append(`<div class="yy_tx">
													<img class="thyying" src="./img/yy.jpg" />
												</div>`);		
            Timer=setInterval(function(){
            	timede++;
            	console.log(timede)
            },1000)
        }

        function funStop(id,ToId) {
        	clearInterval(Timer);
        	
        	$('.voice_record').attr('disabled',false)
        	$('.voice_send').attr('disabled',true);
        	$('#'+id).find('.voice_record').html('录制');
        	
            recorder.stop();
            $('.yy_tx').remove();
            console.log('录音结束，MP3导出中...');
            recorder.getMp3Blob(function (blob) {
                console.log('MP3导出成功');
                mp3Blob = blob;
                var url = URL.createObjectURL(mp3Blob);
                console.log(timede)
                if(timede<2){
                	timede=0;
                	$('#'+id).find('.xx-ck-home').append('<div class="yy_tx"><p>录音时长太短</p></div') 	
 					setTimeout(function(){
  						$('.yy_tx').remove();
 					},1000)
               }else{
 					//本地聊天界面语音
 					$('.ltjlmy').remove();
					drawmeyy(ToId,id,url)
  					setTimeout(function(){
 		 				var pd=yypd; //流文件接收
     					var arr=[];
    					for(var i=0;i<pd.length;i++){
         						var ad=[];
         					for(var j=0;j<pd[i].length;j++){
            		 			ad.push(pd[i][j]);
        					}
         					arr.push(ad)
     					}
    					console.log(arr)
     					var tim=Date.parse(new Date());                 
     					var jss={
            					timemins:timede,
             					did:ToId,
								pid:meId,
								title:tim+ToId+'.mp3',
								content:arr								
             			}
     					console.log(jss)
     					var content=JSON.stringify(jss) 
						postyy(content,ToId)   //向服务器发送语音消息
						timede=0;
					},500)  //流文件后生成
                }
            });
        }




















//var recorder = new MP3Recorder({
//  debug:true,
//  funOk: function () {
//      console.log('即时语音初始化成功');
//  },
//  funCancel: function (msg) {
//      alert(msg);
//      recorder = null;
//  }
//});
//
//function funStart(id) {
//  console.log('录音开始...');
//  recorder.start();								
//	yyTime=setInterval(function(){
//		yytime++;
//		console.log(yytime)
//	},1000)
//}
//
//function funStop(id,ToId){
//	clearInterval(yyTime);
//  console.log('录音结束，MP3导出中...');
//  recorder.getMp3Blob(function (blob) {
//  console.log('MP3导出成功');
//  mp3Blob = blob;
//  var url = URL.createObjectURL(mp3Blob);
//  console.log(url)
//  if(yytime<1){
//  	yytime=0;
//  	alert('shijianduan')
//  }else{
//  	yytime=0;
//  	var div = document.createElement('div');
//              var au = document.createElement('audio');
//              au.controls = true;
//              au.src = url;
//              div.appendChild(au);  
//              $('.bbbbbb').append(div);
//  	}
//  });
//}