import Experience from "./Experience"
import * as THREE from 'three'
import { Vector3 } from "three"

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        
        this.sizes = this.experience.sizes
        this.mobileDisplay = this.sizes.mobileDisplay  
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.times = this.experience.time
        
        this.isReady = false
        this.finalPosition = window.innerWidth > 800 ? new THREE.Vector3(0, 52, 92) : new Vector3(0, -7, 28)
        this.mousePosition = {}
        this.groupCamera = new THREE.Group()
        this.scene.add(this.groupCamera)
        
        this.scrollY = window.scrollY
        this.positionScrollCamera = 0

        this.setInstance()
        this.setParallax()
        this.scrollCamera()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 500)

        //initial position
        this.instance.position.set(0, 130, 350)
        this.instance.rotation.set(-0.432, 0, 0)
        
        this.groupCamera.add(this.instance)

        //set new fov is aspect ration is strange
        if (!this.mobileDisplay) {
            if(this.instance.aspect < 1.5 && this.instance.aspect > 1)
            {
                this.instance.fov = 100
            }
            else if(this.instance.aspect < 1){
                this.instance.fov = 110
            }
            else{
                this.instance.fov = 75
            }
        }
        else{
            this.instance.fov = 75
        }
        // this.experience.debug.ui.add(this.instance.position, "x").min(-200).max(200).step(1).name('camera x')
        // this.experience.debug.ui.add(this.instance.position, "y").min(-200).max(200).step(1).name('camera y')
        // this.experience.debug.ui.add(this.instance.position, "z").min(-200).max(200).step(1).name('camera z')
        // this.experience.debug.ui.add(this.instance.rotation, "x").min(-10).max(10).step(0.001).name('roation x')
        // this.experience.debug.ui.add(this.instance.rotation, "y").min(-10).max(10).step(0.001).name('roation y')
        // this.experience.debug.ui.add(this.instance.rotation, "z").min(-10).max(10).step(0.001).name('roation z')
    }

    setParallax()
    {
        window.addEventListener('mousemove', (e)=>{
            this.mousePosition.x = e.clientX / this.experience.renderer.sizes.width
            this.mousePosition.y = e.clientY / this.experience.renderer.sizes.height
        })
    }

    scrollCamera()
    {
        window.addEventListener('scroll', () =>
        {
            if (this.positionScrollCamera <= 150) {
                this.scrollY = window.scrollY
            }
        })
    }

    resize()
    {
        this.mobileDisplay = window.innerWidth < 800 ? true : false
        this.finalPosition = window.innerWidth > 800 ? new THREE.Vector3(0, 52, 92) : new Vector3(0, -7, 28)
        this.instance.position.y = this.finalPosition.y
        this.instance.aspect = this.sizes.width / this.sizes.height
        
        //set new fov is aspect ration is strange
        if (!this.mobileDisplay) {
            if(this.instance.aspect < 1.5 && this.instance.aspect > 1)
            {
                this.instance.fov = 100
            }
            else if(this.instance.aspect < 1){
                this.instance.fov = 110
            }
            else{
                this.instance.fov = 75
            }
        }
        else{
            this.instance.fov = 75
        }
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if(this.mobileDisplay && this.instance.position.y === this.finalPosition.y || this.isReadyMobile && this.mobileDisplay)
        {
            this.positionScrollCamera = Math.min(this.scrollY / 10, 150)
            
            //update when camera is ready
            this.isReadyMobile = true
            this.instance.position.y = this.finalPosition.y - this.positionScrollCamera
            this.instance.position.z = this.finalPosition.z + this.positionScrollCamera
        }
        else if(!this.mobileDisplay && this.instance.position.y === this.finalPosition.y){
            this.instance.position.y = this.finalPosition.y
            this.instance.position.z = this.finalPosition.z
        }
        
        if(this.mousePosition.x + 0.01 && this.mousePosition.y && !this.mobileDisplay)
        {
            const parallaxX = this.mousePosition.x  * 10
            const parallaxY = - this.mousePosition.y * 10

            this.groupCamera.position.x += (parallaxX - this.groupCamera.position.x) * 1 * this.times.deltaTime
            this.groupCamera.position.y += ((parallaxY - this.groupCamera.position.y) * 1 * this.times.deltaTime)
        }
    }
}