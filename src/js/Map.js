const api = require('./API.js')
function geoLocation () {
  return new Promise(function (resolve) {
    ymaps.geolocation.get({provider: 'auto'})
        .then(function (result) {
        resolve(result.geoObjects.position);
      });
    })
  }
async function openBalloon (coords) {
  ymaps.map.balloon.open(coords, 'Загрузка..', { closeButton: true });
  const comments = await api.getPlacmark(coords);
 const address = await geoCoder(coords)
      const data = {
        address,
        coords,
        comments
    // { name: 'Сергей Мелюков', place: 'Красный куб', date: '12.12.2015', text: 'Ужасное место! Кругом зомби!!!!' },
    // { name: 'svetlana', place: 'Шоколадница', date: '13.12.2015', text: 'Очень хорошее место!' },
    // { name: 'Stelios Baglaridis', place: 'Кафе-бар "Calypso"', date: '20.10.2019', text: 'Очень хорошее место!' },
      };
      ymaps.map.balloon.open(coords, data, { layout: 'my#customBalloonLayout' });
    };

function clusterer () {
  ymaps.clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    // clusterBalloonItemContentLayout: 'my#clustererItemLayout',
  });


ymaps.map.geoObjects.add(ymaps.clusterer)
}
function createPlacemarks (placemarks = {}) {
  for (let placemark in placemarks) {
    const coords = placemark.split(",");
    const data = placemarks[placemark];

    ymaps.clusterer.add(new ymaps.Placemark(coords, data))
  }
}
function geoCoder (coords) {
  return new Promise(function (resolve) {
  new ymaps.geocode(coords, { results: 1 })
    .then(function (result) {
      resolve(result.geoObjects.get(0).properties.get('name'))
    });
  })
}

module.exports = {
  geoLocation,
  openBalloon,
  clusterer,
  createPlacemarks,
  geoCoder
}
