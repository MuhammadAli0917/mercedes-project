import {closeModal,openModal} from './modal'

function server(modalTimer){
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
        openModal('.modal', modalTimer)

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
            closeModal('.modal', modalTimer)
        },4000)
    }


}

export default server;

