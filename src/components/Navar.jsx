import React, { useState } from 'react';
import {  Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Car from './Car'

const Navar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container >
                    <Navbar.Brand as={Link} to='/'  >Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/login' >Login</Nav.Link>
                            <Nav.Link as={Link} to='/purchases' >Puchases</Nav.Link>
                            <Nav.Link onClick={handleShow} ><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Car show={show} handleClose={handleClose} />
        </>
    );
};

export default Navar;