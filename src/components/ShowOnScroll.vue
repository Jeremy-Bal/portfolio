<template>
    <div class="transform">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'ShowOnScroll',
    props :{
        where: String,
    },
    mounted(){
        const container = document.querySelector('.' + this.where + ' .container')
        const transform = container.querySelector('.transform')
        const resetAllTransformElement = container.querySelectorAll('h1, h2, img')
        const resetAllScaleElement = container.querySelectorAll('.auto')
        
        let el = container.querySelectorAll('.article')
        let articleHeight = el[0].clientHeight;

        window.addEventListener('resize', ()=>{
            setTimeout(() => {
                el = container.querySelectorAll('.article')
                articleHeight = el[0].clientHeight;
            }, 1000);
        }, true)

        /* Select all titles in article */
        const titles = container.querySelectorAll('h2')
        let nextTitle = titles[1].textContent
        const link__text = container.parentElement.querySelector('.link__text')
        //set the first title to scroll link
        if(link__text){
            link__text.innerHTML = nextTitle
        }

        const scrollArticles = (item, index) => {
            item.addEventListener('scroll', ()=>{

                // console.log((item.scrollHeight - item.scrollTop) - 1, item.clientHeight);
                //if scroll down on entiere article
                if((item.scrollHeight - item.scrollTop) - 1 <= item.clientHeight)
                {
                    resetAllTransformElement.forEach(element =>{
                        element.style.transform = "translateY(0)"
                    })
                    resetAllScaleElement.forEach(element =>{
                        element.style.transform = "scale(1)"
                    })
                    const incrementeIndex = index + 1
                    
                    if(el[incrementeIndex])
                    {
                        el[incrementeIndex].scrollTop = 2
                        el[incrementeIndex].classList.add('show')
    
                        //find for article center
                        const transformThis = articleHeight * incrementeIndex - incrementeIndex * 100
                        transform.style.transform = `translateY(-${transformThis}px)`
                        container.scrollTop = (incrementeIndex + 1) * 100

                    }
                    
                    //Change next scroll arrow title
                    let nextTitle = titles[incrementeIndex + 1]
                    if(link__text && nextTitle){
                        link__text.innerHTML = nextTitle.textContent
                        container.parentElement.querySelector('.link').classList.remove('remove')
                    }else{
                        container.parentElement.querySelector('.link').classList.add('remove')
                    }
                }
                //case of scroll up on entiere article and this is not first index
                else if(item.scrollTop <= 0 && index != 0)
                {
                    const decrementeIndex = index - 1

                    el[decrementeIndex].scrollTop = 2
                    el[index].classList.remove('show')

                    //find for article center
                    if(index != 1 && transform.style.transform != "translateY(0px)")
                    {
                        const transformThis = articleHeight * decrementeIndex - decrementeIndex * 100
                        transform.style.transform = `translateY(-${transformThis}px)`
                        container.scrollTop = (decrementeIndex + 1) * 100
                    }else{
                        transform.style.transform = `translateY(0)`
                        container.scrollTop = 0
                    }
                    
                    //Change next scroll arrow title
                    let nextTitle = titles[decrementeIndex + 1]
                    if(link__text && nextTitle){
                        link__text.innerHTML = nextTitle.textContent
                        container.parentElement.querySelector('.link').classList.remove('remove')
                    }else{
                        container.parentElement.querySelector('.link').classList.add('remove')
                    }
                }
                //check if this is the last article
                else if(index === el.length - 1)
                {
                    //block the scroll down
                    item.scrollTop = Math.min(item.scrollTop, 1)
                }
            })
        }
        //addding scroll event on each articles
        el.forEach(scrollArticles)
    }
}
</script>

<style>

</style>