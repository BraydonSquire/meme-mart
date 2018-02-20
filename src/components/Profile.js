import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, getFavorites, addMeme } from '../ducks/reducer';


class Profile extends Component {

    constructor(){
        super()

        this.state = {
            memeUrl:'',
            memeTitle:''
        }

    this.setUrl = this.setUrl.bind(this)
    this.setTitle = this.setTitle.bind(this)
    }

    componentDidMount(){
        this.props.getFavorites(this.props.userInfo.id)
    }


    setUrl(e) {
        this.setState({memeUrl: e.target.value})
    }

    setTitle(e) {
        this.setState({memeTitle: e.target.value})
    }

    render() {
        let favorites = this.props.favoriteMemes.map( (fav, i) => {
            return (
                <div className="meme-box" key={i}>
                    <Link to={`/meme/${fav.favid}`} style={{ textDecoration: 'none' }}>
                    <div className="meme-photo-container">
                        <img className="meme-photo" src={fav.favimg} />
                    </div>
                <div className="meme-title">
                    <p>{fav.favtitle}</p>
                </div>    
                </Link>
                </div>
            )
        } )
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

             <div className="favorites-title">Favorites</div>

            <div className="memelist">
                {favorites}
            </div>

            <div className="favorites-title">Add Meme</div>

            <div className="addmeme-form">
                <input type="text" onChange={this.setUrl} placeholder="Enter meme URL here..." />
                <input type="text" onChange={this.setTitle} placeholder="Enter title here..."/>
                <button className="submit" onClick={ () => this.props.addMeme(this.state.memeUrl, this.state.memeTitle)}>Submit</button>
            </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        favoriteMemes: state.favoriteMemes,
        addedMeme: state.addedMeme
    }
}

export default connect(mapStateToProps, {getUserInfo, getFavorites, addMeme})(Profile);