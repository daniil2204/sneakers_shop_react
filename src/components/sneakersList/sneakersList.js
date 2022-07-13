import { useState, useEffect } from 'react'

import axios from 'axios'

import Loading from '../loading/loading'
import   Card  from '../card/card'

import './sneakersList.scss'


const SnekersList = (props) => {
    const[cards,setCards] = useState([]);
    const[loading,setLoading] = useState(true)
    const[searchValue,setSearchValue] = useState('')


    let limiter = 0

    useEffect(() => {
        if (limiter === 0) {
            onReaquest()
        }
    },[])

    const onReaquest = () => {
        axios.get(`https://62beb564be8ba3a10d59abb9.mockapi.io/cards`)
            .then((res) => {
                setCards([...cards,...res.data])
                setLoading(false)
            })
            .then(() => {
                limiter = 1 
            })
        }
    
    const changeInput = (event) => {
        setSearchValue(event.target.value)
    }

    const renderCard = () => {
        return(loading ? <Loading/> : 
                cards
                .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item) => (
                    <Card card={item} 
                        key={item.id} 
                        addItemTo={props.addItemTo}
                        deleteItemFrom={props.deleteItemFrom} 
                        itemRefs={props.itemRefs} 
                        focusOnItem={props.focusOnItem}
                        itemRefsFav={props.itemRefsFav} 
                        focusOnItemFav={props.focusOnItemFav}/>
                ))
        )
    } 

    const content = renderCard();
    return(
        <>
        <div className="content">
            <div className="content__title">
                <p>Все кроссовки</p>
                <input placeholder="Поиск..." type="text" onChange={changeInput}/>
            </div>
            <div className="content__list">
                <ul className="content__list-items">
                    {content}
                </ul>
            </div>
        </div>
        </>
    )
}

export default SnekersList;