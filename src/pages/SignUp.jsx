import React from 'react';
import { Button,Form } from 'react-bootstrap';

const SignUp = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Phone (10 characters)</Form.Label>
                <Form.Control type="password" placeholder="Phone (10 characters)" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default SignUp;