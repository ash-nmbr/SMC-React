import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class SubmitButton extends React.Component{
    render(){
        return(
            <div>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }>
                        {this.props.text}
                    </Button>
                    
            </div>
        )
    }
}
export default SubmitButton;