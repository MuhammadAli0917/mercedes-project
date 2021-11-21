function openModal(modalSelector, modalTimer){
    const modal = document.querySelector(modalSelector);
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
    console.log(modalTimer)
    if (modalTimer){
        clearInterval(modalTimer)
    }
}

function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.style.display = "none"
    document.body.style.overflow = ""
}

function modal(triggerSelector, modalSelector, modalTimer){
    const modal = document.querySelector(modalSelector),
        modalBtns = document.querySelectorAll(triggerSelector);

    modalBtns.forEach(btn=>btn.addEventListener("click", () => openModal(modalSelector, modalTimer)))






    modal.addEventListener("click",function (event){
        if (event.target === modal || event.target.getAttribute("data-close") === ""){
            closeModal(modalSelector)
        }
    })


    function showMyModalByScroll(){
        if (document.documentElement.scrollHeight <= window.pageYOffset + document.documentElement.clientHeight){
            openModal(modalSelector, modalTimer)
            window.removeEventListener("scroll",showMyModalByScroll)
        }
    }
    window.addEventListener("scroll",showMyModalByScroll)
}

export default modal
export {openModal}
export {closeModal}