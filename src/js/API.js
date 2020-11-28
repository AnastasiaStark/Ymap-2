  const database = {
    "55.862467, 37.436672": [
      { name: 'Сергей Мелюков', place: 'Eapteca', date: '12.12.2019', text: 'Оличная аптека, хорошие цены!!!!' },
      { name: 'svetlana', place: 'Шаурма', date: '24.11.2020', text: 'Шаурма ужасная, как-будто из кота..!' },
      { name: 'Evgeniy', place: 'Почта-Банк"', date: '20.10.2019', text: 'Стоял в очереди 3 часа' },
    ],
    "55.863345, 37.434605":  [
      { name: "Сергей", place: "Кофемания", text: "Очень вкусно" },
      { name: "Андрей", place: "Кофемания", text: "Согласен с Сергеем" }
    ],
  };

  localStorage.setItem('placemarks', JSON.stringify(database));

  const delay = 500;

  function _toString (coords) {
    if(Array.isArray(coords)) {
      coords = coords.join(",");
    }

    return coords;
  }

  function getPlacmarks () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem('placemarks')));
      }, delay)
    });
  }

  async function getPlacmark (coords) {
    coords = _toString(coords);

    const placemarks = JSON.parse(localStorage.getItem('placemarks'));
    const placemark = placemarks[coords] ? placemarks[coords] : null;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(placemark)
      }, delay)
    });
  }

  async function setPlacmark (coords, payload) {
    coords = _toString(coords);

    const placemarks = JSON.parse(localStorage.getItem('placemarks'));
    let status = false;

    if (placemarks[coords]) {
      placemarks[coords].push(payload);
    } else {
      placemarks[coords] = [payload];
      status = true;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem('placemarks', JSON.stringify(placemarks));
        resolve(status ? { [coords]: placemarks[coords] } : null);
      }, delay)
    });
  }

  module.exports = {
    getPlacmarks,
    getPlacmark,
    setPlacmark
  }
