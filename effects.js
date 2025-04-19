const IMG_CONTAINER = document.getElementById("image-container")

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
    showStrumEffect(text) {
        let sturmEffectNode = document.createElement("p")
        sturmEffectNode.innerText = text
        sturmEffectNode.classList.add("strum-effect")
        sturmEffectNode.style.top = 10 + Math.floor(Math.random() * 80) + `%`
        sturmEffectNode.style.left = 10 + Math.floor(Math.random() * 80) + `%`
        sturmEffectNode.style.color = `#` + Math.floor(Math.random() * 16777215).toString(16)
        IMG_CONTAINER.append(sturmEffectNode)
        setTimeout(() => { sturmEffectNode.remove() }, 740)
    }
}