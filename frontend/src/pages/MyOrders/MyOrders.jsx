import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import Loader from "../../components/Loader/Loader"


const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data);
        console.log(response.data.data)
    }

    // useEffect(()=>{
    //     if (token) {
    //         setLoading(true);
    //         fetchOrders();
    //         setLoading(false);
    //     }
    // },[token])

    useEffect(() => {
        if (token) {
            setLoading(true);
    
            const timer = setTimeout(() => {
                fetchOrders();
                setLoading(false);
            }, 1000); // delay by 1 second
    
            return () => clearTimeout(timer);
        }
    }, [token]);
    

  return (
    <div className='my-orders'>
        <h2 className='myordersp'>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div className="my-orders-order" key={index} >
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return item.name+" X "+item.quantity;
                            }
                            else{
                                return item.name+" X "+item.quantity+", ";
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p className='item-count'>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
        {loading && <Loader />}
    </div>
  )
}

export default MyOrders