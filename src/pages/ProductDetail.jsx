import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
        products.category.id === selectProduct.category.id
    ))

    const addAmount = () => {
        const newsProdcut = {
            "id": selectProduct.id,
            "quantity": amount
        }
        console.log(newsProdcut)
        dispatch(getNewCar(newsProdcut));

    }

    return (
        <div>

            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-30"
                        src={selectProduct?.productImgs[0]}
                        alt="First slide"
                        
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-30"
                        src={selectProduct?.productImgs[1]}
                        alt="Second slide"
                        
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-30"
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
                <Button className="me-3" onClick={() => setAmount(amount - 1)} disabled={amount === 0}>
                    <i className="fa-solid fa-xmark"></i>
                </Button>
                {amount}
                <Button className="ms-3" onClick={() => setAmount(amount + 1)} disabled={amount === 50}>
                    <i className="fa-solid fa-plus"></i>
                </Button>
                <br />
                <Button className="mt-2" onClick={addAmount} disabled={amount === 0}>
                    <i className="fa-solid fa-cart-plus"></i>
                </Button>
            </div>

            <section>
                <h4>{selectProduct?.description}</h4>
            </section>
            
            
        
            <section>
                {
                relateProducts.map(product => (
                        <Card style={{ width: '18rem' }} key={product.id}>
                            <Link>
                            <Card.Img variant="top" src={product?.productImgs[0]} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Link>
                        </Card>
                ))
            }
            </section>
            
        </div>
    );
};

export default ProductDetail;