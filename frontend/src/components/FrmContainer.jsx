import React, { Children } from 'react'
import { Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container className=''>
        <div className='row justify-content-md-center mx-auto'>
            <div className='col col-md-6 col-sm-12'>
                {children}
            </div>
        </div>
    </Container>
  )
}

export default FormContainer