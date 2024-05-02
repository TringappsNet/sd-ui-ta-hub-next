"use client";
import React, { useState } from 'react';
import type { NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
import Form from '../form/page';

const Navbar: NextPage = () => {
    const [showForm, setShowForm] = useState(false);

    const openForm = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        setShowForm(prevState => !prevState); // Toggle the state
    };
    
    const closeForm = () => {
        setShowForm(false); 
    };

    return ( 
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">            
                <p className="navbar-brand">Tringapps</p>          
                <form className="form-inline"> 
                    <button className="btn btn-outline-success my-2 my-sm-0 nav-button" onClick={openForm}>Create</button>
                </form>
            </nav>
            {showForm && <Form onClose={closeForm} />} 
        </div>
    );
};

export default Navbar;