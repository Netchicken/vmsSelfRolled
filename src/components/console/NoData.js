import React from 'react';
//import novImage from '../../assets/noVisitor.png';
import { IconButton, Close, Tooltip, Button, Chip, Fingerprint, Stepper } from '@mui/material';
import '../../styles/Console.css';

const NoData = props => {

    //just formats up the no visitor message
    const container = {

        width: '100%',
        height: '70vh',
        // color: '253061',
        padding: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const text = {
        fontSize: '16px',
        width: '300px',
        padding: '10px',
        textAlign: 'center',
    }

    return (
        <div style={container}>
            <div>
                <div style={text}>{props.remark}</div>

                <Chip
                    className='console-noDataChip'
                    label={props.message}
                    onClick={props.clickChip ? props.onClickChip : null}
                />


            </div>
        </div>
    )
}

export default NoData;
