import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";




const CharacterSlider = ( props ) => {

    const { characters, handleSelecte } = props
    const dispatch = useDispatch()

    const NextArrow = ( props ) => {
        const { className, onClick } = props;
        return (
            <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" /></svg>
        );
    }

    const PrevArrow = ( props ) => {
        const { className, onClick } = props;
        return (
            <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" /></svg>
        );
    }


    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: ( _, next ) => {
            dispatch( {
                type: "SAVE_CHARACTER_DATA",
                payload: { active: characters[next] }
            } )
        },
    };

    return (
        <>
            <Slider {...settings} className="slider">
                {characters.map( ( item ) => {
                    return (
                        <div key={item.id}>
                            <div className="slider--item">
                                <div className="slider--content">
                                    <div className="character--img">
                                        <img src={`${process.env.REACT_APP_BASEURL}${item.image}`} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="character--details">
                                <button
                                    onClick={() => handleSelecte( item )}
                                >
                                    <h2>{item.character_name}</h2>
                                    <label>{item.tag}</label>
                                </button>
                                <span>Click to select</span>
                            </div>
                        </div>
                    )
                } )}
            </Slider>
        </>
    )
}


const mapStateToProps = state => {
    const { config } = state
    return ( {
        characters: config.characterList
    } )
}


export default connect( mapStateToProps, {} )( CharacterSlider )
