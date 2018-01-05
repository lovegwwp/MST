var client, localStream, camera, microphone;

var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

function join() {
    document.getElementById("join").disabled = true;
    document.getElementById("video").disabled = true;
    var dynamic_key = null;
    // for dynamic key
    /*console.log("Try to get dynamic key");
     var use_https = ('https:' == document.location.protocol ? true : false);
     if (use_https) {
     var url_str = "https://ip:port/dynamic_key?channelName=" + channel.value;
     } else {
     var url_str = "http://ip:port/dynamic_key?channelName=" + channel.value;
     }
     $.ajax({
     url: url_str,
     error: function() {
     console.log("Failed to get dynamic key");
     },
     success: function(response) {
     console.log(response.key);
     dynamic_key = response.key;*/

    console.log("Init AgoraRTC client with vendor key: " + key.value);
    client = AgoraRTC.createClient({mode: 'interop'});
    client.init(key.value, function () {
        // console.log("AgoraRTC client initialized");
        client.join(dynamic_key, channel.value, null, function(uid) {
            // console.log("User " + uid + " join channel successfully");

            if (document.getElementById("video").checked) {
                camera = videoSource.value;
                microphone = audioSource.value;
                localStream = AgoraRTC.createStream({streamID: uid, audio: true, cameraId: camera, microphoneId: microphone, video: document.getElementById("video").checked, screen: false});
                if (document.getElementById("video").checked) {
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
        }, function(err) {
            console.log("Join channel failed", err);
        });
    }, function (err) {
        console.log("AgoraRTC client init failed", err);
    });

    channelKey = "";
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
        console.log("New stream added: " + stream.getId());
        console.log("Subscribe ", stream);
        client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
        });
    });

    client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        console.log("Subscribe remote stream successfully: " + stream.getId());
        if ($('div#video #agora_remote'+stream.getId()).length === 0) {
            $('div#video').append('<div id="agora_remote'+stream.getId()+'" style="float:left; width:408px;height:233px;display:inline-block;position: absolute;top: 98px;left: 150px;"></div>');
            // --------------------------------小窗口
        }
        stream.play('agora_remote' + stream.getId());
    });

    client.on('stream-removed', function (evt) {
        var stream = evt.stream;
        stream.stop();
        $('#agora_remote' + stream.getId()).remove();
        console.log("Remote stream is removed " + stream.getId());
    });

    client.on('peer-leave', function (evt) {
        var stream = evt.stream;
        if (stream) {
            stream.stop();
            $('#agora_remote' + stream.getId()).remove();
            console.log(evt.uid + " leaved from this channel");
        }
    });
    // for dynamic key
    /*}
     });*/
}

function leave() {
    document.getElementById("leave").disabled = true;
    client.leave(function () {
        console.log("Leavel channel successfully");
    }, function (err) {
        console.log("Leave channel failed");
    });
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
$('.wancheng').css('width','1rem');

//audioSelect.onchange = getDevices;
//videoSelect.onchange = getDevices;
//getDevices();