import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
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
        <Container >
            <Search />
            <Row>
                {/* Categorias glosario */}
                <Col lg={3} >
                    <ListGroup>
                        {
                            categorys?.map(category => (
                                <ListGroup.Item
                                    key={category.id}
                                    onClick={() => dispatch(filterThunk(category.id))}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                
                {/* Productos */}
                <Col lg={9}>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {
                            products.map(product => (
                                <CardGroup>
                                    <Card>
                                        <Link to={`/product/${product.id}`}>
                                            <Card.Img 
                                                variant="top" 
                                                src={product.productImgs[0]} 
                                                style={{width: 150, objectFit: 'contain'}}    
                                            />
                                            <Card.Body>
                                                <Card.Title>{product.title}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">{product.price}</small>
                                            </Card.Footer>
                                        </Link>
                                    </Card>
                                </CardGroup>
                            ))
                        }
                    </Row>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default Home;