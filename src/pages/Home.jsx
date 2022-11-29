import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import { filterThunk, getProductsThunk } from '../store/slice/data.slice';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.data);

    const [categorys, setCategorys] = useState();



    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
        .then(res => setCategorys(res.data.data.categories))
    }, [])
    return (
        <div>
            <Search />
            <Row>
                {/* Categorias glosario */}
                <Col lg={3} >
                    <ListGroup>
                        {
                            categorys?.map(category => (
                                <ListGroup.Item key={category.id} onClick={() => dispatch(filterThunk(category.id))} >
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>

                {/* Productos */}
                <Col lg={9}>
                    {
                        products.map(product => (
                            <ul key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    {product.title}
                                    <img src={product.productImgs[0]} alt={product.title} />
                                </Link>
                            </ul>
                        ))
                    }
                </Col>
            </Row>


        </div>
    );
};

export default Home;