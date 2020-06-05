export function playMp3(src) {
    return new Promise(res=>{
        const snd = new  Audio(src);
        snd.play();
        snd.onended = function() {
            res(snd);
        };
    })
}

export default {
    playMp3
}