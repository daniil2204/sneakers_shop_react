import { useState, useEffect } from 'react'

import './card.scss'

const Card = (props) => {  

    const[isLiked,setIsLiked] = useState(false);
    const[isAdd,setIsAdd] = useState(false);

    const{id,name,price,img,basket,favorite} = props.card;
    
    let limiter = 0
    
    useEffect(() => {
        if(limiter !== 1){
            onReaquest()
        }
    },[])


    const onReaquest = () => {
        if (basket === true) {
            props.focusOnItem(id,props.card); 
            setIsAdd(!isAdd)
        }
        if (favorite === true) {
            props.focusOnItemFav(id,props.card); 
            setIsLiked(!isLiked)
        }
        limiter = 1;

    }

   
    return(
        <li className="content__list-item" key={id}>
            <div 
                style={props.orderPage ? {'display' : 'none'} : null}
                ref={el => props.itemRefsFav.current[id] = el}
                className="content__list-item-favorite" 
                key={id}
                alt="favorite"
                onClick={() => {
                props.focusOnItemFav(id); 
                setIsLiked(!isLiked)
                if (isLiked) {
                    props.deleteItemFrom(props.card, id, 'favorite')
                }else{
                    props.addItemTo(props.card, id, 'favorite')
                }
                }}>
            </div>
            <img src={img} className="content__list-item-img" alt="sneakers"/>
            <p className="content__list-item-name">{name}</p>
            <div className="content__list-item-price">
                <div className="content__list-item-price-text">
                    <p>Цена:</p>
                    <p className="content__list-item-price-text-cost">{price} грн.</p>
                </div>
                <div
                    style={props.orderPage ? {'display' : 'none'} : null}
                    className="content__list-item-price-add" 
                    ref={el => props.itemRefs.current[id] = el}
                    alt="add" 
                    onClick={() => 
                        {
                            props.focusOnItem(id); 
                            setIsAdd(!isAdd)
                            if (isAdd) {
                                props.deleteItemFrom(props.card, id, 'basket')
                            }else{
                                props.addItemTo(props.card, id, 'basket')
                            }
                        }}
                    >
                </div>
            </div>
        </li>
    )
    
}

export default Card;
