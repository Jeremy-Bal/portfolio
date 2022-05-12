import * as THREE from "three"
import Experience from "../Experience"
import * as TWEEN from 'tween'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

export default class TravelCamera
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug.ui
        this.fontLoader = new FontLoader()
        this.mouseClick = new THREE.Vector2(10, 10)
        this.mouseHover = new THREE.Vector2(10, 10)
        this.finalPosition = new THREE.Vector3(0, 52, 92)
        this.text1 = null
        this.text2 = null
        this.text3 = null
        this.previousObject = null
        this.alreadyClear = false
        this.isShow = false
        this.isAlreadyActive = false   
        this.cursorRounded = document.querySelector('.rounded');

        this.setTitle()
        this.addObjectToIntersect()
        this.addBackground()
        this.travelCamera()
        this.setCursor()

        this.ressources.on("goForward", ()=>{
            this.travelCameraOnIntroducing()
        })
    }
    travelCameraOnIntroducing()
    {
        //init position
        setTimeout(()=>{
            new TWEEN.Tween(this.experience.camera.instance.position)
            .to(this.finalPosition, 1500)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(()=>{})
        }, 500)
    }
    setCursor()
    {
        const moveCursor = (e)=> {
            const mouseY = e.clientY;
            const mouseX = e.clientX;
            this.mouseHover.x = e.clientX / this.experience.renderer.sizes.width * 2 - 1
            this.mouseHover.y = - (e.clientY / this.experience.renderer.sizes.height) * 2 + 1
            if(e.target.classList.contains('cursor')){
                this.cursorRounded.classList.add('cursor')
            }
            else if(this.cursorRounded.classList.contains('cursor')){
                this.cursorRounded.classList.remove('cursor')
            }
            this.cursorRounded.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 12}px, 0)`;
        }

        this.hoverRaycaster = new THREE.Raycaster()
        this.hoverIsAlreadyActive = false

        window.addEventListener('mousemove', moveCursor)
    }

    setTitle()
    {
        const text1Material = new THREE.MeshMatcapMaterial({
            matcap: this.ressources.items.matcap,
        })
        const text2Material = new THREE.MeshMatcapMaterial({
            matcap: this.ressources.items.matcap,
        })
        const text3Material = new THREE.MeshMatcapMaterial({
            matcap: this.ressources.items.matcap,
        })
        this.fontLoader.load("EquinoxBold_Regular.json", 
            (file) => {
                const geometryText1 = new TextGeometry("J'aIME LE PaTHE", {
                    font: file,
                    size: 5,
                    height: 0.05,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.002,
                    bevelOffset: 0.01,
                    bevelSegments: 5
                })
                this.text1 = new THREE.Mesh(geometryText1, text1Material)
                this.text1.position.set(-10, -80, -20)
                this.text1.clonePosition = this.text1.position.clone()

                this.text1.rotation.x = -0.432;
                this.scene.add(this.text1)
            
                const geometryText2 = new TextGeometry("j'aime le frites", {
                    font: file,
                    size: 4.5,
                    height: 0.05,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.0002,
                    bevelOffset: 0.01,
                    bevelSegments: 5
                })

                this.text2 = new THREE.Mesh(geometryText2, text2Material)
                this.text2.rotation.x = -0.432;
                this.text2.position.set(-130, 30, -20)
                this.text2.clonePosition = this.text2.position.clone()

                this.scene.add(this.text2)
                
                const geometryText3 = new TextGeometry("CONTaCT", {
                    font: file,
                    size: 4.5,
                    height: 0.05,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.002,
                    bevelOffset: 0.01,
                    bevelSegments: 5
                })
                
                this.text3 = new THREE.Mesh(geometryText3, text3Material)
                this.text3.rotation.x = -0.432;
                this.text3.position.set(90, 30, -20)
                this.text3.clonePosition = this.text3.position.clone()

                this.scene.add(this.text3)
            }
        )

    }

    addObjectToIntersect()
    {
        const asteroidCibleGeometry = new THREE.PlaneGeometry(100, 100)
        const galaxyCibleGeometry = new THREE.PlaneGeometry(50, 80)
        const cloudCibleGeometry = new THREE.PlaneGeometry(70, 70)

        const material = new THREE.MeshBasicMaterial({
            color: "red",
            transparent: false,
        })

        this.asteroidCible = new THREE.Mesh(asteroidCibleGeometry, material)
        this.galaxyCible = new THREE.Mesh(galaxyCibleGeometry, material)
        this.cloudCible = new THREE.Mesh(cloudCibleGeometry, material)

        this.asteroidCible.visible = false
        this.galaxyCible.visible = false
        this.cloudCible.visible = false
        
        this.asteroidCible.name = "asteroidCible"
        this.galaxyCible.name = "galaxyCible"
        this.cloudCible.name = "cloudCible"

        this.asteroidCible.position.set(-112, 0, 0)
        this.galaxyCible.position.set(0, -10, 0)
        this.cloudCible.position.set(117, 0, -10)
        this.backgroundPosition = new THREE.Vector3(-41, 0, -85)
        
        this.scene.add(this.asteroidCible, this.galaxyCible, this.cloudCible)
    }

    travelCamera()
    {
        window.addEventListener("click", (e)=>{
            this.mouseClick.x = e.clientX / this.experience.renderer.sizes.width * 2 - 1
            this.mouseClick.y = - (e.clientY / this.experience.renderer.sizes.height) * 2 + 1
        })
        
        this.raycaster = new THREE.Raycaster()
        this.objectsToIntersets = [this.asteroidCible, this.galaxyCible, this.cloudCible]
        
        //Go back camera
        const goBack = document.querySelector('.back')
        goBack.addEventListener('click', (e)=>{
            e.stopPropagation()
            this.isShow = false

            //remove text menu
            this.text1.visible = true
            this.text2.visible = true
            this.text3.visible = true

            //Clear DOM
            document.querySelector('.homeOverlay').classList.remove("none")
            document.querySelector('.back').classList.add("remove")
            setTimeout(()=>{
                document.querySelector('.homeOverlay').classList.remove("remove")
            }, 300)
            window.document.querySelector('.showPage').classList.remove("showPage")
            
            
            //Camera position to initial
            const tweenRevert = new TWEEN.Tween(this.experience.camera.instance.position)
            tweenRevert.to(this.finalPosition, 1500)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(()=>{
                this.isAlreadyActive = false
                const articles = document.querySelectorAll('.article')
                for (let i = 0; i < articles.length; i++) {
                    const e = articles[i];
                    e.classList.remove('show')
                }
            })
        })
    }
    addBackground()
    {
        const planeMilkyWay = new THREE.PlaneGeometry(600, 600/2.7245053272)
        const materialMilkyWay = new THREE.MeshBasicMaterial({
            map: this.ressources.items.milkyWay,
            transparent: true
        })

        this.milkyWayMesh = new THREE.Mesh(planeMilkyWay, materialMilkyWay)
        this.milkyWayMesh.scale.set(0.8, 0.8, 0.8)
        //this.milkyWayMesh.material.opacity = 0.7;
        
        this.milkyWayMesh.position.set(
            this.backgroundPosition.x,
            this.backgroundPosition.y,
            this.backgroundPosition.z
        )
        
        this.scene.add(this.milkyWayMesh)
        // this.debug.add(plane.position, 'x').min(-150).max(0).step(0.01).name('x')
        // this.debug.add(plane.position, 'y').min(-50).max(0).step(0.01).name('y')
        // this.debug.add(plane.position, 'z').min(-50).max(0).step(0.01).name('z')  
    }
    fadeColorTitle(mesh, clearMesh, clearMesh2)
    {
        if(mesh){
            //Add new color
            let alpha = {x: 1, y:0}
            let reverseAlpha = {x: 1, y:0}

            const tween = new TWEEN.Tween(alpha)
            tween.to({x: 0}, 150).easing(TWEEN.Easing.Exponential.InOut).start()
            tween.onUpdate(()=>{
                mesh.material.color.lerpColors(new THREE.Color('#686DCD'), new THREE.Color("#ffffff"), alpha.x)
            })
            tween.onComplete(()=>{
                this.previousObject = mesh
            })
            
            //Move forward title
            const tweenForward = new TWEEN.Tween(mesh.position)
            tweenForward.to({z: -15}, 300).easing(TWEEN.Easing.Exponential.InOut).start()
            
            const tweenScale = new TWEEN.Tween(mesh.scale)
            tweenScale.to({x: 1.5, y: 1.5, z: 1.5}, 300).easing(TWEEN.Easing.Exponential.InOut).start()

            //Clear all other objects (due to a bug if you switch between objects to fast)
            const reverseTween = new TWEEN.Tween(reverseAlpha)
            reverseTween.to({x: 1}, 150).easing(TWEEN.Easing.Exponential.InOut).start()
            reverseTween.onUpdate(()=>{
                clearMesh.material.color.lerpColors(new THREE.Color('#686DCD'), new THREE.Color("#ffffff"), reverseAlpha.x)
                clearMesh2.material.color.lerpColors(new THREE.Color('#686DCD'), new THREE.Color("#ffffff"), reverseAlpha.x)
            })
            reverseTween.onComplete(()=>{})
            const tweenBackward = new TWEEN.Tween(clearMesh.position, clearMesh2.position)
            tweenBackward.to({z: -20}, 300).easing(TWEEN.Easing.Exponential.InOut).start()

            const tweenScaleRevert = new TWEEN.Tween(clearMesh.scale, clearMesh2.scale)
            tweenScaleRevert.to({x: 1, y: 1, z: 1}, 300).easing(TWEEN.Easing.Exponential.InOut).start()
        }
        else if(!mesh && this.previousObject && !this.alreadyClear)
        {
            //Clear color by default
            let reverseAlpha = {x: 0, y:0}

            this.alreadyClear = true
            const reverseTween = new TWEEN.Tween(reverseAlpha)
            reverseTween.to({x: 1}, 150).easing(TWEEN.Easing.Exponential.InOut).start()
            reverseTween.onUpdate(()=>{
                this.previousObject.material.color.lerpColors(new THREE.Color('#686DCD'), new THREE.Color("#ffffff"), reverseAlpha.x)
            })
            reverseTween.onComplete(()=>{
                this.previousObject = null
                this.alreadyClear = false
            })
            const tweenBackward = new TWEEN.Tween(this.previousObject.position)
            tweenBackward.to({z: -20}, 300).easing(TWEEN.Easing.Exponential.InOut).start()

            const tweenScaleRevert = new TWEEN.Tween(this.previousObject.scale)
            tweenScaleRevert.to({x: 1, y: 1, z: 1}, 300).easing(TWEEN.Easing.Exponential.InOut).start()
        }
    }
    setAnimationWhenPageDisplayed(e, t)
    {
        setTimeout(()=>{
            e.classList.add('show')
        }, t)
    }
    update()
    {   
        //SMOOTH ANIMATION FOR TITLES
        if(this.text1 && this.text2 && this.text3)
        {
            const t = this.time.elapsed * 0.000005
        
            this.text1.position.y = (Math.cos(this.text1.clonePosition.y + t * 100) * 2) + -10
            this.text2.position.y = (Math.sin(this.text2.clonePosition.y + t * 100) * 2) + 20
            this.text3.position.y = (Math.sin(this.text3.clonePosition.y + t * 100) * 2) + 20
        }
        //RAYCASTER
        this.raycaster.setFromCamera(this.mouseClick, this.experience.camera.instance)
        this.hoverRaycaster.setFromCamera(this.mouseHover, this.experience.camera.instance)

        const intersect = this.raycaster.intersectObjects(this.objectsToIntersets)
        const hoverIntersect = this.hoverRaycaster.intersectObjects(this.objectsToIntersets)
        
        //Intercept on hover
        for (let i = 0; i < hoverIntersect.length; i++) 
        {
            if(!this.hoverIsAlreadyActive && this.text3)
            {
                this.hoverIsAlreadyActive = true
                if(!this.isShow)
                {
                    this.cursorRounded.classList.add('cursorMenu')
                }

                switch (hoverIntersect[i].object.name) {
                    case "asteroidCible":
                        this.fadeColorTitle(this.text2, this.text1, this.text3)
                    break;
                        
                    case "galaxyCible":
                        this.fadeColorTitle(this.text1, this.text2, this.text3)
                    break;   
                    
                    case "cloudCible":
                        this.fadeColorTitle(this.text3, this.text1, this.text2)
                    break
                    
                    default:
                    break;
                }
            }
        }

        //Nothing to intercept
        if(hoverIntersect.length === 0 && this.text3)
        {
            this.hoverIsAlreadyActive = false

            this.fadeColorTitle(null)
            if(this.cursorRounded.classList.contains('cursorMenu'))
            {
                this.cursorRounded.classList.remove('cursorMenu')
            }
        }   
        
        //Intercept on click
        for (let i = 0; i < intersect.length; i++) {
            if(!this.isAlreadyActive)
            {
                this.isShow = true
                this.isAlreadyActive = true

                document.querySelector('.homeOverlay').classList.add("remove")
                setTimeout(()=>{
                    document.querySelector('.homeOverlay').classList.add("none")
                }, 300)

                const posCible = intersect[i].object.position.clone()
                posCible.z += 30

                let domPage = null
                
                switch (intersect[i].object.name) {
                    case "asteroidCible":
                        posCible.x -= 30
                        posCible.y += 15
                        domPage = window.document.querySelector(".asteroid")
                    break;

                    case "galaxyCible":
                        posCible.y += 1
                        posCible.x += 10
                        domPage = window.document.querySelector(".galaxy")
                    break;   
                        
                    case "cloudCible":
                        posCible.x -= 20
                        posCible.y += 15
                        posCible.z += 5
                        domPage = window.document.querySelector(".cloud")
                    break

                    default:
                    break;
                }
                //Hide text menu
                this.text1.visible = false
                this.text2.visible = false
                this.text3.visible = false

                //Travel camera
                const tween = new TWEEN.Tween(this.experience.camera.instance.position)
                tween.to(posCible, 1500).easing(TWEEN.Easing.Exponential.InOut).start().onComplete(()=>{
                    this.mouseClick.x = NaN
                    this.mouseClick.y = NaN
                    
                    domPage.classList.add("showPage")
                    document.querySelector('.back').classList.remove("remove")
                    
                    //Animation when page displayed
                    const allArticle = document.querySelectorAll('.showPage .article')
                    var t = 1500
                    for (let i = 0; i < allArticle.length; i++) {
                        const e = allArticle[i];
                        this.setAnimationWhenPageDisplayed(e, t)
                       
                        t += 300
                    }
                })
            }
        }
    
        TWEEN.update();
    }
}