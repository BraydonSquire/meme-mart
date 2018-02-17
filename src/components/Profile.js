import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';


class Profile extends Component {


    render() {
        return (
            <div>
                <div className="nav-container">
                    <div className="left-box">
                    </div>
                    <div className="title-container">
                        <div className="title">MemeMart</div>
                    </div>
                    <div className="login-container">
                        <div className="login">
                            <Link className="login-link" to="/">Home</Link>
                        </div>
                    </div>
                </div>

            {/* <div className="profile-picture-container">
                <img className="profile-picture" src={this.props.userInfo.img} />
            </div> */}

             <div className="meme-center">
             <div className="single-meme-container">
                    <div className="single-meme-title"><p>{this.props.userInfo.user_name}</p></div>
                    <img className="single-meme-photo" src={this.props.userInfo.img} />
                </div>
             </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, {getUserInfo})(Profile);