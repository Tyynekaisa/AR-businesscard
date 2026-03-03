// main.js
// 3.3.2026
// Author: Kaisa Juhola
// AR Business Card

import { CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

async function startAR() {

    const mindARThreeJs = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "assets/targets/target_card.mind"
    })

    const { cssRenderer, renderer, cssScene, scene, camera } = mindARThreeJs

    const div = new CSS3DObject(document.querySelector("#ar-example"))
    const anchor = mindARThreeJs.addCSSAnchor(0)
    anchor.group.add(div)

    const video = document.querySelector("#vid")
    const play = document.querySelector("#play")
    const pause = document.querySelector("#pause")
    const stop = document.querySelector("#stop")

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


    await mindARThreeJs.start()
    renderer.setAnimationLoop(render)

    function render() {
        // renderer.render(scene, camera)
        cssRenderer.render(cssScene, camera)
    }
}
startAR()
