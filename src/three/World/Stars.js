import * as THREE from "three"
import Experience from "../Experience";
import starsVertexShader from "../shaders/stars/vertex.glsl"
import starsFragmentShader from "../shaders/stars/fragment.glsl"

export default class Stars
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug.ui

        this.parameters = {}
        this.parameters.count = 30000
        this.parameters.size = 0.1
        this.parameters.insideColor = '#ff6030'
        this.parameters.outsideColor = '#1b3984'

        this.setStars()
    }
    setStars()
    {
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.parameters.count * 3)
        //const colors = new  Float32Array(this.parameters.count * 3)
        const scales = new Float32Array(this.parameters.count)


        for(let i = 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3

            positions[i3 + 0] = (Math.random() - 0.5) * 500
            positions[i3 + 1] = (Math.random() - 0.2) * 200
            positions[i3 + 2] = (Math.random() - 0.15) * 500

            scales[i] = (Math.random() + 3) * 2
        }
        
        this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('aScales', new THREE.BufferAttribute(scales, 1))

        const material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: starsVertexShader,
            fragmentShader: starsFragmentShader,
            uniforms:
            {
                uTest : { value : new THREE.Vector3(1.0)},
                uSize : { value: 50.0 * this.renderer.instance.getPixelRatio()},
                uPixelRatio : { value: this.renderer.instance.getPixelRatio()},
            }
        })
        /* 
        * Add random test value for shader
        */

        this.experience.debug.ui.add(material.uniforms.uTest.value, 'x').min(2).max(10).step(0.0001).name('Test value x')
        this.experience.debug.ui.add(material.uniforms.uTest.value, 'y').min(-10).max(10).step(0.0001).name('Test value y')
        this.experience.debug.ui.add(material.uniforms.uTest.value, 'z').min(-10).max(10).step(0.0001).name('Test value z')
        
        const point = new THREE.Points(this.geometry, material)
        
        this.scene.add(point)
    }
}