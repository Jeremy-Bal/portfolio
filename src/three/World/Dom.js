import Experience from "../Experience";

export default class domPage
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.maskOxy = document.querySelector('.maskOxy')
        this.div = document.querySelector('.maskOxy > div')
        this.p = document.querySelector('.maskOxy > div > .fontEquinoxBold')
        this.blackScreen = document.querySelector('.blackScreen')
        this.sizeDivParent = this.maskOxy.offsetWidth
        this.refill = document.querySelector('.refill')
        this.elapsed = {
            val: 0,
            refill: false
        }

        this.script()
    }
    script()
    {
        this.refill.addEventListener('click', ()=>{
            this.elapsed.refill = true
            this.blackScreen.classList.remove('show')
            this.refill.classList.remove('show')
        })
    }
    update()
    {
        if(this.elapsed.refill)
        {
            this.elapsed.val = this.time.elapsed
            this.elapsed.refill = false
        }
        const newSize = this.sizeDivParent - (this.time.elapsed - this.elapsed.val) * 0.0005

        if(newSize >= 0)
        {
            const showPercent = 100 * newSize/this.sizeDivParent
            this.div.style.width = newSize + "px"
            this.p.innerHTML = Math.trunc(showPercent) + '<span class="fontHelvetica" style="padding-left:4px;">%</span>'
        }
        else if (newSize < 0 && !this.blackScreen.classList.contains('show'))
        {
            this.blackScreen.classList.add('show')
            this.refill.classList.add('show')
        }
    }
}