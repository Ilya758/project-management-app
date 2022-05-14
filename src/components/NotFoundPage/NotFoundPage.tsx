import IMAGE_ERROR from '../../assets/jpg/notFound.jpg';

export const NotFoundPage = () => {
  return (
    <>
      <div className="wrapper-component">
        <img src={IMAGE_ERROR} className="errorImage" alt="Error-image" />
      </div>
    </>
  );
};
