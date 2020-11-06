import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth/user/AuthContext';

const Registration = () => {
    const authContext = useContext(AuthContext);

    const { updateUser, current } = authContext;

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        sex: '',
        occupation: '',
        residential_address: ''
    })

    useEffect(() => {
        stateList();

        if(current !== null) {
            setUser(current);
        } else {
            setUser({
                first_name: '',
                last_name: '',
                date_of_birth: '',
                sex: '',
                occupation: '',
                residential_address: ''
            });
        }
    }, [authContext, current])

    const [states, setStates] = useState([]);

    const inputChange = e => setUser({...user, [e.target.name]: e.target.value });

    const { first_name,last_name, date_of_birth, sex, state_of_origin, occupation, residential_address } = user;

        const stateList = async () => {
            const getState = await fetch('https://nigerian-states-info.herokuapp.com/api/v1/states');
            const data = await getState.json()
            const stateAll = data.data
                setStates(stateAll);
        }

    const handleSubmit = e => {
        e.preventDefault();

        if(current !== null) {
            updateUser(user);
        }
    }

    
    return (
        <div>
            <div class="navbar navbar-light nav-back">
                <span class="navbar-brand mb-0 h1 span-color">Get-License</span>
            </div>

            <div className="container">
            <form>
            <div class="form-group my-5">
                <label for="fName">First Name</label>
                <input type="text" class="form-control" placeholder="Enter first name" name="first_name" value={first_name} onChange={inputChange} />
            </div>
            <div class="form-group my-5">
                <label for="lName">Last Name</label>
                <input type="text" class="form-control" placeholder="Enter last name" name="last_name" value={last_name} onChange={inputChange} />
            </div>
            <div class="form-group my-5">
                <label for="dob">Date of Birth</label>
                <input type="date" class="form-control" name="date_of_birth" value={date_of_birth} onChange={inputChange} />
            </div>
            <div className="form-group">
                <label for="sex">Sex</label>
                <select className="form-control" id="sex" name="sex" value={sex} onChange={inputChange}>
                <option>Male</option>
                <option>Female</option>
                </select>
            </div>
            <div className="form-group">
                <label for="state">State of Origin</label>
                <select className="form-control" id="select" name="state_of_origin" value={state_of_origin} onChange={inputChange}>
                {
                    states.map((state, index) => {
                        return (
                        <option key={index}>{state.Name}</option>
                        )
                    })
                }
                </select>
            </div>
            <div class="form-group">
                <label for="occupation">Occupation</label>
                <input type="text" className="form-control" placeholder="occupation" name="occupation" value={occupation} onChange={inputChange} />
            </div>
            <div className="form-group">
                <label for="address">Residential Address</label>
                <input type="text" className="form-control" placeholder="Enter your address" name="residential_address" value={residential_address} onChange={inputChange} />
             </div>
             <div class="form-group">
                <label for="exampleFormControlFile1">Documents</label>
                <input type="file" class="form-control-file" multiple  name="state_of_origin" />
            </div>

             <button type="submit" className="btn btn-primary">Save & Continue Application</button>
        </form>
            </div>
            
        </div>
    )
}

export default Registration;
