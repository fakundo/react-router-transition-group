import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Fade from 'material-ui/transitions/Fade'
import Slide from 'material-ui/transitions/Slide'
import Switch from '../src'

const renderPage = content => () => (
  <div
    style={{
      width: 150,
      height: 150,
      background: 'silver',
      color: 'white',
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'absolute',
    }}
  >
    { content }
  </div>
)

export default () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/404">404</Link></li>
      </ul>
      <hr />
      <Switch transition={Fade} exit>
        <Route exact path="/" render={renderPage('Home')} />
        <Route path="/about" render={renderPage('About')} />
        <Route transition={Slide} path="/topics" render={renderPage('Topics')} />
        <Route transition={props => <Slide direction="up" {...props} />} render={renderPage('Not found')} />
      </Switch>
    </div>
  </Router>
)

