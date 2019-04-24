import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import image1 from './images/stars/small_1.png';
import image2 from './images/stars/small_1_half.png';
import image3 from './images/stars/small_2.png';
import image4 from './images/stars/small_2_half.png';
import image5 from './images/stars/small_3.png';
import image6 from './images/stars/small_3_half.png';
import image7 from './images/stars/small_4.png';
import image8 from './images/stars/small_4_half.png';
import image9 from './images/stars/small_5.png';
import logo from './images/Yelp_trademark_RGB_outline.png';

class Map extends Component {
  // Create markers based off location & data in places array
  createMarkers = (map, maps) => {
    let places = this.props.places;
    let infoWindow = new maps.InfoWindow();

    for (var i in places) {
      let latLng = {lat: places[i].coordinates.latitude, lng: places[i].coordinates.longitude};
      let name = places[i].name;
      let address = places[i].location.address1;
      let city = places[i].location.city;
      let zip = places[i].location.zip_code;
      let reviews = places[i].review_count;
      let website = `<a href=${places[i].url} target='_blank'><img className='yelp-logo' src=${logo} alt='yelp logo'></a>`;
      let stars = '';

      let marker = new maps.Marker({
        position: latLng,
        title: name,
        map,
        animation: maps.Animation.DROP,
        id: i,
      });

      // Creates infowindow content
      let infoWindowContent =
        `<div className='info-window'>
          <div className='info-window-details'>
            <h3>${name}</h3>
            <p>${address}</p>
            <p>${city}, NC ${zip}</p>
          </div>
          <div className='yelp-website'>${website}</div>
          <div className='info-window-stars'>
            <p>${stars}</p>
            <p>Based on ${reviews} Reviews</p>
          </div>
        </div>`

      // switch state to show Yelp star rating in infowindow
      switch(places[i].rating) {
        case 1:
          if (places[i].rating === 1) {
            stars = `<img src=${image1} alt='1 star rating'/>`;
          }
          break;
        case 1.5:
          if (places[i].rating === 1.5) {
            stars = `<img src=${image2} alt='1.5 star rating'/>`;
          }
          break;
        case 2:
          if (places[i].rating === 2) {
            stars = `<img src=${image3} alt='2 star rating'/>`;
          }
          break;
        case 2.5:
          if (places[i].rating === 2.5) {
            stars = `<img src=${image4} alt='2.5 star rating'/>`;
          }
          break;
        case 3:
          if (places[i].rating === 3) {
            stars = `<img src=${image5} alt='3 star rating'/>`;
          }
          break;
        case 3.5:
          if (places[i].rating === 3.5) {
            stars = `<img src=${image6} alt='3.5 star rating'/>`;
          }
          break;
        case 4:
          if (places[i].rating === 4) {
            stars = `<img src=${image7} alt='4 star rating'/>`;
          }
          break;
        case 4.5:
          if (places[i].rating === 4.5) {
            stars = `<img src=${image8} alt='4.5 star rating'/>`;
          }
          break;
        case 5:
          if (places[i].rating === 5) {
            stars = `<img src=${image9} alt='5 star rating'/>`;
          }
          break;
        default:
          break;
      }

      // event listeners for selecting locations on map & to show buttons with corresponding location
      marker.addListener('click', function() {
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseover', function() {
        this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      });

      marker.addListener('mouseout', function() {
        this.setIcon();
      });

      document.getElementById(`${name}`).addEventListener('mouseover', function() {
        if (this.id === marker.title) {
          marker.setAnimation(maps.Animation.BOUNCE);
        }
      })

      document.getElementById(`${name}`).addEventListener('mouseout', function() {
        if (this.id === marker.title) {
          marker.setAnimation(null);
        }
      })
    }
  }

  render() {
    return (
        <div className='neighborhood-map' aria-hidden='true' aria-disabled='true'>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyCyP0jmfT_Ahfoj1EvzsAghU4vGMiWImzk' }}
          center={this.props.center}
          defaultZoom={14}
          onGoogleApiLoaded={({map, maps}) => this.createMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        />
      </div>
    );
  }
}

export default Map;


window.gm_authFailure = () => {
  console.log("ERROR")
  alert('Map was unable to load.')

  let map = document.querySelector('.neighborhood-map');
  let errMess = document.createElement('p');
  let errPhoto = document.createElement('img');

  errPhoto.classList.add('err-cat');
  errPhoto.src = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350';
  errPhoto.alt = 'Cat picture';
  errMess.classList.add('map-load-error');
  errMess.textContent = 'We are sorry, it appears our map is taking a nap, but here is a picture of a cat';

  map.removeChild(map.firstChild);
  map.appendChild(errMess);
  map.appendChild(errPhoto);
}
