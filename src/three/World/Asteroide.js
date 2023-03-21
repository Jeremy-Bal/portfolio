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
        this.mobileDisplay = this.experience.mobileDisplay
        
        this.mobilePosition = new Vector3(0)

        this.instanceWhiteAsteroid = null
        this.instanceOrangeAsteroid = null

        this.addToScene()
        this.resize()
    }
    addToScene()
    {
        this.model = this.ressources.items.asteroid_GO.scene
        const whiteMaterial = new THREE.MeshBasicMaterial({
            map: this.ressources.items.Lunar_Target
        })
        const orangeMaterial = new THREE.MeshBasicMaterial({
            map: this.ressources.items.orangeMoon
        })
        
        this.asteroideMesh = null
        this.model.traverse((child)=>{
            if(child instanceof THREE.Mesh)
            {
                this.asteroideMesh = child
            }
        })

        const asteroidCount = 500
        this.instanceWhiteAsteroid = new THREE.InstancedMesh(this.asteroideMesh.geometry, whiteMaterial, asteroidCount * 1.5)
        this.instanceWhiteAsteroid.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
        this.instanceOrangeAsteroid = new THREE.InstancedMesh(this.asteroideMesh.geometry, orangeMaterial, asteroidCount / 4)
        this.instanceOrangeAsteroid.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

        for (let i = 0; i < asteroidCount; i++) {
            const random = (Math.random() - 0.5) * 100
            const randomY = (Math.random() - 0.5) * 20
            const randomRot = Math.random() / 3
            const randomScale = (Math.random() + 0.2, 1) * Math.random()

            const matrix = new THREE.Matrix4()
            matrix.compose(
                new THREE.Vector3(
                    (Math.sin(random) * 50) + (Math.random() - 0.5) * 20,
                    randomY,
                    (Math.cos(random) * 30) + (Math.random() - 0.5) * 20
                ),
                new THREE.Quaternion(randomRot, randomRot, randomRot),
                new THREE.Vector3(randomScale, randomScale, randomScale)
            )
            this.instanceWhiteAsteroid.setMatrixAt(i, matrix)
            this.instanceOrangeAsteroid.setMatrixAt(i, matrix)
        }
        if(this.mobileDisplay)
        {
            this.instanceWhiteAsteroid.position.set(0, -200, 130)
            this.instanceOrangeAsteroid.position.set(0, -200, 130)
        }else{
            this.instanceWhiteAsteroid.position.set(-140, 0, 4.5)
            this.instanceOrangeAsteroid.position.set(-140, 0, 4.5)
        }
        this.scene.add(this.instanceWhiteAsteroid, this.instanceOrangeAsteroid)
    }
    
    resize()
    {
        this.mobileDisplay = window.innerWidth < 800 ? true : false
        if(this.mobileDisplay && this.instanceWhiteAsteroid.position.x != 0)
        {
            //add value for each clouds and lights in position for displayed it on column
            this.instanceWhiteAsteroid.position.set(0, -200, 130)
            this.instanceOrangeAsteroid.position.set(0, -200, 130)
        }
        else if(!this.mobileDisplay && this.instanceWhiteAsteroid.position.x != -100)
        {
            //add value for each clouds and lights in position for displayed it on row
            this.instanceWhiteAsteroid.position.set(-100, 0, 4.5)
            this.instanceOrangeAsteroid.position.set(-100, 0, 4.5)
        }
    }

    update()
    {
        //Animation asteroid
        const angle = this.time.elapsed * 0.00002
        
        if(this.instanceWhiteAsteroid && this.instanceOrangeAsteroid)
        {
            this.instanceWhiteAsteroid.rotation.y = angle
            this.instanceOrangeAsteroid.rotation.y = angle * 1.5
        }
    }
}