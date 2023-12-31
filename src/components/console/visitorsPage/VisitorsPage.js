import React from 'react';

import NoVisitor from '../NoData';

import { Tooltip, Paper, InputBase, Typography, Button, Link, } from '@mui/material';


const VisitorsPage = props => {

    let visitors = props.visitorsData;

    const container = {
        // border: 'solid 1px #E0E5F6',
        margin: '20px 0 20px 0',
    }

    const gridContainerHeader = {
        display: 'grid',
        gridTemplateColumns: '30% 30% 30% auto',
        // gridTemplateRows: '100px 300px',
        gridGap: '10px',
        backgroundColor: '#FFC233',
        padding: '10px 20px 10px 30px',
        // border: 'solid 1px #E0E5F6',
        // color: '#8934FF',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '14px'
    }

    const gridContainer = {
        display: 'grid',
        gridTemplateColumns: '30% 30% 30% auto',
        // gridTemplateRows: '100px 300px',
        gridGap: '10px',
        // background-color: #2196F3;
        padding: '1px 10px 1px 10px',
        borderBottom: 'solid 1px #E0E5F6',
        borderLeft: 'solid 1px #E0E5F6',
        borderRight: 'solid 1px #E0E5F6',
        textAlign: 'left',
        alignItems: 'center',
        fontSize: '14px'
    }

    const row = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }



    return (
        <div>
            {visitors.length === 0 ?
                <NoVisitor
                    message='There are no Visitors. App is sad.'
                /> :
                <div>
                    <div>
                        <Paper elevation={1}>

                            <InputBase placeholder="Search Visitors" />
                        </Paper>
                    </div>


                    <div style={container}>
                        <div style={gridContainerHeader}>
                            <div>Visitor</div>
                            <div>Sign In</div>
                            <div>Sign Out</div>
                        </div>
                        {visitors.map(vs => (
                            <div key={vs.docID} style={gridContainer}>
                                <div style={row}> <div
                                    style={{
                                        height: '70px',
                                        width: '70px',
                                        backgroundColor: '#E0E5F6',
                                        borderRadius: '5px',
                                        backgroundImage: 'url(' + vs.photoURL + ')',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        display: 'inline-block',
                                        textAlign: 'center',
                                        margin: '10px',
                                        backgroundPosition: 'center',
                                    }}></div> {vs.visitorDetails['First Name']} {vs.visitorDetails['Last Name']}</div>
                                <div>{vs.signedInDate} {vs.signedInTime}</div>
                                {vs.signedOutDate === '' ?
                                    <div style={{ color: '#ef0c00' }}>Not Signed Out</div>
                                    : <div>{vs.signedOutDate} {vs.signedOutTime}</div>}
                                <div style={{ textAlign: 'right' }}>

                                </div>
                            </div>
                        ))}
                    </div>
                </div >}
        </div >
    )
}

export default VisitorsPage;
