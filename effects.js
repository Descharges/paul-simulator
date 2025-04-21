export function id(id) {
    return document.getElementById(id)
}

export class EffectPlayer {
    constructor() {
        this.audioContext = undefined
        this.soundBuffer = {}
    }

    /**
     * 
     * @param {string} chord 
     */
    async playSound(chord) {
        if (this.audioContext == undefined) {
            this.audioContext = new AudioContext()
        }

        if (this.audioContext.state == "suspended") {
            await this.audioContext.resume()
        }

        // Charger et décoder une seule fois
        if (!this.soundBuffer[chord]) {
            const response = await fetch(`./${chord}.mp3`)
            const arrayBuffer = await response.arrayBuffer()
            this.soundBuffer[chord] = await this.audioContext.decodeAudioData(arrayBuffer)
        }

        const bufferSource = this.audioContext.createBufferSource()
        bufferSource.buffer = this.soundBuffer[chord]

        const gainNode = this.audioContext.createGain()
        gainNode.gain.value = 0.8

        bufferSource.connect(gainNode).connect(this.audioContext.destination)
        bufferSource.start(0)
    }

    /**
    * 
    * @param {string} text 
    */
    showFloatingText(text) {
        let strumEffectNode = document.createElement("p")
        strumEffectNode.innerText = text
        strumEffectNode.classList.add("strum-effect")
        strumEffectNode.style.top = 10 + Math.floor(Math.random() * 80) + `%`
        strumEffectNode.style.left = 10 + Math.floor(Math.random() * 80) + `%`
        strumEffectNode.style.color = `#` + Math.floor(Math.random() * 16777215).toString(16)
        id("image-container").append(strumEffectNode)
        setTimeout(() => { strumEffectNode.remove() }, 740)
    }

    showFloatingScoreUpdate(value) {
        let pointEffectNode = document.createElement("p")
        pointEffectNode.innerText = (value > 0 ? "+" : "-") + Math.abs(value)
        pointEffectNode.className = "point-effect" + (value < 0 ? " text-fail" : " text-success")
        id("status").append(pointEffectNode)
        setTimeout(() => { pointEffectNode.remove() }, 740)
    }

    showPlayerStrum() {
        id("img2").classList.remove("hidden")
        setTimeout(() => { id("img2").classList.add("hidden") }, 100)
    }
}