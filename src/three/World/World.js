import Experience from "../Experience";
import Cloud from "./Cloud";
import Galaxy from "./Galaxy";
import Asteroide from "./Asteroide.js";
import Stars from "./Stars";
import TravelCamera from "./TravelCamera";
import Dom from "./Dom";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.ressources = this.experience.ressources
        this.ressources.on("ready", () =>{
            this.galaxy = new Galaxy()
            this.cloud = new Cloud()
            this.asteroide = new Asteroide()
            this.stars = new Stars()
            this.travelCamera = new TravelCamera()
            this.dom = new Dom()
        })

        //Tick Event
        this.time.on('tick', ()=>{
            this.update()
        })
    }
    update()
    {
        if(this.galaxy && this.cloud && this.asteroide && this.travelCamera && this.stars)
        {
            this.asteroide.update()
            this.galaxy.update()
            this.cloud.update()
            this.travelCamera.update()
            this.dom.update()
        }
    }
}