"use client"
import React, { useState } from 'react';
import type { NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
import Form from '../form/page';

const Navbar: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const openForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setFormKey((prevKey) => prevKey + 1);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <p className="navbar-brand">Tringapps</p>
        <ul className="navbar-nav ">
          {/* <li className="nav-item">
            <a href="/users" className="nav-link">
              User
            </a>
          </li>
          <li className="nav-item">
            <a href="/client" className="nav-link">
              Client
            </a>
          </li>
          <li className="nav-item">
            <a href="/candidate" className="nav-link">
              Candidate
            </a>
          </li> */}
          <li className="nav-item">
            <button className="btn btn-outline-success my-2 my-sm-0 nav-button" onClick={openForm}>
              Create
            </button>
          </li>
        </ul>
      </nav>
      {showForm && <Form key={formKey} {...closeForm} />}
    </div>
  );
};

export default Navbar;
