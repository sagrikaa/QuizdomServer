import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
    render() {
        const { branding } = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3">
                <div className="container">
                    <a href="/" className="navbar-brand">{branding}</a>
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                               <a href="/" className="nav-link">
                                   Home
                               </a>
                        
                            </li>

                            <li className="navbar-item">
                               <a href="/" className="nav-link">
                                   Quiz
                               </a>
                        
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

Header.propTypes = {
    branding:PropTypes.string.isRequired
};