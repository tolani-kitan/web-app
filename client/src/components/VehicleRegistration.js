import React, { useEffect, useState, useContext } from 'react';


const VehicleRegistration = () => {
   
    return (
        <div>
            <div class="navbar navbar-light nav-back">
                <span class="navbar-brand mb-0 h1 span-color">Get-License</span>

                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
            </div>

            <div className="container">
            <form>
            <div class="form-group my-5">
                <label for="sex">Application Type</label>
                <select className="form-control" id="sex">
                <option>Articulated Vehicle</option>
                <option>Commercial</option>
                <option>Private</option>
                <option>Motorcycle</option>
                </select>
            </div>
            <div class="form-group my-5">
                <label for="lName">Driver's Test Scores</label>
                <input type="text" class="form-control" placeholder="Enter last name" name="last_name" />
            </div>
            <div class="form-group my-5">
                <label for="dob">State</label>
                <input type="date" class="form-control" name="date_of_birth" />
            </div>
            <input  
            type='radio'
            value='First time'
        /> First Time{ ' '}
        <input  
            type='radio'
            name='type'
            value='Renewal'
        /> Renewal
            <div className="form-group my-5">
                <label for="address">Residential Address</label>
                <input type="text" className="form-control" placeholder="Enter your address" />
             </div>

             <button type="submit" className="btn btn-primary">Submit</button>
        </form>
            </div>
            
        </div>
    )
}

export default VehicleRegistration;
