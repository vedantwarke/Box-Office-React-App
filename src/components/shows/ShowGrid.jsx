import { useStarredShows } from "../../lib/useStarredShows";
import ShowCard from "./ShowCard";
import { FlexGrid } from "../common/FlexGrid"
//import { useReducer, useEffect } from "react";




const ShowGrid = ({shows}) => {

    const [starredShows, dispatchStarred] = useStarredShows()
    //usePersistedReducer(reducer, [], '')

    const onStarMeClick = (showId) => {
        const isStarred = starredShows.includes(showId);

        if (isStarred) {
            dispatchStarred({type: 'Unstar', showId});
        } else {
            dispatchStarred({type: 'Star', showId});
        }
    }

    return (
    <FlexGrid>{
        shows.map(data => (
            <ShowCard key={data.show.id} 
            name={data.show.name} 
            image= {data.show.image ? data.show.image.medium : '/not-found.png'} 
            id={data.show.id} 
            summary={data.show.summary}
            onStarMeClick ={onStarMeClick}
            isStarred={starredShows.includes(data.show.id)}
            />


        ))}
    </FlexGrid>
    );
};

export default ShowGrid;