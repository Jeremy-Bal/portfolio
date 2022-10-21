import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'
        this.ui = new dat.GUI()
        
        if(this.active)
        {
            this.ui = new dat.GUI()
            // this.ui.close()
        }else{
            document.querySelector('.lil-gui').style.display = 'none'
        }
    }
}