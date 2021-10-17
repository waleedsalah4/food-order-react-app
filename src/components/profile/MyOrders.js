import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMYOrdersReq } from '../../store/actions/orderActions';
import OrderItem from './OrderItem';

const MyORders = () => {
    const token = JSON.parse(localStorage.getItem('user-token'))

    const dispatch = useDispatch();
    const order = useSelector(state => state.getMyOrders)
    const {orders, loading} = order;

    useEffect(()=>{
        dispatch(getMYOrdersReq(token))
    },[dispatch, token])

    return(
        <div>
            {!loading && orders.map(item => (
                <OrderItem orders={item} key={item._id} />
            ))}
            
        </div>
    )
}

export default MyORders;