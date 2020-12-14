import css from "./css/styles.css";
import Weather from "./js/class.js"; //классы
// import "./js/fetch.js";        //функция
import refs from "./js/refs.js"; //доступы

//выносим в главный файл конструктор класса и слушатели событий для переиспользования в дальнейшем
const { input, inputBtn } = refs;

const myWeather = new Weather(refs);

inputBtn.addEventListener("click", () => {
  if (!input.value) return;
  myWeather.getFetch(input.value);
});

input.addEventListener("keyup", (event) => {
  if (!input.value) return;
  if (event.key === "Enter") {
    myWeather.getFetch(input.value);
  }
});
