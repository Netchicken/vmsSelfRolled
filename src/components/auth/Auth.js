//import React, { Component } from 'react';
import React, { useState, useEffect } from "react";

import Login from "../../components/Login";
import Register from "../../components/Register";
import BottomBar from "../../components/BottomBar";
import "../../styles/Auth.css";
import "../../styles/BottomBar.css";
import authTypeContext from "../../context/authTypeContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Auth(props) {
  const [authTypeIsLogin, setAuthTypeIsLogin] = useState(true);

  let navigate = useNavigate();
  let authlogin = useLocation(); //https://stackoverflow.com/questions/71380596/pass-data-to-a-component-with-usenavigate-from-react-router-dom
  //sets true or false for login or register
  useEffect(() => {
    loadAuthType();
  }, []);

  const loadAuthType = () => {
    setAuthTypeIsLogin(authlogin); //https://stackoverflow.com/questions/71380596/pass-data-to-a-component-with-usenavigate-from-react-router-dom
    console.log("authTypeIsLogin at startup = " + authlogin);
  };

  const changeAuthType = () => {
    setAuthTypeIsLogin(!authTypeIsLogin);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className='auth-body'>
      <authTypeContext.Provider
        value={{
          authTypeIsLogin: authTypeIsLogin,
          changeAuthType: changeAuthType,
        }}
      >
        <div>
          <authTypeContext.Consumer>
            {(context) => (context.authTypeIsLogin ? <Login /> : <Register />)}
          </authTypeContext.Consumer>
        </div>
      </authTypeContext.Provider>
      <BottomBar
        rlAbs={true}
      // goToPrivacyPolicyPage={goToPrivacyPolicyPage}
      // goToTermsAndConditionsPage={goToTermsAndConditionsPage}
      />
    </div>
  );
}

// export class Auth extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       authTypeIsLogin: false,
//     };
//   }

//   componentDidMount() {
//     this.setState({ authTypeIsLogin: this.props.location.state ? this.props.location.state.authTypeIsLogin : false });
//   }

//   changeAuthType = () => {
//     this.setState({ authTypeIsLogin: !this.state.authTypeIsLogin });
//   }

//   goToHomePage = () => {
//     this.props.history.push("/");
//   }

//   goToPrivacyPolicyPage = () => {
//     this.props.history.push("/privacy-policy");
//   }

//   goToTermsAndConditionsPage = () => {
//     this.props.history.push("/terms-and-conditions");
//   }

//   render() {
//     return (
//       <div className='auth-body'>
//         <authTypeContext.Provider value={{
//           authTypeIsLogin: this.state.authTypeIsLogin,
//           changeAuthType: this.changeAuthType
//         }}>

//           <div>
//             <authTypeContext.Consumer>
//               {context =>
//                 context.authTypeIsLogin ?
//                   <Login
//                   /> :
//                   <Register
//                   />
//               }
//             </authTypeContext.Consumer>

//           </div>
//         </authTypeContext.Provider>

//         <BottomBar
//           rlAbs={true}
//           goToPrivacyPolicyPage={this.goToPrivacyPolicyPage}
//           goToTermsAndConditionsPage={this.goToTermsAndConditionsPage}
//         />
//       </div>
//     )
//   }
// }

//https://reactrouter.com/en/6.4.0/start/faq#what-happened-to-withrouter-i-need-it
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(Auth);
