import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../ducks/reducer';
import {Link} from 'react-router-dom';


class Nav extends Component {
    constructor(){
        super()

        
    }

  


    render(){
        const login = <a className="login-link" href={process.env.REACT_APP_LOGIN}>Login</a>;
        const logout =  <a className="login-link" href={process.env.REACT_APP_LOGOUT}>Logout</a>; 
        const profile = <Link className="login-link" to="/profile">Profile</Link>
        return(
            <div className="nav-container">
                <div className="left-box">
                </div>
                <div className="title-container">
                    <div className="title">MemeMart</div>   
                </div>
                <div className="login-container">
                    <div className="login">
                    {  this.props.userInfo.id === null ?
                         login : profile  }                    
                    </div>    
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        userInfo: state.userInfo,

    }
}

export default connect(mapStateToProps, {getUserInfo})(Nav);