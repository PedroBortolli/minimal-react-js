import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/button'

const Content = () => {
    const [clicks, setClicks] = useState(0)
    const add = () => setClicks(prev => prev + 1)
    const subtract = () => setClicks(prev => prev - 1)

    return (
        <Container>
            <Text>Total is: {clicks}</Text>
            <Button text="Add" onClick={add} />
            <Button onClick={subtract} />
        </Container>
    )
}

export default Content

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 24px;
    > button {
        margin-top: 12px;
    }
`

const Text = styled.span`
    font-size: 24px;
`