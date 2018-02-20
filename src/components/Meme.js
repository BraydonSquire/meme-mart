import React, { Component } from 'react';
import Nav from './Nav';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getMeme, getUserInfo, favoriteMeme, getFavorites, unfavMeme } from '../ducks/reducer';


class Meme extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorited: false
        }


    }

    componentDidMount() {
        this.props.getMeme(this.props.match.params.id)
        this.props.getFavorites(this.props.userInfo.id)
        // setTimeout(this.isFavorited(),1200)
        setTimeout( () => {let memeid = this.props.meme.id;
            console.log(this.props.meme.id, this.props.userInfo.id)
            this.props.favoriteMemes.map( (meme, i) => {
                if (meme.favid == memeid) {
                    this.setState({favorited:true})
                } else {
                    null;
                }
            } )}, 1500 )
    }

   




    render() {
        const meme = this.props.meme;
        const favoriteData = {
            favid:meme.id,
            favimg:meme.img,
            favtitle:meme.title,
            userid:this.props.userInfo.id
        }

        const unfavData = {
            favid:meme.id,
            userid:this.props.userInfo.id
        }

        let list = 
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
                    {this.props.userInfo.id !== null ? 
                    ( this.state.favorited == false ?
                    <button onClick={ () => this.props.favoriteMeme(favoriteData) && this.setState({favorited:true})} className="favorite-button">Favorite</button> 
                    : 
                    <button onClick={ () => this.props.unfavMeme(unfavData.favid, unfavData.userid) && this.setState({favorited:false}) && console.log('unfav',meme.id, this.props.userInfo.id) } className="favorite-button">Unfavorite</button>)
                    :
                     null }
                    
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        meme: state.meme,
        userInfo: state.userInfo,
        favoritedMeme: state.favoritedMeme,
        favoriteMemes: state.favoriteMemes,
        unfavedMeme: state.unfavedMeme
    }
}

export default connect(mapStateToProps, { getMeme, getUserInfo, favoriteMeme, getFavorites, unfavMeme })(Meme);