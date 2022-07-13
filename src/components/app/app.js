import { useState, useEffect, useRef } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import axios from 'axios';

import AppHeader from '../appHeader/appHeader';
import AppBanner from '../appBanner/appBanner';
import SnekersList from '../sneakersList/sneakersList';
import FavoritePage from '../favorite/favorite';
import OrderPage from '../order/order';


import './app.scss'





const App = () => {
    
    const[basket,setBasket] = useState([])

    const[favorite,setFavorite] = useState([])

    const[order,setOrder] = useState([])

    


    let limiter = 0;

    useEffect(() => {
        if (limiter === 0) {
            onReaquest()
        }
    },[])

    const onReaquest = () => {
        axios.get("https://62beb564be8ba3a10d59abb9.mockapi.io/cards")
            .then((res) => {
                res.data.map((item) => {
                    if (item.basket === true) {
                        setBasket(basket => [...basket,item])
                    }
                })
            })
            .then(limiter = 1)
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        if (itemRefs.current[id].classList == "content__list-item-price-add-selected") {
            itemRefs.current[id].classList = "content__list-item-price-add"
        }else{
            itemRefs.current[id].classList = "content__list-item-price-add-selected"
        }
    }

    const itemRefsFav = useRef([]);

    const focusOnItemFav = (id) => {
        if (itemRefsFav.current[id].classList == "content__list-item-favorite-selected") {
            itemRefsFav.current[id].classList = "content__list-item-favorite"
        }else{
            itemRefsFav.current[id].classList = "content__list-item-favorite-selected"
        }
    }


    const addItemTo = (card,id,category) => {
        if (category == 'basket') {
            card.basket = true
            axios.put(`https://62beb564be8ba3a10d59abb9.mockapi.io/cards/${id}`,{basket:true})
            setBasket(basket => [...basket,card])
        }else{
            card.favorite = true
            axios.put(`https://62beb564be8ba3a10d59abb9.mockapi.io/cards/${id}`,{favorite:true})
            setFavorite(favorite => [...favorite,card])
        }
    }

    const deleteItemFrom = (card,id,category) => {
        if (category == 'basket') {
            card.basket = false
            axios.put(`https://62beb564be8ba3a10d59abb9.mockapi.io/cards/${id}`,{basket:false})
            setBasket(basket.filter(item => item !== card))
        }else{
            card.favorite = false
            axios.put(`https://62beb564be8ba3a10d59abb9.mockapi.io/cards/${id}`,{favorite:false})
            setFavorite(favorite.filter(item => item !== card))    
        }
    }


    const addItemToOrder = (basket) => {
        basket.map((item) => {
            console.log(item)
            axios.post(`https://62beb564be8ba3a10d59abb9.mockapi.io/order`,item)
            setOrder(order => [...order,item])
        })
    }


    
   
    return(
        <Router>
            <div className="app">
                <div className='wrapper'>
                    <AppHeader 
                        setBasket={setBasket}
                        basket={basket} 
                        deleteItemFrom={deleteItemFrom}
                        focusOnItem={focusOnItem}
                        order={order}
                        addItemToOrder={addItemToOrder}
                        itemRefs={itemRefs}/>
                    <Routes>
                        <Route exact path ="/" element={
                            <>
                                <AppBanner/>
                                <SnekersList 
                                    deleteItemFrom={deleteItemFrom}
                                    addItemTo={addItemTo}
                                    itemRefs={itemRefs} 
                                    focusOnItem={focusOnItem}
                                    itemRefsFav={itemRefsFav}
                                    focusOnItemFav={focusOnItemFav}/>
                            </>
                        }>                            
                        </Route>
                        <Route exact path ="favorite" element={
                            <FavoritePage 
                                addItemTo={addItemTo} 
                                deleteItemFrom={deleteItemFrom}
                                itemRefs={itemRefs} 
                                focusOnItem={focusOnItem}
                                itemRefsFav={itemRefsFav}
                                focusOnItemFav={focusOnItemFav}
                                setFavorite={setFavorite}
                                favorite={favorite}/>
                        }> 
                        </Route>
                        <Route exact path="order" element={
                            <OrderPage
                                deleteItemFrom={deleteItemFrom}
                                addItemTo={addItemTo}
                                itemRefs={itemRefs} 
                                focusOnItem={focusOnItem}
                                itemRefsFav={itemRefsFav}
                                focusOnItemFav={focusOnItemFav}
                                setOrder={setOrder}
                                order={order}/>
                        }>
                        </Route>    
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App;

