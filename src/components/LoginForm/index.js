import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {userId: '', userPin: '', showError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showError: true, errorMsg: errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/ebank/login'
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({userPin: event.target.value})
  }

  render() {
    const {userId, userPin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
          alt="website login"
        />

        <div className="formContainer">
          <h1>Welcome Back!</h1>
          <form onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="userId">User ID</label>
              <input
                value={userId}
                type="text"
                placeholder="Enter User ID"
                id="userId"
                onChange={this.onChangeUserId}
              />
            </div>
            <div>
              <label htmlFor="pin">PIN</label>
              <input
                value={userPin}
                type="password"
                placeholder="Enter PIN"
                id="pin"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {showError && <p className="error">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}
export default LoginForm
