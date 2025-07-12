import videojs from "video.js";
import { addRewindButton } from './components/RewindButton'

(function (videojs) {

  var CustomiseUI = function (options) {
    var player = this; // This refers to the Video.js player instance

    const skin = options.skin || 'skin_slate';
    switch (skin) {
      case 'slate': {
        player.addClass('skin_slate')
        player.controlBar.removeChild('VolumePanel')
        player.controlBar.addChild('VolumePanel', { inline: false }, 2)
        break;
      }
      case 'spaced': {
        player.addClass('skin_spaced')
        player.controlBar.removeChild('VolumePanel')
        player.controlBar.addChild('VolumePanel', { inline: false }, 2)
        const ProgressControl = this.controlBar.getChild('ProgressControl');
        const CurrentTimeDisplay = this.controlBar.getChild('CurrentTimeDisplay');
        const customProgressBar = document.createElement('div');
        customProgressBar.className = 'custom-spaced-progress-bar'
        customProgressBar.append(ProgressControl.el());
        customProgressBar.append(CurrentTimeDisplay.el());
        const SeekToLive = this.controlBar.getChild('SeekToLive');
        customProgressBar.append(SeekToLive.el());
        this.controlBar.el().append(customProgressBar);
        break;
      }
      case 'sleek': {
        player.addClass('skin_sleek')
        const sleekbar = document.createElement('div');
        sleekbar.className = 'sleek-bar';

        const PlayToggle = this.controlBar.getChild('PlayToggle');
        sleekbar.append(PlayToggle.el())

        const RewindButton = addRewindButton(this);
        sleekbar.append(RewindButton)

        const CurrentTimeDisplay = this.controlBar.getChild('CurrentTimeDisplay');
        sleekbar.append(CurrentTimeDisplay.el())


        const ProgressControl = this.controlBar.getChild('ProgressControl');
        sleekbar.append(ProgressControl.el());

        const spacer = document.createElement('div');
        spacer.className = 'vjs-custom-control-spacer vjs-spacer'
        sleekbar.append(spacer)

        const DurationDisplay = this.controlBar.getChild('DurationDisplay');
        sleekbar.append(DurationDisplay.el())

        const VolumePanel = player.addChild('VolumePanel', { inline: false }, 2);
        sleekbar.append(VolumePanel.el())

        const SubsCapsButton = player.addChild('SubsCapsButton', {},);
        sleekbar.append(SubsCapsButton.el())

        const PictureInPictureToggle = player.addChild('PictureInPictureToggle', {},);
        sleekbar.append(PictureInPictureToggle.el())

        const FullscreenToggle = player.addChild('FullscreenToggle', {},);
        sleekbar.append(FullscreenToggle.el())

        this.removeChild('controlBar');
        this.el().append(sleekbar);


      }
      default:
        console.log('No option for theme provided');
        

    }

  };

  // Register the plugin with Video.js
  videojs.registerPlugin('theme', CustomiseUI);

})(videojs);
