import React, { Fragment, isValidElement, cloneElement, createElement } from 'react'
import PropTypes from 'prop-types'
import { matchPath } from 'react-router'
import { TransitionGroup } from 'react-transition-group'

export const Switch = (props, context) => {
  const { router: { route } } = context
  const { children, transition: commonTransition, location: propLocation, ...rest } = props
  const location = propLocation || route.location

  let match
  let child
  let key
  let childTransition

  React.Children.forEach(children, (element) => {
    if (match == null && isValidElement(element)) {
      const {
        path: pathProp,
        exact,
        strict,
        sensitive,
        from,
        transitionKey,
        transition,
      } = element.props
      const path = pathProp || from
      childTransition = transition
      key = transitionKey || path
      child = element
      match = matchPath(
        location.pathname,
        { path, exact, strict, sensitive },
        route.match
      )
    }
  })

  const renderable = !!(child && (
    child.props.component
    || child.props.render
    || child.props.children
  ))

  const clone = child && cloneElement(child, {
    location,
    computedMatch: match,
  })

  const transition = childTransition || commonTransition

  return (
    <Fragment>
      { !!match && !renderable && clone }
      <TransitionGroup appear={false} exit={false} {...rest}>
        { !!match && renderable && (
          createElement(transition, { key }, clone)
        ) }
      </TransitionGroup>
    </Fragment>
  )
}

Switch.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired
  }).isRequired
}

Switch.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  transition: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
}
