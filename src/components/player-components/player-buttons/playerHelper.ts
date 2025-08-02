 import { Sidebar } from '../player-sidebar/player-sidebar.js';
 import { VideoJSPlayer } from "../../../types";
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

  /*  if (player.audioTracks() && player.audioTracks?.length > 1) {
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

    if (player.textTracks() && player.textTracks?.length > 0) {
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
    }*/

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
      const currentQuality = player.el_.player.qualityLevels().selectedIndex_;
  
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
          //this.changePlayBackQuality(data.id);
        },
        callback: () => {
          if (mainSidebar.sidebarElement) {
            mainSidebar.sidebarElement.style.visibility = 'visible';
          }
        }
      });
      sidebar.mount(player?.el());
    }