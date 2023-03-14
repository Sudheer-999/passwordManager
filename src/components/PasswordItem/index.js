import './index.css'

const PasswordItem = props => {
  const {details, isChecked, onDelete} = props
  const {id, website, username, password, backgroundColor} = details

  const initial = website[0].toUpperCase()

  const onDeleteBtn = () => {
    onDelete(id)
  }

  const passwordText = isChecked ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-img"
    />
  )

  return (
    <li className="list-item">
      <div className="details-con">
        <div className="initial-con">
          <h1 className={`initial-text ${backgroundColor}`}>{initial}</h1>
        </div>
        <div className="content">
          <p className="web-head">{website}</p>
          <p className="name-head">{username}</p>
          <p className="web-head">{passwordText}</p>
        </div>
      </div>
      <button
        type="button"
        className="del-btn"
        data-testid="delete"
        onClick={onDeleteBtn}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
