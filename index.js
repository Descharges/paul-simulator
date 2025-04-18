import { UkePlayer } from "./base.js"

function id(id){
    return document.getElementById(id)
}

const IMG_CONTAINER = document.getElementById("image-container")
const INFO_BUTTON = document.getElementById("info")
const RESET_BUTTON = document.getElementById("reset")

let ukePlayer = new UkePlayer()
IMG_CONTAINER.addEventListener("click", () => {
    ukePlayer.strum("Am7")
})

id("Am").addEventListener("click", () => {
    ukePlayer.strum("Am")
})

id("G").addEventListener("click", () => {
    ukePlayer.strum("G")
})

id("C").addEventListener("click", () => {
    ukePlayer.strum("C")
})


INFO_BUTTON.addEventListener("click", () => {
    alert(`
        Uke Simulator
        --------------------------
        Par Paul Caillier
        
        Version 0.1.1
        Photos réalisées par le J
    `)
})

RESET_BUTTON.addEventListener("click", () => {
    if (confirm(
        "Vous allez perdre toute votre progression. Êtes vous bien sûr ?"
    ) &&  confirm(
        "Vraiment vraiment sûr ?"
    )){
        localStorage.clear()
        location.reload()
    }
})



