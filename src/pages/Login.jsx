import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const Login = () => {

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const submit = (data) => {
        axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`,data)
        .then(res => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })

            navigate('/purchases')
            localStorage.setItem('token', res.data.data.token)
        } )
        .catch(error => {
            if(error.response?.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid credentials',
                    timer: 2500
                  })
            }else{
                console.log(error.response?.data)
            }
        })
    }       

    return (
        <Form onSubmit={handleSubmit(submit)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address: max@gmail.com</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    {...register('email')}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: pass1234</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    {...register('password')}
                    />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default Login;