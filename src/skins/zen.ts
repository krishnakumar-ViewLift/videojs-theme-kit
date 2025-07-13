
import { addRewindButton } from "../components/RewindButton";
import { addForwardButton } from "../components/ForwardButton";
import { injectSVG, parseSvgString } from "../utils/helper";


const zenHandler = (player: any) => {
    player.addClass('skin_zen');

    const zenbar = document.createElement('div');
    zenbar.className = 'zen-bar';

    const SeekToLive = player?.controlBar?.getChild('SeekToLive');
    zenbar.append(SeekToLive.el());

    const VolumePanel = player?.addChild('VolumePanel', {}, 2);
    zenbar.append(VolumePanel.el());

    const RewindButton = addRewindButton(player);
    if (RewindButton) zenbar.append(RewindButton.el());

    const PlayToggle = player?.controlBar?.getChild('PlayToggle');
    if (PlayToggle) zenbar.append(PlayToggle.el());

    const ForwardButton = addForwardButton(player);
    if (ForwardButton) zenbar.append(ForwardButton.el());


    const icons = `<svg xmlns="http://www.w3.org/2000/svg" style="display : none">
        <defs>
        <symbol id="vjs-icon-play" viewBox="0 0 15 15">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM6.24904 5.06754C6.40319 4.97808 6.59332 4.97745 6.74807 5.06588L10.2481 7.06588C10.4039 7.1549 10.5 7.32057 10.5 7.5C10.5 7.67943 10.4039 7.8451 10.2481 7.93412L6.74807 9.93412C6.59332 10.0226 6.40319 10.0219 6.24904 9.93246C6.09488 9.84299 6 9.67824 6 9.5V5.5C6 5.32176 6.09488 5.15701 6.24904 5.06754Z"
                fill="#ffffff" />
        </symbol>
        <symbol id="vjs-icon-pause" viewBox="0 0 15 15">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7 10H6V5H7V10ZM9 10H8V5H9V10Z"
                fill="#ffffff" />
        </symbol>
        <symbol id="vjs-icon-fullscreen"> viewBox="0 0 48 48">
            <path d="M33 6H42V15" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M42 33V42H33" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 42H6V33" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 15V6H15" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </symbol>
        <symbol id="vjs-icon-fullscreen-back" viewBox="0 0 48 48">
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <path d="M6 6L16 15.8995" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M6 41.8995L16 32" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M42.0001 41.8995L32.1006 32" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M41.8995 6L32 15.8995" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M33 6H42V15" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M42 33V42H33" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 42H6V33" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 15V6H15" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </symbol>
        </defs>
        </svg>`;

    player.el().insertBefore(parseSvgString(icons), player.el().firstChild ?? null);


    const PlayToggleSVG = player.controlBar.getChild('PlayToggle').el().firstChild;
    PlayToggleSVG.style.height = '28px'
    PlayToggleSVG.style.width = '28px'
    const playUse = injectSVG(PlayToggleSVG, player.paused() ? "#vjs-icon-play" : "#vjs-icon-pause");
    player.on('pause', () => playUse.setAttributeNS(null, "href", "#vjs-icon-play"));
    player.on('play', () => playUse.setAttributeNS(null, "href", "#vjs-icon-pause"));

    const ProgressControl = player.controlBar?.getChild('ProgressControl');
    if (ProgressControl) zenbar.append(ProgressControl.el());

    const FullscreenToggle = player.addChild('FullscreenToggle', {});
    zenbar.append(FullscreenToggle.el());

    const FullScreenToggleSVG = player?.getChild('FullscreenToggle').el().querySelector('.vjs-icon-placeholder');
    const fullscreenUse = injectSVG(FullScreenToggleSVG, "#vjs-icon-fullscreen");
    player.on('fullscreenchange', () => {
        const isFullscreen = player.isFullscreen_;
        fullscreenUse?.setAttributeNS(null, "href", isFullscreen ? "#vjs-icon-fullscreen-back" : "#vjs-icon-fullscreen");
    });

    player.el()?.append(zenbar);
    player.removeChild('controlBar');
}
export { zenHandler }