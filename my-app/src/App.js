import "./App.css";
import { React, useState } from "react";

function App() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        gender: '',
        image: '',
    });

    const [errors, setErrors] = useState({});

    /*const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");*/

    const handleChange = (e) => {
         
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        /*console.log(
            firstName,
            lastName,
            email,
            contact,
            gender,
            image,
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setGender("");
        setImage("");*/
    };

    const validateForm = (data) => {

        const errors = {};
        if(!data.firstName.trim())
        {
            errors.firstName = 'First Name is required';
        }
        if(!data.lastName.trim())
        {
            errors.lastName = 'Last Name is required';
        }
        if(!data.email.trim())
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
        if(!data.image)
        {
            errors.image = 'Image is required';
        }

        return errors;
    };

    return (
        <div className="App">
            <h1>FORM IN REACT</h1>
            <fieldset>
                <form action="#" method="get">
                    <div>
                        <label for="firstname">First Name</label>
                        <input type="text" name="firstName" id="firstname" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required/>
                        {errors.firstName && (<span className ="error">{errors.firstName}</span>)}
                    </div>
                    <div>
                        <label for="lastname">Last Name</label>
                        <input type="text" name="lastName" id="lastname" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" required/>
                        {errors.lastName && (<span className ="error">{errors.lastName}</span>)}
                    </div>
                    <div>
                        <label for="email">Enter Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required/>
                        {errors.email && (<span className ="error">{errors.email}</span>)}
                    </div>
                    <div>
                        <label for="tel">Contact</label>
                        <input type="tel" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder="Enter Mobile number" required/>
                        {errors.contact && (<span className ="error">{errors.contact}</span>)}
                    </div>
                    <div>
                        <label for="gender">Gender</label>
                        <input type="radio" name="gender" value="male" id="male" checked={formData.gender === "male"} onChange={handleChange}/>
                        Male
                        <input type="radio" name="gender" value="female" id="female" checked={formData.gender === "female"} onChange={handleChange}/>
                        Female
                        <input type="radio" name="gender" value="other" id="other" checked={formData.gender === "other"} onChange={handleChange}/>
                        Other<br></br>
                        {errors.gender && (<span className ="error">{errors.gender}</span>)}
                    </div>
                    <div>
                        <label for="file">Upload Image</label>
                        <input type="file" name="file" id="file" onChange={handleChange} placeholder="Enter Upload File" required/>
                        {errors.image && (<span className ="error">{errors.image}</span>)}
                    </div>
                    <button type="submit" value="Submit" onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>
            </fieldset>
        </div>
    );
}

export default App;
