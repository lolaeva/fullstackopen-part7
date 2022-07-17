import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained" size="small" sx={{ mt: 1 }}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant="outlined" size="small" sx={{ mt: 1 }}>
          cancel
        </Button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
export default Togglable
