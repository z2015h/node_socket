;
(function(window) {
  var _stream;
  var _mediaRecorder;
  var _recordedBlobs = [];
  var handStop;
  window.recorder = function(opctions) {
    this._getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    this._video = opctions.video;
    this._video2 = opctions.video2;
    this._onstop = opctions.handstop;
  }

  // 开始录制
  recorder.prototype.startRecorder = function() {
    _video = this._video;
    handStop = this._onstop;
    this._getUserMedia.call(navigator, {
      video: true,
      audio: true
    }, function(localMediaStream) {
      _stream = localMediaStream;
      _video.src = window.URL.createObjectURL(_stream);
      var options = {
        mimeType: 'video/webm',
        bitsPerSecond: 1000000
      };
      try {
        _mediaRecorder = new MediaRecorder(_stream, options);
      } catch (e0) {
        try {
          options = {
            mimeType: 'video/webm,codecs=vp9',
            bitsPerSecond: 1000000
          };
          _mediaRecorder = new MediaRecorder(_stream, options);
        } catch (e1) {
          try {
            options = 'video/vp8';
            _mediaRecorder = new MediaRecorder(_stream, options);
          } catch (e2) {
            return;
          }
        }
      }
      _mediaRecorder.onstop = handStop;
      _mediaRecorder.ondataavailable = function(event) {
        if (event.data && event.data.size > 0) {
          _recordedBlobs.push(event.data);
        }
      };
      _mediaRecorder.start(10); // collect 10ms of data
    }, function(e) {
      console.log('Reeeejected!', e);
    })
  }

  // 暂停录制
  recorder.prototype.pause = function() {
    _mediaRecorder.pause();
  }

  // 取消暂停, 继续录制
  recorder.prototype.resume = function() {
    _mediaRecorder.resume();
  }

  // 停止录制
  recorder.prototype.stopRecorder = function() {
    var tracks = _stream.getTracks();
    _video.pause();
    for (var i = 0; i < tracks.length; i++) {
      tracks[i].stop();
    }
    _mediaRecorder.stop();
  }

  // 播放
  recorder.prototype.play = function() {
    var superBuffer = new Blob(_recordedBlobs, {
      type: 'video/webm'
    });
    this._video2.src = window.URL.createObjectURL(superBuffer);
    console.log('开始播放');
  }
})(window)
