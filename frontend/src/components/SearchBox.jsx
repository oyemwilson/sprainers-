import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };


  return (
    <Form onSubmit={submitHandler} className='d-flex' inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='me-sm-2 ms-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
