import axios from "axios";
import {
  GET_LOCATION,
  GET_RESTAURANTS,
  GET_HOTELS,
  GET_FLIGHTS,
  API_LOADING
} from "./types";

export const apiLoading = () => dispatch => {
  dispatch({
    type:API_LOADING
  })
}
export const getLocation = (location) => (dispatch) => {
  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/locations/search",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "03b848afb0msha995cacabbffb63p1efedbjsnc5cedc2e29a9",
      useQueryString: true,
    },
    params: {
      location_id: "1",
      limit: "30",
      sort: "relevance",
      offset: "0",
      lang: "en_US",
      currency: "PKR",
      units: "km",
      query: location,
    },
  })
    .then((res) => {
      dispatch({
        type: GET_LOCATION,
        payload: res.data.data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getHotels = (data) => (dispatch) => {
  dispatch(apiLoading());
  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/locations/search",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "03b848afb0msha995cacabbffb63p1efedbjsnc5cedc2e29a9",
      useQueryString: true,
    },
    params: {
      location_id: "1",
      limit: "30",
      sort: "relevance",
      offset: "0",
      lang: "en_US",
      currency: "PKR",
      units: "km",
      query: data.location,
    },
  })
    .then((res) => {
      axios({
        method: "GET",
        url: "https://tripadvisor1.p.rapidapi.com/hotels/list",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key":
            "e7ef4b7f4fmsha84c81451e000f5p1cc531jsnfbb458282400",
          useQueryString: true,
        },
        params: {
          offset: "0",
          currency: "PKR",
          limit: "30",
          order: "asc",
          lang: "en_US",
          sort: "recommended",
          location_id: res.data.data[0].result_object.location_id,
          adults: "1",
          checkin: data.checkin,
          rooms: "1",
          nights: "2",
        },
      })
        .then((res) => {
          dispatch({
            type: GET_HOTELS,
            payload: res.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getRestaurants = (location) => (dispatch) => {
  dispatch(apiLoading());

  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/locations/search",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "03b848afb0msha995cacabbffb63p1efedbjsnc5cedc2e29a9",
      useQueryString: true,
    },
    params: {
      location_id: "1",
      limit: "30",
      sort: "relevance",
      offset: "0",
      lang: "en_US",
      currency: "PKR",
      units: "km",
      query: location,
    },
  })
    .then((res) => {
      axios({
        method: "GET",
        url: "https://tripadvisor1.p.rapidapi.com/restaurants/list",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key":
            "03b848afb0msha995cacabbffb63p1efedbjsnc5cedc2e29a9",
          useQueryString: true,
        },
        params: {
          restaurant_tagcategory_standalone: "10591",
          lunit: "km",
          restaurant_tagcategory: "10591",
          limit: "30",
          currency: "PKR",
          lang: "en_US",
          location_id: res.data.data[0].result_object.location_id,
        },
      })
        .then((res) => {
          dispatch({
            type: GET_RESTAURANTS,
            payload: res.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const bookFlight = (data) => (dispatch) => {
  dispatch(apiLoading());

  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/airports/search",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "e7ef4b7f4fmsha84c81451e000f5p1cc531jsnfbb458282400",
      useQueryString: true,
    },
    params: {
      locale: "en_US",
      query: data.flightFrom,
    },
  })
    .then((res1) => {
      axios({
        method: "GET",
        url: "https://tripadvisor1.p.rapidapi.com/airports/search",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key":
            "e7ef4b7f4fmsha84c81451e000f5p1cc531jsnfbb458282400",
          useQueryString: true,
        },
        params: {
          locale: "en_US",
          query: data.flightTo,
        },
      })
        .then((res2) => 
        {
          console.log(data)
          axios({
            method: "GET",
            url: "https://tripadvisor1.p.rapidapi.com/flights/create-session",
            headers: {
              "content-type": "application/octet-stream",
              "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
              "x-rapidapi-key":
                "03b848afb0msha995cacabbffb63p1efedbjsnc5cedc2e29a9",
              useQueryString: true,
            },
            params: {
              currency: "PKR",
              ta: data.flightTravellors,
              c: "0",
              d1: res2.data[0].code,
              o1: res1.data[0].code,
              dd1: data.flightDepart,
            },
          })
            .then((res3) => {
              axios({
                method: "GET",
                url: "https://tripadvisor1.p.rapidapi.com/flights/poll",
                headers: {
                  "content-type": "application/octet-stream",
                  "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                  "x-rapidapi-key":
                    "03b848afb0msha995cacabbffb63p1efedbjsnc5cedc2e29a9",
                  useQueryString: true,
                },
                params: {
                  currency: "PKR",
                  n: "15",
                  ns: "NON_STOP%2CONE_STOP",
                  so: "PRICE",
                  o: "0",
                  sid: res3.data.search_params.sid,
                },
              })
                .then((res4) => {
                  axios({
                    method: "GET",
                    url:
                      "https://tripadvisor1.p.rapidapi.com/flights/get-booking-url",
                    headers: {
                      "content-type": "application/octet-stream",
                      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                      "x-rapidapi-key":
                        "e7ef4b7f4fmsha84c81451e000f5p1cc531jsnfbb458282400",
                      useQueryString: true,
                    },
                    params: {
                      searchHash: res3.data.summary.sh,
                      Dest: res2.data[0].code,
                      id: res4.data.itineraries[0].l[0].id,
                      Orig: res1.data[0].code,
                      searchId: res3.data.search_params.sid,
                    },
                  })
                    .then((res5) =>
                      dispatch({
                        type: GET_FLIGHTS,
                        payload: res5.data,
                      })
                    )
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
// export const getRestaurants = locationId => dispatch => {
//   axios({
//     "method":"GET",
//     "url":"https://tripadvisor1.p.rapidapi.com/restaurants/list",
//     "headers":{
//     "content-type":"application/octet-stream",
//     "x-rapidapi-host":"tripadvisor1.p.rapidapi.com",
//     "x-rapidapi-key":"fca2cf2d13msh7a82b7fe587bf5cp109cbajsn6a959d485a68",
//     "useQueryString":true
//     },"params":{
//     "restaurant_tagcategory_standalone":"10591",
//     "lunit":"km",
//     "restaurant_tagcategory":"10591",
//     "limit":"30",
//     "currency":"PKR",
//     "lang":"en_US",
//     "location_id":locationId
//     }
//     })
//     .then(res => dispatch({
//       type: GET_RESTAURANTS,
//       payload: res.data.data
//     }))
//     .catch(err=> console.log(err))
// }
