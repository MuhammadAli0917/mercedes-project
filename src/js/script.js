    import tabs from "./modules/tabs";
    import server from "./modules/server";
    import accordion from "./modules/accordion";
    import slider from "./modules/slider";
    import data from "./modules/data";
    import loader from "./modules/loader";
    import klass from "./modules/klass";
    import modal from "./modules/modal";
    import {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", function (){

    const modalTimer = setTimeout(() => openModal('.modal',modalTimer),5000)

    tabs()
    server(modalTimer)
    modal("[data-modal]",".modal",modalTimer)
    accordion()
    slider()
    data()
    loader()
    klass()
})






















    // fetch(" http://localhost:3000/menu")
    //     .then(data => data.json())
    //     .then(res => console.log(res))
