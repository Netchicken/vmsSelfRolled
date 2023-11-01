import React, { useEffect } from 'react';

const SummaryArea = ({ countOnsiteNow, countOnsiteToday, countOnsiteEver, userData }) => {

    useEffect(() => {
        console.log("Visitors in SummaryArea  ", countOnsiteNow + " " + countOnsiteToday + " " + countOnsiteEver + " " + userData);
    }, []);



    return (
        <div>
            <ul className='console-visitor-summary'>
                <li className='console-visitor-now'>
                    <div>
                        Visitors Now
                    </div>
                    <h1
                        style={{
                            fontSize: '40px',
                            color: '#ffffff',
                            textAlign: 'center'
                        }}>
                        {countOnsiteNow}
                    </h1>
                </li>

                <li className='console-visitor-period'>
                    <div>
                        Visitors Today
                    </div>
                    <h1
                        style={{
                            fontSize: '40px',
                            // color: '#ffffff', 
                            textAlign: 'center'
                        }}>
                        {countOnsiteToday}
                    </h1>

                </li>

                <li className='console-activeDevices'>
                    <div>
                        Visitors Ever
                    </div>
                    <h1
                        style={{
                            fontSize: '40px',
                            color: '#8934FF',
                            textAlign: 'center'
                        }}>
                        {countOnsiteEver}
                    </h1>
                </li>

            </ul>

        </div>
    )
}

export default SummaryArea;
