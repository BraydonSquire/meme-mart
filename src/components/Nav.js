import React, {Component} from 'react';


class Nav extends Component {
    constructor(){
        super()

        this.state = {
            userId: []
        }
    }


    render(){
        return(
            <div className="nav-container">
                <div className="left-box">
                </div>
                <div className="title-container">
                    <div className="title">MemeMart</div>   
                </div>
                <div className="login-container">
                    <div className="login">
                        <a className="login-link" href={process.env.REACT_APP_LOGIN}>Login</a>
                    </div>    
                </div>
            </div>
        )
    }

}
export default Nav;