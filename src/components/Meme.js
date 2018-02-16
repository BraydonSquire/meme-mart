import React, {Component} from 'react';
import Nav from './Nav';
// import axios from 'axios';
import {connect} from 'react-redux';
import {getMeme} from '../ducks/reducer';


class Meme extends Component {
    constructor(props) {
        super(props)

        this.state = {
            meme:[]
        }
        // this.getDankMeme = this.getDankMeme.bind(this)
    }

    componentDidMount(){
        // this.getDankMeme()
        // console.log('match params id', this.props.match.params.id)
        this.props.getMeme(this.props.match.params.id)
        
    }

    // getDankMeme(){
    //     axios.get(`/api/getonememe/${this.props.match.params.id}`)
    //     .then(res => this.setState({res}) && console.log('Meme', this.state.meme))
    // }


    render(){
        const meme = this.props.meme;

        var list = meme.map( (memebox, i) => {
            return(
                // <div className="meme-box" key={i}>
                   
                //     <div className="meme-photo-container">
                //         <img className="meme-photo" src={memebox.img} />
                //     </div>
                // <div className="meme-title">
                //     <p>{memebox.title}</p>
                // </div>    
                
                // </div>
                <div className="single-meme-container">
                    <div className="single-meme-title"><p>{memebox.title}</p></div>
                    <img className="single-meme-photo" src={memebox.img} />
                </div>

            )
        } )

        return(
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
                </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        meme: state.meme
    }
}

export default connect(mapStateToProps, {getMeme})(Meme);