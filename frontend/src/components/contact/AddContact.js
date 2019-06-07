import React, { Component } from 'react';
import {Consumer} from '../../context';
import uuid from 'uuid';

class AddContact extends Component {

    state={
       
        name:"",
        email:"",
        phone:""
    }

    onChange = e => this.setState({[e.target.name] : e.target.value});
        
    onSubmit = (dispatch , e) => {
        e.preventDefault();
        const {name,email,phone} = this.state;  
        const newContact = {
            id:uuid() ,
            name,
            email,
            phone
        };

        dispatch({type:"ADD_CONTACT", payload:newContact});

        this.setState({name:'',email:'',phone:''});
    }
    
    render() {
        const {name,email,phone} = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;

                        return(
                            <div className='card mb-3'>
                            <h3 className="card-header">Add Contact</h3>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control form-control-lg" name="name" placeholder="Enter Name" value={name}
                                        onChange={this.onChange}/>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Email</label>
                                        <input type="text" className="form-control form-control-lg" name="email" placeholder="Enter Emaiil" value={email} onChange={this.onChange}/>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Phone</label>
                                        <input type="text" className="form-control form-control-lg" name="phone" placeholder="Enter Phone Number" value={phone} onChange={this.onChange}/>
                                    </div>
            
                                    <input type="submit" className="btn btn-block btn-danger" value="Add" />
                                </form>
                            </div>
                            
                        </div>
                        
                            );
                    }
                }
            </Consumer>
            
        )
    }
}

export default AddContact;