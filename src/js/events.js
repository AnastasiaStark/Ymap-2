
const interactiveMap = require('./Map')
function OnMapClick (e) {
  console.log('onMapClick');
}

function OnGeoObjectsClick (e) {
  const target = e.get('target');
  const coords = target.geometry.getCoordinates();
  const geoObjects = target.properties.get('geoObjects');

  if(!geoObjects) {
    interactiveMap.openBalloon(coords);
  }

  console.log('OnGeoObjectsClick');
}

async function onDomClick(e) {
  e.preventDefault();
  switch (e.target.dataset.role) {
    case 'review-close':
      ymaps.map.balloon.close();
      break;
    case 'clusterer-link':
      const coords = e.target.dataset.coords.split(",");
      interactiveMap.openBalloon(coords)
      break;
    case 'review-submit':
      const response = await dom.getForm();

      if (response) {
        interactiveMap.createPlacemarks(response)
      }
      break;
  }
}

function click () {
ymaps.map.events.add('click', OnMapClick);
ymaps.map.geoObjects.events.add('click', OnGeoObjectsClick);
document.body.addEventListener('click', onDomClick);
}


module.exports = {
click
}
