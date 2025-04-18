const POINTS_DISPLAY = document.getElementById("funk-points")
const IMG_CONTAINER = document.getElementById("image-container")
const IMG2 = document.getElementById("img2")
const AUDIO = new Audio("./uke.mp3")

export class UkePlayer {

    constructor() {
        /** @type number */
        this.funkyPoints = 0;
        this.restoreSavedPlayer()
    }

    /**
     * 
     * @param {number} n 
     */
    addFunkyPoint(n) {
        this.funkyPoints += n
        this.updateFunkyPointsView()
    }

    updateFunkyPointsView() {
        POINTS_DISPLAY.innerText = this.funkyPoints
    }

    restoreSavedPlayer() {
        let savedPoints = localStorage.getItem("funkyPoints");
        this.funkyPoints = savedPoints != null ? parseInt(savedPoints) : 0;
        this.updateFunkyPointsView()
    }

    showStrumEffect() {
        let sturmEffectNode = document.createElement("p")
        sturmEffectNode.innerText = "good."
        sturmEffectNode.classList.add("strum-effect")
        IMG_CONTAINER.append(sturmEffectNode)
        setTimeout(()=>{sturmEffectNode.remove()}, 740)
    }

    strum() {
        AUDIO.cloneNode().play()
        this.addFunkyPoint(1)
        localStorage.setItem("funkyPoints", this.funkyPoints)
        IMG2.classList.remove("hidden")
        setTimeout(() => { IMG2.classList.add("hidden") }, 100)
        this.showStrumEffect()
    }
}