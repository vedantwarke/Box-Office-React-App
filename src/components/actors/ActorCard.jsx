
import { Link } from "react-router-dom";
import { SearchCard, SearchImgWrapper } from "../common/SearchCard"

const ActorCard = ( {name, image, gender, country, birthday, deathday} ) => {

    return (
        <SearchCard>
            <SearchImgWrapper>
                <img src={image} alt={name} />
            </SearchImgWrapper>
            <h1> {name} {!!gender && `(${gender})`} </h1>
            <p>{country ? `comes from ${country}` : 'Country not known'}</p>
            <p>{birthday ? `born on ${birthday}` : 'Birthday not known'}</p>
            <p>{deathday ? `died on ${deathday}` : 'Alive'}</p>


            <div>
                <Link to="/">Read More</Link>
                <button type="button">Star Me</button>
            </div>
            
        </SearchCard>
    );

};

export default ActorCard;