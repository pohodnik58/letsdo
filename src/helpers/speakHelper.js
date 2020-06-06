import Speech from 'speak-tts';
import {beep} from "./beepHelper";
const speech = new Speech() // will throw an exception if not browser supported
speech.init({rate:1.2});

export function speak(text) {

    if(speech.hasBrowserSupport()) { // returns a boolean
        return speech.speak({
            text,
            queue: true
        })
    } else {
        beep();
        beep();
        beep();
    }
}

export default {
    speak
}