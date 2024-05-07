"use client"
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Form.css';
import { FaTimes } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiAddCircleFill } from 'react-icons/ri';
import { submitForm } from '../GlobalRedux/Features/counter/formSlice';


const Form: NextPage = () => {      
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [reqStartDate, setReqStartDate] = useState<Date | null>(null)
    const [projectStartDate, setProjectStartDate] = useState<Date | null>(null);
    const [primarySkill, setPrimarySkill] = useState('');
    const [secondarySkill, setSecondarySkill] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [clientName, setClientName] = useState('');
    const [clientSpocName, setClientSpocName] = useState('');
    const [clientSpocContact, setClientSpocContact] = useState('');
    const [accountManager, setAccountManager] = useState('');
    const [accountManagerEmail, setAccountManagerEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [roleType, setRoleType] = useState('');
    const [modeOfWork, setModeOfWork] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [salaryBudget, setSalaryBudget] = useState('');
    const [modeOfInterviews, setModeOfInterviews] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [yearsOfExperienceRequired, setYearsOfExperienceRequired] = useState('');
    const [noOfOpenings, setNoOfOpenings] = useState<number>(0);
    const dispatch = useDispatch();

    const formData = useSelector((state: any) => state.form.formData);
    // console.log('Data:',formData)
    
    const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        try {
            const isoStartDate = startDate?.toISOString();
            const isoReqStartDate = reqStartDate?.toISOString();
            const isoProjectStartDate = projectStartDate?.toISOString();
          const response = await fetch('http://localhost:8080/api/requirement', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              requirementStartDate:reqStartDate,
              clientName: clientName,
              clientSpocName: clientSpocName,
              clientSpocContact: clientSpocContact,
              accountManager: accountManager,
              accountManagerEmail: accountManagerEmail,
              jobTitle: jobTitle,
              noOfOpenings: noOfOpenings,
              roleType: roleType,
              modeOfWork: modeOfWork,
              workLocation: workLocation,
              salaryBudget: salaryBudget,
              modeOfInterviews: modeOfInterviews,
              tentativeStartDate: startDate,
              tentativeDuration: projectStartDate,
              approvedBy: approvedBy,
              yearsOfExperienceRequired: yearsOfExperienceRequired,
              primarySkillSet: primarySkill,
              secondarySkillSet: secondarySkill
            })
          });
      
          if (response.ok) {
            console.log('Form data submitted successfully!');
            setReqStartDate(null)
            setStartDate(null);
            setProjectStartDate(null);
            setPrimarySkill('');
            setSecondarySkill('');
            setClientName('');
            setClientSpocName('');
            setClientSpocContact('');
            setAccountManager('')
            setAccountManagerEmail('')
            setJobTitle('')
            setRoleType('');
            setModeOfWork('');
            setWorkLocation('');
            setSalaryBudget('');
            setModeOfInterviews('');
            setApprovedBy('');
            setYearsOfExperienceRequired('');
            // setNoOfOpenings('');


            dispatch(submitForm({
                requirementStartDate: isoReqStartDate,
                clientName: clientName,
                clientSpocName: clientSpocName,
                clientSpocContact: clientSpocContact,
                accountManager: accountManager,
                accountManagerEmail: accountManagerEmail,
                jobTitle: jobTitle,
                noOfOpenings: noOfOpenings,
                roleType: roleType,
                modeOfWork: modeOfWork,
                workLocation: workLocation,
                salaryBudget: salaryBudget,
                modeOfInterviews: modeOfInterviews,
                tentativeStartDate: isoStartDate,
                tentativeDuration: isoProjectStartDate,
                approvedBy: approvedBy,
                yearsOfExperienceRequired: yearsOfExperienceRequired,
                primarySkillSet: primarySkill,
                secondarySkillSet: secondarySkill
                
              }));
             
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

    const handleAddField = () => {
        setNoOfOpenings(prevNo => prevNo + 1);
    };

    const removeOpening = (index: number) => {
        const updatedOpenings = [...Array.from({ length: noOfOpenings })];
        updatedOpenings.splice(index, 1);
        setNoOfOpenings(updatedOpenings.length);
    };        

  return (
    isOpen && (
        <div className='position'>
        <div className='container'>
        <form onSubmit={submitFormHandler}>
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
              <input type="text" className="input-box" name="cname"  value={clientName} onChange={(e) => setClientName(e.target.value)}  required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="spocname" className="form-label">Client SPOC Name</label>
              <input type="text" className="input-box" name="spocname" value={clientSpocName} onChange={(e) => setClientSpocName(e.target.value)} required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="contact" className="form-label">Client Contact Details</label>
              <input type="text" className="input-box" name="contact" value={clientSpocContact} onChange={(e) => setClientSpocContact(e.target.value)} required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="manager" className="form-label">Account Manager Name</label>
              <input type="text" className="input-box" name="manager" value={accountManager} onChange={(e) => setAccountManager(e.target.value)} required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="email" className="form-label">Account Manager E-mail</label>
              <input type="email" className="input-box" name="email" value={accountManagerEmail} onChange={(e) => setAccountManagerEmail(e.target.value)} aria-describedby="emailHelp" />
            </div>
              <div className="form-group p-2">
                <label htmlFor="jobtitle" className="form-label">Job Designation</label>
                <input type="text" className="input-box" name='jobtitle' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} aria-describedby="mobileHelp" />
              </div>   
              <div className="form-group p-2 position-relative">
                    <label htmlFor="openings" className="form-label">No. of Openings</label>
                    <div className="input-container">
                        <input type="number" className="input-box" name='openings' value={noOfOpenings} onChange={(e) => setNoOfOpenings(Number(e.target.value))} aria-describedby="emailHelp" />
                        <RiAddCircleFill className="add-icon" onClick={handleAddField} />
                    </div>
                </div>
                {Array.from({ length: noOfOpenings }).map((_, index) => (
                    <div key={index} className="form-group p-2 position-relative">
                        <label htmlFor={`opening-${index + 1}`} className="form-label">Opening {index + 1}</label>
                        <div className="input-container">
                            <input type="text" className="input-box" id={`opening-${index + 1}`} name={`opening-${index + 1}`} aria-describedby={`opening-${index + 1}-help`} />
                            <FaTimes className="input-close-icon" onClick={() => removeOpening(index)} />
                        </div>
                    </div>
                ))}

            <div className="form-group pb-2 p-2">
              <label htmlFor="role" className="form-label">Role</label>
              <select className="input-box" name="role" value={roleType} onChange={(e) => setRoleType(e.target.value)} required>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="form-group pb-2 p-2">
              <label htmlFor="modeOfWork" className="form-label">Mode of Work</label>
              <select className="input-box" name="modeOfWork" value={modeOfWork} onChange={(e) => setModeOfWork(e.target.value)} required>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="form-group p-2">
              <label htmlFor="location" className="form-label">Work location</label>
              <input type="text" className="input-box" name="location" value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} required={true} />
            </div>
            <div className="form-group row p-2">
              <div className="col">
                <label htmlFor="buget" className="form-label">Salary Budget</label>
                <input type="text" className="input-box" name='budget' value={salaryBudget} onChange={(e) => setSalaryBudget(e.target.value)} aria-describedby="mobileHelp" />
              </div>
              <div className="col">
              <div className="form-group">
              <label htmlFor="modeOfInterview" className="form-label">Mode of Interview</label>
              <select className="input-box" name="modeOfInterview" value={modeOfInterviews} onChange={(e) => setModeOfInterviews(e.target.value)} required>
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
              <input type="email" className="input-box" name="email" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} required={true} />
            </div>
            <div className="form-group p-2">
              <label htmlFor="ex" className="form-label">Years of Experience</label>
              <input type="number" className="input-box" name="ex" value={yearsOfExperienceRequired} onChange={(e) => setYearsOfExperienceRequired(e.target.value)} required={true} />
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