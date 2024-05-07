import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <br />
      <button type="button" onClick={onLogOut}>
        Logout
      </button>
      <div>
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png "
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default Home
