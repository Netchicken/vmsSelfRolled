import React from 'react';

import { TextField, Icon, InputAdornment, Typography, Button, Link, } from '@mui/material';

export const WelcomeInfo = props => {
  let multiline = false;
  if (props.multiline === 'multiline') {
    multiline = true
  } else {
    multiline = false
  }

  return (
    <TextField
      fullWidth
      id={props.id}
      label={props.label}
      type={props.type}
      name={props.name}
      value={props.value}
      error={props.error}
      helperText={props.helperText}
      margin="normal"
      variant="outlined"
      multiline={multiline}
      rows={props.rows}
      onChange={props.onChange}

      InputLabelProps={{
        focused: props.focus
      }}
    />
  )
}

export default WelcomeInfo;
