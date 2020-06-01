const synth = window.speechSynthesis;
if(!synth) {
    alert('Ваш браузер не поддерживает speechSynthesis');
}

let defVoice = null;

function populate() {
    const voices = synth.getVoices();
    const defaultVoice = voices.find(x=>x.lang =='ru-RU');
    defVoice = defaultVoice;
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populate;
}

populate();

export function speak(text) {

return new Promise((res, rej)=> {
    if(!defVoice){
        rej();
        return;
    }

    if (synth.speaking) {
        rej();
        return;
    }

    const utterThis = new SpeechSynthesisUtterance(text);

    const v = defVoice;
    utterThis.voice = v;
    utterThis.lang = v.lang;
    synth.speak(utterThis);
    utterThis.onend = function(event) {
        res(event);
    }
})

}

export default {
    speak
}