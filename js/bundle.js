/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ ((module) => {

function accordionFunction(){
    const accordion = document.querySelectorAll(".accordion")
    accordion.forEach(acc=>{
        acc.addEventListener("click",function (){
            acc.classList.add("active")
            const panel = acc.nextElementSibling
            if (panel.style.maxHeight){
                panel.style.maxHeight = null
            } else{
                panel.style.maxHeight = panel.scrollHeight + "px"
            }
        })
    })
}

module.exports = accordionFunction;

/***/ }),

/***/ "./src/js/modules/data.js":
/*!********************************!*\
  !*** ./src/js/modules/data.js ***!
  \********************************/
/***/ ((module) => {

function data(){
    const deadline = "2021 Nov 20 24:00 GMT+0500"

    function getClock(endTime){
        const total = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 60),
            seconds = Math.floor((total / 1000) % 60);

        return{
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function setClock(){
        const days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timeInterval = setInterval(updateClock,1000)

        updateClock()

        function updateClock(){
            const time = getClock(deadline)
            days.innerHTML = (`0${time.days}`).slice(-2)
            hours.innerHTML = (`0${time.hours}`).slice(-2)
            minutes.innerHTML = (`0${time.minutes}`).slice(-2)
            seconds.innerHTML = (`0${time.seconds}`).slice(-2)
            if(time.total === 0){
                clearInterval(timeInterval)
            }
        }
    }

    setClock()
}

module.exports = data;



/***/ }),

/***/ "./src/js/modules/loader.js":
/*!**********************************!*\
  !*** ./src/js/modules/loader.js ***!
  \**********************************/
/***/ ((module) => {

function loader() {
    const loader = document.querySelector(".loader")
    setTimeout(function (){
        loader.style.opacity = "0"
        setTimeout(function (){
            loader.style.display = "none"
        },1500)
    },2000)
}

module.exports = loader;



/***/ }),

/***/ "./src/js/modules/server.js":
/*!**********************************!*\
  !*** ./src/js/modules/server.js ***!
  \**********************************/
/***/ ((module) => {

function server(){
    const forms = document.querySelectorAll("form")

    const message = {
        success: "Murojaatingiz qabul qilindi",
        loading: "img/form/transparent.svg",
        failure: "Error"
    }

    forms.forEach(form=>bindPostData(form));

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        })
        //async await
        return await res.json()
    }


    function bindPostData(form){
        form.addEventListener("submit",(e)=>{
            e.preventDefault()

            const statusMessage = document.createElement("img")
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `
            form.insertAdjacentElement("afterend", statusMessage)

            // const request = new XMLHttpRequest()
            // request.open("POST","server.php")



            // request.setRequestHeader("Content-type","application/json")
            const formData = new FormData(form)
            console.log(formData)

            // const obj = {}
            //
            // formData.forEach(function (value,key){
            //     obj[key] = value
            // })
            const json = JSON.stringify(Object.fromEntries(formData.entries()))



            // const json = JSON.stringify(obj)

            postData(" http://localhost:3000/requests",json)
                .then(data => {
                    console.log(data)
                    showThanksModal(message.success)
                    form.reset()
                    statusMessage.remove()
                })
                .catch(() => {
                    showThanksModal(message.failure)
                })
                .finally(() => {
                    form.reset()
                })





            // fetch("server1.php", {
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify(obj)
            //
            // }).then(data => data.text())
            //   .then(data => {
            //       console.log(data)
            //       showThanksModal(message.success)
            //       form.reset()
            //       statusMessage.remove()
            //   })
            //     .catch(() => {
            //         showThanksModal(message.failure)
            //     })
            //     .finally(() => {
            //         form.reset()
            //     })







            // request.send(json)

            // request.addEventListener("load",()=>{
            //     if (request.status === 200){
            //         showThanksModal(message.success)
            //         form.reset()
            //         statusMessage.remove()
            //     } else {
            //         showThanksModal(message.failure)
            //     }
            // })
        })
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector(".modal__dialog")

        prevModalDialog.classList.add("none")
        openModal()

        const thanksModal = document.createElement("div")
        thanksModal.classList.add("modal__dialog")
        thanksModal.innerHTML = `
        <div class="modal__content">
           <div class="modal__close" data-close="">&times;</div>
           <div class="modal__title">${message}</div>
       </div>
        `

        document.querySelector(".modal").append(thanksModal)
        setTimeout(function (){
            thanksModal.remove()
            prevModalDialog.classList.add("show")
            prevModalDialog.classList.remove("none")
            closeModal()
        },4000)
    }
    const modal = document.querySelector(".modal"),
        modalBtns = document.querySelectorAll("[data-modal]");

    modalBtns.forEach(btn=>btn.addEventListener("click",openModal))

    function openModal(){
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
        clearInterval(modalTimer)
    }

    function closeModal(){
        modal.style.display = "none"
        document.body.style.overflow = ""
    }


    modal.addEventListener("click",function (event){
        if (event.target === modal || event.target.getAttribute("data-close") === ""){
            closeModal()
        }
    })

    const modalTimer = setTimeout(openModal,5000)

    function showMyModalByScroll(){
        if (document.documentElement.scrollHeight <= window.pageYOffset + document.documentElement.clientHeight){
            openModal()
            window.removeEventListener("scroll",showMyModalByScroll)
        }
    }
    window.addEventListener("scroll",showMyModalByScroll)

}

module.exports = server;



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((module) => {

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

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabContent = document.querySelectorAll(".tabcontent"),
        headerParents = document.querySelector(".tabheader__items");

    function hideTabContent(){
        tabContent.forEach(item=>item.style.display = "none")
        tabs.forEach(tab=>tab.classList.remove("tabheader__item_active"))
    }
    function showTabContent(i=0){
        tabContent[i].style.display = "block"
        tabs[i].classList.add("tabheader__item_active")
    }
    hideTabContent()
    showTabContent()
    headerParents.addEventListener("click",function (event){
        if (event.target && event.target.classList.contains("tabheader__item")){
            tabs.forEach((tab,i)=>{
                if (event.target === tab){
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}

module.exports = tabs;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js")
    const server = __webpack_require__(/*! ./modules/server */ "./src/js/modules/server.js")
    const accordion = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js")
    const slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js")
    const data = __webpack_require__(/*! ./modules/data */ "./src/js/modules/data.js")
    const loader = __webpack_require__(/*! ./modules/loader */ "./src/js/modules/loader.js")
    const klass = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/klass'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))



    tabs()
    server()
    accordion()
    slider()
    data()
    loader()
    klass()




















    // fetch(" http://localhost:3000/menu")
    //     .then(data => data.json())
    //     .then(res => console.log(res))

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map