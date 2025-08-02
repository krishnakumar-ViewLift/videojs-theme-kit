//import { Button } from '../player-components/player-buttons/playerButtons.js';
import { PlayerSeekbar } from '../player-components/player-seekbar/playerSeekbar.js';
import { TextContent } from '../player-components/player-title/playerTitle.js';
import { Sidebar } from '../player-components/player-sidebar/player-sidebar.js';
import { addStartFromBeginningButton } from '../player-components/player-buttons/playerButtons.js';

 let playIcon ="";
let pauseIcon ="";
 let playIconFocus ="";
 let pauseIconFocus ="";
 let settingsIcon ="";
 export class VideoPlayerCustomUI {

  constructor(player,playerContainer, config ) {
    if (!player || typeof player !== 'object' ) {
      throw new Error('VideoPlayerUI: player must be a valid object with a video property');
    }
    this.player = player.player;
    this.videoTitleConfig = config.videoTitleConfig || {};
   
    this.selectedVideoQuality = "auto";
    this.selectedPlaybackCaption = "";
    this.selectedAudioQuality = "";

    this.container = document.createElement('div');
    this.container.className = 'vl-player-container';
    this.rightSideContainer = document.createElement('div');
    this.rightSideContainer.className = 'right-side-container';
    this.leftSideContainer = document.createElement('div');
    this.leftSideContainer.className = 'left-side-container';
   // this.container = player.controlBar?.getChild('CustomControlSpacer');
   // this.container.className = this.container.className + ' vl-player-container';
    this.container.appendChild(this.rightSideContainer);
    this.container.appendChild(this.leftSideContainer);
    playerContainer.controlBar?.el()?.append(this.container);
    this.playerContainer = playerContainer;
    this.createControls();
    

  }

  createControls() {
   // this.createPlayPauseBtn();
   // this.createSeekbar();
   // this.createSettingsBtn();
    this.createRestartVideoBtn();
    this.createTextContent();
    this.addEventListeners();

    // Attach the video element
    //this.container.appendChild(this.player);
  }





  addSettingsBtnEventListeners() {
    if (!this.settingsBtn || !this.settingsBtn.buttonElement) return;

    this.settingsBtn.buttonElement.addEventListener('focus', () => {
      if (this.settingsBtn && this.settingsBtn.buttonElement && this.settingsBtn.buttonElement.querySelector('img')) {
        const iconSrc = this.player.paused() ? playIconFocus : pauseIconFocus;
        this.settingsBtn.buttonElement.querySelector('img').setAttribute('src', iconSrc);
        this.settingsBtn.buttonElement.style.backgroundColor = 'rgba(255, 255, 255)';
      }
    });

    this.settingsBtn.buttonElement.addEventListener('blur', () => {
      if (this.settingsBtn && this.settingsBtn.buttonElement && this.settingsBtn.buttonElement.querySelector('img')) {
        const iconSrc = this.player.paused() ? playIcon : pauseIcon;
        this.settingsBtn.buttonElement.querySelector('img').setAttribute('src', iconSrc);
        this.settingsBtn.buttonElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      }
    });
  }

  updatePlayPauseButton() {
    if (this.playPauseBtn && this.playPauseBtn.buttonElement && this.seekbar.focused) {
      const iconSrc = this.player.paused() ? playIcon : pauseIcon;
      this.playPauseBtn.buttonElement.querySelector('img').setAttribute('src', iconSrc);
    }
  }

  createSeekbar() {
    if (!this.player) return;

    this.seekbar = new PlayerSeekbar(this.player);
    this.seekbar.mount(this.container);

    this.player.el_.onplay= () => this.updatePlayPauseButton();
    this.player.el_.onpause = () => this.updatePlayPauseButton();
  }

  addEventListeners() {
    if (!this.playPauseBtn || !this.playPauseBtn.buttonElement) return;

    this.playPauseBtn.buttonElement.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();

        if (this.settingsBtn) this.settingsBtn.focus();
        else if (this.restartVideoBtn) this.restartVideoBtn.focus();
        else if (this.seekbar) this.seekbar.focus();
      }
    });

    if (this.settingsBtn && this.settingsBtn.buttonElement) {
      this.settingsBtn.buttonElement.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          if (this.seekbar) this.seekbar.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          if (this.playPauseBtn) this.playPauseBtn.focus();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          e.stopPropagation();
          if (this.restartVideoBtn) this.restartVideoBtn.focus();
        }
      });
    }

    if (this.restartVideoBtn && this.restartVideoBtn.buttonElement) {
      this.restartVideoBtn.buttonElement.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
           e.stopPropagation();
          if (this.seekbar) this.seekbar.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          if (this.playPauseBtn) this.playPauseBtn.focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          e.stopPropagation();
          if (this.settingsBtn) this.settingsBtn.focus();
        }
      });
    }

    const seekbarElement = this.seekbar.getElement && this.seekbar.getElement();
    if (seekbarElement) {
      seekbarElement.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();

          if (this.settingsBtn) this.settingsBtn.focus();
          else if (this.restartVideoBtn) this.restartVideoBtn.focus();
          else if (this.playPauseBtn) this.playPauseBtn.focus();
        }
      });
    }
  }

 /* createSettingsBtn() {
    this.settingsBtn = new Button({
      imgSrc: settingsIcon,
      imgAltText: 'Settings',
      buttonText: 'Settings',
      width: 40,
      height: 40,
      klassname: 'settings-btn',
      focused: false,
      disabled: false,
      handleClick: () => {
        this.createSideBar();
        this.hidePlayerControls();
      }
    });
    // this.addSettingsBtnEventListeners();
    this.settingsBtn.mount(this.rightSideContainer);
  }*/

  createRestartVideoBtn() {
    try{
    this.restartVideoBtn = addStartFromBeginningButton(this.playerContainer);
    this.rightSideContainer.append(this.restartVideoBtn.buttonElement);
    }catch(e){
      console.error('Error creating restart video button buttonElement:', e);
    }
   
 try{
  this.restartVideoBtn = addStartFromBeginningButton(this.playerContainer);
    this.rightSideContainer.append(this.restartVideoBtn);
    }catch(e){
      console.error('Error creating restart video button:', e);
    }
    
    //this.restartVideoBtn.mount(this.rightSideContainer);
  }

  createTextContent() {
    this.textContent = new TextContent({
      text: this.videoTitleConfig.text,
      fontSize: this.videoTitleConfig.fontSize,
      color: this.videoTitleConfig.color,
      fontWeight: this.videoTitleConfig.fontWeight,
    });
    this.textContent.mount(this.leftSideContainer);
  }

  changePlayBackQuality(id) {
    this.selectedPlaybackQuality = id;
    let videoLevels = this.player.qualityLevels();

    if (!videoLevels || videoLevels.length === 0) {
      console.warn('No video resolutions available to change playback quality.');
      return;
    }

    if (id == "auto") {
      this.selectedVideoQuality = "auto";
      if (this.drmEnabled) {

      } else {
        this.playerInstance.currentLevel = -1;
      }
    } else {
      for (let i = 0; i < videoLevels?.length; i++) {
        if (videoLevels[i].height == id) {
          this.selectedVideoQuality = videoLevels[i].height;
          if (this.drmEnabled) {
            this.playerInstance.setQualityFor('video', i);
          } else {
            this.playerInstance.currentLevel = i;
          }
          break;
        }
      }
    }
  }

  changePlaybackCaptions(id) {
    let textTracks = this.player.textTracks();

    if (!textTracks || textTracks.length === 0) {
      console.warn('No text tracks available to change playback captions.');
      return;
    }
    const validTextTracksType = ['captions', 'subtitles', 'caption', 'subtitle'];

    for (let i = 0; i < textTracks.length; i++) {
      if(validTextTracksType.includes(textTracks[i].kind.toLowerCase())){
        if (textTracks[i].language === id) {
          this.selectedPlaybackCaption = id;
          textTracks[i].mode = 'showing';
        } else {
          textTracks[i].mode = 'disabled';
        }
      }
    }
  }


  changePlaybackAudio(id){
    let audioTracks = this.player.audioTracks();

    if (!audioTracks || audioTracks.length === 0) {
      console.warn('No audio tracks available to change playback audio.');
      return;
    }

    for (let i = 0; i < audioTracks.length; i++) {
      if (audioTracks[i].id == id || audioTracks[i].lang == id) {
        this.selectedAudioQuality = id;
        if(this.drmEnabled){
          this.playerInstance.setCurrentTrack(audioTracks[i]);
        } else{
          this.playerInstance.audioTrack = i;
        }
        break;
      }
    }
  }

  videoQualitySelector() {
    if (!this.mainSidebar) return;

    const resolutions = this.player.qualityLevels();
    const currentQuality = this.selectedVideoQuality;

    const items = [
      {
        text: 'Auto',
        id: 'auto',
        isSelected: currentQuality === 'auto',
        callback: () => {
          this.mainSidebar.currentFocusedOption.focus();
          this.sidebar.unmount();
        }
      },
      ...resolutions.map(resolution => ({
        text: `${resolution.height}p`,
        id: resolution.height,
        isSelected: currentQuality === resolution.height,
        callback: () => {
          this.mainSidebar.currentFocusedOption.focus();
          this.sidebar.unmount();
        }
      }))
    ];


    this.sidebar = new Sidebar({
      title: 'Video Quality',
      items: items,
      klassname: 'default-sidebar',
      lastFocusedElement: this.mainSidebar.currentFocusedOption,
      type: 'selection',
      focused: true,
      onselect: (data) => {
        this.changePlayBackQuality(data.id);
      },
      callback: () => {
        if (this.mainSidebar.sidebarElement) {
          this.mainSidebar.sidebarElement.style.visibility = 'visible';
        }
      }
    });
    this.sidebar.mount(this.container);
  }

  audioLanguageSelector() {
    if (!this.mainSidebar) return;
    const audioTracks = this.player.audioTracks();
    const currentAudioQuality = this.selectedAudioQuality;

    this.sidebar = new Sidebar({
      title: 'Audio Language',
      items: audioTracks.map((audio, idx) => ({
        id: audio.id || audio.lang,
        text: audio.name || audio.lang,
        isSelected: (audioTracks.length === 1)  || (currentAudioQuality ? currentAudioQuality === audio.id : audio.default),
        callback: () => {
          this.mainSidebar.currentFocusedOption.focus();
          this.sidebar.unmount();
        }
      })),
      klassname: 'default-sidebar',
      lastFocusedElement: this.mainSidebar.currentFocusedOption,
      type: 'selection',
      focused: true,
      onselect: (data) => {
          this.changePlaybackAudio(data.id);
      },
      callback: () => {
        if (this.mainSidebar.sidebarElement) {
          this.mainSidebar.sidebarElement.style.visibility = 'visible';
        }
      }
    });
    this.sidebar.mount(this.container);
  }

  subtitlesSelector() {
    if (!this.mainSidebar) return;

    const captions = this.player.textTracks();
    const currentCaption = this.selectedPlaybackCaption;


    const items = [
      {
        id: 'off',
        text: 'Off',
        isSelected: currentCaption === 'off', // You can enhance this by checking if all tracks are disabled
        callback: () => {
          this.mainSidebar.currentFocusedOption.focus();
          this.sidebar.unmount();
        }
      },
      ...captions.map(subtitle => ({
        id: subtitle.language,
        text: subtitle.label,
        isSelected: currentCaption === subtitle.language || subtitle.mode === 'showing',
        callback: () => {
          this.mainSidebar.currentFocusedOption.focus();
          this.sidebar.unmount();
        }
      }))
    ];


    this.sidebar = new Sidebar({
      title: 'Subtitles',
      items: items,
      klassname: 'default-sidebar',
      lastFocusedElement: this.mainSidebar.currentFocusedOption,
      type: 'selection',
      focused: true,
      callback: () => {
        if (this.mainSidebar.sidebarElement) {
          this.mainSidebar.sidebarElement.style.visibility = 'visible';
        }
      },
      onselect: (data) => {
        this.changePlaybackCaptions(data.id);
      }
    });
    this.sidebar.mount(this.container);
  }

  createSideBar() {
    let items = [
      {
        text: 'Video Quality', isSelected: true, callback: () => {
          if (this.mainSidebar.sidebarElement) {
            this.mainSidebar.sidebarElement.style.visibility = 'hidden';
          }
          this.videoQualitySelector();
        }
      }
    ]

    if (this.player.audioTracks() && this.player.audioTracks().length > 0) {
      items.push(
        {
          text: 'Audio Language', isSelected: false, callback: () => {
            if (this.mainSidebar.sidebarElement) {
              this.mainSidebar.sidebarElement.style.visibility = 'hidden';
            }
            this.audioLanguageSelector();
          }
        }
      )
    }

    if (this.player.textTracks() && this.player.textTracks()?.length > 0) {
      items.push(
        {
          text: 'Subtitles', isSelected: false, callback: () => {
            if (this.mainSidebar.sidebarElement) {
              this.mainSidebar.sidebarElement.style.visibility = 'hidden';
            }
            this.subtitlesSelector();
          }
        }
      )
    }

    this.mainSidebar = new Sidebar({
      title: 'Settings',
      items: items,
      klassname: 'default-sidebar',
      lastFocusedElement: this.settingsBtn.buttonElement,
      type: 'navigation',
      focused: true,
      callback: () => {
        this.showPlayerControls();
      }
    });
    this.mainSidebar.mount(this.container);
  }

  hidePlayerControls() {
    if (this.rightSideContainer) {
      this.rightSideContainer.style.visibility = 'hidden';
    }

    if (this.seekbar) {
      this.seekbar.container.style.visibility = 'hidden';
    }

    if (this.leftSideContainer) {
      this.leftSideContainer.style.visibility = 'hidden';
    }
  }

  showPlayerControls() {
    if (this.rightSideContainer) {
      this.rightSideContainer.style.visibility = 'visible';
    }

    if (this.seekbar) {
      this.seekbar.container.style.visibility = 'visible';
    }

    if (this.leftSideContainer) {
      this.leftSideContainer.style.visibility = 'visible';
    }
  }

  attachTo(parent) {
    if (!parent || !(parent instanceof HTMLElement)) {
      throw new Error('VideoPlayerUI: parent must be a valid DOM element');
    }
    parent.appendChild(this.container);
  }

  getElement() {
    return this.container;
  }

  unmount() {
    if (this.playPauseBtn && this.playPauseBtn.buttonElement) {
      this.playPauseBtn.buttonElement.removeEventListener('focus', this.updatePlayPauseButton);
      this.playPauseBtn.buttonElement.removeEventListener('blur', this.updatePlayPauseButton);
      this.playPauseBtn.buttonElement.removeEventListener('keydown', this.handlePlayPauseKeydown);
    }

    if (this.player) {
      this.player.el().removeEventListener('play', this.updatePlayPauseButton);
      this.player.el().removeEventListener('pause', this.updatePlayPauseButton);
    }

    if (this.container) {
      this.container.remove();
    }
  }
}

