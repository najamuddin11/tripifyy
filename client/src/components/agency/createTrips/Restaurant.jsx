import React, { Component } from "react";
import {
  MDBRow,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBCol,
  MDBBtn,
} from "mdbreact";

import StarRatings from "react-star-ratings";

export default class Hotel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { restaurant } = this.props;
    return (
      <div>
        <div className="pb-3 pt-3">
          <MDBRow>
            <MDBCol md="6">
              <MDBCarousel
                activeItem={1}
                length={1}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
              >
                <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                    <MDBView>
                      <img
                        className="d-block w-100"
                        src={
                          restaurant &&
                          restaurant.photo &&
                          restaurant.photo.images &&
                          restaurant.photo.images.original &&
                          restaurant.photo.images.original.url
                        }
                        alt="First slide"
                      />
                      <MDBMask overlay="black-light" />
                    </MDBView>
                  </MDBCarouselItem>
                </MDBCarouselInner>
              </MDBCarousel>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex flex-column justify-content-between h-100">
                <div>
                  <h4>{restaurant.name}</h4>

                  <div className="mb-2">address: {restaurant.address}</div>
                </div>
                <div className="d-flex flex-column">
                  <span>
                    <h5>phone: {restaurant.phone}</h5>
                  </span>
                  <span>
                    {restaurant.email && <h5>email: {restaurant.email}</h5>}
                  </span>
                  <span>
                    {restaurant.price && <h5>email: {restaurant.price}</h5>}
                  </span>
                  <div className="d-flex align-items-center">
                    <span>
                      <StarRatings
                        rating={4.2}
                        starDimension="28px"
                        starSpacing="0px"
                        starRatedColor="#FFC007"
                      />
                    </span>
                    <span className="ml-2">
                      {restaurant.num_reviews} reviews
                    </span>
                    <span>
                    <a href={`https://www.tripadvisor.com/Restaurant_Review-g186338-d${restaurant.location_id}`} className="blue-text" target='_blank'>
                        Book
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
        <hr />
      </div>
    );
  }
}
