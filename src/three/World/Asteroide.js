import Experience from "../Experience"
import * as THREE from "three"
import { Vector3 } from "three"

export default class Asteroide
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug.ui
        this.mobileDisplay = this.experience.mobileDisplay
        
        this.mobilePosition = new Vector3(0)
        this.group = new THREE.Group()

        this.addToScene()
        this.resize()
    }
    addToScene()
    {
        this.model = this.ressources.items.rockModele.scene

        this.ressources.items.rockColor.minFilter = THREE.NearestFilter;
        this.ressources.items.rockColor.magFilter = THREE.NearestFilter;

        const material = new THREE.MeshBasicMaterial({
            map: this.ressources.items.rockColor
        })
        material.map.flipY = false
        
        this.asteroideMesh = null

        this.model.traverse((child)=>{
            if(child instanceof THREE.Mesh)
            {
                this.asteroideMesh = child
            }
        })
        
        for (let i = 0; i < 10; i++) {
            const mesh = this.asteroideMesh.clone();
            mesh.material = material
            mesh.clonePosition = new THREE.Vector3(
                (-30 + (Math.random() - 0.5) * 100),
                ((Math.random() - 0.5) * 800),
                (Math.random() - 0.5) * 100
                )
            mesh.rotation.x = 3
            mesh.rotation.y = (Math.random() - 0.5) * 3
            mesh.rotation.z = (Math.random() - 0.5)

            const scale = Math.random() + 1
            mesh.scale.set(scale, scale, scale)
            this.group.add(mesh)
        }

        this.group.position.set(-100, 0, 4.5)
        
        this.scene.add(this.group)  
    }
    
    resize()
    {
        this.mobileDisplay = window.innerWidth < 800 ? true : false
        if(this.mobileDisplay && this.mobilePosition.x <= 0)
        {
            //add value for each clouds and lights in position for displayed it on column
            this.mobilePosition = new Vector3(120, -200, -100)
        }
        else if(!this.mobileDisplay && this.mobilePosition.x > 0)
        {
            //add value for each clouds and lights in position for displayed it on row
            this.mobilePosition = new Vector3(0)
        }
    }

    update()
    {
        //Animation asteroid
        const angle = this.time.elapsed * 0.00005
        this.group.traverse((mesh)=>{
            if(mesh instanceof THREE.Mesh)
            {
                mesh.position.x = (Math.sin(angle - mesh.clonePosition.x) * 40) - 10  + (this.mobilePosition.x)
                mesh.position.z = (Math.cos(angle - mesh.clonePosition.x) * 40) + mesh.clonePosition.z * 0.5 - (this.mobilePosition.z)
                mesh.position.y = (Math.cos(angle + mesh.clonePosition.y * 100) * 20) - 7 + (this.mobilePosition.y)
            }
        })
    }
}   