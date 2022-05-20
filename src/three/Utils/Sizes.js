import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor(){
        super()
        
        //Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.mobileDisplay = window.innerWidth < 800 ? true : false
        
        window.addEventListener('resize', () => {
            this.mobileDisplay = window.innerWidth < 800 ? true : false
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    
    }
}