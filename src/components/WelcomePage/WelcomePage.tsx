import './WelcomePage.css';
import ImageOne from '../../assets/jpg/heroWelcome.jpg';
import ImageTwo from '../../assets/svg/el1.svg';
import ImageThree from '../../assets/svg/el2.svg';
import ImageFour from '../../assets/svg/el4.svg';
import ImageFive from '../../assets/svg/el5.svg';
import ImageSix from '../../assets/svg/el6.svg';

export const WelcomePage = () => {
  return (
    <div className="home-wrapper">
      <section className="about-wrapper">
        <div>Project Management</div>
        <div>... Ваши неограниченные варианты использования</div>
      </section>
      <section className="project-content">
        <div>
          <h1 className="subheading">Надежное Управление Задачами для Команд</h1>
          <span className="primary-title">
            <span>Объедините</span> Вашу Команду
          </span>
          <div className="container-images">
            <img className="imageOne" src={ImageOne} alt="image" />
            <img className="imageTwo" src={ImageTwo} alt="image" />
            <img className="imageThree" src={ImageThree} alt="image" />
          </div>
        </div>
      </section>
      <section className="project-info-content">
        <div className="card-info">
          <img className="imageFour" src={ImageFour} alt="image" />
          <h3>Время Стать Организованными</h3>
          <p>
            &nbsp; Управление задачами является связующим звеном между планированием дел и их
            выполнением. Программное обеспечение для управления задачами должно обеспечивать обзор
            работы, чтобы видеть превращение идеи в результат.
            <br />
            &nbsp; Попробуйте <b>ProjectManagement:</b> присоединяйтесь к командам со всего мира,
            которые используют наши доски для цифровизации рабочих процессов и получения четкого
            обзора прогресса задач. Станем организованными вместе!
          </p>
        </div>
        <div className="card-info">
          <img className="imageFour" src={ImageFive} alt="image" />
          <h3>Проекты, Которые Работают</h3>
          <p>
            &nbsp; Независимо от того, управляете ли вы своим следующим крупным проектом или
            переводите управление задачами в цифровую форму для повседневной работы своей команды,
            вам нужно знать, кто, чем и когда занимается. <b>ProjectManagement</b> поможет вам
            управлять задачами в красивой настраиваемой среде, которая идеально адаптируется к вашим
            потребностям.
          </p>
        </div>
        <div className="card-info">
          <img className="imageFour" src={ImageSix} alt="image" />
          <h3>Удаленная Работа</h3>
          <p>
            &nbsp; Когда ваша команда работает из дома, эффективный способ обмена информацией имеет
            важное значение для продуктивной работы. Используйте <b>ProjectManagement</b>, чтобы
            улучшить взаимодействие, эффективно управлять задачами и обеспечить гладкое выполнение
            проектов.
          </p>
        </div>
      </section>
      <section className="developers-content">
        <h2 className="subheading">Наша команда</h2>
        <div className="developers-content-container">
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>Илья Скарына</em> - Team lead, developer
              </h3>
              <div className="scills-developer">
                <p>- Базовые настройки проекта, роутинг приложения</p>
                <p>- Поддержка корректной работы приложения;</p>
                <p></p>
                <p></p>
              </div>
            </div>
            <div className="image-developer developer1"></div>
          </div>
          <div className="box-wrapper">
            <div className="image-developer developer2"></div>
            <div className="info-developer">
              <h3 className="title-developer">
                <em>Андрей Корозеев</em> - developer
              </h3>
              <div className="scills-developer">
                <p>- Регистрация и авторизация пользователя;</p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>Татьяна Тузова</em> - developer
              </h3>
              <div className="scills-developer">
                <p>- Главная страница приложения;</p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
            <div className="image-developer developer3"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
