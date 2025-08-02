import videojs from "video.js";
import { addRewindButton } from './components/RewindButton';
import { ThemeOptions, VideoJSPlayer } from "./types/index";
import { zenHandler } from "./skins/zen";
import { addSettingsButton, addStartFromBeginningButton } from "./components/player-components/player-buttons/playerButtons";


(function (videojs) {

  const CustomiseUI = function (this: VideoJSPlayer, options: ThemeOptions) {
    const player = this;
    const playerEl= player?.el() as HTMLElement;

    const skin = options.skin || 'skin_slate';
    const color= options?.color || '#ffffff';

    switch (skin) {
      case 'slate': {
        player.addClass('skin_slate');

        if(playerEl)
        playerEl.style.color=color

        player.controlBar?.removeChild('VolumePanel');
        player.controlBar?.addChild('VolumePanel', { inline: false }, 2);
        break;
      }

      case 'spaced': {
        player.addClass('skin_spaced');

        if(playerEl)
          playerEl.style.color=color

        player.controlBar?.removeChild('VolumePanel');
        player.controlBar?.addChild('VolumePanel', { inline: false }, 2);

        const ProgressControl = player.controlBar?.getChild('ProgressControl');
        const CurrentTimeDisplay = player.controlBar?.getChild('CurrentTimeDisplay');
        const SeekToLive = player.controlBar?.getChild('SeekToLive');

        const customProgressBar = document.createElement('div');
        customProgressBar.className = 'custom-spaced-progress-bar';

        if (ProgressControl && CurrentTimeDisplay && SeekToLive) {
          customProgressBar.append(
            ProgressControl.el(),
            CurrentTimeDisplay.el(),
            SeekToLive.el()
          );
        }

        player.controlBar?.el()?.append(customProgressBar);
        break;
      }
      case 'smartTV': {
        player.addClass('skin_smartTV');

        if(playerEl)
          playerEl.style.color=color

        player.controlBar?.removeChild('VolumePanel');
        player.controlBar?.removeChild('AudioTrackButton');
        player.controlBar?.removeChild('FullscreenToggle');
        player.controlBar?.removeChild('PictureInPictureToggle');
        const ProgressControl = player.controlBar?.getChild('ProgressControl');
        const CurrentTimeDisplay = player.controlBar?.getChild('CurrentTimeDisplay');
        const SeekToLive = player.controlBar?.getChild('SeekToLive');

        const customProgressBar = document.createElement('div');
        customProgressBar.className = 'custom-smartTV-progress-bar';
        const DurationDisplay = player.controlBar?.getChild('DurationDisplay');
       
        if (ProgressControl && CurrentTimeDisplay && SeekToLive) {
            customProgressBar.append(     
            CurrentTimeDisplay.el(),    
            ProgressControl.el(),
            DurationDisplay.el(),
            SeekToLive.el()
          );
        }
 
        player.controlBar?.el()?.append(customProgressBar);
        
       
        const vjsCustomControlSpacer = player.controlBar?.getChild('CustomControlSpacer');
        const StartFromBeginning =  addStartFromBeginningButton(player);  
        vjsCustomControlSpacer?.addChild(StartFromBeginning);
        const SettingsButton = addSettingsButton(player);
        vjsCustomControlSpacer?.addChild(SettingsButton);

        break;
      }

      case 'sleek': {
        player.addClass('skin_sleek');

        if(playerEl)
          playerEl.style.color=color

        const sleekbar = document.createElement('div');
        sleekbar.className = 'sleek-bar';

        const PlayToggle = player.controlBar?.getChild('PlayToggle');
        if (PlayToggle) sleekbar.append(PlayToggle.el());

        const RewindButton = addRewindButton(player);
        if (RewindButton) sleekbar.append(RewindButton.el());

        const CurrentTimeDisplay = player.controlBar?.getChild('CurrentTimeDisplay');
        if (CurrentTimeDisplay) sleekbar.append(CurrentTimeDisplay.el());

        const ProgressControl = player.controlBar?.getChild('ProgressControl');
        if (ProgressControl) sleekbar.append(ProgressControl.el());

        const spacer = document.createElement('div');
        spacer.className = 'vjs-custom-control-spacer vjs-spacer';
        sleekbar.append(spacer);

        const SeekToLive = player.controlBar?.getChild('SeekToLive');      
        sleekbar.append(SeekToLive.el());

        const DurationDisplay = player.controlBar?.getChild('DurationDisplay');
        if (DurationDisplay) sleekbar.append(DurationDisplay.el());

        const VolumePanel = player.addChild('VolumePanel', { inline: false }, 2);
        sleekbar.append(VolumePanel.el());

        const SubsCapsButton = player.addChild('SubsCapsButton', {});
        sleekbar.append(SubsCapsButton.el());

        const PictureInPictureToggle = player.addChild('PictureInPictureToggle', {});
        sleekbar.append(PictureInPictureToggle.el());

        const FullscreenToggle = player.addChild('FullscreenToggle', {});
        sleekbar.append(FullscreenToggle.el());

        player.el()?.append(sleekbar);
        break;
      }

      case 'zen':{
        zenHandler(this);
        if(playerEl)
          playerEl.style.color=color;
        break;        
      }

      default:
        console.warn('No valid skin option provided');
    }
  };

  videojs.registerPlugin('theme', CustomiseUI);

})(videojs);
