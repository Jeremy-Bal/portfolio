import Experience from "./Experience"
import * as THREE from 'three'

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.composer = null
        this.postParams = {
            exposure: 1,
            bloomThreshold: 0.4,
            bloomStrength: 0.6,
            bloomRadius: 0.6
        }

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            powerPreference: "high-performance",
            // antialias: true,
        })
        this.instance.physicallyCorrectLights = true
        this.instance.toneMapping = THREE.LinearToneMapping;
        this.instance.setClearColor('#000000')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        //this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        //this.instance.setPixelRatio(this.sizes.pixelRatio)

    }
    resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
    update()
    {
        if (this.resizeRendererToDisplaySize(this.instance)) {
            const canvas = this.instance.domElement;
            this.camera.instance.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.instance.updateProjectionMatrix();
        }
        this.instance.render(this.scene, this.camera.instance)
    }
}