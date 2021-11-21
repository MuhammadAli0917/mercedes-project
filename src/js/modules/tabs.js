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

export default tabs;
