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
        this.mobileDisplay = this.experience.mobileDisplay

        this.parameter = {}
        this.parameter.count = 50
        this.parameter.cloud = this.experience.ressources.items.cloudTexture
        this.parameter.cloud2 = this.experience.ressources.items.cloudTexture2
        this.parameter.flashPosition = new Vector3(60, 3, -10)

        this.mobilePosition = new Vector3(0)
        this.clouds = []
        this.lights = []
        this.flashLight = null

        this.generateCloud()
        this.generateLight()
        this.resize()
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
        this.lights.push(ambientLight)
        this.scene.add(ambientLight)

        const redLight = new THREE.PointLight("#d92b0d", 6, 3000 , 10.6);
        redLight.position.set(55, -3, 11.9);
        this.lights.push(redLight)
        this.scene.add(redLight);

        this.flashLight = new THREE.PointLight("#ffffff", 300, 1000, 4);
        this.flashLight.position.set(this.parameter.flashPosition.x, this.parameter.flashPosition.y, this.parameter.flashPosition.z);
        this.lights.push(this.flashLight)
        this.scene.add(this.flashLight)
        
        const blueLight = new THREE.PointLight("#2049c5", 1.7, 4500, 1.7);
        blueLight.position.set(70, 2, 55);
        this.lights.push(blueLight)
        this.scene.add(blueLight);
    }

    resize()
    {
        this.mobileDisplay = window.innerWidth < 800 ? true : false
        if(this.mobileDisplay && this.mobilePosition.x >= 0)
        {
            console.log("goMobile");
            //add value for each clouds and lights in position for displayed it on column
            this.mobilePosition = new Vector3(-105, -90, 45)
            this.clouds.forEach(cloud => {
                cloud.position.x += this.mobilePosition.x
                cloud.position.y += this.mobilePosition.y
                cloud.position.z += this.mobilePosition.z
            });
            this.lights.forEach(light => {
                light.position.x += this.mobilePosition.x
                light.position.y += this.mobilePosition.y
                light.position.z += this.mobilePosition.z
            })
            this.parameter.flashPosition.x += this.mobilePosition.x
            this.parameter.flashPosition.y += this.mobilePosition.y
        }
        else if(!this.mobileDisplay && this.mobilePosition.x < 0)
        {
            console.log("godesktop");
            //add value for each clouds and lights in position for displayed it on row
            this.mobilePosition = new Vector3(105, 90, -45)

            this.clouds.forEach(cloud => {
                cloud.position.x += this.mobilePosition.x
                cloud.position.y += this.mobilePosition.y
                cloud.position.z += this.mobilePosition.z
            });
            this.lights.forEach(light => {
                light.position.x += this.mobilePosition.x
                light.position.y += this.mobilePosition.y
                light.position.z += this.mobilePosition.z
            })
            this.parameter.flashPosition.x += this.mobilePosition.x
            this.parameter.flashPosition.y += this.mobilePosition.y
            this.parameter.flashPosition.z += this.mobilePosition.z
        }
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