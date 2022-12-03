import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const SignUp = () => {

  const { register, handleSubmit } = useForm();

  const userNew = (data) => {
    dataUser = {
      data
  }

  console.log(dataUser)
  }
  return (
    <Row>
      <Card border="secondary" >
        <i className="fa-solid fa-user-plus"></i>
        <Card.Body onSubmit={handleSubmit(userNew)}>
          
          <Row>
            <Form.Label column="lg" lg={2}>

              

            </Form.Label>
            <Col>
              <Form.Control 
               type="email" 
               placeholder="Enter email" 
               required 
               {...register("email")} 
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Label column lg={2}>

            </Form.Label>
            <Col>
              <Form.Control 
               type="text" 
               placeholder="First Name" 
               required 
               {...register("firstName")}
               />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Label column lg={2}>

            </Form.Label>
            <Col>
              <Form.Control 
               type="text"  
               placeholder="Last Name" 
                required 
                {...register("lastName")}
                />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Label column lg={2}>

            </Form.Label>
            <Col>
              <Form.Control 
               type="password" 
               placeholder="password" 
               required 
               {...register("password")}
               />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Label column lg={2}>

            </Form.Label>
            <Col>
              <Form.Control 
               type="tel" 
               placeholder="Phone (10 characters)" 
               required 
               {...register("phone")} 
               />
            </Col>
          </Row>
        </Card.Body>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Card>
    </Row>
  );
};

export default SignUp;