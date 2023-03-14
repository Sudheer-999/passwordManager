import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'

const colorList = ['blue', 'orange', 'green', 'lightgreen', 'maroon']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    nameInput: '',
    passwordInput: '',
    passwordList: [],
    searchInput: '',
    isChecked: false,
  }

  onWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onCheckbox = event => {
    this.setState({isChecked: event.target.checked})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilteredItem = () => {
    const {passwordList, searchInput} = this.state

    const filteredResults = passwordList.filter(eachItem =>
      eachItem.password.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredResults
  }

  onDelete = id => {
    const {passwordList} = this.state

    const results = passwordList.filter(eachItem => eachItem.id !== id)

    this.setState({passwordList: results})
  }

  onAddBtn = event => {
    event.preventDefault()
    const {websiteInput, nameInput, passwordInput, isChecked} = this.state

    const randomNum = Math.floor(Math.random() * colorList.length)
    const color = colorList[randomNum]

    const newPasswordItem = {
      id: uuidv4(),
      website: websiteInput,
      username: nameInput,
      password: passwordInput,
      isChecked,
      backgroundColor: color,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordItem],
    }))
    this.setState({websiteInput: '', nameInput: '', passwordInput: ''})
  }

  render() {
    const {isChecked, websiteInput, passwordInput, nameInput} = this.state
    const searchResults = this.getFilteredItem()
    const count = searchResults.length

    return (
      <div className="bg-container">
        <div className="logo-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <form className="inputs-container" onSubmit={this.onAddBtn}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager"
          />
          <div className="inputs">
            <h1 className="password-heading">Add New Password</h1>
            <div className="web-input">
              <div className="web-logo-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="web-icon"
                />
              </div>
              <input
                type="text"
                className="website-input"
                onChange={this.onWebsite}
                value={websiteInput}
                placeholder="Enter Website"
              />
            </div>
            <div className="web-input">
              <div className="web-logo-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="web-icon"
                />
              </div>
              <input
                type="text"
                className="website-input"
                onChange={this.onNameInput}
                value={nameInput}
                placeholder="Enter Username"
              />
            </div>
            <div className="web-input">
              <div className="web-logo-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="web-icon"
                />
              </div>
              <input
                type="password"
                className="website-input"
                onChange={this.onPassword}
                value={passwordInput}
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </div>
        </form>
        <div className="passwords-list-container">
          <div className="head">
            <div className="count-con">
              <h1 className="pass-count-text">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search-con">
              <div className="search-icon-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                className="search-input"
                onChange={this.onSearch}
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-pass-con">
            <input
              type="checkbox"
              id="showPass"
              className="checkbox"
              onChange={this.onCheckbox}
            />
            <label className="checkbox-label" htmlFor="showPass">
              Show Passwords
            </label>
          </div>
          <ul className="password-list">
            {searchResults.map(eachItem => (
              <PasswordItem
                details={eachItem}
                key={eachItem.id}
                isChecked={isChecked}
                onDelete={this.onDelete}
              />
            ))}
            {count < 1 && (
              <li className="no-pass-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="nopassword-icon"
                />
                <p className="no-pass-text">No Passwords</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
