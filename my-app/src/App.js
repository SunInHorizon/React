import "./App.css";
import { React, useState } from "react";
import {nanoid} from "nanoid";
import {StyleSheet} from "react-native";

function App() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        gender: '',
        password: '',
        confirmPassword: '',
        file: null,
    });

    const [errors, setErrors] = useState({});
    var [newData, setNewData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const styles = StyleSheet.create({
        image: {
            display: "none"
        }
    })

    const handleChange = (e) => {
         
        const {name} = e.target;
        if(name === 'file')
        {
            const fieldName = e.target.getAttribute("name");
            const fieldValue = e.target.files[0];

            const newFormData = {...formData};
            newFormData[fieldName] = fieldValue;

            setFormData(newFormData);
        }
        else
        {
            const fieldName = e.target.getAttribute("name");
            const fieldValue = e.target.value;

            const newFormData = {...formData};
            newFormData[fieldName] = fieldValue;

            setFormData(newFormData);  
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        
        console.log(formData.firstName, formData.lastName, formData.email, formData.contact, formData.gender);

       if(Object.keys(newErrors).length === 0)
       {
        if (isEditing) 
        {
            setNewData(newData.map((data) => 
                data.id === editId ? { ...data, ...formData } : data
            ));
            setIsEditing(false);
            setEditId(null);
        }
        else
        {
            const newDataEntry = {
                id: nanoid(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                contact: formData.contact,
                gender: formData.gender,
            };

            setNewData([...newData, newDataEntry]);

            document.getElementById("tbl").style.display = "";
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                contact: '',
                gender: '',
                password: '',
                confirmPassword: '',
                file: '',
            });
        }
            
       }
    };

    const handleEdit = (id) => 
    {
        const dataToEdit = newData.find((data) => data.id === id);
        setFormData(dataToEdit);
        setIsEditing(true);
        setEditId(id);
    };

    const handleDelete = (id) => 
    {
        setNewData(newData.filter((data) => data.id !== id));
    };

    const validateForm = (data) => {

        const errors = {};
        if(!data.firstName)
        {
            errors.firstName = 'First Name is required';
        }
        if(!data.lastName)
        {
            errors.lastName = 'Last Name is required';
        }
        if(!data.email)
        {
            errors.email = 'Email is required';
        }
        if(!data.contact)
        {
            errors.contact = 'Contact is reqired';
        }
        if(!data.gender)
        {
            errors.gender = 'Gender is required';
        }
        if(!data.password)
        {
            errors.password = 'Password is required';
        }
        if(!data.confirmPassword)
        {
            errors.confirmPassword = 'Passwrod is reqired';
        }
        else if(data.confirmPassword !== data.password)
        {
            errors.confirmPassword = 'Password do not match';
        }
        if(!data.file)
        {
            errors.file = 'Image is required';
        }

        return errors;
    };

    return (
        <div>
            <h1>FORM IN REACT</h1>
            <fieldset>
                <form action="#" method="get" className="form">
                    <div>
                        <label>First Name</label>
                        <input type="text" name="firstName" id="firstname" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required/>
                        {errors.firstName && (<span className ="error">{errors.firstName}</span>)}
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lastName" id="lastname" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" required/>
                        {errors.lastName && (<span className ="error">{errors.lastName}</span>)}
                    </div>
                    <div>
                        <label>Enter Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required/>
                        {errors.email && (<span className ="error">{errors.email}</span>)}
                    </div>
                    <div>
                        <label>Contact</label>
                        <input type="tel" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder="Enter Mobile number" required/>
                        {errors.contact && (<span className ="error">{errors.contact}</span>)}
                    </div>
                    <div>
                        <label>Gender</label>
                        <input type="radio" name="gender" value="Male" id="male" checked={formData.gender === "Male"} onChange={handleChange}/>
                        Male
                        <input type="radio" name="gender" value="Female" id="female" checked={formData.gender === "Female"} onChange={handleChange}/>
                        Female
                        <input type="radio" name="gender" value="Other" id="other" checked={formData.gender === "Other"} onChange={handleChange}/>
                        Other<br></br>
                        {errors.gender && (<span className ="error">{errors.gender}</span>)}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter the Password"></input>
                        {errors.password && (<span className="error">{errors.password}</span>)}
                    </div>
                    <div>
                        <label>Confrim Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter the Password"></input>
                        {errors.confirmPassword && (<span className="error">{errors.confirmPassword}</span>)}
                    </div>
                    <div>
                        <label>Upload Image</label>
                        <input type="file" name="file" id="file" onChange={handleChange} placeholder="Enter Upload File" required/>
                        {errors.image && (<span className ="error">{errors.image}</span>)}
                    </div>
                    <button type="submit" value="Submit" onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>
            </fieldset>

            <table className="table" style={styles.image} id="tbl">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                       {newData.map((data) => (
                         <tr key={data.id}>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.email}</td>
                            <td>{data.contact}</td>
                            <td>{data.gender}</td>
                            <td>
                               <div className="button">
                                    <button onClick={() => handleEdit(data.id)} id="edit">Edit</button>
                                    <button onClick={() => handleDelete(data.id)} id="delete">Delete</button>
                               </div>
                            </td>
                        </tr>
                       ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
