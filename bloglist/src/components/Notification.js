const Notification = ({ message }) =>
  message ? (
    <div
      className={
        'notification'
      }
    >
      {message}
    </div>
  ) : (
    <></>
  )

export default Notification
