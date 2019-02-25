# react-router-transition-group

## Transitions for react-router 

[![npm](https://img.shields.io/npm/v/react-router-transition-group.svg)](https://www.npmjs.com/package/react-router-transition-group)

## Installation

```
npm install react-router-transition-group
```

## Demo

https://fakundo.github.io/react-router-transition-group/

[Source](https://github.com/fakundo/react-router-transition-group/tree/master/examples)

## Usage

- Add `transition` property to `Switch` component
- You also can override `transition` for each Route
- `transition` is a Transition component from `react-transition-group`

```javascript
import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-transition-group'

import MyTransition from 'components/MyTransition'
import HomePage from 'components/HomePage'
import NotFoundPage from 'components/NotFoundPage'

export default () => (
  <Switch transition={MyTransition} component={Fragment} exit>
    <Route exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
)
```
