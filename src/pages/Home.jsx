import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, CardGroup, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import { filterPrices, filterThunk, getProductsThunk } from '../store/slice/data.slice';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.data);

    const [categorys, setCategorys] = useState();

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
            .then(res => setCategorys(res.data.data.categories))
    }, [])


    //////////filtrar por precios////////////////

    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    

    return (
        <>
            <Search />
            <Row>
                {/* Categorias glosario */}
                <Col lg={3} style={{ padding: '10px' }} >


                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
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
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>filter by prices</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control 
                                             placeholder="Price Max" 
                                             type='number'
                                             value={priceMax}
                                             onChange={e => setPriceMax(Number(e.target.value))}
                                             
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control 
                                             placeholder="Price Min" 
                                             type='number'
                                             value={priceMin}
                                             onChange={e => setPriceMin(Number(e.target.value))}
                                             
                                            />
                                        </Col>
                                        <Button 
                                         type='submit' 
                                         disabled={priceMax == 0 && priceMin == 0}
                                         style={{ marginLeft: '10px' }}
                                         onClick={() => dispatch(filterPrices({priceMax,priceMin}))}
                                            >
                                            Submit
                                            </Button>
                                    </Row>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>







                </Col>

                {/* Productos */}
                <Col lg={9}>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {
                            products.map(product => (

                                <CardGroup key={product.id}>
                                    <Card>
                                        <Link to={`/product/${product.id}`}>
                                            <Card.Img
                                                className="img-fluid"
                                                variant="top"
                                                src={product.productImgs[0]}
                                                style={{ width: 150, objectFit: 'contain' }}
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
        </>
    );
};

export default Home;

{/* <Card style={{ width: '18rem' }}>
                                    <Link to={`/product/${product.id}`}>
                                        <Card.Img variant="top" src={product.productImgs[0]} style={{ width: 150, objectFit: 'contain' }} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>
                                            {product.price}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{product.price}</ListGroup.Item>
                                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                        </ListGroup>
                                        </Link>
                                    </Card> */}


{/* <Card>
                                        <Card.Img variant="top" src={product.productImgs[0]} />
                                        <Card.Body>
                                            <Card.Text>
                                            {product.title}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> */}