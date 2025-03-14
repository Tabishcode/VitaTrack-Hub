// import React, { useState } from 'react';
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBInput,
//     MDBIcon,
//     MDBCheckbox
// } from 'mdb-react-ui-kit';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

// function App() {
//     // State for form inputs
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         repeatPassword: '',
//         agreeToTerms: false
//     });

//     // Handle input changes
//     const handleChange = (e) => {
//         const { id, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [id]: type === 'checkbox' ? checked : value
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, email, password, repeatPassword, agreeToTerms } = formData;

//         // Validation
//         if (!name || !email || !password || !repeatPassword) {
//             alert('Please fill out all fields.');
//             return;
//         }
//         if (password !== repeatPassword) {
//             alert('Passwords do not match.');
//             return;
//         }
//         if (!agreeToTerms) {
//             alert('You must agree to the terms of service.');
//             return;
//         }

//         // Simulate successful form submission
//         // console.log('Form Data:', { name, email, password });
        
//         await fetch('https://vitalhub-mvp-production.up.railway.app/api/user/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, email, password }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // console.log('Success:', data);
//                 alert('Form submitted successfully!');
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 alert("An Error Occurred!");
//             });
//     };

//     return (
//         <MDBContainer fluid>
//             <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
//                 <MDBCardBody>
//                     <MDBRow>
//                         <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
//                             <h4 className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Sign up</h4>

//                             <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
//                                 <div className="d-flex flex-row align-items-center mb-4 w-6/12">
//                                     <MDBIcon fas icon="user me-3" size='lg' />
//                                     <MDBInput
//                                         label='Your Name'
//                                         id='name'
//                                         type='text'
//                                         className='w-100'
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                                 <div className="d-flex flex-row align-items-center mb-4 w-6/12">
//                                     <MDBIcon fas icon="envelope me-3" size='lg' />
//                                     <MDBInput
//                                         label='Your Email'
//                                         id='email'
//                                         type='email'
//                                         className='w-100'
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                                 <div className="d-flex flex-row align-items-center mb-4 w-6/12">
//                                     <MDBIcon fas icon="lock me-3" size='lg' />
//                                     <MDBInput
//                                         label='Password'
//                                         id='password'
//                                         type='password'
//                                         className='w-100'
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                                 <div className="d-flex flex-row align-items-center mb-4 w-6/12">
//                                     <MDBIcon fas icon="key me-3" size='lg' />
//                                     <MDBInput
//                                         label='Repeat your password'
//                                         id='repeatPassword'
//                                         type='password'
//                                         className='w-100'
//                                         value={formData.repeatPassword}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                                 <div className='mb-4 flex flex-row w-8/12 justify-center'>
//                                     <MDBCheckbox
//                                         name='flexCheck'
//                                         id='agreeToTerms'
//                                         checked={formData.agreeToTerms}
//                                         onChange={handleChange}
//                                         label='I agree to the '
//                                     />
//                                     <p
//                                         style={{
//                                             width: '30%',
//                                             display: 'block',
//                                             paddingLeft: '5px',
//                                             color: '#3b71ca',
//                                             cursor: 'pointer'
//                                         }}
//                                     >
//                                         Terms of service.
//                                     </p>
//                                 </div>

//                                 <MDBBtn className='mb-4' size='lg' type='submit'>
//                                     Register
//                                 </MDBBtn>
//                             </form>
//                         </MDBCol>
//                         <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
//                             <MDBCardImage
//                                 src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
//                                 fluid
//                             />
//                         </MDBCol>
//                     </MDBRow>
//                 </MDBCardBody>
//             </MDBCard>
//         </MDBContainer>
//     );
// }

// export default App;





import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function Signup() {
    // State for form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        agreeToTerms: false
    });

    // Handle input changes
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, repeatPassword, agreeToTerms } = formData;
    
        // Validation
        if (!name || !email || !password || !repeatPassword) {
            alert('Please fill out all fields.');
            return;
        }
        if (password !== repeatPassword) {
            alert('Passwords do not match.');
            return;
        }
        if (!agreeToTerms) {
            alert('You must agree to the terms of service.');
            return;
        }
    
        // Prepare the data
        const requestData = {
            username: name, // Change 'name' to 'username' as expected by the API
            email: email,
            password: password
        };
    
        try {
            const response = await fetch('https://vitalhub-mvp-production.up.railway.app/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
            console.log('Success:', data);
    
            if (data.success) {
                alert('Signup successful!');
            } else {
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred during signup.");
        }
    };
    

    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <h4 className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Sign up</h4>

                            <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                                <div className="d-flex flex-row align-items-center mb-4 w-6/12">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput
                                        label='Your Name'
                                        id='name'
                                        type='text'
                                        className='w-100'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 w-6/12">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput
                                        label='Your Email'
                                        id='email'
                                        type='email'
                                        className='w-100'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 w-6/12">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput
                                        label='Password'
                                        id='password'
                                        type='password'
                                        className='w-100'
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 w-6/12">
                                    <MDBIcon fas icon="key me-3" size='lg' />
                                    <MDBInput
                                        label='Repeat your password'
                                        id='repeatPassword'
                                        type='password'
                                        className='w-100'
                                        value={formData.repeatPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='mb-4 flex flex-row w-8/12 justify-center'>
                                    <MDBCheckbox
                                        name='flexCheck'
                                        id='agreeToTerms'
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        label='I agree to the '
                                    />
                                    <p
                                        style={{
                                            width: '30%',
                                            display: 'block',
                                            paddingLeft: '5px',
                                            color: '#3b71ca',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Terms of service.
                                    </p>
                                </div>

                                <MDBBtn className='mb-4' size='lg' type='submit'>
                                    Register
                                </MDBBtn>
                            </form>
                        </MDBCol>
                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                fluid
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Signup;