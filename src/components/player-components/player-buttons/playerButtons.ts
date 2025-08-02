import videojs from "video.js";
import { parseSvgString } from '../../../utils/helper'
import Player from "video.js/dist/types/player";
import { VideoJSPlayer } from "../../../types";
const addStartFromBeginningButton = (player:Player) => {
    var Button = videojs.getComponent('Button');
    class StartFromBeginning extends Button {
        constructor(player:VideoJSPlayer, options:any={}) {
            super(player, options)
            let buttonElement = this.el_
           // let iconPlaceHolder = buttonElement.querySelector('.vjs-icon-placeholder')
            let controlText = buttonElement.querySelector('.vjs-control-text')
            controlText.textContent = `Start From Beginning`;
            buttonElement.classList.add("vjs-skip-button");        
        }
        handleClick() {
            let currentTime = player?.currentTime();
            if(currentTime>0){
                let newTime = 0;
                player.currentTime(newTime);
            }
        }
    };
    videojs.registerComponent('StartFromBeginning', StartFromBeginning);
    const instance = new StartFromBeginning(player, {});
    return instance;
}

export { addStartFromBeginningButton }