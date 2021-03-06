import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';




export default class QuestionUuidType extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        answered: false,
      }
    }


    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _onChange=(event, newValue)=>{
        
        let regEx = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/;
        if(!regEx.test(newValue))
        {
            this.setState({inputError: !this.state.inputError});
        }
        else
        {
            this.setState({inputValue: newValue, inputError: !this.state.inputError});
        }
    }

    _onSave=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:this.state.inputValue, type:'uuid'});
            this.setState({answered: !this.state.answered});
        }
    }

    _onCancel=()=>{
        this.setState({inputValue:{}, answered: !this.state.answered});
    }

    _onEditAnswer=()=>{
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.state.question);
        }
    }
     
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                
                {this.state.answered?
                    <Segment attached='bottom' inverted color='green'>
                         <Message className='uuidType-bottom-message' attached='bottom' color='olive'>
                            <Header floated='right' size = 'large'>{this.state.inputValue}</Header>
                            <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                        </Message>
                    </Segment>
                    :
                    this.state.inputError?
                        <Segment attached='bottom'>
                            <Input error iconPosition='left' placeholder='Please enter numerical values' value={this.state.inputValue} onChange={this._onChange}>
                                <Icon name='sort alphabet ascending' />
                                <input />
                            </Input>
                            <Button.Group>
                                <Button positive disabled>Save</Button>
                                <Button.Or />
                                <Button negative onClick={this._onCancel}>Cancel</Button>
                            </Button.Group>
                        </Segment>
                        :
                        <Segment attached='bottom'>
                            <Input iconPosition='left' placeholder='Please enter numerical values' value={this.state.inputValue} onChange={this._onChange}>
                                <Icon name='sort alphabet ascending' />
                                <input />
                            </Input>
                            <Button.Group>
                                <Button positive onClick={this._onSave}>Save</Button>
                                <Button.Or />
                                <Button negative onClick={this._onCancel}>Cancel</Button>
                            </Button.Group>
                        </Segment>}
                
            </Segment.Group>
        );
        
    }
}
