import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slice/data.slice';

const ProductDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, []);

    const productList = useSelector(state => state.data);

    const selectProduct = productList.find(productSelect => productSelect.id === +id);

    const relateProducts = productList.filter(products => (
        products.category.id === selectProduct.category.id
    ))

    return (
        <div>
            <h2>{selectProduct?.title}</h2>
            <img src={selectProduct?.productImgs[0]} alt="" />

            {
                relateProducts.map( product => (
                    <ul key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            {product.title}
                        </Link>
                    </ul>
                ))
            }
        </div>
    );
};

export default ProductDetail;