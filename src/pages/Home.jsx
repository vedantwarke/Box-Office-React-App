import { useState } from 'react';
//import {useReducer} from 'react';
//import {Link} from 'react-router-dom';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';

// import styled from 'styled-components'

// const Button = styled.button`
// background: transparent;
//   border-radius: 3px;
//   border: 2px solid #BF4F74;
//   color: #BF4F74;
//   margin: 0 1em;
//   padding: 0.25em 1em;  
// `


// const reducerfn = (counter, action) => {
//     switch(action.type) {
//     case 'Increment':
//         return counter + 1;
//     case 'Decrement':
//         return counter - 1;
//     default:
//         return 0;
//     }
// }

const Home = () => {


    const [filter, setFilter] = useState(null)

    // const [counter, dispatch] = useReducer(reducerfn, 0)

    // const onIncrement = () => {
    //     dispatch({type:'Increment'})
    // }

    // const onDecrement = () => {
    //     dispatch({type:'Decrement'})
    // }

    const { data: apiData, error : apiDataError } = useQuery({
        queryKey: ['search', filter],
        queryFn: () => filter.searchOption === 'shows' ? searchForShows(filter.q): searchForPeople(filter.q),
        // ⬇️ disabled as long as the filter is empty
        enabled: !!filter,
        refetchOnWindowFocus : false
    })
    
    //const [apiData, setApiData] = useState(null)
    //const [apiDataError, setApiDataError] = useState(null)

const onSearch = async ({q, searchOption}) => {

    setFilter({q, searchOption})

// try {
// setApiDataError(null)

// if (searchOption==='shows'){
//     const result = await searchForShows(q);
//     setApiData(result);
// } else {
//     const result = await searchForPeople(q);
//     setApiData(result);
// }


// }
// catch (error) {
//     setApiDataError(error)
// }
}

const renderApiData =() => {
    if (apiDataError) {
        return <div>{apiDataError.message}</div>
    }

    if (apiData?.length === 0){
        return <div>
            No Result
        </div>

    }

    if (apiData) {
        return apiData[0].show ? <ShowGrid shows={apiData} />
         : <ActorsGrid actors={apiData} />
        
        }

    else return null;


}


    return (<div>
        <SearchForm onSearch={onSearch}/>
        {/* <p>Counter : {counter}</p>
        <button type="button" onClick={onIncrement}> INc</button>
        <button type="button" onClick={onDecrement}> DNc</button> */}
       

        <div>
            {/* <Button> Helo </Button> */}
            {renderApiData()}
            {/* {apiData.map(data => <div key={data.show.id}> {data.show.name} </div>)} */}
        </div>
        

    </div>)
}

export default Home;