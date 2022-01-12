let daysEl = document.getElementById('days')
let hoursEl = document.getElementById('hours')
let minutesEl = document.getElementById('minutes')
let secondsEl = document.getElementById('seconds')
let dateInput = document.getElementById('dateInput')

let colorBtn = document.getElementById('changeColor')

let settingsBtn = document.getElementById('settings')

let countDownDate, bgImg, txtColor   

var TxtColorElements = document.getElementsByClassName('txt'); // get all elements


window.onload = function() {
    if(localStorage.length = 0) {
        clearStorage()
    }
    document.body.style.backgroundImage = `url('${localStorage.getItem('backgroundImage')}')`
    txtColor = localStorage.getItem('txtColor')
    countDownDate = localStorage.getItem('date')
    for(var i = 0; i < TxtColorElements.length; i++){
        TxtColorElements[i].style.color = `${txtColor}`;
    }

    if(txtColor != null) {
        colorBtn.value = txtColor
    }
    
    
    if(getParameter("time") != null && getParameter( "time" ).length == 10) {
        countDownDate = new Date(getParameter( "time" ))
        document.getElementById('date').textContent = getParameter( "time" )
    } else {
        if(localStorage.getItem('date') != null) {
            countDownDate = localStorage.getItem('date')

            var url = new URL(window.location.href)
            
            window.history.pushState('time', 'Time', url.pathname + '?time=2022-02-27')
        } else {
            countDownDate = new Date('Feb 27, 2022 12:00:00').getTime()
    
            var url = new URL(window.location.href)
            
            window.history.pushState('time', 'Time', url.pathname + '?time=2022-02-27')

        }
    }

}

document.querySelector('input[type="file"]').addEventListener('change', function() {
    if(this.files && this.files[0]) {
        const reader = new FileReader()
        
        reader.addEventListener('load', () => {
            localStorage.removeItem('backgroundImage')
            localStorage.setItem('backgroundImage', reader.result)
        })
        
        reader.readAsDataURL(this.files[0])
        document.body.style.backgroundImage = `url('${URL.createObjectURL(this.files[0])}')`

    }
})

dateInput.addEventListener('change', function() {

    let input = this.value
    countDownDate = new Date(input)
    console.log(countDownDate)
    document.getElementById('date').textContent = input
    document.title = 'Countdown until ' + input

    localStorage.setItem('date', input)

    var url = new URL(window.location.href)
    window.history.pushState('newTime', 'newTime', url.pathname + '?time=' + input)
})

var Time = setInterval(function () {
    var now = new Date().getTime()

    var distance = countDownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days
    hoursEl.textContent = hours
    minutesEl.textContent = minutes
    secondsEl.textContent = seconds
})

/* const url = new URL(window.location.href)
const urlParam = new  URLSearchParams(url.search.padEnd)
console.log(urlParam) */

colorBtn.addEventListener('change', () => {
    for(var i = 0; i < TxtColorElements.length; i++){
        TxtColorElements[i].style.color = `${colorBtn.value}`;
    }

    localStorage.setItem('txtColor', colorBtn.value)
    console.log(txtColor)

})

settingsBtn.addEventListener('click', () => {
    var settings = document.getElementById('settingsTab')
    settings.classList.toggle('active')
})

function getParameter( parameterName ) {
    let parameters = new URLSearchParams(window.location.search)
    return parameters.get(parameterName)
}

function clearStorage() {
    localStorage.clear()
    
    var url = new URL(window.location.href)       
    window.history.pushState('time', 'Time', url.pathname + '?time=2022-02-27')

    window.location.reload()
}
