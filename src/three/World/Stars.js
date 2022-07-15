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
        this.mobileDisplay = this.experience.mobileDisplay

        this.parameters = {}
        this.parameters.count =  window.innerWidth < 800 ? 15000 : 30000
        this.parameters.size = 60.0
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

        //set the position for mobile or desktop
        if(this.mobileDisplay)
        {
            for(let i = 0; i < this.parameters.count; i++)
            {
                const i3 = i * 3
    
                positions[i3 + 0] = (Math.random() - 0.5) * 400
                positions[i3 + 1] = (Math.random() - 0.5) * 600
                positions[i3 + 2] = (Math.random() - 0.15) * 500
    
                scales[i] = (Math.random() + 3) * 5
            }
        }
        else{
            for(let i = 0; i < this.parameters.count; i++)
            {
                const i3 = i * 3
    
                positions[i3 + 0] = (Math.random() - 0.5) * 500
                positions[i3 + 1] = (Math.random() - 0.2) * 200
                positions[i3 + 2] = (Math.random() - 0.15) * 500
    
                scales[i] = (Math.random() + 3) * 2
            }
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
                uSize : { value: this.parameters.size * this.renderer.instance.getPixelRatio()},
                uPixelRatio : { value: this.renderer.instance.getPixelRatio()},
            }
        })

        /* 
        * Add random test value for shader
        */
        this.experience.debug.ui.add(material.uniforms.uTest.value, 'x').min(2).max(10).step(0.0001).name('Test value x')
        this.experience.debug.ui.add(material.uniforms.uTest.value, 'y').min(-10).max(10).step(0.0001).name('Test value y')
        this.experience.debug.ui.add(material.uniforms.uTest.value, 'z').min(-10).max(10).step(0.0001).name('Test value z')
        
        this.point = new THREE.Points(this.geometry, material)

        //set a name for apply resize function one time per step
        if (this.mobileDisplay) {
            this.point.name = "mobile"
        }else{
            this.point.name = "desktop"
        }

        this.scene.add(this.point)
    }
    resize()
    {
        this.mobileDisplay = window.innerWidth < 800 ? true : false

        if(this.mobileDisplay && this.point.name === "desktop")
        {
            this.point.geometry.dispose();
            this.point.material.dispose();
            this.scene.remove( this.point );
            this.setStars()
        }
        else if(!this.mobileDisplay && this.point.name === "mobile")
        {
            this.point.geometry.dispose();
            this.point.material.dispose();
            this.scene.remove( this.point );
            this.setStars()
        }
    }
}