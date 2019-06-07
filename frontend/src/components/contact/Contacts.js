import React, { Component } from 'react'
import Contact from './Contact'
import {Consumer} from '../../context'
export default class Contacts extends Component {
    
    // constructor(){
    //     super();
    //     this.state= {
    //         contacts:[
    //             {id:1,name:'sagrika aggarwal',email:'sagrika@gmail.com', phone:'666-666-6666' },
    //             {id:2,name:'leo antonio',email:'leo@gmail.com',phone:'777-777-7777'},
    //             {id:3,name:'bernardo sze',email:'b.sze@gmail.com',phone:'888-888-8888'}
    //         ]
    //     }

        
    // };
    
    // deleteOnclick=(id)=>{
    //     const newContacts = this.state.contacts.filter(contact=>contact.id!==id)
    //     this.setState(
    //         {contacts:newContacts}
    //         )
    // }
    
    render(){
        return(
            <Consumer>

            {value => {
             const {contacts} = value;
             return(
                 <React.Fragment>

                 {contacts.map(contact =>< Contact key={contact.id} contact={contact} /> 
                 )}

                 </React.Fragment>
                 ) 
               }  }      

         </Consumer>
        )
    }
    
}