import React from 'react';

import './main.css';

export default class Main extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputValue:'',
            word : '',
            elem : null,
            language: null,
            answer : null,
            help : null,
            border: 'none',
            result : {'color' : 'red'}
        }
        
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.randomElem = this.randomElem.bind(this)
        this.handleHelp = this.handleHelp.bind(this)
    }

    randomElem( array) {
        const randNum = Math.floor( Math.random()*array.length)
        const elem = array[randNum];
        this.setState({elem})
        
    }

    handleSubmit(event) {
        event.preventDefault();
        const lesson = this.props.lessons;
        const elem = this.state.elem;
        const language = this.state.language !== 'Eng' ? 'Eng' : 'Ru';
        
        if(this.state.inputValue === elem[language]){
            
            this.setState({
                inputValue : '',
                answer: 'Правильно',
                help : null,
                result: {'color' : 'green'},
                }
            )

            this.props.boxShadow({ 'boxShadow': 'inset 0px 0px 16px 60px rgba(151, 190, 0, 0.4'})
            
            setTimeout( ()=>{
                this.setState({answer : ''})                                  
            },4000)
        } else {
            
            this.setState({
                inputValue : '',
                answer: `Правильное слово :  ${elem[language]}`,
                help : null,
                result: {'color' : 'red'},
                }
            )
           
            this.props.boxShadow({ 'boxShadow': 'inset 0px 0px 16px 60px rgba(255, 0, 0, 0.4)'})
            setTimeout( ()=>{
                this.setState({ answer:''})
            },4000)
        } 

        setTimeout(()=>{
            this.randomElem(this.props.vocabulary[lesson])
        },4000)

        
    }

    handleChange(event) {
        this.setState( { inputValue: event.target.value});
    }

    handleSelectChange(event) {

        const lesson = this.props.lessons
        this.setState({language: event.target.value});
        this.randomElem(this.props.vocabulary[lesson]);
        
    }

    handleHelp(){
        const language = this.state.language !== 'Eng' ? 'Eng' : 'Ru';
        const elem = this.state.elem;
        this.setState({help : elem[language ]})
    }

    rendering(){
        const language = this.state.language;
        let word = null;

        if(language != null){
            const key = Math.floor(Math.random()*2000)
            word = <li key={key} >{this.state.elem[language]}</li> 
        }

        return word;
    }

    render(){

        
        const {answer} = this.state;
        const {help} = this.state;
        const word = this.rendering();
        
        const lessons = (this.props.lessons === null || 
                            this.props.lessons === 'Вибирите урок') ? 
                            true : false;
        const disabled = (this.state.language === null ||
                            this.state.language === 'Выберите язык' ||
                            lessons ? true : false ) 
                            
        return (
            <div className="main">
                <div>
                    <select  
                        hidden={lessons}
                        onChange={this.handleSelectChange}
                    >
                        <option >Выберите язык</option>
                        <option>Ru</option>
                        <option>Eng</option>
                    </select>

                    
                </div>

                <div className="wrap-main">
                                       
                    <div className="help">
                        <button onClick={this.handleHelp}
                                disabled={disabled}
                        >
                            Подсказка
                        </button>
                        <span className="help">
                            {help}
                        </span>
                    </div>

                    <div style={this.state.result}
                        className="result">
                        {answer}
                    </div>

                    <div className="word">
                        <ul>{word}</ul>
                    </div>
                    
                    
                </div>
                
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                        className="input"
                        placeholder='enter the word'
                        type="text" 
                            value={this.state.inputValue}
                            onChange={this.handleChange}
                        />
                        <button 
                        className="btn"
                            disabled={disabled}
                        >
                            next
                        </button>
                    </form>
        
                </div>  
            </div>
        )
    }  
}
