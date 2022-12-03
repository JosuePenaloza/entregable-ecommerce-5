import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProductsThunk } from '../store/slice/data.slice';
import Car from './Car'

const Navar = () => {

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token");
        if(token){
            setShow(true);
        }else {
            Swal.fire({
                icon: 'error',
                title: 'You need to login',
                timer: 3500,
                footer: '<a href="#/login">Login</a>',
            })
        }
    }

    const handledHome = () => {
        navigate('/');
        dispatch(getProductsThunk());
    }
    return (
        <>
            <Navbar bg="light" expand="lg" style={{padding: '10px'}}>

                    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={handledHome}  ><i className="fa-brands fa-shopify"></i> E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/login' >Login</Nav.Link>
                            <Nav.Link as={Link} to='/create' >Create</Nav.Link>
                            <Nav.Link as={Link} to='/purchases' >Puchases</Nav.Link>
                            <Nav.Link onClick={handleShow} ><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

            </Navbar>
            <Car show={show} handleClose={handleClose} />
        </>
    );
};

export default Navar;