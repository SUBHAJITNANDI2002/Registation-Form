
// RegistrationPage.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigateTo=useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        state: '',
        city: '',
        dob: '',
        age: '',
        gender: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Store form data in local storage
            localStorage.setItem('formData', JSON.stringify(formData));

            // Send form data to backend to store in database
            const response = await fetch('http://localhost:4000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Clear form data
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    country: '',
                    state: '',
                    city: '',
                    dob: '',
                    age: '',
                    gender: ''
                });

                toast.success("Form submitted successfully");

               
                navigateTo('/display-info');
            } else {
                const errorMessage = await response.text(); // Get error message from backend
                toast.error(errorMessage); // Display error message
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'dob') {
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setFormData({ ...formData, [name]: value, age: age });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className='container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Country:</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div>
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="text" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className='radio-button'>
                    <label>Gender:</label>
                    <label>
                        <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationPage;

