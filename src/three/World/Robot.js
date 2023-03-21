import * as THREE from 'three'
import * as TWEEN from 'tween'
import Experience from '../Experience'

export default class Robot 
{
    constructor ()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug.ui
        this.mobileDisplay = this.experience.mobileDisplay
        if(!this.mobileDisplay)
        {
            this.addToScene()
            this.setAnimation()
        }
    }

    addToScene()
    {
        const texture = this.ressources.items.robotTexture
        texture.flipY = false
        const material = new THREE.MeshBasicMaterial({ map: texture, fog: false})

        this.robotRessource = this.ressources.items.robot
        this.robot = this.robotRessource.scene

        
        this.robot.traverse((child) =>
        {
            child.material = material
        })

        this.robot.scale.set(3, 3, 3)     
        //for initial pos
        this.robot.position.set(-6, 36, 80) 

        this.robot.rotation.y = -2.3
        
        this.debug.add(this.robot.position, 'x').min(-100).max(100).step(0.01).name('pos x')
        this.debug.add(this.robot.position, 'y').min(-100).max(100).step(0.01).name('pos y')
        this.debug.add(this.robot.position, 'z').min(-100).max(100).step(0.01).name('pos z') 
        
        this.debug.add(this.robot.rotation, 'x').min(-10).max(10).step(0.01).name('rot x')
        this.debug.add(this.robot.rotation, 'y').min(-10).max(10).step(0.01).name('rot y')
        this.debug.add(this.robot.rotation, 'z').min(-10).max(10).step(0.01).name('rot z')

        this.scene.add(this.robot)
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.action = {}
        this.animation.mixer = new THREE.AnimationMixer(this.robot)
        
        //Storage all animations
        this.animation.action.hey = this.animation.mixer.clipAction(this.robotRessource.animations[2])
        this.animation.action.beforeSwim = this.animation.mixer.clipAction(this.robotRessource.animations[0])
        this.animation.action.swim = this.animation.mixer.clipAction(this.robotRessource.animations[3])
        this.animation.action.cloud = this.animation.mixer.clipAction(this.robotRessource.animations[1])
        
        //Set a function to switch between both animations 
        this.animation.play = (name, smooth)=>{
            const newAction = this.animation.action[name]
            const oldAction = this.animation.action.current

            newAction.reset()
            newAction.play()
            if(smooth){
                newAction.crossFadeFrom(oldAction, 1)
            }else{
                newAction.crossFadeFrom(oldAction, 0.1)
            }
                        
            this.animation.action.current = newAction
        }
        
        this.ressources.on("goForward", ()=>{
            this.animation.action.current = this.animation.action.hey
            this.animation.action.current.setLoop(THREE.LoopOnce)
            
            window.setTimeout(()=>{
                    //Le robot commence par saluer
                    this.animation.action.current.play()
                }, 2000)
                window.setTimeout(()=>{
                    //Se preparer a nager
                    this.animation.play("beforeSwim", true)
                    this.animation.action.current.setLoop(THREE.LoopOnce)
                    this.animation.action.current.clampWhenFinished = true
            }, 5000)
            window.setTimeout(()=>{
                //Il commence ensuite à nager jusqu'au nuages
                this.animation.play("swim", false)
                this.animation.action.current.clampWhenFinished = false
                this.animation.action.current.setLoop(THREE.LoopRepeat)
                
                const finalRobotRotation = new THREE.Vector3(0.2, -3, 0)
                new TWEEN.Tween(this.robot.rotation)
                .to(finalRobotRotation, 5000).easing(TWEEN.Easing.Quadratic.Out)
                .start()
                
                //Robot travel to cloud
                const robotFinalPosition = new THREE.Vector3(102, -8, 0)
                
                new TWEEN.Tween(this.robot.position)
                .to(robotFinalPosition, 10000).easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onComplete(()=>{
                    this.animation.action.current.setDuration(5000)
                        this.animation.play("cloud", true)
                })
            }, 7700)
        })
    }
    update()
    {
        if(!this.mobileDisplay)
        {
            this.animation.mixer.update(this.time.deltaTime * 0.5)
        }
    }
}