const SequencePageSettings = ({ isShow }) => {
  return (
    <>
      {isShow ? (
        <div className="modal-body d-flex flex-column overflow-hidden">
          <div className="">Здесь будет настройка</div>
        </div>
      ) : null}
    </>
  );
};

export default SequencePageSettings;
