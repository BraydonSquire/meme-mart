import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMemeList} from '../ducks/reducer';
import {Link} from 'react-router-dom'


class Memelist extends Component {

    constructor(props){
        super(props)
        this.state = {
            someState:[]
        }
    }
   
componentDidMount(){
    this.props.getMemeList()
}


    render(){
        const meme = this.props.memes;
        if (meme != null) { 
            var list = meme.map( (memebox, i) => {
            return(
                <div className="meme-box" key={i}>
                    <Link to={`/meme/${memebox.id}`} style={{ textDecoration: 'none' }}>
                    <div className="meme-photo-container">
                        <img className="meme-photo" src={memebox.img} />
                    </div>
                <div className="meme-title">
                    <p>{memebox.title}</p>
                </div>    
                </Link>
                </div>
            )
        } )
    }
       

        return(
            <div className="memelist">
            
                {list}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        memes:state.memes
    }
}

export default connect(mapStateToProps, {getMemeList})(Memelist);

