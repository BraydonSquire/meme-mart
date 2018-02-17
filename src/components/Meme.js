import React, { Component } from 'react';
import Nav from './Nav';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getMeme, getUserInfo, favoriteMeme } from '../ducks/reducer';


class Meme extends Component {
    constructor(props) {
        super(props)

        this.state = {
            meme: []
        }

    }

    componentDidMount() {
        this.props.getMeme(this.props.match.params.id)
    }




    render() {
        const meme = this.props.meme;
        const favoriteData = {
            favid:meme.id,
            favimg:meme.img,
            favtitle:meme.title,
            userid:this.props.userInfo.id
        }

        var list = 
                <div className="single-meme-container">
                    <div className="single-meme-title"><p>{meme.title}</p></div>
                    <img className="single-meme-photo" src={meme.img} />
                </div>


        return (
            <div>
                <Nav />
                {/* <div className="meme-box" key={meme.id}>
                    
                    <div className="meme-photo-container">
                        <img className="meme-photo" src={this.props.meme.img} />
                    </div>
                <div className="meme-title">
                    <p>{meme.title}</p>
                </div>    
                
                </div> */}
                <div className="meme-center">
                    {list}
                </div>
                <div className="favorite-container">
                    {this.props.userInfo.id !== null ? <button onClick={ () => this.props.favoriteMeme(favoriteData)} className="favorite-button">Favorite</button> : null }
                    
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        meme: state.meme,
        userInfo: state.userInfo,
        favoritedMeme: state.favoritedMeme
    }
}

export default connect(mapStateToProps, { getMeme, getUserInfo, favoriteMeme })(Meme);