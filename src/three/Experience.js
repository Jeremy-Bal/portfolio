import * as THREE from "three"

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Ressources from "./Utils/Ressources.js";
import Debug from "./Utils/Debug.js";
import sources from "./Utils/sources.js";

let instance = null

export default class Experience
{
    constructor(canvas)
    {        
        if(instance)
        {
            return instance
        }
        instance = this

        window.experience = this
        
        // Setup
        this.debug = new Debug()
        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.ressources = new Ressources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        
        //FOG
        this.scene.fog = new THREE.Fog("#212254", 1, 314)

        this.debug.ui.addColor(this.scene.fog, "color").onChange(()=>{
            this.scene.fog.color.set(this.scene.fog.color)
        })
        this.debug.ui.add(this.scene.fog, "near").min(0).max(10).step(0.0001).name('fog')
        this.debug.ui.add(this.scene.fog, "far").min(0).max(350).step(0.0001).name('fog')

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        //Tick Event
        this.time.on('tick', ()=>{
            this.update()
        })

    }
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }
    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}