import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavBar = () => (
    <Container>
        <Link to="/">Home</Link>
        <Link to="/content">Content</Link>
    </Container>
)

export default NavBar

const Container = styled.nav`
    display: flex;
    border-bottom: 1px solid black;
    padding: 4px 16px;
    > a {
        font-size: 18px;
        :not(:last-child) {
            margin-right: 16px;
        }
    }
`