import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Loading from "../loading/loading";
import Card from "../card/card";

import './order.scss'


import angleback from '../../resources/img/angleback.svg'
import sad2 from '../../resources/img/sad2.svg'

const OrderPage = (props) => {

    const[loading,setLoading] = useState(true)
    const orderPage = true;

    const{ order } = props

    let limiter = 0

    useEffect(() => {
        if (limiter === 0) {
            onReaquest()
        }
    },[])

    const onReaquest = () => {
        axios.get("https://62beb564be8ba3a10d59abb9.mockapi.io/order")
            .then((res) => {
                props.setOrder([])
                res.data.map((item) => {
                    props.setOrder(order => [...order,item])    
                })
                setLoading(false)
            })
            .then(() => {
                limiter = 1
               
            })
        }
    
    const navigate = useNavigate();
    
    const emptyOrder = () => {
        return(
            <div className="order-empty">
                <img src={sad2} alt="sad-smile"/>
                <h2>У вас нет заказов</h2>
                <p>Вы нищеброд?  <br/>Оформите хотя бы один заказ.</p>
                <button onClick={() => navigate(-1)}>
                    Вернуться назад
                </button>
            </div>
        )
    }

    const renderOrder = () => {
        return(
            <div className="order">
                <div className="order-header">
                        <img src={angleback} alt="angleback" onClick={() => {
                            navigate(-1)
                        }}/>
                    <h1>Мои заказы</h1>
                </div>
                {order.length === 0 ? emptyOrder() : <>
                    <ul className="order-cards">
                    {loading ? <Loading/> : order.map((item,i) => (
                        <Card card={item} 
                            key={i} 
                            addItemToBasket={props.addItemToBasket} 
                            deleteItemFromBasket={props.deleteItemFromBasket}
                            addItemToFavorite={props.addItemToFavorite} 
                            deleteItemFromFavorite={props.deleteItemFromFavorite}
                            itemRefs={props.itemRefs} 
                            focusOnItem={props.focusOnItem}
                            itemRefsFav={props.itemRefsFav} 
                            focusOnItemFav={props.focusOnItemFav}
                            orderPage={orderPage}/>
                    ))}
                </ul>
                </>}
            </div>
        )
    }
    
    const content = renderOrder();
    
    return(
        <div>
            {content}
        </div>
    )
}

export default OrderPage;