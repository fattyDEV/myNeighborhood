import React, { Component } from 'react';
import * as YelpAPI from './data/YelpAPI.js';
import logo from './images/Yelp_trademark_RGB_outline.png';
import Footer from './footer.js';

class InfoPage extends Component {
  state ={
    reviews: []
  }

  // API call to Yelp API to get reviews for each location
  componentDidMount() {
    YelpAPI.getReviews(this.props.place).then((data) => {
      this.setState({ reviews: data })
    }).catch(err => console.log('Something Went Wrong'))
  }

  // converts date review was submitted to MM-DD-YYYY format
  getDate = (x) => {
    let date = new Date(x.time_created);

    return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
  }

  render() {
    return (
      <div>
        {this.props.places.filter(place =>
          place.id === this.props.place.id).map(place =>
            <div className='info-container' key={place.id}>
              <div className='info-header'>
                <h1 className='info-header-title' tabIndex='0'>{place.name}</h1>
              </div>
              <main className='info-main' tabIndex='0'>
                <div className='info-main-top'>
                  <div className='info-photo'>
                    <img className='info-photo-image' src={place.image_url} alt='restaurant' />
                  </div>
                  <div className='info-address'>
                    <div className='address-holder'>
                      <h2 className='info-address-heading' tabIndex='0'>Address:</h2>
                      <p className='info-address-line' tabIndex='0'>{place.location.address1}</p>
                      <p className='info-address-line' tabIndex='0'>{`${place.location.city}, NC ${place.location.zip_code}`}</p>
                      <p className='info-phone' tabIndex='0'>{place.display_phone}</p>
                    </div>
                    <div className='info-rating'>
                      <h2 className='rating-heading' tabIndex='0' aria-label='Yelp rating'>Yelp Rating:</h2>
                      <p className='rating-stars' tabIndex='0'>{this.props.showStars(place)}</p>
                      <p className='rating-count' tabIndex='0'>Based on {place.review_count} reviews</p>
                    </div>
                  </div>
                </div>
                <div className='info-reviews' aria-label='Yelp Reviews' tabIndex='0'>
                  <h2 className='info-reviews-heading' tabIndex='0'>Reviews:</h2>
                  <ul className='reviews-list'>
                  {this.state.reviews.map(review =>
                    <li key={review.id} tabIndex='0'>
                      <p>{this.props.showStars(review)} on {this.getDate(review)}</p>
                      <p>{review.text}</p>
                    </li>
                  )}
                  </ul>
                  <p className='yelp-reviews-link'><a href={place.url} target='_blank' aria-label='read more reviews on yelp'>Read More</a></p>
                </div>
                <div className='bottom-logo'>
                  <a href={place.url} target='_blank'><img className='yelp-logo-2' src={logo} alt='yelp logo' aria-label='link to yelp page'/></a>
                </div>
              </main>
            </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default InfoPage;
