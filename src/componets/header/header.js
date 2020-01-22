import React from 'react';
import { render } from 'react-dom';

import './header.css'


export default class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            lesson : null,
        }

        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    renderOption(){
        let arrOption = this.props.selected;

        
        arrOption = arrOption.map( (el,id) => {
            return <option key={id} >{el}</option>
        })
        return arrOption;
    }

    handleSelectChange(event){
            this.props.lessonsCallBack(event.target.value)
    }

    render(){

        const element = this.renderOption()
        
        return (
            <div className="header">
                <div>
                I will learn the words
                </div>

                <select onChange={this.handleSelectChange}>
                    <option>Вибирите урок</option>
                    {element}
                </select>
            </div>
        )
    }
    
}

