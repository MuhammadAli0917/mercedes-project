function klass(){

    // const getResource = async (url) => {
    //     const res = await fetch(url)
    //
    //     if (!res.ok){
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    //     }
    //
    //     return await res.json()
    // }

    class CarCard{
        constructor(src,alt,title,description,price,parentSelector,...classes) {
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.src = src
            this.alt = alt
            this.title = title
            this.description = description
            this.price = price
            this.transfer = 10;
            this.changeToUSD();
        }
        changeToUSD(){
            this.price = this.price * this.transfer
        }
        render(){
            const element = document.createElement("div")

            if (this.classes.length === 0){
                this.classes = "menu__item"
                element.classList.add(this.classes)
            } else {
                element.classList.add(this.classes)
            }

            element.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.description}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> $</div>
            </div>
          </div>
            `
            this.parent.append(element)
        }
    }


    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, description, price}) => {
    //             new CarCard(img,altimg,title,description,price, ".menu .container").render()
    //         })
    //     })

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, description, price}) => {
                new CarCard(img,altimg,title,description,price, ".menu .container").render()
            })
        })




    // new CarCard(
    //     "img/tabs/1.jpg",
    //     "car",
    //     "2021 Mercedes-Benz C-Class",
    //     "The 2021 Mercedes-Benz C-Class finishes in the top half of our\n" +
    //     "                    luxury small car rankings. It's powerful and upscale, but it has\n" +
    //     "                    so-so handli...",
    //     100,
    //     ".menu .container"
    // ).render()
    // new CarCard(
    //     "img/tabs/2.jpg",
    //     "car",
    //     "2021 Mercedes-Benz CLA-Class",
    //     "The 2021 Mercedes-Benz C-Class finishes in the top half of our\n" +
    //     "                    luxury small car rankings. It's powerful and upscale, but it has\n" +
    //     "                    so-so handli...",
    //     250,
    //     ".menu .container"
    // ).render()
    // new CarCard(
    //     "img/tabs/1.jpg",
    //     "car",
    //     "2021 Mercedes-Benz C-Class",
    //     "The 2021 Mercedes-Benz C-Class finishes in the top half of our\n" +
    //     "                    luxury small car rankings. It's powerful and upscale, but it has\n" +
    //     "                    so-so handli...",
    //     100,
    //     ".menu .container"
    // ).render()
}

export default klass;

