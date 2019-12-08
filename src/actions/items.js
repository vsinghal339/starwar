import fetch from 'isomorphic-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_SRC = 'UPDATE_SRC';


export function fetchLogin(values){
  const endpoints = [
    `https://swapi.co/api/people/?search=${values.username}`
  ];

  return (dispatch) => {
   return Promise.all(endpoints.map(url =>
      fetch(url).then(resp => resp.json())
    ))
    .then(array => prepareItems(array))
    .then(json => dispatch(receiveItems(searchStr, json)));
  };
}

function updateSrcString(searchStr) {
  return {
    type: UPDATE_SRC,
    searchStr,
  };
}

function requestItems(searchStr) {
  return {
    type: REQUEST_ITEMS,
    searchStr,
  };
}

function receiveItems(searchStr, items) {
  return {
    type: RECEIVE_ITEMS,
    searchStr,
    items,
    receivedAt: Date.now(),
  };
}

function compareNames(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function prepareItems(array) {
  let combined = [];
  array.forEach((item) => {
    combined = combined.concat(item.results);
  });

  return combined.map((item) => {
    if (Object.hasOwnProperty.call(item, 'episode_id')) {
      return {
        type: 'film',
        name: item.title,
        episode_id: item.episode_id,
        director: item.director,
        producer: item.producer,
        release_date: item.release_date,
      };
    } else if (Object.hasOwnProperty.call(item, 'model')) {
      return {
        type: 'starship',
        name: item.name,
        model: item.model,
        hyperdrive_rating: item.hyperdrive_rating,
        manufacturer: item.manufacturer,
      };
    } else if (Object.hasOwnProperty.call(item, 'classification')) {
      return {
        type: 'species',
        name: item.name,
        classification: item.classification,
        designation: item.designation,
        language: item.language,
      };
    } else if (Object.hasOwnProperty.call(item, 'orbital_period')) {
      return {
        type: 'planet',
        name: item.name,
        gravity: item.gravity,
        terrain: item.terrain,
        population: item.population,
      };
    }
    return {
      type: 'person',
      name: item.name,
      gender: item.gender,
      height: item.height,
      mass: item.mass,
    };
  }).sort(compareNames);
}
var count = 0;
var count = 0;
var start = new Date().getTime();
var end = new Date().getTime();

setInterval(function(){
  count = 0;
  start = new Date().getTime();
  end = new Date().getTime();
  console.log('count reset: 0' )
 },10000);

function fetchAllItems(searchStr) {
  const endpoints = [
    `https://swapi.co/api/planets/?search=${searchStr}`
  ];
    
  if( (end - start) < 10000 && count > 15 ){
    alert('search exceeds');
    return false;
  }
  count++;
  console.log('count is:' + count )
  end = new Date().getTime();
  
  return (dispatch) => {
    dispatch(updateSrcString(searchStr));
    dispatch(requestItems(searchStr));
    return Promise.all(endpoints.map(url =>
      fetch(url).then(resp => resp.json())
    ))
    .then(array => prepareItems(array))
    .then(json => dispatch(receiveItems(searchStr, json)));
  };
}

function shouldFetchItems(state, searchStr) {
  const posts = state.itemsBySearchString[searchStr];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return false;
}

export function fetchItemsIfNeeded(searchStr) {
  return (dispatch, getState) => {
    if (shouldFetchItems(getState(), searchStr)) {
      return dispatch(fetchAllItems(searchStr));
    }
    return dispatch(updateSrcString(searchStr));
  };
}
