import * as THREE from 'three'
import { Vector3 } from 'three'
import Experience from '../Experience'

export default class Cloud
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.debug = this.experience.debug.ui

        this.parameter = {}
        this.parameter.count = 50
        this.parameter.cloud = this.experience.ressources.items.cloudTexture
        this.parameter.cloud2 = this.experience.ressources.items.cloudTexture2
        this.parameter.flashPosition = new Vector3(60, 3, -10)

        this.clouds = []

        this.flashLight = null

        this.generateCloud()
        this.generateLight()
    }
    generateCloud()
    {
        const material = new THREE.MeshLambertMaterial({
            map: this.parameter.cloud,
            transparent: true
        })
        const material2 = new THREE.MeshLambertMaterial({
            map: this.parameter.cloud2,
            transparent: true
        })

        const cloudGeometry = new THREE.PlaneBufferGeometry(50, 50)
        const cloud2Geometry = new THREE.PlaneBufferGeometry(30, 30)
        const cloud3Geometry = new THREE.PlaneBufferGeometry(20, 20)

        for(let i = 0; i < this.parameter.count; i++)
        {
            if(i < 3)
            {
                const cloudMesh = new THREE.Mesh(cloudGeometry, material)
                cloudMesh.material.opacity = 1;
                
                cloudMesh.rotation.x = -0.432;
                if(i === 0)
                {
                    // x: 60 now 120 SET LIGHT
                    cloudMesh.position.set(120, 5, -10)
                }
                if(i === 1)
                {
                    cloudMesh.position.set(123, 0, -10)
                }
                if(i === 2)
                {
                    cloudMesh.position.set(118, 0, -10)                    
                }
                //cloudMesh.rotation.y = -0.05;
                cloudMesh.rotation.z = Math.random() * 2 * Math.PI;

                this.clouds.push(cloudMesh)
                this.scene.add(cloudMesh)
            }
            else if(i > 2 && i < 35)
            {
                const cloudMesh = new THREE.Mesh(cloud2Geometry, material2)
                cloudMesh.material.opacity = Math.max(Math.random(), 0.8);
                
                let randomNumber = Math.random()
                randomNumber = Math.pow(randomNumber + Math.random() + 0.3, 0.8)
                const radius = randomNumber * 15
                const branchAngle = i * Math.random() * Math.PI * 2
                
                cloudMesh.rotation.x = -0.432;
                cloudMesh.position.x = 120 + Math.sin(branchAngle) * radius
                cloudMesh.position.y =  Math.cos(branchAngle) * radius
                cloudMesh.position.z = Math.random() * 0.5

                //cloudMesh.rotation.y = -0.05;
                cloudMesh.rotation.z = Math.random() * 2 * Math.PI;

                this.clouds.push(cloudMesh)
                this.scene.add(cloudMesh)
            }
            else if(i > 35)
            {
                const cloudMesh = new THREE.Mesh(cloud3Geometry, material)
                cloudMesh.material.opacity = Math.max(Math.random(), 0.5);
                
                let randomNumber = Math.random()
                randomNumber = Math.pow(randomNumber + Math.random() + 0.3, 0.8)
                const radius = randomNumber * 15
                const branchAngle = i * Math.random() * Math.PI * 2
                
                //60
                cloudMesh.rotation.x = -0.432;
                cloudMesh.position.x = 120 + Math.sin(branchAngle) * radius
                cloudMesh.position.y =  Math.cos(branchAngle) * radius
                cloudMesh.position.z = Math.max(Math.random(), 0.5);

                const randomnScale = Math.max(Math.random(), 0.5)

                cloudMesh.scale.set(randomnScale, randomnScale, randomnScale)

                cloudMesh.rotation.z = Math.random() * 2 * Math.PI;

                this.clouds.push(cloudMesh)
                this.scene.add(cloudMesh)
            }
        }
    }
    
    generateLight()
    {
        const ambientLight = new THREE.AmbientLight("#000000", 1.4)
        ambientLight.position.set(60, 2, 50)
        this.scene.add(ambientLight)
        
        const redLight = new THREE.PointLight("#d92b0d", 6, 3000 , 10.6);
        redLight.position.set(55, -3, 11.9);
        this.scene.add(redLight);
        
        this.flashLight = new THREE.PointLight("#ffffff", 300, 1000, 4);
        this.flashLight.position.set(this.parameter.flashPosition.x, this.parameter.flashPosition.y, this.parameter.flashPosition.z);
        this.scene.add(this.flashLight)
        
        const blueLight = new THREE.PointLight("#2049c5", 1.7, 4500, 1.7);
        blueLight.position.set(70, 2, 55);
        this.scene.add(blueLight);
        
        this.debug.add(blueLight.position, 'x').min(-50).max(50).step(0.0001).name('Test light x')
        this.debug.add(blueLight.position, 'y').min(0).max(50).step(0.0001).name('Test light y')
        this.debug.add(blueLight.position, 'z').min(-50).max(50).step(0.0001).name('Test light z')
    
        this.debug.add(redLight.position, 'x').min(-50).max(50).step(0.0001).name('redLight light x')
        this.debug.add(redLight.position, 'y').min(0).max(50).step(0.0001).name('redLight light y')
        this.debug.add(redLight.position, 'z').min(-50).max(50).step(0.0001).name('redLight light z')
        
        this.debug.add(this.flashLight, 'distance').min(0).max(100).step(0.0001).name('Test distance')
        this.debug.add(this.flashLight, 'decay').min(0).max(10).step(0.0001).name('Test deca')
        //this.debug.add(this.flashLight, 'power').min(0).max(100).step(0.0001).name('Test power')
        this.debug.add(this.flashLight, 'intensity').min(0).max(300).step(0.0001).name('Test intenrsity')
        this.debug.addColor(this.flashLight, 'color').onChange(()=>{
            this.flashLight.color.set(this.flashLight.color)
        }).name("this.flashLight")
        this.debug.addColor(redLight, 'color').onChange(()=>{
            redLight.color.set(redLight.color)
        }).name("firstLigth") 
        this.debug.addColor(blueLight, 'color').onChange(()=>{
            blueLight.color.set(blueLight.color)
        }).name("blueLight")
    }

    update()
    {
        const randomFlash = Math.random()
        if(randomFlash < 0.03)
        {
            this.flashLight.position.x = this.parameter.flashPosition.x + ((Math.random() - 0.5) * 50)
            this.flashLight.position.y = this.parameter.flashPosition.y + ((Math.random() - 0.5) * 50)
            
            this.flashLight.intensity = 200 * 10
            this.flashLight.distance = 40
        }
        else if(randomFlash > 0.03 && randomFlash < 0.05)
        {
            this.flashLight.position.x = this.parameter.flashPosition.x + ((Math.random() - 0.5) * 50)
            this.flashLight.position.y = this.parameter.flashPosition.y + ((Math.random() - 0.5) * 50)
            
            this.flashLight.intensity = 100 * 10
            this.flashLight.distance = 30
        }
        else{
            if(this.flashLight.intensity > 49)
            {
                setTimeout(()=>{
                    this.flashLight.intensity = 0 * 10
                }, 200)
            }
        }
        this.clouds.forEach(cloudParticle => {
            cloudParticle.rotation.z -= 0.0003
        });
    }
}