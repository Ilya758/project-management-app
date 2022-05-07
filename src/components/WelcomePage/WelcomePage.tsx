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
        <div>...your unlimited use cases</div>
      </section>
      <section className="project-content">
        <div>
          <h1 className="subheading">Reliable Task Management for the Team</h1>
          <span className="primary-title">
            <span>Unite</span> Your Team
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
          <h3>TIME TO GET ORGANIZED</h3>
          <p>
            &nbsp; Task management is the link between the planning of cases and their
            implementation. The task management software needed to provide an overview of the work
            in order to translate the idea into a result.
            <br />
            &nbsp; Try <b>ProjectManagement:</b> Join the world as our teams use our teams to
            digitize workflows and get a clear overview of task progress. Let,s get organized
            together!
          </p>
        </div>
        <div className="card-info">
          <img className="imageFour" src={ImageFive} alt="image" />
          <h3>PROJECTS, THAT WORK</h3>
          <p>
            &nbsp; Whether you are managing your next big project or digitizing task management for
            your team is day-to-day work, you need to know who is doing what, when.{' '}
            <b>ProjectManagement</b> helps you manage tasks in a beautifully customizable
            environment that adapts perfectly to your needs.
          </p>
        </div>
        <div className="card-info">
          <img className="imageFour" src={ImageSix} alt="image" />
          <h3>DISTANT WORK</h3>
          <p>
            &nbsp; When your team is working from home, an efficient way to share information is
            essential to being productive. Use <b>ProjectManagement</b> to improve collaboration,
            manage tasks efficiently, and ensure projects run smoothly.
          </p>
        </div>
      </section>
      <section className="developers-content">
        <h2 className="subheading">Meet Team</h2>
        <div className="developers-content-container">
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>Illia Skaryna</em> - Team lead, developer
              </h3>
              <div className="scills-developer">
                <p>- Basic project settings, application routing</p>
                <p>- Support for the correct operation of the application</p>
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
                <em>Andrei Korozeev </em> - developer
              </h3>
              <div className="scills-developer">
                <p>- Registration and authorization of the user</p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="info-developer">
              <h3 className="title-developer">
                <em>Tatsiana Tuzava</em> - developer
              </h3>
              <div className="scills-developer">
                <p>- Main page of the application</p>
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
