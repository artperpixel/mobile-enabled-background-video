# Mobile enabled background video plugin

A Javascript plugin for making videos inline background video for mobile.



Are you having trouble getting something to work? Consult the [troubleshooting guide](https://github.com/artperpixel/mobile-enabled-background-video/wiki/Troubleshooting).

# Installation

```bash
SOON AVALIABLE
$ npm install mobile-enabled-background-video --save
```

Find `mobile-enabled-background-video.js` in the `dist/` directory.
Make sure to include it in <head>.

* [mobile-enabled-background-video.min.js](https://raw.githubusercontent.com/artperpixel/mobile-enabled-background-video/master/dist/mobile-enabled-background-video.min.js)
* [mobile-enabled-background-video.js](https://raw.githubusercontent.com/artperpixel/mobile-enabled-background-video/master/dist/mobile-enabled-background-video.js)

# Documentation

```bash
  // EXAMPLE: If users device is IPHONE (Dont use this plugin for desktop)
  if (navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) {
    var video = new MobileVideoPlayer({
      videoTarget: 'video',
      canvasTarget: 'canvas',
      loop: true,
      framesPerSecond: 60,
    });
    // Play video when you want!
    setInterval(function(){
      video.play();
    },1500);
  }
```

# License

MIT
