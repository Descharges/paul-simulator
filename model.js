import { view } from "./view.js";

export const CHORDS = {
    Am : {type: "minor", price: 50},
    G : {type: "major", price: 100},
    C : {type: "major", price: 50},
}

class Player {
    constructor(){
        this._points = 0
        this._unlockedChords = []
    }

    get points(){
        return this._points
    }

    unlockChord(chord){
        this._unlockedChords.push(chord)
        view.updateAvilableChords(this._unlockedChords)
        view.updateShop(this._unlockedChords)
        localStorage.setItem("unlockedChords", JSON.stringify(this._unlockedChords))
    }

    setupPlayer(){
        let savedValue = localStorage.getItem("funkyPoints");
        let initValue = savedValue == null ? 0 : parseInt(savedValue)
        this.addPoints(initValue)

        let savedChords = localStorage.getItem("unlockedChords")
        this._unlockedChords = savedChords == null ? [] : JSON.parse(savedChords)
        view.updateAvilableChords(this._unlockedChords)
        view.updateShop(this._unlockedChords)
    }

    addPoints(n){
        this._points += n;
        localStorage.setItem("funkyPoints", this._points);
        view.updatePointCount(this._points)
        view.effect.showFloatingScoreUpdate(n)
    }
}

export let player = new Player()