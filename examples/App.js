import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import sample from 'lodash/sample'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Fade from '@material-ui/core/Fade'
import DocumentTitle from 'react-document-title'
import { Switch } from '../src'

const colors = [
  'blue', 'fuchsia', 'gray', 'green',
  'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
  'silver', 'teal', 'black'
]

const randomColor = () => sample(colors)

const TransitionExample = ({ children, ...rest }) => {
  return (
    <Fade {...rest}>
      <div>{ children }</div>
    </Fade>
  )
}

TransitionExample.propTypes = {
  children: PropTypes.any,
}

class Page extends Component {
  constructor() {
    super()
    this.background = randomColor()
  }

  render() {
    const { children } = this.props
    return (
      <Fragment>
        <DocumentTitle title={children} />
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'fixed',
            left: 0,
            top: 0,
            color: '#fff',
            background: this.background,
            fontFamily: 'Helvetica',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          { children }
        </div>
      </Fragment>
    )
  }
}

Page.propTypes = {
  children: PropTypes.any,
}

const renderPage = children => () => (
  <Page>
    { children }
  </Page>
)

export default () => (
  <Router>
    <Fragment>
      <Switch transition={TransitionExample} component={Fragment} exit>
        <Route exact path="/" render={renderPage('Home')} />
        <Route path="/about" render={renderPage('About')} />
        <Route path="/topics" render={renderPage('Topics')} />
        <Route render={renderPage('Page not found')} />
      </Switch>
      <ul
        style={{
          position: 'fixed',
          left: 20,
          top: 20,
          fontFamily: 'Helvetica',
          letterSpacing: '1px',
          background: '#fff',
          borderRadius: 5,
          padding: 20,
          margin: 0,
          listStyle: 'none',
        }}
      >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/404">404</Link></li>
      </ul>
    </Fragment>
  </Router>
)
