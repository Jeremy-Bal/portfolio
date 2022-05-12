import * as THREE from "three"
import galaxyVertexShader from "../shaders/galaxy/vertex.glsl"
import galaxyFragmentShader from "../shaders/galaxy/fragment.glsl"
import cloudVertexShader from "../shaders/cloud/vertex.glsl"
import cloudFragmentShader from "../shaders/cloud/fragment.glsl"
import Experience from "../Experience"

export default class Galaxy
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.time = this.experience.time
        this.scene = this.experience.scene

        this.parameters = {}
        this.parameters.count = 400000
        this.parameters.cloudCount = 80000
        this.parameters.size = 0.010
        this.parameters.radius = 20
        this.parameters.branches = 4
        this.parameters.spin = 1
        this.parameters.randomness = 0.5
        this.parameters.randomnessPower = 3
        this.parameters.insideColor = '#ff6030'
        this.parameters.outsideColor = '#1b3984'
        this.parameters.outsideColorCloud = '#030e29'
        this.parameters.insideColorCloud = '#CB8CB1'
        
        this.geometry = null
        this.material = null
        this.points = null
        this.cloudMesh = null
       
        // gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
        // gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
        // gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
        // gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
        // gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
        // gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
        // gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

        this.generateGalaxy()
        this.generateCloud()
    }
    generateCloud()
    {
        this.cloudGeometry = new THREE.BufferGeometry()
        
        const positions = new Float32Array(this.parameters.cloudCount * 3)
        const scale = new Float32Array(this.parameters.cloudCount)

        const colors = new Float32Array(this.parameters.cloudCount * 3)
        const randomness = new Float32Array(this.parameters.cloudCount * 3)

        const insideColor = new THREE.Color(this.parameters.insideColorCloud)
        const outsideColor = new THREE.Color(this.parameters.outsideColorCloud)
        
        for(let i = 0; i < this.parameters.cloudCount; i++)
        {
            const i3 = i * 3
            
            let randomNumber = Math.random()
            randomNumber = Math.pow(randomNumber + Math.random() + 0.3, 0.8)
            const radius = randomNumber * this.parameters.radius

            const branchAngle = i * Math.random() * Math.PI * 2
            positions[i3    ] = Math.sin(branchAngle) * radius
            positions[i3 + 1] = -30 + (Math.random() - 0.5) * 1
            positions[i3 + 2] = Math.cos(branchAngle) * radius

            const cloneColor = insideColor.clone()
            const mixedColor = cloneColor.lerp(outsideColor, (radius / this.parameters.radius) * 0.7)
            colors[i3   ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            scale[i] = Math.random()
        }

        this.cloudGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        this.cloudGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
        this.cloudGeometry.setAttribute("scale", new THREE.BufferAttribute(scale, 1))
        this.cloudGeometry.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
        this.cloudGeometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))


        this.cloudMaterial = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: cloudVertexShader,
            fragmentShader: cloudFragmentShader,
            uniforms:
            {
                uTime : { value: this.experience.time.deltaTimeFrame},
                uTest : { value : new THREE.Vector3(120, 6, 1)}
            }
        })

        /*
         * Add random test value for shader
         */
        this.experience.debug.ui.add(this.cloudMaterial.uniforms.uTest.value, 'x').min(0).max(200).step(1).name('Test clooud value x')
        this.experience.debug.ui.add(this.cloudMaterial.uniforms.uTest.value, 'y').min(-10).max(10).step(0.0001).name('Test clooud value y')
        this.experience.debug.ui.add(this.cloudMaterial.uniforms.uTest.value, 'z').min(-10).max(10).step(0.0001).name('Test clooud value z')

        this.cloudMesh = new THREE.Points(this.cloudGeometry, this.cloudMaterial)
        //this.cloudMesh.scale.set(2, 2, 2)
        this.experience.scene.add(this.cloudMesh)
    }
    
    generateGalaxy()
    {
        if(this.points !== null)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.points)
        }
    
        /**
         * Geometry
         */
        this.geometry = new THREE.BufferGeometry()
    
        const positions = new Float32Array(this.parameters.count * 3)
        const colors = new Float32Array(this.parameters.count * 3)
        const scales = new Float32Array(this.parameters.count * 1)
        const randomness = new Float32Array(this.parameters.count * 3)
    
        const insideColor = new THREE.Color(this.parameters.insideColor)
        const outsideColor = new THREE.Color(this.parameters.outsideColor)
    
        for(let i = 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3
            
            // Position
            const radius = Math.random() * this.parameters.radius
    
            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2
            
            const randomX = Math.pow(Math.random() * 1, this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            const randomY = Math.pow(Math.random() * 1, this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            const randomZ = Math.pow(Math.random() * 1, this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
    
            positions[i3    ] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = -30
            positions[i3 + 2] = Math.sin(branchAngle) * radius
            
            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / 10)
    
            colors[i3    ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            //Scale
            scales[i] = Math.random()

            //randomness
            randomness[i3    ] = randomX
            randomness[i3 + 1] = randomY
            randomness[i3 + 2] = randomZ
        }
    
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        this.geometry.setAttribute('aScales', new THREE.BufferAttribute(scales, 1))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
    
        /**
         * Material
         */        
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader,
            uniforms:
            {
                uSize : { value: 100.0 * this.renderer.instance.getPixelRatio()},
                uTime : { value : this.experience.time.deltaTimeFrame },
            }
        })

        /**
         * Points
         */
        this.points = new THREE.Points(this.geometry, this.material)

        /*
         * GROUP
         */
        const groupPoint = new THREE.Group()
        groupPoint.add(this.points)
        
        const pivotGroup = new THREE.Group()
        pivotGroup.add(groupPoint)
        //pivotGroup.rotation.x = 1
        this.scene.add(pivotGroup)
    }
    
    update()
    {
        this.points.rotation.y = this.time.elapsed * 0.00005
        this.cloudMesh.rotation.y = this.time.elapsed * 0.00003
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}