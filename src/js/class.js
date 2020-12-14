//создаем класс

export default class Weather {
  constructor(objRefs) {
    this.objRefs = objRefs;
  }

  getFetch(cityName) {
    let apiKey = "4cdf2c68c45a1931ec2e0231bad7ece5"; //получаем ключ по АПИ с сайта https://home.openweathermap.org/api_keys

    const {
      input,
      weatherWrap,
      city,
      temp,
      flex,
      humidity,
      wind,
    } = this.objRefs; // деструктуризация с безымянного экспорта

    //Вызов API для получения юрла по названию города --- https://home.openweathermap.org/api_keys
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    flex.innerHTML = ""; //очищаем контейнер после ввода данных
    input.value = ""; //очищаем инпут после ввода данных

    let result = fetch(url)
      .then((response) => {
        if (!response.ok) return alert("Введите коректный город");
        return response.json();
      })
      .then((data) => {
        // console.log(data); // проверяем доступ к обекту, с которго будем брать все данные

        weatherWrap.classList.remove("loading"); //убираем класс hidden с контейнера, чтобы он стал видимым для вывода данных о погоде
        city.textContent = `Weather in ${data.name}`; //получаем название города
        let celc = Math.round(data.main.temp - 273.15); //данные о температуре, переводим с фарингейтов в цельсии и округляем до целого числа
        temp.textContent = `${celc}°C`; //подставляем температуру в цельсиях

        // создаем динамически див с иконкой iconData
        const iconData = data.weather.map((el) => {
          const img = document.createElement("img"); //создаем элемент иконки
          img.src = `https://openweathermap.org/img/wn/${el.icon}.png`; //в юрл иконки по шаблону подставляем данные
          img.alt = el.description;
          img.classList.add("icon");

          const div = document.createElement("div"); //создаем див для вывода инфы об иконке(Cloudy, Rain, Sun и тд)
          div.classList.add("description");
          div.textContent = el.description;
          // console.dir(div);
          div.append(img);
          return div;
        });

        //встраиваем в пустой контейнер flex наш див с иконкой iconData
        flex.prepend(...iconData);

        humidity.textContent = `Humidity: ${data.main.humidity}%`; //добавляем данные о влажности с основного объекта data
        wind.textContent = `Wind speed: ${data.wind.speed} km/h`; //добавляем данные о скорости ветра с основного объекта data
      })
      .catch((error) => {
        console.error(`Опаньки, что-то пошло не так`, error); //добавляем проверку на ошибку ввода данных в поле инпут и выводим эту ошибку в консоль
      });
    return result;
  }
}
