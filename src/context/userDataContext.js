import { createContext } from 'react';

export const userDataContext = createContext({
    authenticated: false,
    appData: '',
    changeAuthenticated: () => { }
});


// import React from 'react';

// const userDataContext = React.createContext({
//     authenticated: false,
//     appData: '',
//     changeAuthenticated: () => { }
// });

// export default userDataContext;

//UPDATE THIS FROM HERE https://react.dev/learn/passing-data-deeply-with-context    