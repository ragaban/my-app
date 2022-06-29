<template>
  <div class="container about">
    <div class="row">
      <div class="col-sm-4 t-left">
        <p class="tittle-left">ANTON PARFILO</p>
        <div class="my-photo">
          <img src="@/res/view1.png" alt="My Photo" />
        </div>
        <div class="profile">
          <p class="tittle-left">Профиль</p>
          <ul class="my-list">
            <li>
              <span class="span-color">ФИО - </span>Парфило Антон Александрович
            </li>
            <li><span class="span-color">Дата рождения - </span>11.05.1990</li>
            <li><span class="span-color">Возраст - </span>32 года</li>
            <li>
              <span class="span-color">Место проживания - </span>Харьков,
              Украина
            </li>
          </ul>
        </div>
        <div class="profile">
          <p class="tittle-left">Навыки</p>
          <ul class="skills">
            <li>
              <span class="span-color-left">HTML/CSS</span>
            </li>
            <li><span class="span-color-left">JavaScript</span></li>
            <li><span class="span-color-left">Vue.js</span></li>
            <li>
              <span class="span-color-left">PHP</span>
            </li>
            <li>
              <span class="span-color-left">MySQL</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-8 t-right">
        <p class="tittle-right-left">Обо мне</p>
        <p>
          Мой первый опыт начался еще в 2015 году. Было интересно как работает
          WEB. Начал знакомиться с HTML, CSS, JavaScript по различным видео
          курсам. Верстал странички, лендинги, ради собственного интереса.
        </p>
        <p>
          Позже начал изучать PHP+MySQL. Реализовывал множество различных
          Backend задач на PHP - регистрация, авторизация, сортировка и
          фильтрация данных из БД, работа с почтовыми API сервисами, парсеры
          контента и прочие. Косвенно знаком c такими CMS как WordPress, Joomla,
          DataLifeEngine, OpenCart, vBulletin.
        </p>
        <p>
          Сейчас изучаю фреймворк Vue.js, собственно на нём и написано это
          приложение.
        </p>

        <p></p>
        <p class="tittle-right-right">Опыт работы</p>
        <ul class="my-list-right">
          <li>BRIG</li>
          <li>2012-2022</li>
          <li>Харьков, Украина.</li>
        </ul>
        <p>
          Работал на фирме <a href="http://brigboats.com/">BRIG</a>. 10 лет
          профессионально занимался формовкой стеклопластика. В связи с
          событиями в стране, 24 февраля 2022 года потерял работу.
        </p>
        <p class="tittle-right-left">Образование</p>
        <ul class="my-list">
          <li>ХПЛМ</li>
          <li>2005-2008</li>
          <li>Харьков, Украина.</li>
        </ul>
        <p>
          Имею среднее техническое образование. К компьютерным технологиям никак
          не относится.
        </p>
        <p class="tittle-right-right">Моя цель</p>
        <p>
          Сейчас моя цель - найти практику для оттачивания своих навыков.
          Набраться опыта в сфере разработки WEB приложений. В будущем - стать
          топовым разработчиком.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.overflow = "visible";
    document.body.style.backgroundImage =
      "url('http://antoxa106.pp.ua/img/theme1.2df66317.jpg')";
  },
};
</script>

<style scoped>
.about {
  color: #fff;
}
.t-left {
  border-right: 1px solid white;
  background-color: rgb(3, 74, 77);
  padding: 20px;
}
.t-right {
  padding: 20px;
  background-color: rgb(42, 42, 42);
  background: rgba(0, 0, 0, 0.95);
}
.tittle-left {
  padding-right: 5px;
  padding-left: 5px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  width: fit-content;
  color: rgb(154, 245, 249);
  border-bottom: 1px solid #fff;
  font-family: "Times New Roman", Times, serif;
}
.skills {
  padding: 0px;
  list-style-type: none;
}
.skills li::before {
  margin-right: 5px;
  content: "➤";
  color: #fff;
}
.my-photo img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  margin-bottom: 25px;
}
.tittle-right-left {
  position: relative;
  left: -20px;
  padding-right: 50px;
  padding-left: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  width: fit-content;
  color: #ccc;
  font-family: "Times New Roman", Times, serif;
  background: rgb(3, 74, 77);
  background: linear-gradient(
    90deg,
    rgba(3, 74, 77, 1) 0%,
    rgba(2, 3, 4, 1) 100%
  );
}
.tittle-right-right {
  margin: 0 0 15px auto;
  position: relative;
  right: -20px;
  padding-right: 25px;
  padding-left: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  width: fit-content;
  color: #ccc;
  font-family: "Times New Roman", Times, serif;
  background: rgb(3, 74, 77);
  background: rgb(2, 3, 4);
  background: linear-gradient(90deg, rgba(2, 3, 4, 1) 0%, rgb(3, 74, 77) 100%);
}
.my-list {
  padding-left: 0px;
  color: rgb(241, 247, 247);
}
.my-list-right {
  width: fit-content;
  display: block;
  color: rgb(6, 190, 196);
  margin: 0 0 15px auto;
}
.my-list li,
.my-list-right li {
  list-style-type: none;
}
.my-list li::before,
.my-list-right li::before {
  margin-right: 5px;
  content: "★";
  color: #fff;
}
</style>
