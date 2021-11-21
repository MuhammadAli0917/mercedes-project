function data(){
    const deadline = "2021 Dec 1 00:00 GMT+0500"

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

export default data;

