"use client"
import React, { useState } from 'react';
import type { NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Form.css';
import { FaTimes } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormProps {
    onClose: () => void; // Define the prop type for onClose
  }


const Form: React.FC<FormProps> = ({ onClose }) => {      
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [reqStartDate, setReqStartDate] = useState<Date | null>(null)
    const [projectStartDate, setProjectStartDate] = useState<Date | null>(null);
    const [primarySkill, setPrimarySkill] = useState('');
    const [secondarySkill, setSecondarySkill] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const formData = new FormData(event.currentTarget);
      
        formData.append('requirementStartDate', '');
        formData.append('clientName','');
        formData.append('clientSpocName', '');
        formData.append('clientSpocContact', '');
        formData.append('accountManager', '');
        formData.append('accountManagerEmail', '');
        formData.append('jobTitle', '');
        formData.append('noOfOpenings', '');
        formData.append('roleType', '');
        formData.append('modeOfWork', '');
        formData.append('workLocation', '');
        formData.append('salaryBudget', '');
        formData.append('modeOfInterviews', '');
        formData.append('tentativeStartDate', '');
        formData.append('tentativeDuration', '');
        formData.append('approvedBy', '');
        formData.append('yearsOfExperienceRequired', '');
        formData.append('primarySkillSet', primarySkill);
        formData.append('secondarySkillSet', secondarySkill);
      
        try {
          const response = await fetch('http://localhost:8080/api/requirement', {
            method: 'POST',
            body: formData
          });
      
          if (response.ok) {
            console.log('Form data submitted successfully!');
            setReqStartDate(null)
            setStartDate(null);
            setProjectStartDate(null);
            setPrimarySkill('');
            setSecondarySkill('');
          } else {
            console.error('Failed to submit form data.');
          }
        } catch (error) {
          console.error('An error occurred while submitting form data:', error);
        }
      };
    const handleClose = () => {
        setIsOpen(false);
    };

  return (
    isOpen && (
        <div className='position'>
        <div className='container'>
        <form onSubmit={submitForm}>
        <div className='header'>
          <h3>Client Requirement Form</h3>
          <FaTimes className="close-icon pl-2" onClick={handleClose} />
        </div>
          <div className="scrollable-area">
            <div className='fields'>
            <div className="form-group pt-3 p-2">
                 <label htmlFor="date" className="form-label">Requirement Start Date</label>
                    <div className="date-picker-container">
                        <DatePicker
                            selected={reqStartDate}
                            onChange={(date) => setReqStartDate(date)}
                            className="calender"
                            name="date"
                            dateFormat="dd/MM/yyyy"
                            required={true}
                        />
                    </div>
            </div>
            <div className="form-group p-2">
              <label htmlFor="cname" className="form-label">Client Name</label>
              <input type="text" className="input-box" name="cname" required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="spocname" className="form-label">Client SPOC Name</label>
              <input type="text" className="input-box" name="spocname" required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="contact" className="form-label">Client Contact Details</label>
              <input type="text" className="input-box" name="contact" required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="manager" className="form-label">Account Manager Name</label>
              <input type="text" className="input-box" name="manager" required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="email" className="form-label">Account Manager E-mail</label>
              <input type="email" className="input-box" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group row p-2">
              <div className="col">
                <label htmlFor="mobile" className="form-label">Job Designation</label>
                <input type="text" className="input-box" aria-describedby="mobileHelp" />
              </div>
              <div className="col">
                <label htmlFor="openings" className="form-label">No. of Openings</label>
                <input type="number" className="input-box" name='openings' aria-describedby="emailHelp" />
              </div>
            </div>
            <div className="form-group pb-2 p-2">
              <label htmlFor="role" className="form-label">Role</label>
              <select className="input-box" name="role" required>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="form-group pb-2 p-2">
              <label htmlFor="modeOfWork" className="form-label">Mode of Work</label>
              <select className="input-box" name="modeOfWork" required>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="form-group p-2">
              <label htmlFor="location" className="form-label">Work location</label>
              <input type="text" className="input-box" name="location" required={true} />
            </div>
            <div className="form-group row p-2">
              <div className="col">
                <label htmlFor="buget" className="form-label">Salary Budget</label>
                <input type="text" className="input-box" name='budget' aria-describedby="mobileHelp" />
              </div>
              <div className="col">
              <div className="form-group">
              <label htmlFor="modeOfInterview" className="form-label">Mode of Interview</label>
              <select className="input-box" name="modeOfInterview" required>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
              </div>
            </div>
            <div className="form-group p-2">
                 <label htmlFor="date" className="form-label">Project Start Date</label>
                    <div className="date-picker-container">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="calender"
                            name="date"
                            dateFormat="dd/MM/yyyy"
                            required={true}
                        />
                    </div>
            </div>
            <div className="form-group p-2">
                <label htmlFor="proj-duration" className="form-label">Project Duration</label>
                     <div className="date-picker-container">
                        <DatePicker
                            selected={projectStartDate}
                            onChange={(date) => setProjectStartDate(date)}
                            className="calender"
                            name="proj-duration"                                dateFormat="dd/MM/yyyy"
                            required={true}
                        />
            </div>
            </div>
            <div className="form-group p-2">
              <label htmlFor="email" className="form-label">Approved By</label>
              <input type="email" className="input-box" name="email" required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="ex" className="form-label">Years of Experience</label>
              <input type="number" className="input-box" name="ex" required={true} />
            </div>
            <div className="form-group p-2">
                                <label htmlFor="primary-skill" className="form-label">Primary Skill set</label>
                                <textarea 
                                    className="text-area" 
                                    name="primarySkill" 
                                    id="primary-skill" 
                                    rows={3}
                                    value={primarySkill} 
                                    onChange={(e) => setPrimarySkill(e.target.value)} 
                                    required
                                />
            </div>
                            <div className="form-group p-2">
                                <label htmlFor="secondary-skill" className="form-label">Secondary Skill set</label>
                                <textarea
                                    className="text-area" 
                                    name="secondarySkill" 
                                    id="secondary-skill" 
                                    rows={3}
                                    value={secondarySkill} 
                                    onChange={(e) => setSecondarySkill(e.target.value)} 
                                    required
                                />
                            </div>
          </div>
          </div>
          <div className='footer'>
          <button type="submit" className="btn-save">Submit</button>
          </div>
      </form>
    </div>
    </div>
    )
  );
}
export default Form;