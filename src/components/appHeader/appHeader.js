import { useState } from 'react'

import { Link } from 'react-router-dom'

import SideBar from '../sideBar/sideBar'

import './appHeader.scss'

import logo from '../../resources/img/logo.svg'
import bucket from '../../resources/img/bucket.svg'
import heart from '../../resources/img/favorite-heart.svg'
import client from '../../resources/img/client.svg'

const AppHeader = (props) => {
    const[sideBar,setBar] = useState(false)
    const setSideBar = () => {
        setBar(!sideBar)
    }

    let sum = 0;

       
    props.basket.map(item => {
        sum += Number(item.price);
    })


    return(
        <div className='header'>
            {sideBar ? <SideBar 
                        basket={props.basket} 
                        setBasket={props.setBasket} 
                        deleteItemFrom={props.deleteItemFrom} 
                        setSideBar={setSideBar} 
                        focusOnItem={props.focusOnItem}
                        addItemToOrder={props.addItemToOrder}
                        sideBar={sideBar}/> : null}
            <div className='header-wrapper'>
                <Link to="/">
                    <div className='header-wrapper__logo'>
                        <img src={logo} className='header-wrapper__logo-img' alt="logo"/>
                        <p className='header-wrapper__logo-text'>
                            <span className='header-wrapper__logo-text-name'>Shop SNEAKERS</span><br/>
                            <span className='header-wrapper__logo-text-about'>Магазин лучших кроссовок</span>
                        </p>
                    </div>
                </Link>
                <ul className='header-wrapper__menu'>
                    <li className='header-wrapper__menu-list'>
                        <img 
                            src={bucket} 
                            className='header-wrapper__menu-img'
                            onClick={()=> {
                                setSideBar(!sideBar);
                            }}
                            alt="bucket"/>
                    </li>
                    <li className='header-wrapper__menu-list'>
                        <p>{sum} грн.</p>
                    </li>
                    <li className='header-wrapper__menu-list'>
                        <Link to="/favorite">
                            <img src={heart} className='header-wrapper__menu-img' alt="heart"/>
                        </Link>
                    </li>
                    <li className='header-wrapper__menu-list'>
                        <Link to="/order">
                            <img src={client} className='header-wrapper__menu-img' alt="client"/>
                        </Link>
                    </li>
                </ul>
            </div>
            <span className='header-bottomline'></span>
        </div>
    )
}

export default AppHeader;