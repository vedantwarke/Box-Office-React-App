import { useReducer, useEffect } from "react";

const usePersistedReducer = (reducer, initialStage, localStorgaeKey) => {
    const [state, dispatch] = useReducer(reducer, initialStage,(initial)=>{
        const persistedValue = localStorage.getItem(localStorgaeKey)

        return persistedValue ? JSON.parse(persistedValue) : initial

    });

      useEffect(()=> {
        localStorage.setItem(localStorgaeKey, JSON.stringify(state))
      }, [state, localStorgaeKey])

      return [state, dispatch]

}

const starredShowsReducer = (currentStarred, action) => {
    switch(action.type) {
        case 'Star':
            return currentStarred.concat(action.showId)
        case 'Unstar':
            return currentStarred.filter((showId)=> showId !== action.showId);
        
        default:
            return currentStarred;
    }
}

export const useStarredShows = () => {
    return  usePersistedReducer(
        starredShowsReducer, 
        [], 
        'starredShows'
        );
}