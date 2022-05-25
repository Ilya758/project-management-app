import './WelcomePage.scss';
import { useTranslation } from 'react-i18next';
import ImageOne from '../../assets/jpg/heroWelcome.jpg';
import ImageTwo from '../../assets/svg/el1.svg';
import ImageThree from '../../assets/svg/el2.svg';
import ImageFour from '../../assets/svg/el4.svg';
import ImageFive from '../../assets/svg/el5.svg';
import ImageSix from '../../assets/svg/el6.svg';

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-wrapper">
      <section className="about-wrapper">
        <div className="title-primary-page">Project Management</div>
        <div className="title-primary-page second">...{t('primary_title.tit')}</div>
      </section>
      <section className="project-content">
        <div>
          <h1 className="subheading">{t('primary_title.subheading')}</h1>
          <span className="primary-title">
            <span>{t('primary_title.primary-title_span')}</span>{' '}
            {t('primary_title.primary-title_meet')}
          </span>
          <div className="container-images">
            <img className="imageOne" src={ImageOne} alt="image" />
            <img className="imageTwo" src={ImageTwo} alt="image" />
            <img className="imageThree" src={ImageThree} alt="image" />
          </div>
        </div>
      </section>
      <section className="project-info-content">
        <div className="project-info-content-card">
          <img className="imageFour" src={ImageFour} alt="image" />
          <h3 className="card-info-title">{t('primary_title.time')}</h3>
          <p>
            &nbsp; {t('primary_title.time_text')}
            <br />
            &nbsp; {t('primary_title.time_text_br')}
          </p>
        </div>
        <div className="project-info-content-card">
          <img className="imageFour" src={ImageFive} alt="image" />
          <h3 className="card-info-title">{t('primary_title.work')}</h3>
          <p>&nbsp; {t('primary_title.work_text')}</p>
        </div>
        <div className="project-info-content-card">
          <img className="imageFour" src={ImageSix} alt="image" />
          <h3 className="card-info-title">{t('primary_title.work_distant')}</h3>
          <p>&nbsp; {t('primary_title.work_distant_text')}</p>
        </div>
      </section>
      <section className="developers-content">
        <h2 className="subheading">{t('primary_title.meet_team')}</h2>
        <div className="developers-content-container">
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>{t('primary_title.illia')}</em>
                <br />
                {t('primary_title.illia_team')}
              </h3>
              <div className="skills-developer">
                <p className="skills-developer-text">- {t('primary_title.illia_text1')}</p>
                <p className="skills-developer-text">- {t('primary_title.illia_text2')}</p>
                <p className="skills-developer-text" />
                <p className="skills-developer-text" />
              </div>
            </div>
            <div className="image-developer developer1"></div>
          </div>
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>{t('primary_title.andrey')}</em>
                <br /> {t('primary_title.andrey_team')}
              </h3>
              <div className="skills-developer">
                <p className="skills-developer-text">- {t('primary_title.andrey_text1')}</p>
                <p className="skills-developer-text">- {t('primary_title.andrey_text2')}</p>
                <p className="skills-developer-text">- {t('primary_title.andrey_text3')}</p>
                <p className="skills-developer-text">- {t('primary_title.andrey_text4')}</p>
              </div>
            </div>
            <div className="image-developer developer2"></div>
          </div>
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>{t('primary_title.tatsiana')}</em>
                <br />
                {t('primary_title.tatsiana_team')}
              </h3>
              <div className="skills-developer">
                <p className="skills-developer-text">- {t('primary_title.tatsiana_text1')}</p>
                <p className="skills-developer-text">- {t('primary_title.tatsiana_text2')}</p>
                <p className="skills-developer-text">- {t('primary_title.tatsiana_text3')}</p>
              </div>
            </div>
            <div className="image-developer developer3"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
