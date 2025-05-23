import { CHORDS, player } from "./model.js";
import { view } from "./view.js";

class Controller {
    strum(chord = "Am7") {
        player.addPoints(1)
        view.effect.playSound(chord)
        view.effect.showFloatingText(chord)
        view.effect.showPlayerStrum()
        view.logRandom()
    }

    reset() {
        if (confirm(
            "Vous allez perdre toute votre progression. Êtes vous bien sûr ?"
        ) && confirm(
            "Vraiment vraiment sûr ?"
        )) {
            localStorage.clear()
            location.reload()
        }
    }

    showInfo() {
        alert(`
            Uke Simulator
            Par Paul Caillier
            --------------------------
            Version 0.1.4
            * Ajout de la boutique d'accords
            * Ajustements de l'interface
            * Refactoring
            --------------------------
            Photos réalisées par le J
        `)
    }

    unlockChord(chord) {
        if (player.unlockedChords.includes(chord)) {
            view.logFailure("Déja débloqué...")
            return
        }
        if (CHORDS[chord].price <= player.points) {
            view.logSuccess(`${chord} débloqué !`)
            player.addPoints(-CHORDS[chord].price)
            player.unlockChord(chord)
        } else {
            view.logFailure("Pas assez de fonds...")
        }
    }
}

export let controller = new Controller()