// настройки:
class Slider{
    constructor(sett={
        slider: `home-slider`,
        slideToShow: 1,
        marginItems: 10,
        arrows: true,
        dots: true,
        swipe: true,
        autoPlay: true,
        timeAutoPlay: 3000,
    }){

        this.sett = sett
       
        this.modificationHTML()
        this.sliderWrapper = document.querySelector(`.${this.sett.slider}__wrapper`)
        this.slider = this.sliderWrapper.querySelector(`.${this.sett.slider}`)
        this.sliderTracker = this.sliderWrapper.querySelector(`.${this.sett.slider}__tracker`)
        this.allSlides = document.querySelectorAll(`.${this.sett.slider}__tracker>div`)

        
        this.widthSlider = this.slider.offsetWidth
        this.sumSlides = this.allSlides.length
        
        this.count = 0
        this.pageX 
        this.targetClickX

        this.resizeWidthSlides = this.resizeWidthSlides.bind(this)
        this.moveTracker = this.moveTracker.bind(this)
        this.customizeLinksAndImg = this.customizeLinksAndImg.bind(this)
        this.swipeDrag = this.swipeDrag.bind(this)
        
        this.resizeWidthSlides()
        this.addWindowResize()

        this.sett.arrows ? this.addArrows() : null
        this.sett.dots ? this.addDots() : null
        this.sett.dots ? this.toggleStyleDots() : null
        this.sett.swipe ? this.activateSwipe() : null
        this.sett.autoPlay ? this.autoPlay() : null
    }


    autoPlay(){
        setInterval(()=>{
            this.count++
            this.moveTracker()
        }, this.sett.timeAutoPlay)
    }
    activateSwipe(){
        this.customizeLinksAndImg()
        this.sliderTracker.addEventListener(`pointerdown`,(event)=>{
            this.pageX = event.pageX
            this.targetClickX = event.target
            window.addEventListener(`pointerup`, this.swipeDrag)
        })
    }
    swipeDrag(event){
        let difference = this.pageX - event.pageX
        console.log(this.targetClickX)
        console.log(difference)

        if(difference <= 15 && difference >= -15){
            if(this.targetClickX.hasAttribute(`href`)){
                let hrefLink = this.targetClickX.getAttribute(`href`)
                window.location.href = `${hrefLink}`
            }
            else{
                return
            }
        }
        else if(difference > 15){
            this.count ++
            this.moveTracker()
        }
        else if(difference < -15){
            this.count --
            this.moveTracker()
        }

        window.removeEventListener(`pointerup`, this.swipeDrag)
    }
    customizeLinksAndImg(){
        let allLink = this.sliderTracker.querySelectorAll(`a`)
        allLink.forEach((item)=>{
            item.setAttribute(`draggable`, `false`)
            item.style.userSelect = `none`
          
            item.addEventListener(`click`,(event)=>{
                event.preventDefault() 
            })
        })
        
        let allImg = this.sliderTracker.querySelectorAll(`img`)
        allImg.forEach((item)=>{
            item.style.pointerEvents = `none`
            item.style.userSelect = `none`
        })
    }
    toggleStyleDots(){
        let dots = this.sliderWrapper.querySelectorAll(`.${this.sett.slider}__dot`)
        dots.forEach((item)=>{
        item.classList.remove(`dot-basic--active`)
        item.classList.remove(`${this.sett.slider}__dot--active`)

        })
    
        dots.forEach((item)=>{
        if(item.dataset.buttonId == this.count){
            item.classList.add(`dot-basic--active`)
            item.classList.add(`${this.sett.slider}__dot--active`)

        }})
    }
    addDots(){
        let containerDots = document.createElement(`div`)
        containerDots.className = `${this.sett.slider}__dots-box dots-box-basic`
    
        for(let i = 0; i < this.sumSlides / this.sett.slideToShow; i++){
            let dot = document.createElement(`button`)
            dot.className = `${sett.slider}__dot dot-basic`
            dot.dataset.buttonId = i
            containerDots.append(dot)
        }
        this.sliderWrapper.append(containerDots)
    
    
        containerDots.addEventListener(`click`,(event)=>{
            let {target} = event
            let dataId = Number(target.dataset.buttonId) 
            
            if(target.hasAttribute(`data-button-id`)){
                this.count = dataId
                this.moveTracker()
            }
        })
    }
    moveTracker(){
        let liveWidthSlider = this.slider.offsetWidth

        if(this.sumSlides % this.sett.slideToShow === 0){
            if(this.count < 0){
                this.count = (this.sumSlides / this.sett.slideToShow)-1
            }
            else if(this.count === this.sumSlides / this.sett.slideToShow){
                this.count = 0
            }
            this.sliderTracker.style.transform = `translateX(-${ liveWidthSlider * this.count + `px`})`
            this.sett.dots ? this.toggleStyleDots() : null
        }
        else{
            let differenceMin = Math.floor(this.sumSlides / this.sett.slideToShow) 
            let differenceMax = Math.ceil(this.sumSlides / this.sett.slideToShow)
            let remainderSlides = (this.sett.slideToShow * differenceMax) - this.sumSlides
            
            if(this.count < 0){
                this.count = differenceMin
                this.sliderTracker.style.transform = `translateX(-${ (liveWidthSlider * this.count)-((liveWidthSlider / this.sett.slideToShow)*remainderSlides) + `px`})`
            }
            else if(this.count === differenceMin){
                this.sliderTracker.style.transform = `translateX(-${ (liveWidthSlider * this.count)-((liveWidthSlider / this.sett.slideToShow)*remainderSlides) + `px`})`
            }
            else if(this.count === differenceMin + 1){
                this.count = 0
                this.sliderTracker.style.transform = `translateX(-${ liveWidthSlider * this.count + `px`})`
            }
            else{
                this.sliderTracker.style.transform = `translateX(-${ liveWidthSlider * this.count + `px`})`
            }
            this.sett.dots ? this.toggleStyleDots() : null
        }
    }
    addArrows(){
        let arrowPrev = document.createElement(`div`)
        arrowPrev.className = `${this.sett.slider}__arrow-prev arrow-prev-basic arrow-basic`

        let arrowNext = document.createElement(`div`)
        arrowNext.className = `${this.sett.slider}__arrow-next arrow-next-basic arrow-basic`

        this.sliderWrapper.append(arrowPrev,arrowNext)

        arrowPrev.addEventListener(`click`,(event)=>{
            this.count --
            this.moveTracker()

        })

        arrowNext.addEventListener(`click`,(event)=>{
            this.count ++
            this.moveTracker()

        })
    }
    addWindowResize(){
        window.addEventListener(`resize`, this.resizeWidthSlides)
    }
    resizeWidthSlides(){
        let liveWidthSlider = this.slider.offsetWidth
        this.allSlides.forEach((slide)=>{
        slide.style.width = `${liveWidthSlider/this.sett.slideToShow - (this.sett.marginItems*2)}px`
        })
        this.moveTracker()

    }
    modificationHTML(){
        let slider = document.querySelector(`.${this.sett.slider}`)
        slider.classList.add(`slider-basic`)
        
        let tracker = document.createElement(`div`)
        tracker.className = `${this.sett.slider}__tracker tracker-basic`
        
        let sliderWrapper = document.createElement(`div`)
        sliderWrapper.className = `${this.sett.slider}__wrapper wrapper-basic`
        
        let sliderChildrens = document.querySelectorAll(`.${this.sett.slider}>div`)
        console.log(sliderChildrens)
        
        sliderChildrens.forEach((item)=>{
            item.classList.add(`item-basic`)
            tracker.append(item)
        })
        
        slider.append(tracker)
        slider.before(sliderWrapper)
        sliderWrapper.append(slider)
    }

}



// let slider23 = new Slider(sett={
//     slider: `home-slider`,
//     slideToShow: 3,
//     marginItems: 10,
//     arrows: true,
//     dots: true,
//     swipe: true,
// })

// let slider25 = new Slider(sett={
//     slider: `about-slider`,
//     slideToShow: 2,
//     marginItems: 0,
//     arrows: true,
//     dots: true,
//     swipe: true,
// })
















