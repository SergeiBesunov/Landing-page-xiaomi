// ============================================= Burger
let buttonBurger = document.querySelector(`.header__burger`)
let nav = document.querySelector(`.header__nav`)
let buttonClose = nav.querySelector(`.header__close-button--media`)


buttonBurger.addEventListener(`click`,(e)=>{
    nav.classList.add(`header__nav--media`)
    buttonClose.addEventListener(`click`, closeMediaNav)
})

function closeMediaNav(){
    nav.classList.remove(`header__nav--media`)
    buttonClose.removeEventListener(`click`, closeMediaNav)
}


// ============================================= Sliders
let slider1 = new Slider(sett={
    slider: `top__slider`,
    slideToShow: 1,
    marginItems: 0,
    arrows: false,
    dots: true,
    swipe: true,
    autoPlay: true,
    timeAutoPlay: 5000,
})

let slider2 = new Slider(sett={
    slider: `slider__slider`,
    slideToShow: 1,
    marginItems: 0,
    arrows: false,
    dots: true,
    swipe: true,
    autoPlay: false,
    timeAutoPlay: 3000,
})


// ============================================= Tabs
let boxRadioBut = document.querySelector(`.form__item-box-radio`)
let allTabs = document.querySelectorAll(`.form__select-item`)

boxRadioBut.addEventListener(`click`,(e)=>{
    let {target} = e
    let parent = target.closest(`.form__label`)
    if(parent){
        allTabs.forEach((item)=>{
            
            if(item.classList.contains(`form__select-item--active`)){
                item.classList.remove(`form__select-item--active`)
            }
            if(parent.dataset.inputId === item.id){
                item.classList.add(`form__select-item--active`)
            }
        })}}
)

// ============================================= Modal
const CLASS_LIST = {
    open: `description__player`,
    modal: `modal-video`,
    active: `modal-video--active`,
    open2: `footer__politics-link`,
    modal2: `modal-politics`,
    active2: `modal-politics--active`,
    triggerClose2: `modal-politics__dialog-close`,
}

// =========== player YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onPlayerReady(event) {
    event.target.playVideo();
  }

// ============ player YouTube/

document.addEventListener(`click`,(e)=>{
    let {target} = e

    if(target.closest(`.${CLASS_LIST.open}`)){
        let parent = target.closest(`.${CLASS_LIST.open}`)
        modalId = parent.getAttribute(`href`).replace(`#`, ``)
        modal = document.getElementById(modalId)
        modal.classList.add(`${CLASS_LIST.active}`)

        if(player){
            player.playVideo()
          }
          else{
            player = new YT.Player('player', {
              height: '100%',
              width: '100%',
              videoId: '0TRNVuAsIe4',
              events: {
                'onReady': onPlayerReady,
              }
            })
          }   
    }

    if(target.classList.contains(`${CLASS_LIST.active}`)){
        console.log(99)
        let modal = target.closest(`.${CLASS_LIST.modal}`)
        modal.classList.remove(`${CLASS_LIST.active}`)
        player.pauseVideo()

    }

    if(target.closest(`.${CLASS_LIST.open2}`)){
        let modalId = target.getAttribute(`href`).replace(`#`, ``)
        let modal = document.getElementById(modalId)
        modal.classList.add(`${CLASS_LIST.active2}`)
    }

    if(target.closest(`.${CLASS_LIST.triggerClose2}`) || 
        target.classList.contains(`${CLASS_LIST.active2}`)){
        let modal = target.closest(`.${CLASS_LIST.modal2}`)
        modal.classList.remove(`${CLASS_LIST.active2}`)
    }
}
)


// ============================================= Form
let form = document.forms.form

form.addEventListener(`submit`,(event)=>{
event.preventDefault()
let {target} = event
let nameInput = target.name
let phoneInput = target.phone
let nameValue = target.name.value.trim().toLowerCase()
let phoneValue = target.phone.value.trim()
let radioValue
let dataObj

let radio = target.radio
radio.forEach((item)=>{
    if(item.checked){
        radioValue = item.value
    }
})

if(validationName(nameValue, nameInput) && validationPhone(phoneValue, phoneInput)){
  dataObj = {
    name: nameValue,
    phone: phoneValue,
    color: radioValue,
}

console.log(dataObj)
nameInput.value = ``
phoneInput.value = ``
setTimeout(()=>{
    alert(`ваши контакты успешно отправленны, менеджер свяжется с вами в ближайшее время`)
}, 1000)

}
})

function validationName(value, input){
    let check = true
    let errorArray = ["~", "`", "!", "@", "#", "$", "%", ";", ":", "^", "&", "?", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]",
     "|", "'", "/", "'", ",", ">", "<", ".", "\\"," ",]

    if(value.length > 15 || value.length < 2){
        check = false
    }

    for(let i = 0; i < errorArray.length; i++){
        if(value.includes(errorArray[i])){
            check = false
        }
    }

    for( let letter of value){
        if(Number(letter)){
        check = false
        }
    }


    if(check){
        deleteErrorMessage(input)
        return check
    }
    else{
        printErrorMessage(input)
    }

    console.log(`Имя ${check}`)
}
function validationPhone(value, input){
    let check = true

    let array = value.split(``)
        array.forEach((item)=>{
        if(Number(item) != item || item == ` `){
            check = false
        }
        })
    
    if(value.length != 11){
        check = false
    }

    if(!value.startsWith(`8`)){
        check = false
    }
    

    if(check){
        deleteErrorMessage(input)
        return check
    }
    else{
        printErrorMessage(input)
    }
    
    console.log(`Телефон ${check}`)
}
function printErrorMessage(input){
    let parent = input.closest(`.form__input-wrapper`)
    parent.classList.add(`form__input--error`)
}
function deleteErrorMessage(input){
    let parent = input.closest(`.form__input-wrapper`)
    if(parent.classList.contains(`form__input--error`)){
        parent.classList.remove(`form__input--error`)
    }
    
}


// ============================================= Nav
let orderBlock = document.querySelector(`.form`)
let linksOrder = document.querySelectorAll(`.link-order`)

linksOrder.forEach((item)=>{
    item.addEventListener(`click`,(event)=>{
        event.preventDefault()
        scrollIntroView(orderBlock)
    })
})


let navMenu = document.querySelector(`.header__nav`)
navMenu.addEventListener(`click`,(event)=>{
    event.preventDefault()
    let {target} = event
    if(target.classList.contains(`header__nav-item`)){
        let link = target.querySelector(`.header__nav-link`)
        let pathLink = link.getAttribute(`href`).replace(`#`, ``)
        let element = document.querySelector(`.${pathLink}`)
        scrollIntroView(element)
    }
})

function scrollIntroView(element){
    element.scrollIntoView({
        block: `start`,
        behavior: "smooth",
    })
}










