import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    const purchases = useSelector(state => state.purchases)
    return (
        <div>

            <h2>purchases </h2>
            {
                purchases.map(purchase => (
                    <Table striped bordered hover key={purchase.id}>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                purchase.cart?.products.map(product => (

                                    <tr key={product.id}>
                                        <td>{product.brand}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.productsInCart.quantity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                ))
            }
        </div>
    );
};

export default Purchases;