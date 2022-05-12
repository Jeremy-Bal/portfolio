import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import * as THREE from 'three'
import { LoadingManager } from "three";

export default class Ressources extends EventEmitter
{
    constructor(sources)
    {
        super()
        
        this.sources = sources
        //console.log(this.sources);

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.progress = document.querySelector('.maskSpan')
        this.p = document.querySelector('.showPercent')
        this.loadingScreen = document.querySelector('.loadingScreen')
        this.content = document.querySelector('.content')

        this.setLoaders()
        this.startLoading()
    }
    setLoaders()
    {
        this.loaders = {}
        
        this.loaders.loadingManager = new LoadingManager()
        this.loaders.loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            const progressRatio = 1 - (itemsLoaded / itemsTotal)
            const progressPercent = (itemsLoaded / itemsTotal)

            if(this.progress && this.p)
            {
                const showPercent = 100 * progressPercent/1

                this.progress.style.transform = "scaleX("+progressRatio+")"
                this.p.innerHTML = showPercent + '<span>%</span>'

            }else{
                this.progress = document.querySelector('.maskSpan')
                this.p = document.querySelector('.showPercent')
            }
        };

        this.loaders.loadingManager.onLoad = ()=>{
            //make appear elements on side
            const animationAppear = document.querySelectorAll('.animationAppear')
            let t = 1500
        
            const addClasse = (e, t)=>{
                setTimeout(()=>{
                    e.classList.add('show')
                }, t)
            }
            for (let i = 0; i < animationAppear.length; i++) {
                const e = animationAppear[i];
                t += 500
                addClasse(e,t)
            }

            //remove loadingScreen
            setTimeout(()=>{
                this.content.classList.add('remove')
                setTimeout(()=>{
                    this.loadingScreen.classList.add('remove')

                    //triger end on introduction
                    this.trigger('goForward')
                }, 1000)
            }, 3000)

        }
        this.loaders.DRACOLoader = new DRACOLoader()
        this.loaders.DRACOLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/')
        this.loaders.gltfLoader = new GLTFLoader(this.loaders.loadingManager)
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.DRACOLoader)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loaders.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loaders.loadingManager)
    }
    startLoading()
    {
        // this.loaders.loadingManager.onLoad(()=>{
        //     console.log("ded");
        // })
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                const path = require("../../assets/" + source.path + "." + source.format)

                this.loaders.gltfLoader.load(path.default, 
                    (file) => {
                        this.soucesLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                const path = require("../../assets/" + source.path + "." + source.format)
                this.loaders.textureLoader.load(path, 
                    (file) => {
                        this.soucesLoaded(source, file)
                    },
                    // onError callback
                    function ( err ) {
                        console.error( 'An error happened.', err );
                    },
                    function ( err ) {
                        console.error( 'An error happened.', err );
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                //let path = []
                for (let i = 0; i < source.path.length; i++) {
                    //do someting
                }

                this.loaders.cubeTextureLoader.load(source.path, 
                    (file) => {
                        //console.log("cube texture loader", file);
                        this.soucesLoaded(source, file)
                    },
                    // onError callback
                     function ( err ) {
                        console.error( 'An error happened.', err );
                    },
                    function ( err ) {
                        console.error( 'An error happened.', err );
                    }
                )
            }
        }
     
    }
    soucesLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++
        
        if(this.loaded === this.toLoad)
        {
            //console.log("this.items", this.items);
            this.trigger("ready")
        }
    }
}