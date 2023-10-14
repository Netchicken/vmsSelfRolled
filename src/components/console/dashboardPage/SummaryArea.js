import React, { useEffect } from 'react';

const SummaryArea = ({ countOnsiteNow, countOnsiteToday, countOnsiteEver, userData }) => {

    useEffect(() => {
        console.log("Visitors in SummaryArea  ", countOnsiteNow + " " + countOnsiteToday + " " + countOnsiteEver + " " + userData);
    }, []);



    return (
        <div>
            <div className='console-visitor-summary'>
                <div className='console-visitor-now'>
                    <div>
                        Visitors Right Now
                    </div>
                    <h1
                        style={{
                            fontSize: '60px',
                            color: '#ffffff',
                            textAlign: 'center'
                        }}>
                        {countOnsiteNow}
                    </h1>
                </div>

                <div className='console-visitor-period'>
                    <div>
                        Visitors Today
                    </div>
                    <h1
                        style={{
                            fontSize: '60px',
                            // color: '#ffffff', 
                            textAlign: 'center'
                        }}>
                        {countOnsiteToday}
                    </h1>

                </div>

                <div className='console-activeDevices'>
                    <div>
                        Visitors Ever
                    </div>
                    <h1
                        style={{
                            fontSize: '50px',
                            color: '#8934FF',
                            textAlign: 'center'
                        }}>
                        {countOnsiteEver}

                        {/* {props.userData.licences === 0 ? props.activeDevices : props.userData.licences} */}
                    </h1>
                </div>

            </div>

        </div>
    )
}

export default SummaryArea;
