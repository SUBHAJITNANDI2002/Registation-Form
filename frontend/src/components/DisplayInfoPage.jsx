// DisplayInfoPage.js
import React from 'react';

function DisplayInfoPage() {
    // Retrieve form data from local storage
    const formData = JSON.parse(localStorage.getItem('formData'));

    return (
        <div className='container1'>
            <h2>Registration Information</h2>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Email: {formData.email}</p>
            <p>Country: {formData.country}</p>
            <p>State: {formData.state}</p>
            <p>City: {formData.city}</p>
            <p>Date of Birth: {formData.dob}</p>
            <p>Age: {formData.age}</p>
            <p>Gender: {formData.gender}</p>
        </div>
    );
}

export default DisplayInfoPage;
