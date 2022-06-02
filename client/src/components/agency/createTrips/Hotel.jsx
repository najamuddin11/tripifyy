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
import { Link } from "react-router-dom";

export default class Hotel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { hotel } = this.props;
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
                          hotel &&
                          hotel.photo &&
                          hotel.photo.images &&
                          hotel.photo.images.original &&
                          hotel.photo.images.original.url
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
                  <h4>{ hotel.name}</h4>

                  <div className="mb-2">{hotel.ranking}</div>
                </div>
                <div className="d-flex flex-column">
                  <span>
                    <h5>Price: {hotel.price}</h5>
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
                      {hotel.num_reviews} reviews
                    </span>
                    <span>
                      <a href={`https://www.tripadvisor.com/Hotel_Review-g186338-d${hotel.location_id}`} className="blue-text" target='_blank'>
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
