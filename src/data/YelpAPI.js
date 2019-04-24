const api = 'https://api.yelp.com/v3/businesses';

const headers = {
  'authorization': 'Bearer u8EVfbWz7mULNNHxvktQYLrr749XUNiFptjgHxb_31Ld1ir407TRFvACeSMmsMUAzJRVKF6GsT6jbYNYZ6Wp9ynDwj2Gc9ClidTYYP2goPHLwquEw4IiYZguNim-W3Yx',
  'Content-Type': 'application/json'
};

export const get = () =>
  fetch(`https://cors-anywhere.herokuapp.com/${api}/search?location=28203&limit=50`, { headers })
    .then(res => res.json())
    .catch(err => console.log('Oops...Something went wrong'))
    .then(data => data.businesses)
    .catch(err => alert('Website Currently Unavailable.'))

export const getReviews = (place) =>
  fetch(`https://cors-anywhere.herokuapp.com/${api}/${place.id}/reviews`, { headers })
    .then(res => res.json())
    .catch(err => 'Oops...Something went wrong')
    .then(data => data.reviews)
    .catch(err => alert('Oops, something went wrong.'))
