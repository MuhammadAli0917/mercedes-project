function slider(){
    // SLIDER

    // const slides = document.querySelectorAll(".offer__slide"),
    //     prev = document.querySelector(".offer__slider-prev"),
    //     next = document.querySelector(".offer__slider-next"),
    //     current = document.querySelector("#current"),
    //     total = document.querySelector("#total")
    //
    // let slideIndex = 1
    //
    // show(slideIndex)
    //
    // function show(a){
    //     if (a > slides.length){
    //         slideIndex = 1
    //     }
    //     if (a === 0){
    //         slideIndex = slides.length
    //     }
    //     slides.forEach(slide=>slide.style.display = "none")
    //     slides[slideIndex - 1].style.display = "block"
    //
    //     current.textContent = ("0" + slideIndex).slice(-2)
    //     total.textContent = ("0" + slides.length).slice(-2)
    // }
    // function sliderPlus(a){
    //     show(slideIndex+=1)
    // }
    // function sliderMinus(a){
    //     show(slideIndex-=1)
    // }
    // next.addEventListener("click",function (){
    //     sliderPlus(1)
    //     console.log(slideIndex)
    // })
    // prev.addEventListener("click",function (){
    //     sliderMinus(1)
    //     console.log(slideIndex)
    // })

    // Slider 2

    const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        sliderWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        slider = document.querySelector(".offer__slider");

    let width = window.getComputedStyle(sliderWrapper).width;
    console.log(width)


    let slideIndex  = 1,
        offset = 0

    slidesField.style.width = slides.length * 100 + "%"
    slidesField.style.display = "flex"
    slidesField.style.transition = "0.5s all"
    sliderWrapper.style.overflow = "hidden"
    slider.style.position = "relative"

    slides.forEach(slide=>{
        slide.style.width = width
    })
    let indicator = document.createElement("ol"),
        dots = []
    indicator.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        list-style: none;
        margin-left: 15%;
        margin-right: 15%;
        z-index: 15;
        display: flex;
        justify-content: center;
        `
    slider.append(indicator)
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li")
        dot.setAttribute("data-slide-to",i+1)
        dot.style.cssText = `
        width: 30px;
        height: 6px;
        flex: 0 1 auto;
        margin: 0 3px;
        cursor: pointer;
        background-clip: padding-box;
        background-color: #fff;
        opacity: 0.5;
        transition: opacity 1s ease;
        box-sizing: content-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        `
        if (i === 0){
            dot.style.opacity = 1
        }
        indicator.append(dot)
        dots.push(dot)
    }

    current.textContent = ("0" + slideIndex).slice(-2)
    total.textContent = ("0" + slides.length).slice(-2)

    prev.addEventListener("click",function (){
        if (offset === 0){
            offset = (noDigits(width) * (slides.length - 1))
        } else {
            offset -= noDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex <= 1){
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        current.textContent = (`0${slideIndex}`).slice(-2)

        dots.forEach(dot=> dot.style.opacity = "0.5")
        dots[slideIndex - 1].style.opacity = 1
    })

    function noDigits(str){
        return +str.replace(/\D/g, "")
    }
    next.addEventListener("click",function (){
        if (offset === noDigits(width) * (slides.length - 1)){
            offset = 0
        } else {
            offset += noDigits(width)
        }
        console.log(noDigits(width))
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex >= slides.length){
            slideIndex = 1
        } else {
            slideIndex++
        }

        current.textContent = (`0${slideIndex}`).slice(-2)

        dots.forEach(dot => dot.style.opacity = "0.5")
        dots[slideIndex - 1].style.opacity = 1
    })

    dots.forEach(dot => {
        dot.addEventListener("click", function (event){
            const slideTo = event.target.getAttribute("data-slide-to")

            slideIndex = slideTo

            offset = (noDigits(width) * (slideTo - 1))
            slidesField.style.transform = `translateX(-${offset}px)`

            dots.forEach(dot => dot.style.opacity = "0.5")
            dots[slideIndex - 1].style.opacity = 1

            current.textContent = (`0${slideIndex}`).slice(-2)

            // if (slideIndex < 10){
            //     current.textContent = `0${slideIndex}`
            //     total.textContent = `0${slides.length}`
            // } else{
            //     current.textContent = slideIndex
            //     total.textContent = slides.length
            // }
        })
    })

}

export default slider;
