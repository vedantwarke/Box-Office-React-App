import {  getShowsByIds } from "../api/tvmaze";
import { useStarredShows } from "../lib/useStarredShows";
import { useQuery } from "@tanstack/react-query";
import ShowGrid from '../components/shows/ShowGrid'
import { TextCenter } from "../components/common/TextCenter"

const Starred = () => {

    const [starredShowsIds] = useStarredShows();

    const { data: starredShows, error : starredShowsError } = useQuery({
        queryKey: ['starred', starredShowsIds],
        queryFn: () => getShowsByIds(starredShowsIds).then(result => result.map(show => {
            return {
                show
            }
        })),
        refetchOnWindowFocus : false
    });

    if (starredShows?.length === 0) {
        return (
        <TextCenter>
            NO SHOWS WERE STARRED
        </TextCenter> 
        )
    }

    if (starredShows?.length > 0) {
        return <ShowGrid shows={starredShows} />
    }

    if(starredShowsError) {
        return <div> ERROR OCCURED: {starredShowsError.message}</div>
    }

    return <div>STARRED PAGE {starredShowsIds.length}</div>
}

export default Starred;