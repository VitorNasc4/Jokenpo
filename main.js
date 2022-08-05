// Random word
function getRandomNumber(max, min) {
    max = Math.ceil(max)
    min = Math.floor(min)

    let randomNumber = Math.floor(Math.random() * (max - min) + min)
        
    const array = ["rock", "paper", "scissor"]
    
    let pcOption = array[randomNumber]

    return pcOption
}

let pcOption = getRandomNumber(3,0)
// Event

function handleClick(event) {
    event.preventDefault()

    // Discovering the radio checked
    
    const radios = document.getElementsByName("options")
    let userOption = ""

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            userOption = radios[i].value
        }
    }

    // Analising the results
    
    let winLose = document.querySelector("#winLose")
    let userIcon = document.querySelector("#userIcon")
    let pcIcon = document.querySelector("#pcIcon")

    if (userOption === "rock" && pcOption === "scissor" || userOption === "paper" && pcOption === "rock" || userOption === "scissor" && pcOption === "paper") {
        winLose.textContent = "Parabens, você ganhou!"

        userIcon.src = `images/${userOption}.png`
        userIcon.alt = `Image of a ${userOption}`

        pcIcon.src = `images/${pcOption}.png`
        pcIcon.alt = `Image of a ${pcOption}`

    } else if (userOption === "") {
        alert("Você deve escolher uma opção")
        return

    } else if (userOption === pcOption) {
        winLose.textContent = "Quase... Deu empate!"

        userIcon.src = `images/${userOption}.png`
        userIcon.alt = `Image of a ${userOption}`

        pcIcon.src = `images/${pcOption}.png`
        pcIcon.alt = `Image of a ${pcOption}`
        
    } else {
        winLose.textContent = "Vish, você perdeu!"
        
        userIcon.src = `images/${userOption}.png`
        userIcon.alt = `Image of a ${userOption}`
        
        pcIcon.src = `images/${pcOption}.png`
        pcIcon.alt = `Image of a ${pcOption}`
    }
    
    // Changing the screen
    
    document.querySelector(".screen1").classList.add("hide")
    document.querySelector(".loadScreen").classList.remove("hide")
    
    setTimeout(() => {
        document.querySelector(".loadScreen").classList.add("hide")
        document.querySelector(".screen2").classList.remove("hide")
    }, 3000)
}

function tryAgain(event) {
    event.preventDefault()
    
    // Changing the screen
    
    document.querySelector(".screen1").classList.remove("hide")
    document.querySelector(".screen2").classList.add("hide")
    
    
    // Removing the check
    
    const radios = document.getElementsByName("options")    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radios[i].checked = false
        }
    }
    
    getRandomNumber(3,0)
    pcOption = getRandomNumber(3,0)
}

// Single Page Application


const route = (event) => {
    event.preventDefault()

    window.history.pushState(null, null, event.currentTarget.href)

    handleLocation()
}

const routes = {
    "/" : "/pages/play.html",
    "/index.html" : "/pages/play.html",
    "/instructions" : "/pages/instructions.html",
    "/history" : "/pages/history.html"
}

const handleLocation = async () => {
    const {pathname} = location

    const route = routes[pathname]

    const html = await fetch(route).then(data => data.text())

    document.querySelector("#app").innerHTML = html
}

handleLocation()

window.onpopstate = () => handleLocation()
window.route = () => route()

// Navigate bar inclusive

const navPlay = document.querySelector(".navPlay")
const navInstructions = document.querySelector(".navInstructions")
const navHistory = document.querySelector(".navHistory")


navPlay.addEventListener("click", () => {
    navPlay.classList.add("selected")
    navHistory.classList.remove("selected")
    navInstructions.classList.remove("selected")
})

navHistory.addEventListener("click", () => {
    navHistory.classList.add("selected")
    navPlay.classList.remove("selected")
    navInstructions.classList.remove("selected")
})

navInstructions.addEventListener("click", () => {
    navInstructions.classList.add("selected")
    navPlay.classList.remove("selected")
    navHistory.classList.remove("selected")
})

