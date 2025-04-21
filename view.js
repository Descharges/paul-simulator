import { controller } from "./controller.js";
import { EffectPlayer } from "./effects.js";
import { CHORDS } from "./model.js";

function id(id) {
    return document.getElementById(id)
}

export const NAVIGATION_TARGETS = {
    play: "play",
    shop: "shop"
}

const RANDOM_MESSAGES = [
    "Ouais",
    "Ca ~groove~",
    "Let's goooo !",
    "J'adore le pool"
]

class View {

    constructor() {
        this.effect = new EffectPlayer()
    }

    logRandom() {
        id("log").className = "text-crowd"
        id("log").innerText = `"${RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)]}"`
    }

    logSuccess(message) {
        id("log").className = "text-success"
        id("log").innerText = message
    }

    logFailure(message) {
        id("log").className = "text-fail"
        id("log").innerText = message
    }

    updatePointCount(pointsValue) {
        id("funk-points").innerText = pointsValue;
    }

    updateAvilableChords(chordsArray) {
        let chordsNodes = chordsArray.map((chord) => {
            let chordNode = document.createElement("p")
            chordNode.classList.add("chord")
            chordNode.id = chord
            chordNode.innerText = chord
            chordNode.addEventListener("click", () => {
                controller.strum(chord)
            })
            return chordNode
        })

        id("chords-container").replaceChildren(...chordsNodes)
    }

    /**
     * 
     * @param {string[]} availableChords 
     */
    updateShop(availableChords) {
        let shopChordsNodes = []
        for (const chord in CHORDS) {
            let shopChordNode = document.createElement("div")
            let classes = availableChords.includes(chord) ? ["shop-chord"] : ["shop-chord", "locked"]
            shopChordNode.classList.add(...classes)
            let message = availableChords.includes(chord) ? "Débloqué !" : `${CHORDS[chord].price} points`
            shopChordNode.innerHTML = `
                <p class="chord">${chord}</p>
                <p>${message}</p>
            `
            shopChordNode.addEventListener("click", () => {
                controller.unlockChord(chord)
            })

            shopChordsNodes.push(shopChordNode)
        }
        id("shop-chords-container").replaceChildren(...shopChordsNodes)
    }

    navigateTo(target) {
        for (const t in NAVIGATION_TARGETS) {
            id(t).classList.add("hidden")
        }
        id(target).classList.remove("hidden")
    }

    setupEventsListener() {
        id("image-container").addEventListener("click", () => {
            controller.strum()
        })

        id("info-button").addEventListener("click", () => {
            controller.showInfo()
        })

        id("reset-button").addEventListener("click", () => {
            controller.reset()
        })

        id("play-button").addEventListener("click", () => {
            this.navigateTo(NAVIGATION_TARGETS.play)
        })

        id("shop-button").addEventListener("click", () => {
            this.navigateTo(NAVIGATION_TARGETS.shop)
        })
    }

}

export let view = new View()