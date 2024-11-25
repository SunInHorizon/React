import "./App.css";
import { React, useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebase";

function App() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(database, "users"));
        const documents = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(documents);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length === 0) {
            if (editId) {
                await updateDoc(doc(database, "users", editId), formData);
                setEditId(null);
            } else {
                await addDoc(collection(database, "users"), formData);
            }
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                contact: '',
                gender: '',
                password: '',
                confirmPassword: '',
            });
            fetchData();
        } else {
            setErrors(newErrors);
        }
    };

    const handleDelete = async (docId) => {
        await deleteDoc(doc(database, "users", docId));
        fetchData();
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditId(item.id);
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

        return errors;
    };

    return (
        <div className="App">
            <h1>FORM IN REACT</h1>
            <fieldset>
                <form onSubmit={handleSubmit} action="#" method="get" className="form">
                    <div>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstName" id="firstname" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required />
                        {errors.firstName && (<span className="error">{errors.firstName}</span>)}
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastName" id="lastname" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" required />
                        {errors.lastName && (<span className="error">{errors.lastName}</span>)}
                    </div>
                    <div>
                        <label htmlFor="email">Enter Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                        {errors.email && (<span className="error">{errors.email}</span>)}
                    </div>
                    <div>
                        <label htmlFor="tel">Contact</label>
                        <input type="tel" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder="Enter Mobile number" required />
                        {errors.contact && (<span className="error">{errors.contact}</span>)}
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <input type="radio" name="gender" value="male" id="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
                        <input type="radio" name="gender" value="female" id="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
                        <input type="radio" name="gender" value="other" id="other" checked={formData.gender === "other"} onChange={handleChange} /> Other<br />
                        {errors.gender && (<span className="error">{errors.gender}</span>)}
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
                    <button type="submit">{editId ? "Update" : "Submit"}</button>
                </form>
            </fieldset>

            <h2>DATA</h2>
            <table className="table" id="tbl">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.gender}</td>
                            <td>
                                <div className="button">
                                <button onClick={() => handleEdit(item)} id="edit">Edit</button>
                                <button onClick={() => handleDelete(item.id)} id="delete">Delete</button>
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
