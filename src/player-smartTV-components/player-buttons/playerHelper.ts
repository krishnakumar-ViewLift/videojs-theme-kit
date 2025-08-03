 import { Sidebar } from '../player-sidebar/player-sidebar.js';
 import { VideoJSPlayer } from "../../types/index.js";
 export function createSideBar(player: VideoJSPlayer,buttonElement?: any) {
    let mainSidebar;
    let items = [
      {
        text: 'Video Quality', isSelected: true, callback: () => {
          if (mainSidebar.sidebarElement) {
            mainSidebar.sidebarElement.style.visibility = 'hidden';
          }
          videoQualitySelector(mainSidebar, player);
        }
      }
    ]

    if (player?.audioTracks()?.tracks_ && player?.audioTracks()?.tracks_?.length > 1) {
      items.push(
        {
          text: 'Audio Language', isSelected: false, callback: () => {
            if (mainSidebar.sidebarElement) {
              mainSidebar.sidebarElement.style.visibility = 'hidden';
            }
            audioLanguageSelector(mainSidebar, player);
          }
        }
      )
    }
     let textTracks = player?.textTracks()?.tracks_;
      textTracks = textTracks.filter(track => track.kind === 'captions' || track.kind === 'subtitles');
    if (textTracks && textTracks?.length > 0) {
      items.push(
        {
          text: 'Subtitles', isSelected: false, callback: () => {
            if (mainSidebar.sidebarElement) {
              mainSidebar.sidebarElement.style.visibility = 'hidden';
            }
            closeCaptionSelector(mainSidebar,player);
          }
        }
      )
    }

     mainSidebar = new Sidebar({
      title: 'Settings',
      items: items,
      klassname: 'default-sidebar',
      lastFocusedElement: buttonElement,
      type: 'navigation',
      focused: true,
      callback: () => {
        player.controlBar?.removeClass('hidePlayerControls');
        player.options({
          inactivityTimeout: 4000
      });
       setTimeout(() => {
          buttonElement.focus();
         // player.userActive(false);
        }, 100);
      }
    });
    mainSidebar.mount(player?.el());
    player.controlBar?.addClass('hidePlayerControls');
    player.options({
        inactivityTimeout: 0
  }); // Disable inactivity timeout to keep sidebar open
    return mainSidebar;
  }

   function videoQualitySelector(mainSidebar,player: VideoJSPlayer) {
      if (!mainSidebar) return;
      let sidebar;
      const resolutions = player.el_.player.qualityLevels().levels_;
      const currentQuality = player.el_.player.qualityLevels().selectedIndex_ == -1? "auto" : player.el_.player.qualityLevels().levels_[player.el_.player.qualityLevels().selectedIndex_].height;
  
      const items = [
        {
          text: 'Auto',
          id: 'auto',
          isSelected: currentQuality === 'auto',
          callback: () => {
            mainSidebar.currentFocusedOption.focus();
            sidebar.unmount();
          }
        },
        ...resolutions.map(resolution => ({
          text: `${resolution.height}p`,
          id: resolution.height,
          isSelected: currentQuality === resolution.height,
          callback: () => {
            mainSidebar.currentFocusedOption.focus();
            sidebar.unmount();
          }
        }))
      ];
  
  
      sidebar = new Sidebar({
        title: 'Video Quality',
        items: items,
        klassname: 'default-sidebar',
        lastFocusedElement: mainSidebar.currentFocusedOption,
        type: 'selection',
        focused: true,
        onselect: (data) => {
          if (data.id === 'auto') {
            player.el_.player.qualityLevels().selectedIndex_ = -1; // Set to auto
          } else {
            const selectedIndex = resolutions.findIndex(resolution => resolution.height === data.id);
            if (selectedIndex !== -1) {
              player.el_.player.qualityLevels().selectedIndex_ = selectedIndex; // Set to specific resolution
            }
          }
          //sidebar.unmount();
         // if (mainSidebar.sidebarElement) {
         //   mainSidebar.sidebarElement.style.visibility = 'visible';
         //   mainSidebar.currentFocusedOption.focus();
         // } 
        },
        callback: () => {
          if (mainSidebar.sidebarElement) {
            mainSidebar.sidebarElement.style.visibility = 'visible';
          }
        }
      });
      sidebar.mount(player?.el());
    }

    function audioLanguageSelector(mainSidebar,player: VideoJSPlayer) {
      if (!mainSidebar) return;
      let sidebar;
      const audioTracks = player?.audioTracks()?.tracks_;
      const currentAudio = audioTracks?.find(track => track.enabled)?.label || audioTracks?.[0]?.label || 'Default';

      const items = audioTracks.map(track => ({
          text: track.label,
          id: track.id,
          isSelected: currentAudio === track.label,
          callback: () => {
            mainSidebar.currentFocusedOption.focus();
            sidebar.unmount();
          }
        })
      );

      sidebar = new Sidebar({
        title: 'Audio Language',
        items: items,
        klassname: 'default-sidebar',
        lastFocusedElement: mainSidebar.currentFocusedOption,
        type: 'selection',
        focused: true,
        onselect: (data) => {
          audioTracks?.forEach(track => {
            track.enabled = false;
            track.enabled = (track.id === data.id);
          });
          //sidebar.unmount();
         // if (mainSidebar.sidebarElement) {
          //  mainSidebar.sidebarElement.style.visibility = 'visible';
         //   mainSidebar.currentFocusedOption.focus();
         // } 
        },
        callback: () => {
          if (mainSidebar.sidebarElement) {
            mainSidebar.sidebarElement.style.visibility = 'visible';
          }
        }
      });
      sidebar.mount(player?.el());
    }

    function closeCaptionSelector(mainSidebar,player: VideoJSPlayer) {
      if (!mainSidebar) return;
      let sidebar;
      let textTracks = player.textTracks().tracks_;
      textTracks = textTracks.filter(track => track.kind === 'captions' || track.kind === 'subtitles');
      const currentText = textTracks?.find(track => track.mode === 'showing')?.label || textTracks?.[0]?.label || 'Default';
     
      const items = textTracks.map(track => {
          return {
            text: track.label,
            id: track.id,
            kind: track.kind,
            lang: track.language,
            mode: track.mode,
            isSelected: currentText === track.label,
            callback: () => {
              mainSidebar.currentFocusedOption.focus();
            sidebar.unmount();
          }
        }
      });
      sidebar = new Sidebar({
        title: 'Closed Captions',
        items: items,
        klassname: 'default-sidebar',
        lastFocusedElement: mainSidebar.currentFocusedOption,
        type: 'selection',
        focused: true,
        onselect: (data) => {
           textTracks?.forEach(track => {
            track.mode = track.id === data.id?"showing":"hidden";
          });
          //sidebar.unmount();
         // if (mainSidebar.sidebarElement) {
          //  mainSidebar.sidebarElement.style.visibility = 'visible';
           // mainSidebar.currentFocusedOption.focus();
          //} 
        },
        callback: () => {
          if (mainSidebar.sidebarElement) {
            mainSidebar.sidebarElement.style.visibility = 'visible';
          }
        }
      });
      sidebar.mount(player?.el());
    }

    export function createCloseCaptionSideBar(player: VideoJSPlayer,buttonElement?: any) {
    let mainSidebar;
     let textTracks = player.textTracks().tracks_;
      textTracks = textTracks.filter(track => track.kind === 'captions' || track.kind === 'subtitles');
      const currentText = textTracks?.find(track => track.mode === 'showing')?.label || textTracks?.[0]?.label || 'Default';
     
      const items = textTracks.map(track => {
          return {
            text: track.label,
            id: track.id,
            kind: track.kind,
            lang: track.language,
            mode: track.mode,
            isSelected: currentText === track.label,
            callback: () => {
              mainSidebar.currentFocusedOption.focus();
              mainSidebar.unmount();
          }
        }
      });


      mainSidebar = new Sidebar({
      title: 'Closed Captions',
      items: items,
      klassname: 'default-sidebar',
      lastFocusedElement: buttonElement,
      type: 'selection',
      focused: true,  
       onselect: (data) => {
           textTracks?.forEach(track => {
            track.mode = track.id === data.id?"showing":"hidden";
        });  
        mainSidebar.unmount(player?.el());
        player.controlBar?.removeClass('hidePlayerControls');
        player.options({
          inactivityTimeout: 4000
      });
       setTimeout(() => {
          buttonElement.focus();
         // player.userActive(false);
        }, 100);

      }, 
      callback: () => {
        
      }
    });
    mainSidebar.mount(player?.el());
    player.controlBar?.addClass('hidePlayerControls');
    player.options({
        inactivityTimeout: 0
  }); 
    return mainSidebar;
  }
      
  
  
     