import IMAGE_ERROR from '../../assets/jpg/notFound.jpg';

export const NotFoundPage = () => {
  return (
    <>
      <div className="containerErrorPage">
        <img src={IMAGE_ERROR} className="ErrorImage" alt="Error-image" />
      </div>
    </>
  );
};
