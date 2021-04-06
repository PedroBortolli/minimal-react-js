import axios from 'axios'

const URL = 'http://localhost:21337'

const getGame = async () => {
    const response = await axios.get(`${URL}/positional-rectangles`)
    console.log('request')
    if (response.data.PlayerName) return { ok: true, data: response.data }
    return { ok: false }
}

const getResult = async () => {
    const response = await axios.get(`${URL}/game-result`)
    return response
}

const getDeck = async () => {
    const response = await axios.get(`${URL}/static-decklist`)
    return response
}

export { getGame, getResult, getDeck }

    /*
    const API_FETCH_RATE = 3000

    const countCardsInHand = data => {
        let count = 0
        data.Rectangles.forEach(card => {
            if (card.TopLeftY < 100) {
                count += 1
            }
        })
        return count
    }

    setInterval(async () => {
        const game = await getGame()
        if (game.ok) {
            setCardsInHand(countCardsInHand(game.data))
        } else {
            setCardsInHand(0)
        }
    }, API_FETCH_RATE)
    */
