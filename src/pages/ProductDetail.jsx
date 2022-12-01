import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getNewCar } from '../store/slice/car.slice';
import { getProductsThunk } from '../store/slice/data.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        dispatch(getProductsThunk())
    }, []);

    const productList = useSelector(state => state.data);

    const selectProduct = productList.find(productSelect => productSelect.id === +id);

    const relateProducts = productList.filter(products => (
        products.category.id === selectProduct.category.id &&
        products.id !== selectProduct.id
    ))

    const addAmount = () => {
        setAmount(amount == 0)
        const newsProdcut = {
            "id": selectProduct.id,
            "quantity": amount
        }
        dispatch(getNewCar(newsProdcut));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
        })

    }

    return (
        <div>
            <Row>
                <Col lg={9}>
                    <Carousel fade>
                        <Carousel.Item>
                            <img
                                className="img-fluid"
                                src={selectProduct?.productImgs[0]}
                                alt="First slide"

                            />

                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="img-fluid"
                                src={selectProduct?.productImgs[1]}
                                alt="Second slide"


                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="img-fluid"
                                src={selectProduct?.productImgs[2]}
                                alt="Third slide"

                            />
                        </Carousel.Item>
                    </Carousel>

                    <section>
                        <h2>{selectProduct?.title}</h2>
                        <h3> {selectProduct?.price}</h3>
                    </section>


                    <div className="rate mb-5">
                        <Button className="me-3" onClick={() => setAmount(amount - 1)} disabled={amount == 0}>
                            <i className="fa-solid fa-xmark"></i>
                        </Button>
                        {amount}
                        <Button className="ms-3" onClick={() => setAmount(amount + 1)} disabled={amount === 50}>
                            <i className="fa-solid fa-plus"></i>
                        </Button>
                        <br />
                        <Button className="mt-2" onClick={addAmount} disabled={amount == 0}>
                            <i className="fa-solid fa-cart-plus"></i>
                        </Button>
                    </div>

                    <section>
                        <h4>{selectProduct?.description}</h4>
                    </section>
                </Col>

                <Col lg={3}>
                    <section>
                        {
                            relateProducts.map(product => (
                                <Link key={product.id} to={`/product/${product.id}`}>
                                    <Card style={{ width: '18rem' }} >
                                        <Card.Img variant="top" src={product?.productImgs[0]} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>

                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))
                        }
                    </section>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;