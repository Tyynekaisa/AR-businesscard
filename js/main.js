// main.js
// 12.3.2026
// Author: Kaisa Juhola
// AR Business Card

import { CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

async function startAR() {

    const mindARThreeJs = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "assets/targets/target_card.mind"
    })

    const { cssRenderer, renderer, cssScene, scene, camera } = mindARThreeJs

    const container = new CSS3DObject(document.querySelector("#ar-container"))
    const anchor = mindARThreeJs.addCSSAnchor(0)
    anchor.group.add(container)
    
    renderer.setPixelRatio(window.devicePixelRatio);

    const hobbies = document.querySelector("#hobbies")
    const videoWrapper = document.querySelector("#video-wrapper")
    const videoClose = document.querySelector("#video-close")
    const video = document.querySelector("#video")
    const hobbyText = document.querySelector("#hobby-text")
    const hobbyArrow = document.querySelector("#hobby-arrow")

    const play = document.querySelector("#play")
    const pause = document.querySelector("#pause")
    const stop = document.querySelector("#stop")

    

    function toggleVideo(){
        if(videoWrapper.classList.contains("active")){
            closeVideo()
        } else {
            openVideo()
        }

    }

    hobbies.addEventListener("click", toggleVideo)

    function openVideo(){

        videoWrapper.classList.add("active")

        video.play()

        hobbyText.textContent = "Close"
        hobbyArrow.classList.remove("left")
        hobbyArrow.classList.add("right")

    }

    function closeVideo(){
        video.pause()
        video.currentTime = 0
        videoWrapper.classList.remove("active")

        hobbyText.textContent = "Hobbies"
        hobbyArrow.classList.remove("right")
        hobbyArrow.classList.add("left")
    }

    play.addEventListener("click", () => {
        video.play()
    })

    pause.addEventListener("click", () => {
        video.pause()
    })

    stop.addEventListener("click", () => {
        video.currentTime = 0
        video.pause()
    })

    videoClose.addEventListener("click", closeVideo)

    anchor.onTargetFound = () => {
        // 1. Card box näkyy heti
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"

        // 2. Header ilmestyy 0.3s viiveellä
        setTimeout(() => {
            document.querySelector("#header").classList.add("visible")
        }, 300)

        // 3. Someikonit ilmestyy 0.6s viiveellä
        setTimeout(() => {
            document.querySelector(".links").classList.add("visible")
        }, 600)

        // 4. Painikkeet ilmestyy 0.9s viiveellä
        setTimeout(() => {
            document.querySelector(".buttons").classList.add("visible")
        }, 900)

        // 5. About me box 1.2s viiveellä
        setTimeout(() => {
            document.querySelector("#aboutme").classList.add("visible")
        }, 1200)
    }

    anchor.onTargetLost = () => { 
        video.pause() 
    
        // Kaikki elementit piiloon
        document.querySelector("#header").classList.remove("visible")
        document.querySelector(".links").classList.remove("visible")
        document.querySelector(".buttons").classList.remove("visible")
        document.querySelector("#aboutme").classList.remove("visible")
    }


    await mindARThreeJs.start()
    renderer.setAnimationLoop(render)

    function render() {
        // renderer.render(scene, camera)
        cssRenderer.render(cssScene, camera)
    }

    
}
startAR()
