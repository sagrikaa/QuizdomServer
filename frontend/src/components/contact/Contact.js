import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from '../../context'

export default class Contact extends Component {
    state=
    {
        showItemDetails:false
    }

    deleteContact = (id, dispatch)=>{
       dispatch({type:"DELETE_CONTACT",payload:id});

    }

    render() {
        const {showItemDetails}=this.state;
        const { id,name,email,phone}=this.props.contact;
        return (
            <Consumer>
                
            {
               value=>{
                const {dispatch} = value;
                return(
                    <div className="card card-body mb-3">
                        <h4>{name}
                        <i className="fas fa-caret-down" style={{cursor:'pointer'}} 
                        onClick={ ()=>
                            this.setState(
                                {
                                    showItemDetails:!this.state.showItemDetails
                                }
                            )
                        }></i>
                        <i className="fas fa-trash-alt" style={{cursor:'pointer',float:'right',color:'red'}}  onClick={this.deleteContact.bind(this,id,dispatch)}></i>
                        </h4>
                        {showItemDetails ? (<ul className="list-group">
                            <li className="list-group-item">Email:{email}</li>
                            <li className="list-group-item">Phone:{phone}</li>
                        </ul>):null}
                    
                        
                    </div>
                )
            }
            }
            </Consumer>
            
        );
    }
}

Contact.propTypes = {
    // name:PropTypes.string.isRequired,
    contact:PropTypes.object.isRequired,
    phone:PropTypes.string.isRequired,
    
};

Contact.defaultProps={
    name:"null",
    phone:"null",
  
}