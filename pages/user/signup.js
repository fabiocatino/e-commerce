import { Container } from '@mui/material'
import React from 'react'
import SignupForm from '../../src/components/User/SignupForm'

const Signup = () => {
    return (
        <Container sx={{height: '100vh'}}>
            <SignupForm></SignupForm>
        </Container>
    )
}

export default Signup
