import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as YelpAPI from './data/YelpAPI.js';
import SideBar from './sidebar.js';
import Map from './map.js';
import InfoPage from './infopage.js';
import Footer from './footer.js';
import image1 from './images/stars/small_1.png';
import image2 from './images/stars/small_1_half.png';
import image3 from './images/stars/small_2.png';
import image4 from './images/stars/small_2_half.png';
import image5 from './images/stars/small_3.png';
import image6 from './images/stars/small_3_half.png';
import image7 from './images/stars/small_4.png';
import image8 from './images/stars/small_4_half.png';
import image9 from './images/stars/small_5.png';

class App extends Component {
  state = {
    places: [],
    center: {}
  }

  // API Call to the Yelp API
  componentDidMount() {
    YelpAPI.get().then((data) => {
      this.setState({ places: data })
    }).then((data) => {
      this.setState({ center: {lat: 35.2174,lng: -80.8424} })
    }).then(data => console.log('DONE'))
      .catch(err => console.log('Something Went Wrong'))
  }

  // Switch Statement to show Yelp star rating
  showStars = (x) => {
    let stars = '';

    switch(x.rating) {
      case 1:
        if (x.rating === 1) {
          stars = <img src={image1} alt='1 star rating'/>;
        }
        break;
      case 1.5:
        if (x.rating === 1.5) {
          stars = <img src={image2} alt='1.5 star rating'/>;
        }
        break;
      case 2:
        if (x.rating === 2) {
          stars = <img src={image3} alt='2 star rating'/>;
        }
        break;
      case 2.5:
        if (x.rating === 2.5) {
          stars = <img src={image4} alt='2.5 star rating'/>;
        }
        break;
      case 3:
        if (x.rating === 3) {
          stars = <img src={image5} alt='3 star rating'/>;
        }
        break;
      case 3.5:
        if (x.rating === 3.5) {
          stars = <img src={image6} alt='3.5 star rating'/>;
        }
        break;
      case 4:
        if (x.rating === 4) {
          stars = <img src={image7} alt='4 star rating'/>;
        }
        break;
      case 4.5:
        if (x.rating === 4.5) {
          stars = <img src={image8} alt='4.5 star rating'/>;
        }
        break;
      case 5:
        if (x.rating === 5) {
          stars = <img src={image9} alt='5 star rating'/>;
        }
        break;
      default:
        break;
    }
    return stars;
  }

  // Opens & Closes Hamburger Menu when displayed
  openMenu = () => {
    document.querySelector('.menu-icon-holder').addEventListener('click', (e) => {
      document.querySelector('.side-menu').classList.toggle('open');
      e.stopPropagation();
      console.log('click');
    });
    document.querySelector('.header-container').addEventListener('click', function() {
      document.querySelector('.side-menu').classList.remove('open');
    });
    document.querySelector('.neighborhood-map').addEventListener('click', function() {
      document.querySelector('.side-menu').classList.remove('open');
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div className='container'>
            <div className='header-container' aria-describedby='header'>
              <div className='menu-icon-holder' onClick={this.openMenu}>
                <img className='menu-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAASFBMVEX///8AAABERERbW1sFBQXm5ubl5eWcnJxxcXH8/Pw7Ozt0dHStra3MzMw4ODgLCwuQkJDt7e0UFBS0tLTDw8PT09M/Pz/Ly8vJMQbVAAABgElEQVR4nO3aW3KCQBBAUaISVHxHk/3vNFqWvwMyH0OP56ygu0DF4TYNAAAAAAAAAAAwSdutl4sQluuufWu13eErlMNu9Gr7YKs9bG8jL9ux9KRTHEddvK70mFN1w7tdV6WHnGp1HdrtfCk943SX88By69IT5ujTu32HvSkfVt/J5U6l58tzSi73W3q8PIvUbpvQd+X9vtykPnKlp8uVesr8Kz1crn1iuX3p4XKllmtLD5crdVtW/YVS9U9B3T/iVT9+NX3pAXMMPDjX/Zen6j+rdR8zNM1PxQdETXPblp70fWOP9u52wdbbjj+UfWi7Pspxev/mcToAAAAAADCC9H42pPfPy1bxm9Wa34nXXDNU3aFI7+dKeh+W9D4s6X1U0vugpPdRSe+Dkt7HJL2X3s+N9P5Feg8AAAAAAJ9Nej8b0vvnZav4zWrN78Rrrhmq7lCk93MlvQ9Leh+W9D4q6X1Q0vuopPdBSe9jkt5L7+dGev8ivQcAAAAAAAAAgE/wD79YTGD161/7AAAAAElFTkSuQmCC' alt='menu icon' aria-label='menu' tabIndex='0'/>
              </div>
              <h1 className='header' id='header' tabIndex='-1'>Welcome to South End, Charlotte</h1>
            </div>
            <SideBar
              places={this.state.places}
            />
            <Map
              places={this.state.places}
              center={this.state.center}
            />
            <Footer />
          </div>
        )}/>
        <div>
          {this.state.places.map(place =>
            <Route exact path={`/info/${place.alias}`} key={place.id} render={() => (
              <InfoPage
                places={this.state.places}
                place={place}
                showStars={this.showStars}
              />
            )}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
