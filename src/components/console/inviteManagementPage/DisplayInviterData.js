import React from 'react';
import VistocodeNameLogo from '../../../assets/vsLogo.png';
// import {ValidateEmail, ValidatePassword} from '../functions/Validators';

import { TextField, InputAdornment, Typography, Button, Link, } from '@mui/material';
import { DepartmentIcon, FullNameIcon, UserIDIcon, Business, AlternateEmail, Icon, LastNameIcon } from '@mui/icons-material';




import Margin from '../../Margin';

const DisplayInviterData = props => {

    const vistocodeNameLogo = {
        height: '15px',
        width: '70px',
        backgroundImage: 'url(' + VistocodeNameLogo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'inline-block',
        textAlign: 'center',
        backgroundPosition: 'center',
    }

    return (
        <div>

            <div className='console-inviterform-container'>
                <div className='console-inviterform-message'>
                    <div
                        className='console-inviterform-message-content'>
                        <p>Use this form to add and register persons
                            authorized to invite people to the premises.</p>

                        <p>You can register a batch of users for your
                            company by clicking the Batch Upload option and
                            uploading a file containing the data.
                            Click here to download the batch upload format.</p>

                        <p>Registered users can now generate invite codes for
                            their intended visitors/guest</p>


                    </div>
                </div>

                <div>
                    <div>
                        <div style={{ marginTop: '5px' }}>
                            <p style={{
                                color: '#FDA203',
                                fontSize: '15px',
                                marginBottom: '6px',
                                textAlign: 'center',
                            }}>Register a user to send invites</p>
                        </div>
                        <div className='console-inviterform-area'>

                            {props.vRegStep === 0 ? <div>
                                <TextField
                                    className='input'
                                    id='fName'
                                    variant='outlined'
                                    type='fullName'
                                    label="Full Name"
                                    value={props.fullName}
                                    onChange={props.handleChange('fullName')}
                                    fullWidth
                                    margin="normal"
                                    helperText={props.fullNameError}
                                    error={props.fullNameError !== ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <Icon className='input-icon'>
                                                    <FullNameIcon />
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                    }}

                                    InputLabelProps={{
                                        focused: props.fullName !== ''
                                    }}
                                />

                                <TextField
                                    className='input'
                                    id='email'
                                    variant='outlined'
                                    type='email'
                                    label='Email'
                                    value={props.email}
                                    onChange={props.handleChange('email')}
                                    fullWidth
                                    margin="normal"
                                    helperText={props.emailError}
                                    error={props.emailError !== ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <Icon className='input-icon'>
                                                    <AlternateEmail />
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                    }}

                                    InputLabelProps={{
                                        focused: props.email !== ''
                                    }}
                                /></div> :

                                props.vRegStep === 1 ? <div>
                                    <TextField
                                        className='input'
                                        id='uid'
                                        variant='outlined'
                                        type='userID'
                                        label='ID (optional)'
                                        value={props.userID}
                                        onChange={props.handleChange('userID')}
                                        fullWidth
                                        margin="normal"
                                        helperText={props.userIDError}
                                        error={props.userIDError !== ''}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Icon className='input-icon'>
                                                        <UserIDIcon />
                                                    </Icon>
                                                </InputAdornment>
                                            ),
                                        }}

                                        InputLabelProps={{
                                            focused: props.userID !== ''
                                        }}
                                    />

                                    <TextField
                                        className='input'
                                        id='dept'
                                        variant='outlined'
                                        type='department'
                                        label='Dept or Unit'
                                        value={props.department}
                                        onChange={props.handleChange('department')}
                                        fullWidth
                                        margin="normal"
                                        helperText={props.departmentError}
                                        error={props.departmentError !== ''}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Icon className='input-icon'>
                                                        <DepartmentIcon />
                                                    </Icon>
                                                </InputAdornment>
                                            ),
                                        }}

                                        InputLabelProps={{
                                            focused: props.department !== ''
                                        }}
                                    /> </div> : null}

                            {props.vRegistering ?
                                <div style={{ color: '#8934FF' }}>
                                    <Margin
                                        height='1px'
                                        width='100%' />

                                    <p>Registering Inviter...</p>

                                </div> :

                                <div className='console-vRegisterButton-row'>
                                    <Button
                                        disabled={props.vRegStep === 0}
                                        onClick={props.previousVRegStep}
                                    >
                                        Back
                                    </Button>
                                    {props.checkingEmail ?
                                        <div style={{
                                            color: '#8934FF',
                                            textAlign: 'right',
                                            width: '100%',
                                        }}>

                                            <p>Verifying Email...</p>

                                        </div>
                                        : <Button
                                            variant="contained"
                                            disabled={props.vRegistering}
                                            color="primary"
                                            className='setup-button-large'
                                            onClick={props.checkRegisterInputs}
                                        >
                                            {props.vRegStep === 1 ? 'Register' : 'Next'}
                                        </Button>}
                                </div>}

                            <div>
                                <p style={{
                                    color: '#AEA39B',
                                    fontSize: '10px',
                                    marginTop: '20px',
                                    marginBottom: '-10px',
                                    textAlign: 'right',
                                    paddingRight: '10px',
                                }}
                                >Step {props.vRegStep + 1} of 2</p>
                            </div>
                        </div>

                        <div>
                            <p style={{
                                color: '#FDA203',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                padding: '10px',
                            }}>OR</p>
                        </div>

                        <Button
                            style={{ textTransform: 'none', backgroundColor: '#253061' }}
                            variant="contained"
                            fullWidth={true}
                            color="secondary"
                        // className='setup-button-large'
                        // onClick={props.vRegister}
                        >
                            Upload a file containing the list of users
                        </Button>
                        <div>
                            <p style={{
                                color: '#FDA203',
                                fontSize: '12px',
                            }}>Click to download a sample upload file</p>
                        </div>


                        <div>

                        </div>
                    </div>
                </div>

            </div>

            <div
                style={{
                    display: 'flex',
                    // alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    padding: '5px 20px 0 0',
                }}>
                <p style={{
                    color: '#253061',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '0',
                    margin: '-0.5px 0 0 0',
                }}>powered by</p>
                <div
                    style={vistocodeNameLogo}
                >
                </div>
            </div>
        </div>
    )
}

export default DisplayInviterData;
