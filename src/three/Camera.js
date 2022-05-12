import Experience from "./Experience"
import * as THREE from 'three'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.times = this.experience.time
        
        this.mousePosition = {}
        this.groupCamera = new THREE.Group()
        this.scene.add(this.groupCamera)
        
        this.setInstance()
        this.setParallax()
    }

    setInstance()
    {

        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 500)

        //initial position
        this.instance.position.set(0, 130, 350)
        this.instance.rotation.set(-0.432, 0, 0)
        
        this.groupCamera.add(this.instance)

        this.experience.debug.ui.add(this.instance.position, "x").min(-200).max(200).step(1).name('camera x')
        this.experience.debug.ui.add(this.instance.position, "y").min(-200).max(200).step(1).name('camera y')
        this.experience.debug.ui.add(this.instance.position, "z").min(-200).max(200).step(1).name('camera z')
        this.experience.debug.ui.add(this.instance.rotation, "x").min(-10).max(10).step(0.001).name('roation x')
        this.experience.debug.ui.add(this.instance.rotation, "y").min(-10).max(10).step(0.001).name('roation y')
        this.experience.debug.ui.add(this.instance.rotation, "z").min(-10).max(10).step(0.001).name('roation z')
    }
    setParallax()
    {
        window.addEventListener('mousemove', (e)=>{
            this.mousePosition.x = e.clientX / this.experience.renderer.sizes.width
            this.mousePosition.y = e.clientY / this.experience.renderer.sizes.height
        })
    }
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update()
    {
        if(this.mousePosition.x + 0.01 && this.mousePosition.y)
        {
            const parallaxX = this.mousePosition.x  * 10
            const parallaxY = - this.mousePosition.y * 10

            this.groupCamera.position.x += (parallaxX - this.groupCamera.position.x) * 1 * this.times.deltaTime
            this.groupCamera.position.y += (parallaxY - this.groupCamera.position.y) * 1 * this.times.deltaTime
        }
    }
}