import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMemeList} from '../ducks/reducer';


class Memelist extends Component {
   
componentDidMount(){
    this.props.getMemeList()
}


    render(){
        const meme = this.props.memes;
        if (this.props.memes != null) { 
            var list = meme.map( (memebox, i) => {
            return(
                <div className="meme-box" key={i}>
                    <div className="meme-photo">
                        <img src={memebox.img} />
                    </div>
                <div className="meme-title">
                    <p>{memebox.title}</p>
                </div>    
                </div>
            )
        } )
    }
       

        return(
            <div className="memelist">
            <p>there should be memes here!! >:(</p>
                {list}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Memes:state.memes
    }
}

export default connect(mapStateToProps, {getMemeList})(Memelist);

