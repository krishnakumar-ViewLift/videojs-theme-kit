import videojs from "video.js";
(function (videojs) {

  var CustomiseUI = function (options) {
    var player = this; // This refers to the Video.js player instance
    console.log(options);

    const skin = options.skin || 'skin_slate';
    switch (skin) {
      case 'slate':
        player.addClass('skin_slate')
        player.controlBar.removeChild('VolumePanel')
        player.controlBar.addChild('VolumePanel',{inline:false},2)
        break;
      case 'spaced':
        player.addClass('skin_spaced')
        player.controlBar.removeChild('VolumePanel')
        player.controlBar.addChild('VolumePanel',{inline:false},2)
        const ProgressControl=this.controlBar.getChild('ProgressControl');
        const CurrentTimeDisplay=this.controlBar.getChild('CurrentTimeDisplay');
        const customProgressBar=document.createElement('div');
        customProgressBar.className='custom-spaced-progress-bar'
        customProgressBar.append(ProgressControl.el());
        customProgressBar.append(CurrentTimeDisplay.el());

        const SeekToLive=this.controlBar.getChild('SeekToLive');
        customProgressBar.append(SeekToLive.el());
        this.controlBar.el().append(customProgressBar);
        
        break;
      default :
        player.addClass('skin_slate')
    }

  };

  // Register the plugin with Video.js
  videojs.registerPlugin('theme', CustomiseUI);

})(videojs);
