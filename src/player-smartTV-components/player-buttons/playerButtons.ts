import videojs from "video.js";
import { parseSvgString } from '../../utils/helper'
import Player from "video.js/dist/types/player";
import { VideoJSPlayer } from "../../types";
import { createCloseCaptionSideBar, createSideBar } from "./playerHelper";
const addStartFromBeginningButton = (player:Player) => {
    var Button = videojs.getComponent('Button');
    class StartFromBeginning extends Button {
        constructor(player:VideoJSPlayer, options:any={}) {
            super(player, options)
            let buttonElement = this.el_
           // let iconPlaceHolder = buttonElement.querySelector('.vjs-icon-placeholder')
            let controlText = buttonElement.querySelector('.vjs-control-text')
            controlText.textContent = `Start From Beginning`;
            buttonElement.classList.add("vjs-startFromBeginning-button");
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

const addSettingsButton = (player:Player) => {
    var Button = videojs.getComponent('Button');
    class SettingsButton extends Button {
        constructor(player:VideoJSPlayer, options:any={}) {
            super(player, options)
            let buttonElement = this.el_
           let iconPlaceHolder = buttonElement.querySelector('.vjs-icon-placeholder')
            let controlText = buttonElement.querySelector('.vjs-control-text')
            controlText.textContent = `Settings`
            buttonElement.classList.add("vjs-Settings-button");
            const svg = `<svg width="42" height="42" viewBox="0 0 102 102" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M90.913 45.8867V56.1132L80.0959 58.1496C79.4266 61.1027 78.2623 63.9214 76.6523 66.4864L82.8603 75.597L75.586 82.8192L66.5158 76.664C63.9394 78.2538 61.1222 79.4156 58.1737 80.1041L56.1361 90.913H45.8542L43.8193 80.1041C40.8708 79.4158 38.0535 78.2541 35.4773 76.664L26.4071 82.8192L19.1313 75.597L25.2918 66.4864C23.7008 63.9116 22.5379 61.0962 21.8482 58.1496L11.087 56.1132V45.8867L21.8482 43.8028C22.5428 40.8493 23.7235 38.0315 25.3421 35.4646L19.1327 26.4016L26.4085 19.1807L35.4787 25.3359C38.045 23.7263 40.8656 22.5627 43.8207 21.8945L45.8556 11.0869H56.1375L58.1751 21.8945C61.1301 22.5631 63.9506 23.7267 66.5172 25.3359L75.5874 19.1807L82.8617 26.4016L76.6537 35.5135C78.2633 38.0617 79.4277 40.8647 80.0973 43.8028L90.913 45.8867ZM28.9308 51.0214C28.9434 63.1872 38.8221 73.0394 50.9956 73.0271C56.8418 73.0212 62.4462 70.6944 66.5758 66.5588C70.7054 62.4232 73.0219 56.8174 73.0156 50.9748C73.0025 38.809 63.1234 28.9572 50.9499 28.9701C38.7764 28.983 28.9182 38.8556 28.9308 51.0214Z" fill="currentColor"/>
</svg>`
           
           iconPlaceHolder.append(parseSvgString(svg))
        }
        handleClick() {
            //let currentTime = player?.currentTime();
           // if(currentTime>0){
            //    let newTime = 0;
               // player.currentTime(newTime);
           // }
           createSideBar(player, this);
        }
    };
    videojs.registerComponent('SettingsButton', SettingsButton);
    const instance = new SettingsButton(player, {});
    return instance;
}

const addCloseCaptionButton = (player:Player) => {
    var Button = videojs.getComponent('Button');
    class CloseCaptionButton extends Button {
        constructor(player:VideoJSPlayer, options:any={}) {
            super(player, options)
            let buttonElement = this.el_
           let iconPlaceHolder = buttonElement.querySelector('.vjs-icon-placeholder')
            let controlText = buttonElement.querySelector('.vjs-control-text')
            controlText.textContent = `CC`
            buttonElement.classList.add("vjs-ClosedCaption-button");
            const svg = `<svg width="42" height="42" viewBox="0 0 102 102" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M92.7268 78.3757H81.5999V88.0906L57.4173 78.3757H9.27274V16.2273H92.7268V78.3757ZM17.6184 69.5027H57.3108L73.7991 74.6169L73.8001 69.5027H84.3821V25.2107H17.6184V69.5027Z" fill="currentColor"/>
<rect x="20.8628" y="34.7727" width="39.4091" height="6.95455" fill="currentColor"/>
<rect x="69.5446" y="34.7727" width="11.5909" height="6.95455" fill="currentColor"/>
<rect x="44.0446" y="51" width="37.0909" height="9.27273" fill="currentColor"/>
<rect x="20.8628" y="51" width="13.9091" height="9.27273" fill="currentColor"/>
</svg>`
            iconPlaceHolder.append(parseSvgString(svg))
        }
        handleClick() {
            //let currentTime = player?.currentTime();
           // if(currentTime>0){
            //    let newTime = 0;
               // player.currentTime(newTime);
           // }
           createCloseCaptionSideBar(player, this);
        }
    };
    videojs.registerComponent('CloseCaptionButton', CloseCaptionButton);
    const instance = new CloseCaptionButton(player, {});
    return instance;
}

export { addStartFromBeginningButton,addSettingsButton, addCloseCaptionButton }