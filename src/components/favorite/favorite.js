import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import Card from '../card/card'
import Loading from '../loading/loading'

import './favorite.scss'

import angleback from '../../resources/img/angleback.svg'
import sad from '../../resources/img/sad.svg'





const FavoritePage = (props) => {

    const[loading,setLoading] = useState(true)
    const[empty,setEmpty] = useState(false)
    const { favorite } = props
    let limiter = 0

    useEffect(() => {
        if (limiter === 0) {
            onReaquest()
        }
    },[])

    const onReaquest = () => {
        axios.get("https://62beb564be8ba3a10d59abb9.mockapi.io/cards")
            .then((res) => {
                props.setFavorite([])
                res.data.map((item) => {
                    if (item.favorite === true) {
                        props.setFavorite(favorite => [...favorite,item])
                    }
                })
                setLoading(false)
            })
            .then(() => {
                limiter = 1
               
            })
        }
    
    const navigate = useNavigate();

    const emptyFavorite = () => {
        return(
            <div className="favorite-empty">
                <img src={sad} alt="sad-smile"/>
                <h2>Закладок нет :(</h2>
                <p>Вы ничего не добавляли в закладки</p>
                <button onClick={() => navigate(-1)}>
                    Вернуться назад
                </button>
            </div>
        )
    }
    
    const renderCard = () => {
        return(
            <div className="favorite">
                <div className="favorite-header">
                        <img src={angleback} alt="angleback" onClick={() => {
                            navigate(-1)
                        }}/>
                    <h1>Мои закладки</h1>
                </div>
                {favorite.length === 0 ? emptyFavorite() : <>
                    <ul className="favorite-cards">
                    {loading ? <Loading/> : favorite.map((item) => (
                        <Card card={item} 
                            key={item.id} 
                            addItemTo={props.addItemTo}
                            deleteItemFrom={props.deleteItemFrom} 
                            itemRefs={props.itemRefs} 
                            focusOnItem={props.focusOnItem}
                            itemRefsFav={props.itemRefsFav} 
                            focusOnItemFav={props.focusOnItemFav}/>
                    ))}
                </ul>
                </>}
            </div>
        )
    }
    
    const content = renderCard() 


    return(
       <>
        {content}
       </>
    )
}

export default FavoritePage;