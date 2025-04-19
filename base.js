const POINTS_DISPLAY = document.getElementById("funk-points")
const IMG2 = document.getElementById("img2")

import { EffectPlayer } from "./effects.js";


export class UkePlayer {

    constructor() {
        /** @type number */
        this.funkyPoints = 0;
        this.unlockedChords = ["Am", "G", "C"]
        this.effectPlayer = new EffectPlayer()
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


    strum(chord = this.unlockedChords[Math.floor(Math.random() * this.unlockedChords.length)]) {
        this.effectPlayer.playSound(chord)
        this.effectPlayer.showStrumEffect(chord)
        this.addFunkyPoint(1)
        localStorage.setItem("funkyPoints", this.funkyPoints)
        IMG2.classList.remove("hidden")
        setTimeout(() => { IMG2.classList.add("hidden") }, 100)
        this.showStrumEffect(chord)
    }
}

