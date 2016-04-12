/**
 * Copyright (c) 2015-present, ArtPerPixel Digital Solutions
 * Http://www.artperpixel.com
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var mvpManager = {
  videoTimeUpdateHandler: null,
  videoCanPlayHandler: null,
  windowResizeHandler: null
};

var MobileVideoPlayer = function(options) {
  var i;

  this.options = {
    framesPerSecond: 25,
    autoplay: false,
    audio: false,
    loop: true
  };

  for (i in options) {
    this.options[i] = options[i];
  }

  this.video = document.querySelectorAll(this.options.videoTarget)[0];
  this.canvas = document.querySelectorAll(this.options.canvasTarget)[0];

  if (!this.options.videoTarget || !this.video) {
    console.error('Please use "videoTarget" property.');
    return;
  }

  if (!this.options.canvasTarget || !this.canvas) {
    console.error('Please use "canvasTarget" property.');
    return;
  }


  if (this.options.audio) {
    if (typeof(this.options.audio) === 'string'){
      this.audio = document.querySelectorAll(this.options.audio)[0];

      if (!this.audio) {
        console.error('Element for the "audio" not found');
        return;
      }
    } else {
      this.audio = document.createElement('audio');
      this.audio.innerHTML = this.video.innerHTML;
      this.video.parentNode.insertBefore(this.audio, this.video);
      this.audio.load();
    }

    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      this.options.autoplay = false;
    }
  }

  // Canvas context
  this.ctx = this.canvas.getContext('2d');

  this.playing = false;

  this.resizeTimeoutReference = false;
  this.RESIZE_TIMEOUT = 1000;

  this.init();
  this.bind();
};

MobileVideoPlayer.prototype.init = function() {
  this.video.load();


  this.setCanvasSize();
};

MobileVideoPlayer.prototype.getOffset = function(elem) {
  var docElem, rect, doc;

  if (!elem) {
    return;
  }

  rect = elem.getBoundingClientRect();

  if (rect.width || rect.height || elem.getClientRects().length) {
    doc = elem.ownerDocument;
    docElem = doc.documentElement;

    return {
      top: rect.top + window.pageYOffset - docElem.clientTop,
      left: rect.left + window.pageXOffset - docElem.clientLeft
    };
  }
};

MobileVideoPlayer.prototype.jumpTo = function(percentage) {
  this.video.currentTime = this.video.duration * percentage;

  if (this.options.audio) {
    this.audio.currentTime = this.audio.duration * percentage;
  }
};

MobileVideoPlayer.prototype.bind = function() {
  var self = this;

  // Interval shot
  this.video.addEventListener('timeupdate', mvpManager.videoTimeUpdateHandler = function() {
    self.drawFrame();
  });

  // Show first shot
  this.video.addEventListener('canplay', mvpManager.videoCanPlayHandler = function() {
    self.drawFrame();
  });

  if (this.video.readyState >= 2) {
    self.drawFrame();
  }


  if (self.options.autoplay) {
    self.play();
  }


  window.addEventListener('resize', mvpManager.windowResizeHandler = function() {
    clearTimeout(self.resizeTimeoutReference);

    self.resizeTimeoutReference = setTimeout(function() {
      self.setCanvasSize();
      self.drawFrame();
    }, self.RESIZE_TIMEOUT);
  });

  this.unbind = function() {
    this.video.removeEventListener('canplay', mvpManager.videoCanPlayHandler);
    window.removeEventListener('resize', mvpManager.windowResizeHandler);

    if (this.options.audio) {
      this.audio.parentNode.removeChild(this.audio);
    }
  };
};

MobileVideoPlayer.prototype.setCanvasSize = function() {
  this.width = this.canvas.clientWidth;
  this.height = this.canvas.clientHeight;

  this.canvas.setAttribute('width', this.width);
  this.canvas.setAttribute('height', this.height);
};

MobileVideoPlayer.prototype.play = function() {
  this.lastTime = Date.now();
  this.playing = true;
  this.loop();

  // Sync again audio and video
  if (this.options.audio) {
    this.audio.currentTime = this.video.currentTime;
    this.audio.play();
  }
};

MobileVideoPlayer.prototype.playPause = function() {
  if (this.playing) {
    this.pause();
  }
  else {
    this.play();
  }
};

MobileVideoPlayer.prototype.pause = function() {
  this.playing = false;

  if (this.options.audio) {
    this.audio.pause();
  }
};


MobileVideoPlayer.prototype.loop = function() {
  var self = this;

  var time = Date.now();
  var elapsed = (time - this.lastTime) / 1000;

  if(elapsed >= (1 / this.options.framesPerSecond)) {
    this.video.currentTime = this.video.currentTime + elapsed;
    this.lastTime = time;
    if(this.audio && Math.abs(this.audio.currentTime - this.video.currentTime) > .3){
      this.audio.currentTime = this.video.currentTime;
    }
  }

  // If loop false stop video on end
  if (this.video.currentTime >= this.video.duration) {
    this.playing = false;

    if (this.options.loop === true) {
      this.video.currentTime = 0;
      self.loop();
    }
  }

  if (this.playing) {
    this.animationFrame = requestAnimationFrame(function(){
      self.loop();
    });
  }
  else {
    cancelAnimationFrame(this.animationFrame);
  }
};

MobileVideoPlayer.prototype.drawFrame = function() {
  this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
};
