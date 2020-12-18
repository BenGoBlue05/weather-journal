const apiKey = '094c9852630b91eb207db8b080eb8eb9'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

function formattedDate() {
    const d = new Date()
    return `${d.getMonth()}.${d.getDay()}.${d.getFullYear()}`
}

function getOpenWeatherUrl(zip) {
    return `${baseUrl}?units=imperial&zip=${zip}&appid=${apiKey}`
}

const postData = async (url = '', body = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    try {
        return await request.json()
    } catch (error) {
        console.log('Error: ', error)
    }
}

const fetchData = async (url = '') => {
    const request = await fetch(url)
    try {
        return await request.json()
    } catch (error) {
        console.log('Error: ', error)
    }
}

function generateEntry(zip = '', feelings = '') {
    fetchData(getOpenWeatherUrl(zip))
        .then(data => postData('/add', generateEntryPostBody(data, feelings)))
        .then(() => fetchData('/all'))
        .then(data => updateUi(data))
}

function generateEntryPostBody(openWeatherResponseData = {}, feelings = '') {
    return {
        date: formattedDate(),
        temp: openWeatherResponseData.main.temp,
        feelings: feelings
    }
}

function updateUi(data = {}) {
    console.log(data)
}

function setUpListeners() {
    document.getElementById('generate').addEventListener('click', () => {
        const zip = document.getElementById('zip').value
        const feelings = document.getElementById('feelings').value
        generateEntry(zip, feelings)
    })
}

setUpListeners()