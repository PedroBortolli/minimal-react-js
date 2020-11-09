import React from 'react'
import styled from 'styled-components'

const Button = ({ text = 'Subtract', ...props }) => <Styled {...props}>{text}</Styled>

export default Button

const Styled = styled.button`
    font-size: 18px;
    padding: 4px 8px;
    border: 1px solid blue;
    border-radius: 8px;
    background: lightblue;
`