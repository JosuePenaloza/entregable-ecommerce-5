import React, { useEffect } from 'react';
import { Button, Offcanvas, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { buyCart, getCarThunk } from '../store/slice/car.slice';

const Car = ({ show, handleClose }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCarThunk());

    }, [])

    const car = useSelector(state => state.car);

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Car</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    car.products?.map(product => (
                        <div
                            className="modal show"
                            style={{ display: 'block', position: 'initial' }}
                            key={product.id}
                        >
                            <Modal.Dialog>
                                <Modal.Header closeButton>
                                    <Modal.Title>{product.productsInCart.quantity}</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <h3>{product.brand}</h3>
                                    <p>{product.title}</p>
                                </Modal.Body>

                                <Modal.Footer>
                                    <h4>${product.price}</h4>
                                    <Button variant="secondary">Close</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                    ))
                }
            </Offcanvas.Body>
            <Button variant="primary" onClick={() => dispatch(buyCart())}>Save changes</Button>
        </Offcanvas>
    );
};

export default Car;