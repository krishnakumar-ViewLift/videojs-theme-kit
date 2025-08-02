import type Player from 'video.js/dist/types/player';
import type ControlBar from 'video.js/dist/types/control-bar/control-bar'

import type Component from 'video.js/dist/types/component'

interface ThemeOptions extends Player {
    skin?: 'slate' | 'spaced' | 'sleek' | 'zen' | 'smartTV';
    color?: string;
}

type VideoJSPlayer = Player & Component & {
    removeChild: any;
    theme?:(options: ThemeOptions)=>void;
    controlBar?: ControlBar & {
        removeChild: any
    }
};


export type { VideoJSPlayer, ThemeOptions }