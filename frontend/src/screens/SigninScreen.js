import { Helmet } from 'react-helmet-async';
import { useLocation,Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Form from'react-bootstrap/Form'
import Button from'react-bootstrap/Button'

const SigninScreen = () => {
    const {search} = useLocation();// give current url 
    const redirectInUrl = new URLSearchParams(search).get('redirect'); // URLSearchParams give url as a object // get give value of object key
    const redirect = redirectInUrl ? redirectInUrl : '/';//redirect=shipping
  return (
    <Container className="small-container">
      <Helmet>
      <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>
        <Form>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' />
        </Form.Group>
        <div className='mb-3'>
            <Button type="submit">Sign In</Button>
        </div>
        <div className='mb-3'>
            New costumer{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        </Form>
      </h1>
    </Container>
  );
};

export default SigninScreen;
