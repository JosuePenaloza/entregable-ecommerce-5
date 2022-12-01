import React, { useEffect } from 'react';
import { Button, Offcanvas, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { buyCart, deleteCart, getCarThunk } from '../store/slice/car.slice';
import Swal from 'sweetalert2'

const Car = ({ show, handleClose }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCarThunk());

    }, [])

    const car = useSelector(state => state.car);

    const handled = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispatch(buyCart())
            }
          })
    }

    const cartDelete = (id) => {
        console.log('pruebadelete', id)
        dispatch(deleteCart(id))
    }

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><i className="fa-solid fa-cart-arrow-down"></i></Offcanvas.Title>
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
                                    <Button 
                                     variant="secondary" 
                                     onClick={() => cartDelete(product.id)}
                                     style={{color: 'red'}}
                                    >
                                        <i className="fa-solid fa-trash" ></i>
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                    ))
                }
            </Offcanvas.Body>
            <Button variant="primary" onClick={() => handled()}>Save changes</Button>
        </Offcanvas>
    );
};

export default Car;