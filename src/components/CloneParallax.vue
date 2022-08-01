<template>
    <slot></slot>
</template>

<script>
export default {
    name: 'ParallaxComponent',
    props:{
        where: String,
        speed: {
            type: Number,
            default : 1
        },
        zoom: {
            type: Boolean,
            default: false
        }
    },
    mounted(){
        const slot = this.$slots.default()[0].el;
        const el = document.querySelector('.' + this.where + ' .container')
        const article = el.querySelectorAll('.article')

        const scrollFunc = (item) =>
        {
            item.addEventListener('scroll', ()=>{
                const scrollY = (item.scrollTop / 5) * this.speed
                let smoothScroll = Math.max(1 - scrollY / 1000, 0.9)
                
                if(this.zoom && item){
                    this.$el.nextSibling.style.transform = `scale(${smoothScroll})`
                }
                else if(slot && !this.zoom){
                    slot.style.transform = `translateY(-${scrollY}px)`
                }
            })
        }

        //add event for each articles
        article.forEach(scrollFunc);
    }
}
</script>