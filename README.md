# Mobile enabled background video plugin

A Javascript plugin for making videos inline background video for mobile.

[CLICK FOR DEMO](https://artperpixel.github.io/mobile-enabled-background-video/)

Are you having trouble getting something to work? Consult the [troubleshooting guide](https://github.com/artperpixel/mobile-enabled-background-video/wiki/Troubleshooting).

# Installation

```bash
SOON AVALIABLE
$ npm install mobile-enabled-background-video --save
```

Find `mobile-enabled-background-video.js` in the `dist/` directory.
Make sure to include script end of body.

* [mobile-enabled-background-video.min.js](https://raw.githubusercontent.com/artperpixel/mobile-enabled-background-video/master/dist/mobile-enabled-background-video.min.js)
* [mobile-enabled-background-video.js](https://raw.githubusercontent.com/artperpixel/mobile-enabled-background-video/master/dist/mobile-enabled-background-video.js)

* [mobile-enabled-background-video.css](https://raw.githubusercontent.com/artperpixel/mobile-enabled-background-video/master/dist/mobile-enabled-background-video.css)

# Documentation

```bash
  // Call script at end of body

  // EXAMPLE: If users device is IPHONE (Dont use this plugin for desktop)
  if (navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) {
    var video = new MobileVideoPlayer({
      videoTarget: 'video',
      canvasTarget: 'canvas',
      loop: true,
      framesPerSecond: 25,
    });
    // Play video when you want!
    setTimeout(function(){
      video.play();
    },1500);
  }
```

You can see example usage on this link
* [Example usage](https://github.com/artperpixel/mobile-enabled-background-video/tree/master/example)

# License

MIT
