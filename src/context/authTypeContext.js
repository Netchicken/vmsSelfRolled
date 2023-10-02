//import React from 'react';
import { createContext } from 'react';

const authTypeContext = createContext({
    authTypeIsLogin: true,
    changeAuthType: () => { }
});

export default authTypeContext;

// const authTypeContext = React.createContext({
//     authTypeIsLogin: true,
//     changeAuthType: () => { }
// });

// export default authTypeContext;

//UPDATE THIS FROM HERE https://react.dev/learn/passing-data-deeply-with-context    


