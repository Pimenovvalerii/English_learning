import React from 'react';
import Header from './header/header';
import Main from './main/main';
import vocabulary from './vocabulary/vocabulary';
import './App.css'


export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      lessons:null,
      hidden: false,
      style: {'display' : ' none'},
      styleblock : {'display' : ' none'},
      styleApp: null,
    }

    this.lessonsCallBack = this.lessonsCallBack.bind(this);
    this.onClickYes = this.onClickYes.bind(this);
    this.onClickNo = this.onClickNo.bind(this);
    this.boxShadow = this.boxShadow.bind(this);
  }

  lessons(){
    
    return Object.keys(vocabulary)
  }

  lessonsCallBack(lessons){

    this.setState({lessons})
  }

  onClickYes(){
    this.setState( {style : {'display' : ' none'}})
  }

  onClickNo(){
      this.setState( {
        hidden : true,
        styleblock : {'display' : 'flex'}})
      
    setTimeout( ()=>{
      this.setState( {
        hidden : false,
        styleblock : {'display' : 'none'}})
    },2000)
  }

  boxShadow(style){
    this.setState({ styleApp: style })

    setTimeout( ()=>{
      this.setState({ styleApp: { 'boxShadow': 'none'} })
    },4000)
  }

  render(){

  
    return (
      <div className="app" style={this.state.styleApp}>
        <div  style={this.state.style}
              className="welcome">
            <button 
              onClick={this.onClickYes}
              hidden={this.state.hidden} >yes!</button>
            
            <button   
              onClick={this.onClickNo}
              hidden={this.state.hidden} >no:(</button>

            <div style={ this.state.styleblock}>Надо учить </div>
        </div>
        <Header selected={this.lessons()} lessonsCallBack={this.lessonsCallBack}  />
        <Main vocabulary={vocabulary} lessons={this.state.lessons} boxShadow={this.boxShadow}/>
        
      </div>
    );
  }
}


