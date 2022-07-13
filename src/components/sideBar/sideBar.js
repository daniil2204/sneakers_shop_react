import { useState, useEffect } from 'react'

import axios from 'axios'

import './sideBar.scss'

import btnclose from '../../resources/img/btn_close.svg'



const SideBar = (props) => {

    const{basket, setSideBar, deleteItemFrom, focusOnItem, setBasket, addItemToOrder } = props
    
    let limiter = 0;


    const[emptyContent,setEmptyContent] = useState({
        img : "/img/emptybox.svg",
        h1 : "Корзина пустая",
        p : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
    })

    useEffect(() => {
        if (limiter === 0) {
            onReaquest()
        }
    },[])

    const onReaquest = () => {
        axios.get("https://62beb564be8ba3a10d59abb9.mockapi.io/cards")
            .then((res) => {
                props.setBasket([])
                res.data.map((item) => {
                    if (item.basket === true) {
                        setBasket(basket => [...basket,item])
                    }
                })
            })
            .then(limiter = 1)
    }

    const clearBasket = () => {
        setBasket([])
    }

    const clearRef = () => {
       

      
    }
    
    const renderCard = (arr) => {
        const card = arr.map(item => {
           return(
            <li className="sidebar-card" key={item.id}>
                <img src={item.img} className="sidebar-card-sneakers" alt="sneakers"/>
                <div className="sidebar-card-text">
                    <p className="sidebar-card-text-name">
                        {item.name.slice(0,17)}<br/>
                        {item.name.slice(17)}
                    </p>
                    <b>{`${item.price} грн.`}</b>
                </div>
                <img src={btnclose} className="sidebar-card-btn" alt="close" onClick={() => {
                    deleteItemFrom(item,item.id,'basket');
                    focusOnItem(item.id)
                }}/>
            </li>
           )
        })
        
       
        let sum = 0;

       
        basket.map(item => {
            sum += Number(item.price);
        })

        let tax = sum / 100 * 5
        
        return(
            <ul className="sidebar-cards">
                {card}    
                <div className="sidebar-bottom">
                    <div>
                        <p className="sidebar-bottom-text">
                            <span>Итого: </span>
                            <b>{sum} грн.</b>
                        </p>
                        <p className="sidebar-bottom-text">
                            <span>Налог 5%: </span>
                            <b>{Math.ceil(tax)} грн. </b>
                        </p>
                    </div>
                    <button className="sidebar-bottom-btn" onClick={() => {
                        basket.forEach((item) => {
                            deleteItemFrom(item, item.id,'basket')
                            focusOnItem(item.id)
                        })
                        clearBasket();
                        addItemToOrder(basket)
                        clearRef();
                        setEmptyContent({...emptyContent,
                            h1 : "Заказ оформлен",
                            p : "Ваш заказ скоро будет передан курьерской доставке",
                            img : "/img/confirm.svg"});
                    }}>Оформить заказ</button>
                </div>
            </ul>
        )
    }

    const emptySideBar = () => {
        return(
            <div className="order__sidebar">
                <div className="order__sidebar-content">
                    <img src={emptyContent.img} alt="emptybox"/>
                    <h1>{emptyContent.h1}</h1>
                    <p>{emptyContent.p}</p>
                    <button className="sidebar-bottom-btn"
                        onClick={() => setSideBar()}>Вернуться назад</button>
                </div>
            </div>
        )
    }
    

    const content = basket.length > 0 ? renderCard(basket) : emptySideBar();

    

  
    return(
        <>
            <div className="overlay" onClick={() => {
                setSideBar()}} ></div>
            <div className="sidebar">
                <div className="sidebar-title">
                    <h1 className="sidebar-h">Корзина</h1>
                    <img 
                        className="sidebar-close" 
                        src={btnclose}
                        onClick={() => {
                            setSideBar();
                        }}
                        alt="close"/>
                </div>
                {content}
            </div>
        </>
    )
}

export default SideBar;