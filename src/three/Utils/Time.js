import EventEmitter from "./EventEmitter";
import * as THREE from "three"
export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        //Setup()
        this.start = Date.now()
        this.clock = new THREE.Clock()

        this.current = this.start
        this.deltaTimeFrame = 16
        this.deltaTime = 16
        this.elapsed = 0
        this.previous = 0

        window.requestAnimationFrame(()=>
        {
            this.tick()
        })
    }
    tick()
    {
        const currentTime = Date.now()
        this.deltaTimeFrame = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        const elapsedTime = this.clock.getElapsedTime()
        this.deltaTime = elapsedTime - this.previous
        this.previous = elapsedTime
    
        this.trigger('tick')
        
        window.requestAnimationFrame(()=>
        {
            /* console.log("elapsed", this.elapsed); */
            this.tick()
        })
    }
}