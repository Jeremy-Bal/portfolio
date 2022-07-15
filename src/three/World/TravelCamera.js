import * as THREE from "three"
import Experience from "../Experience"
import * as TWEEN from 'tween'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { Vector3 } from "three"

export default class TravelCamera
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.mobileDisplay = this.experience.mobileDisplay
        this.time = this.experience.time
        this.debug = this.experience.debug.ui
        this.fontLoader = new FontLoader()

        this.mouseClick = new THREE.Vector2(10000, 10000)
        this.mouseHover = new THREE.Vector2(10000, 10000)

        //cibles positions for travel camera on click
        this.posCibleAsteroid = null
        this.posCibleCloud= null
        this.posCibleGalaxy = null

        this.text1 = null
        this.text2 = null
        this.text3 = null

        this.previousObject = null
        this.alreadyClear = false
        this.isShow = false
        this.isAlreadyActive = false   
        this.isActiveMenu = false
        this.cursorRounded = document.querySelector('.rounded');

        //responsive 
        this.finalPositionIntroducing = new Vector3()

        this.setTitle()
        this.addObjectToIntersect()
        this.addBackground()
        this.travelCamera()
        this.setCursor()
        this.menu()

        this.ressources.on("goForward", ()=>{
            this.travelCameraOnIntroducing()
        })
    }
    menu()
    {
        const menu = document.querySelector(".menu")
        menu.addEventListener('click', (e)=>{
            console.log(this.isActiveMenu);
            if(!this.isActiveMenu)
            {
                this.isActiveMenu = true
                const data = e.target.dataset.cible
                switch (data) {
                    case "cloud":
                        //Clear DOM
                        document.querySelector('.visited').classList.remove('visited')
                        document.querySelector('.menuCloud p').classList.add("visited")
                        this.articles = document.querySelectorAll('.article')
                            for (let i = 0; i < this.articles.length; i++) {
                                const e = this.articles[i];
                                e.classList.remove('show')
                            }
    
                        window.document.querySelector('.showPage').classList.remove("showPage")
    
                        //Travel camera
                        new TWEEN.Tween(this.experience.camera.instance.position)
                        .to(this.posCibleCloud, 1500).easing(TWEEN.Easing.Exponential.InOut)
                        .start()
                        .onComplete(()=>{
                            this.mouseClick.x = NaN
                            this.mouseClick.y = NaN
                            
                            window.document.querySelector(".cloud").classList.add("showPage")
                            this.isActiveMenu = false
                            document.querySelector('.menu').classList.remove("remove")
                            
                            //Animation when page displayed
                            const allArticle = document.querySelectorAll('.showPage .article')
                            var t = 1500
                            for (let i = 0; i < allArticle.length; i++) {
                                const e = allArticle[i];
                                this.setAnimationWhenPageDisplayed(e, t)
                            
                                t += 300
                            }
                        })
    
                    break;
                    case "galaxy":
                          //Clear DOM
                          document.querySelector('.visited').classList.remove('visited')
                          document.querySelector('.menuGalaxy p').classList.add("visited")
                          this.articles = document.querySelectorAll('.article')
                            for (let i = 0; i < this.articles.length; i++) {
                                const e = this.articles[i];
                                e.classList.remove('show')
                            }
      
                          setTimeout(()=>{
                              document.querySelector('.homeOverlay').classList.remove("remove")
                          }, 300)
                          window.document.querySelector('.showPage').classList.remove("showPage")
      
                          //Travel camera
                          new TWEEN.Tween(this.experience.camera.instance.position)
                          .to(this.posCibleGalaxy, 1500).easing(TWEEN.Easing.Exponential.InOut)
                          .start()
                          .onComplete(()=>{
                              this.mouseClick.x = NaN
                              this.mouseClick.y = NaN
                              
                              window.document.querySelector(".galaxy").classList.add("showPage")
                              this.isActiveMenu = false
                              document.querySelector('.menu').classList.remove("remove")
                              
                              //Animation when page displayed
                              const allArticle = document.querySelectorAll('.showPage .article')
                              var t = 1500
                              for (let i = 0; i < allArticle.length; i++) {
                                  const e = allArticle[i];
                                  this.setAnimationWhenPageDisplayed(e, t)
                              
                                  t += 300
                              }
                          })
                    break;
                    case "asteroid":
                          //Clear DOM
                          document.querySelector('.visited').classList.remove('visited')
                          document.querySelector('.menuAsteroid p').classList.add("visited")
                          this.articles = document.querySelectorAll('.article')
                            for (let i = 0; i < this.articles.length; i++) {
                                const e = this.articles[i];
                                e.classList.remove('show')
                            }
      
                          setTimeout(()=>{
                              document.querySelector('.homeOverlay').classList.remove("remove")
                          }, 300)
                          window.document.querySelector('.showPage').classList.remove("showPage")
      
                          //Travel camera
                          new TWEEN.Tween(this.experience.camera.instance.position)
                          .to(this.posCibleAsteroid, 1500).easing(TWEEN.Easing.Exponential.InOut)
                          .start()
                          .onComplete(()=>{
                              this.mouseClick.x = NaN
                              this.mouseClick.y = NaN
                              
                              window.document.querySelector(".asteroid").classList.add("showPage")
                              this.isActiveMenu = false
                              document.querySelector('.menu').classList.remove("remove")
                              
                              //Animation when page displayed
                              const allArticle = document.querySelectorAll('.showPage .article')
                              var t = 1500
                              for (let i = 0; i < allArticle.length; i++) {
                                  const e = allArticle[i];
                                  this.setAnimationWhenPageDisplayed(e, t)
                              
                                  t += 300
                              }
                          })
                    break;
                    default:
                        break;
                }
            }
        })
    }
    travelCameraOnIntroducing()
    {
        console.log(this.finalPositionIntroducing);
        //init position
        setTimeout(()=>{
            new TWEEN.Tween(this.experience.camera.instance.position)
            .to(this.finalPositionIntroducing, 1500)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(()=>{
                this.experience.camera.instance.far = 250
                window.scroll(0, 0)
            })
        }, 500)
    }
    setCursor()
    {
        const moveCursor = (e)=> {
            this.mouseHover.x = e.clientX / this.experience.renderer.sizes.width * 2 - 1
            this.mouseHover.y = - (e.clientY / this.experience.renderer.sizes.height) * 2 + 1
            if(e.target.classList.contains('cursor')){
                this.cursorRounded.classList.add('cursor')
            }
            else if(this.cursorRounded.classList.contains('cursor')){
                this.cursorRounded.classList.remove('cursor')
            }
            this.cursorRounded.style.transform = `
                translate3d(calc(${e.clientX}px + 7px - 50%),
                calc(${e.clientY}px + 6px - 50%),
                0)`;
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
                const geometryText1 = new TextGeometry("viva la frita", {
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
                
                const geometryText2 = new TextGeometry("BaGUETTE", {
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

                this.resize()
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
        
        //*Cible is the target for raycaster
        if(this.mobileDisplay)
        {
            this.asteroidCible.position.set(0, -200, 70)
            this.galaxyCible.position.set(0, -10, 0)
            this.cloudCible.position.set(0, -120, -13)
        }else{
            this.asteroidCible.position.set(-112, 0, 0)
            this.galaxyCible.position.set(0, -10, 0)
            this.cloudCible.position.set(117, 0, -10)
        }
        //postion cible is the final postion when you click on an target 
        this.posCibleAsteroid = this.asteroidCible.position.clone()
        this.posCibleCloud = this.cloudCible.position.clone()
        this.posCibleGalaxy = this.galaxyCible.position.clone()
        
        this.posCibleAsteroid.x -= 40
        this.posCibleAsteroid.y += 10
        this.posCibleAsteroid.z += 20

        this.posCibleCloud.x -= 20
        this.posCibleCloud.y += 15
        this.posCibleCloud.z += 28

        this.posCibleGalaxy.x += 10
        this.posCibleGalaxy.y += 1
        this.posCibleGalaxy.z += 20

        this.backgroundPosition = new THREE.Vector3(-41, 0, -85)
        
        this.scene.add(this.asteroidCible, this.galaxyCible, this.cloudCible)
    }

    travelCamera()
    {
        window.addEventListener("click", (e)=>{
            if(document.querySelector('.loadingScreen').classList.contains('remove'))
            {
                this.mouseClick.x = e.clientX / this.experience.renderer.sizes.width * 2 - 1
                this.mouseClick.y = - (e.clientY / this.experience.renderer.sizes.height) * 2 + 1
            }
        })
        
        this.raycaster = new THREE.Raycaster()
        this.objectsToIntersets = [this.asteroidCible, this.galaxyCible, this.cloudCible]
        
        //Go back camera
        const goBack = document.querySelector('.back')
        goBack.addEventListener('click', (e)=>{
            e.stopPropagation()
            console.log("click");
            if(!this.isActiveMenu)
            {
                this.isShow = false
    
                //remove text menu
                this.text1.visible = true
                this.text2.visible = true
                this.text3.visible = true
    
                //Clear DOM
                document.querySelector('.visited').classList.remove('visited')
                document.querySelector('.homeOverlay').classList.remove("none")
                document.querySelector('.menu').classList.add("remove")
                setTimeout(()=>{
                    document.querySelector('.homeOverlay').classList.remove("remove")
                }, 300)
                window.document.querySelector('.showPage').classList.remove("showPage")
                
                if(this.mobileDisplay)
                {
                    this.isAlreadyActive = false

                    document.querySelector('html').style.overflowY = 'visible'

                    const articles = document.querySelectorAll('.article')
                    for (let i = 0; i < articles.length; i++) {
                        const e = articles[i];
                        e.classList.remove('show')
                    }
                }
                else
                {
                    //Camera position to initial
                    const tweenRevert = new TWEEN.Tween(this.experience.camera.instance.position)
                    tweenRevert.to(this.finalPositionIntroducing, 1500)
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
                }
            }
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
        if(mesh && !this.mobileDisplay){
            //Add new color
            let alpha = {x: 1, y:0}
            let reverseAlpha = {x: 1, y:0}

            const tween = new TWEEN.Tween(alpha)
            tween.to({x: 0}, 150).easing(TWEEN.Easing.Exponential.InOut).start()
            tween.onUpdate(()=>{
                mesh.material.color.lerpColors(new THREE.Color('#FF6F61'), new THREE.Color("#ffffff"), alpha.x)
            })
            tween.onComplete(()=>{
                this.previousObject = mesh
            })
            
            //Move forward title
            const tweenForward = new TWEEN.Tween(mesh.position)
            tweenForward.to({z: -18}, 300).easing(TWEEN.Easing.Exponential.InOut).start()
            const tweenScale = new TWEEN.Tween(mesh.scale)
            tweenScale.to({x: 1.2, y: 1.2, z: 1.2}, 300).easing(TWEEN.Easing.Exponential.InOut).start()

            //Clear all other objects (due to a bug if you switch between objects to fast)
            const reverseTween = new TWEEN.Tween(reverseAlpha)
            reverseTween.to({x: 1}, 150).easing(TWEEN.Easing.Exponential.InOut).start()
            reverseTween.onUpdate(()=>{
                clearMesh.material.color.lerpColors(new THREE.Color('#FF6F61'), new THREE.Color("#ffffff"), reverseAlpha.x)
                clearMesh2.material.color.lerpColors(new THREE.Color('#FF6F61'), new THREE.Color("#ffffff"), reverseAlpha.x)
            })
            reverseTween.onComplete(()=>{})
            const tweenBackward = new TWEEN.Tween(clearMesh.position, clearMesh2.position)
            tweenBackward.to({z: -20}, 300).easing(TWEEN.Easing.Exponential.InOut).start()

            const tweenScaleRevert = new TWEEN.Tween(clearMesh.scale, clearMesh2.scale)
            tweenScaleRevert.to({x: 1, y: 1, z: 1}, 300).easing(TWEEN.Easing.Exponential.InOut).start()
        }
        else if(!mesh && this.previousObject && !this.alreadyClear && !this.mobileDisplay)
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

    resize()
    {
        //hide page if showed when you switch between desktop to mobile
        if(this.isShow)
        {
            document.querySelector('.back').click()
        }
        
        this.mobileDisplay = window.innerWidth < 800 ? true : false
        if(this.mobileDisplay && this.finalPositionIntroducing.y != -7)
        {
            this.finalPositionIntroducing = new Vector3(0, -7, 28)
            
            //update rayscater targets
            this.asteroidCible.position.set(0, -200, 70)
            this.galaxyCible.position.set(0, -10, 0)
            this.cloudCible.position.set(0, -120, -13)
            
            this.posCibleAsteroid = this.asteroidCible.position.clone()
            this.posCibleCloud = this.cloudCible.position.clone()
            this.posCibleGalaxy = this.galaxyCible.position.clone()
            
            this.posCibleAsteroid.x -= 40
            this.posCibleAsteroid.y += 10
            this.posCibleAsteroid.z += 20
            
            this.posCibleCloud.x -= 20
            this.posCibleCloud.y += 15
            this.posCibleCloud.z += 28
            
            this.posCibleGalaxy.x += 10
            this.posCibleGalaxy.y += 1
            this.posCibleGalaxy.z += 20
            
            //update size title
            if (this.text1 && this.text2 && this.text3)
            {
                console.log("wtf ?!");
                this.text1.scale.set(0.3, 0.3, 0.3)
                this.text1.position.x -= 1
                this.text1.position.y = -20
                
                this.text2.scale.set(0.3, 0.3, 0.3)
                this.text2.position.x = 0
                this.text2.position.y = -169
                this.text2.position.z = 150

                this.text3.scale.set(0.3, 0.3, 0.3)
                this.text3.position.x = 0
                this.text3.position.y = -75
                this.text3.position.z = 55

                //debug
                this.experience.debug.ui.add(this.text2.position, "x").min(-200).max(200).step(1).name('cibleCloudx')
                this.experience.debug.ui.add(this.text2.position, "y").min(-200).max(200).step(1).name('cibleCloud y')
                this.experience.debug.ui.add(this.text2.position, "z").min(-200).max(200).step(1).name('cibleCloud z')
            }
        }
        else if(!this.mobileDisplay && this.finalPositionIntroducing.y != 52)
        {
            //add value for each clouds and lights in position for displayed it on row
            this.finalPositionIntroducing = new THREE.Vector3(0, 52, 92)
            
            //update rayscater targets
            this.asteroidCible.position.set(-112, 0, 0)
            this.galaxyCible.position.set(0, -10, 0)
            this.cloudCible.position.set(117, 0, -10)
            
            this.posCibleAsteroid = this.asteroidCible.position.clone()
            this.posCibleCloud = this.cloudCible.position.clone()
            this.posCibleGalaxy = this.galaxyCible.position.clone()
            
            this.posCibleAsteroid.x -= 40
            this.posCibleAsteroid.y += 10
            this.posCibleAsteroid.z += 20
        
            this.posCibleCloud.x -= 20
            this.posCibleCloud.y += 15
            this.posCibleCloud.z += 28
        
            this.posCibleGalaxy.x += 10
            this.posCibleGalaxy.y += 1
            this.posCibleGalaxy.z += 20

            if (this.text1 && this.text2 && this.text3)
            {
                this.text1.scale.set(0.8, 0.8, 0.8)
                this.text1.position.set(-10, -80, -20)
                this.text1.clonePosition = this.text1.position.clone()
                
                this.text2.scale.set(0.8, 0.8, 0.8)
                this.text2.position.set(-130, 30, -20)
                this.text2.clonePosition = this.text2.position.clone()
                
                this.text3.scale.set(0.8, 0.8, 0.8)
                this.text3.position.set(90, 30, -20)
                this.text3.clonePosition = this.text3.position.clone()
            }
        }
    }

    update()
    {   
        //SMOOTH ANIMATION FOR TITLES
        if(this.text1 && this.text2 && this.text3)
        {
            const t = this.time.elapsed * 0.000005
            
            if(!this.mobileDisplay)
            {
                this.text1.position.y = (Math.cos(this.text1.clonePosition.y + t * 100) * 2) + -10
                this.text2.position.y = (Math.sin(this.text2.clonePosition.y + t * 100) * 2) + 20
                this.text3.position.y = (Math.sin(this.text3.clonePosition.y + t * 100) * 2) + 20
            }
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
                        document.querySelector('.menuAsteroid p').classList.add("visited")
                    break;

                    case "galaxyCible":
                        posCible.y += 1
                        posCible.x += 10
                        domPage = window.document.querySelector(".galaxy")
                        document.querySelector('.menuGalaxy p').classList.add("visited")
                    break;   
                        
                    case "cloudCible":
                        posCible.x -= 20
                        posCible.y += 15
                        posCible.z += 5
                        domPage = window.document.querySelector(".cloud")
                        document.querySelector('.menuCloud p').classList.add("visited")
                    break

                    default:
                    break;
                }
                //Hide text menu
                if (this.text1 && this.text2 && this.text3) {
                    this.text1.visible = false
                    this.text2.visible = false
                    this.text3.visible = false
                }

                if(this.mobileDisplay)
                {
                    this.mouseClick.x = NaN
                    this.mouseClick.y = NaN
                    
                    domPage.classList.add("showPage")
                    document.querySelector('.menu').classList.remove("remove")
                    document.querySelector('html').style.overflowY = 'hidden'
                    //Animation when page displayed
                    const allArticle = document.querySelectorAll('.showPage .article')
                    var t = 1500
                    for (let i = 0; i < allArticle.length; i++) {
                        const e = allArticle[i];
                        this.setAnimationWhenPageDisplayed(e, t)
                        
                        t += 300
                    }
                }
                else
                {
                    //Travel camera
                    const tween = new TWEEN.Tween(this.experience.camera.instance.position)
                    tween.to(posCible, 1500).easing(TWEEN.Easing.Exponential.InOut).start().onComplete(()=>{
                        this.mouseClick.x = NaN
                        this.mouseClick.y = NaN
                        
                        domPage.classList.add("showPage")
                        document.querySelector('.menu').classList.remove("remove")
                        
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
        }
    
        TWEEN.update();
    }
}