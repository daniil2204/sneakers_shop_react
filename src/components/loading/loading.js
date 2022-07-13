import ContentLoader from "react-content-loader"

const Loading = () => {

    const renderCard = (arr) => {
        const cardsLoading = arr.map((item) => {
            return(
                <li className="content__list-item" key={item}>
                    <ContentLoader 
                        speed={2}
                        width={150}
                        height={187}
                        viewBox="0 0 150 187"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                        <rect x="0" y="107" rx="3" ry="3" width="150" height="15" /> 
                        <rect x="0" y="126" rx="3" ry="3" width="112" height="15" /> 
                        <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
                        <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
                    </ContentLoader>
                </li>
            )
        })

        return(
            <ul className="content__list-items">
                {cardsLoading}
            </ul>
        )
    }

    const arr = [1,2,3,4,5,6,7,8,9,10,11,12]

    const loader = renderCard(arr);

    
    return(
        <>
            {loader}
        </>
    )
}

export default Loading;