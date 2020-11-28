const container = document.querySelector('#map');
const interactiveMap = require('./js/Map')
const events = require('./js/events')
const API = require('./js/API')

ymaps.ready(async () => {
  console.log('Yandex map ready');
  const customBalloonTemplate = document.getElementById('customBalloonTemplate').innerHTML;
  const customClustererItemLayout = document.getElementById('customClustererItemLayout').innerHTML;
  const balloonTemplate = ymaps.templateLayoutFactory.createClass(customBalloonTemplate);

  const clustererItemLayout = ymaps.templateLayoutFactory.createClass(customClustererItemLayout);

  ymaps.layout.storage.add('my#customBalloonLayout',balloonTemplate);
  ymaps.layout.storage.add('my#clustererItemLayout',clustererItemLayout);

  try {
    const coords = await interactiveMap.geoLocation()
          container.innerHTML = "";

          ymaps.map = new ymaps.Map(container, {
            center: coords,
            zoom: 12,
            controls: ['zoomControl'],
            behavior: ['drag']
          });

    const placemarks = await API.getPlacmarks();
          interactiveMap.clusterer();
          interactiveMap.createPlacemarks(placemarks)

          events.click();

  } catch (error) {
    console.log(error);
  }
});

