import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createWorker, PSM } from 'tesseract.js'
import useInterval from 'hooks/interval'
import sample from './6.png'

const baseWorker = createWorker({
    logger: m => null
})

const spellWorker = createWorker({
    logger: m => null
})

const setupTesseract = async () => {
    await baseWorker.load();
    await baseWorker.loadLanguage('eng');
    await baseWorker.initialize('eng');
    await baseWorker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_CHAR,
        dpi: 70
    })
    await spellWorker.load();
    await spellWorker.loadLanguage('eng');
    await spellWorker.initialize('eng');
    await spellWorker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_CHAR,
        dpi: 70
    })
}

const MANA_TYPE = {
    'base': {
        worker: baseWorker,
        x_start: 1591,
        y_start: 403,
        square_side: 60
    },
    'spell': {
        worker: spellWorker,
        x_start: 1638,
        y_start: 369,
        square_side: 50
    }
}

const Home = () => {
    const [cardsInHand, setCardsInHand] = useState(0)
    const [captureStream, setCaptureStream] = useState(null)
    const [base, setBase] = useState(0)
    const [spell, setSpell] = useState(0)

    useEffect(() => {
        const getCaptureWindow = async () => {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: false,
                audio: false
            })
            setCaptureStream(stream)
            const video = document.getElementById('video')
            video.srcObject = stream
        }
        setupTesseract()
        getCaptureWindow()
    }, []);

    
    useInterval(() => {
        if (!captureStream) return
        /*
        const img = new Image()
        img.src = sample
        baseWorker.recognize(img).then(a =>{
            console.log('aaa =>', a.data.text)
        })
        */
        getMana('base')
        getMana('spell')
    }, 1000)

    const getMana = async (type) => {
        const canvas = document.getElementById(`${type}_mana`)
        const video = document.getElementById('video')
        const { worker, x_start, y_start, square_side } = MANA_TYPE[type]

        canvas.width = square_side
        canvas.height = square_side
        const context = canvas.getContext('2d')
        context.drawImage(video, x_start, y_start, square_side, square_side, 0, 0, 100, 100)

        const imgPixels = context.getImageData(0, 0, square_side, square_side);

        for(var y = 0; y < square_side; y++){
            for(var x = 0; x < square_side; x++){
                var i = (y * 4) * square_side + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }

        context.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

        const img = new Image()
        const dataUrl = canvas.toDataURL()
        img.src = dataUrl
        const { data } = await worker.recognize(img)

        console.log(type, data.text)
        if (type === 'base') {
            setBase(data.text)
        } else {
            setSpell(data.text)
        }
    }

    return <Container>
        <h1>Cards currently in hand:</h1>
        <h1>{cardsInHand}</h1>
        <canvas id="base_mana" />
        <canvas id="spell_mana" />
        <h2>Base mana: {base}</h2>
        <h2>Spell mana: {spell}</h2>
        <video id="video" autoPlay style={{display: 'none'}} />
    </Container>
}

export default Home

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
