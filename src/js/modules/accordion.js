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

export default accordionFunction