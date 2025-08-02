import videojs from "video.js";
import { addRewindButton } from './components/RewindButton';
import { ThemeOptions, VideoJSPlayer } from "./types/index";
import { zenHandler } from "./skins/zen";
import { VideoPlayerCustomUI} from "./components/playerCustomUI/playerCustomUI";


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

       // player.controlBar?.removeChild('VolumePanel');
        while (player.controlBar?.el()?.lastChild) {
          player.controlBar?.el()?.removeChild(player.controlBar?.el()?.lastChild);
        }
         const config = {
        streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        videoTitleConfig: {
          text: 'Big Buck Bunny',
          fontSize: '40px',
          fontWeight: 'bold',
          textAlign: 'left',
          textDecoration: 'none',
          textTransform: 'none',
          lineHeight: 'normal',
          letterSpacing: 'normal',
          color: '#ffffff',
          backgroundColor: 'transparent',
        },
        startFromBeginningBtnConfig: {
          text: 'Start From Beginning',
          enabled: true,
          width: '150px',
          height: '35px',
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'center',
          textDecoration: 'none',
          textTransform: 'none',
          lineHeight: 'normal',
          letterSpacing: 'normal',
          color: '#ffffff',
          backgroundColor: '#000000',
          focused: false,
        },
        drmEnabled: false,
        
        }
       
        const PlayerCustomUI = new VideoPlayerCustomUI(playerEl,player,config);
        
        //player.controlBar?.addChild('VolumePanel', { inline: false }, 2);
       // player.controlBar?.removeChild('FullscreenToggle');
       // player.controlBar?.removeChild('PictureInPictureToggle');
       const playPauseButton = player.controlBar?.getChild('PlayToggle');
       player.controlBar?.addChild(playPauseButton);
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

       
        

       // player.controlBar?.removeChild('AudioTrackButton');
       // vjsCustomControlSpacer?.addChild('AudioTrackButton', { inline: false }, 2);

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
