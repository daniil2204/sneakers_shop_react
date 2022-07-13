import './appBanner.scss'

import bannerbrends from '../../resources/img/banner-brends.svg'
import bannerimg from '../../resources/img/banner-bg.svg'

const AppBanner = () => {
    return(
        <div className="banner">
            <div className='banner-wrapper'>
                <img className='banner__wrapper-brends' src={bannerbrends}/>
                <p className='banner__wrapper-text'><span className='banner-text-green'>Stan Smith</span>,<br/>Forever!</p>
                <button className='banner__wrapper-btn'>Купить</button>
            </div>
            <img className='banner-img' src={bannerimg}/>
        </div>
    )
}

export default AppBanner;