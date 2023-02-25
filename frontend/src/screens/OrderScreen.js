import { useContext, useEffect, useReducer } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { geterror } from '../utilis';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: ' ' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '', order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate;
  const params = useParams();
  const { id: orderId } = params;
  //assining orderId to params id
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`api/orders/${orderId}`, {
          headers: { authrization: `Bearer ${userInfo.token}` },
        });
        data({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: geterror(error) });
      }
    };
    if (!userInfo) {
      return navigate('/login');
    }
    if (!orderId || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, navigate, orderId]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger"></MessageBox>
  ) : (
    <div></div>
  );
}
