import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    ////////////fecha //////////
    const getFormateData = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    const purchases = useSelector(state => state.purchases)
    return (
        <div>

            <h2>purchases </h2>
            {
                purchases.map(purchase => (
                    <div key={purchase.id}>
                    <b>{getFormateData(purchase.createdAt)}</b>
                    <Table striped bordered hover >
                        
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
                    </div>
                ))
            }
        </div>
    );
};

export default Purchases;