import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingAddressScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const navigate = useNavigate();
  const [fullname, setFullname] = useState(shippingAddress.fullname || ' ');
  const [address, setAddress] = useState(shippingAddress.address || ' ');
  const [city, setCity] = useState(shippingAddress.city || ' ');
  const [postal, setPostal] = useState(shippingAddress.postal || ' ');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || ' ');

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullname,
        address,
        city,
        postal,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullname,
        address,
        city,
        postal,
        country,
        location: shippingAddress.location,
      })
    );
    navigate('/payment');
  };

  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postal">
            <Form.Label>Postal</Form.Label>
            <Form.Control
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postal">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Countinue
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ShippingAddressScreen;
