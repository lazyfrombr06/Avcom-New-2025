import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import Notiflix from 'notiflix';
import emailjs from '@emailjs/browser';

const BookComplaint = () => {
    useDocTitle('ANT - Book a Complaint')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [location, setLocation] = useState('')
    const [complainType, setComplainType] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])
    const [submitStatus, setSubmitStatus] = useState('')

    // Initialize EmailJS on component mount
    React.useEffect(() => {
        // Replace with your actual EmailJS public key
        emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
    }, []);

    const clearErrors = () => {
        setErrors([])
    }

    const clearInput = () => {
        setName('')
        setEmail('')
        setPhone('')
        setDepartment('')
        setLocation('')
        setComplainType('')
        setMessage('')
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
            valid = false;
        }

        if (!department.trim()) {
            newErrors.department = 'Department is required';
            valid = false;
        }

        if (!location.trim()) {
            newErrors.location = 'Location is required';
            valid = false;
        }

        if (!complainType) {
            newErrors.complainType = 'Complaint type is required';
            valid = false;
        }

        if (!message.trim()) {
            newErrors.message = 'Message is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    const sendEmail = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Sending...';

        // Prepare template parameters for EmailJS
        const templateParams = {
            from_name: name,
            reply_to: email,
            phone_number: phone,
            department: department,
            location: location,
            complain_type: complainType,
            message: message,
            to_name:'Avcom'
        };


        
        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;

        
        // Send email using EmailJS
        // Replace with your actual service ID and template ID
        emailjs.send(serviceId, templateId, templateParams,publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                
                // Clear form and show success message
                clearInput();
                setSubmitStatus('Thanks for your message... we will get back to you very shortly');
                
                // Using Notiflix for notification
                Notiflix.Notify.success('Complaint submitted successfully!');
                
                // Reset button
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').innerHTML = 'Submit Complaint';
            }, (error) => {
                console.log('FAILED...', error);
                
                // Show error message
                setSubmitStatus('There was an error submitting your complaint. Please try again.');
                
                // Using Notiflix for error notification
                Notiflix.Notify.failure('Failed to send complaint. Please try again.');
                
                // Reset button
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').innerHTML = 'Submit Complaint';
            });
    }

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='book-complaint' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 ">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">

                <form onSubmit={sendEmail}>

                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Book a Complaint</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input 
                                        name="name" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="Full Name*" 
                                        value={name}
                                        onChange={(e)=> setName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors.name && 
                                        <p className="text-red-500 text-sm">{errors.name}</p>
                                    }
                                </div>
                                
                                <div>
                                    <input
                                        name="phone" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="number" 
                                        placeholder="Phone*"
                                        value={phone}
                                        onChange={(e)=> setPhone(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors.phone && 
                                        <p className="text-red-500 text-sm">{errors.phone}</p>
                                    }
                                </div>

                                <div>
                                    <input 
                                        name="email"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="email" 
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        onKeyUp={clearErrors}   
                                    />
                                    {errors.email && 
                                        <p className="text-red-500 text-sm">{errors.email}</p>
                                    }
                                </div>

                                <div>
                                    <input 
                                        name="department" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="Department*"
                                        value={department}
                                        onChange={(e)=> setDepartment(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors.department && 
                                        <p className="text-red-500 text-sm">{errors.department}</p>
                                    }
                                </div>

                                <div>
                                    <input 
                                        name="location" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="Location*"
                                        value={location}
                                        onChange={(e)=> setLocation(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors.location && 
                                        <p className="text-red-500 text-sm">{errors.location}</p>
                                    }
                                </div>

                                <div>
                                    <select 
                                        name="complainType" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        value={complainType}
                                        onChange={(e)=> setComplainType(e.target.value)}
                                        onKeyUp={clearErrors}
                                    >
                                        <option value="">Select Complaint Type*</option>
                                        <option value="AMC">AMC</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Printer">Printer</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Software">Software</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.complainType && 
                                        <p className="text-red-500 text-sm">{errors.complainType}</p>
                                    }
                                </div>
                        </div>
                        <div className="my-4">
                            <textarea 
                                name="message" 
                                placeholder="Message*" 
                                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                onKeyUp={clearErrors}
                            ></textarea>
                            {errors.message && 
                                <p className="text-red-500 text-sm">{errors.message}</p>
                            }
                        </div>
                        <div className="my-2 w-1/2 lg:w-2/4">
                            <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-blue-900 hover:bg-blue-800 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Submit Complaint
                            </button>
                            {submitStatus && (
                                <p className="text-green-500 font-medium mt-4">{submitStatus}</p>
                            )}
                        </div>
                </div>
                </form>
                        <div
                            className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
                            <div className="flex flex-col text-white">
                                
                                <div className="flex my-4 w-2/3 lg:w-3/4">
                                    <div className="flex flex-col">
                                        <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl">Office Address</h2>
                                        <p className="text-gray-400">  Shiv mandir marg, Badli,<br /> near pancham sweets <br /> 110017, India</p>
                                    </div>
                                </div>
                    
                    <div className="flex my-4 w-2/3 lg:w-1/2">
                        <div className="flex flex-col">
                        <i className="fas fa-phone-alt pt-2 pr-2" />
                        </div>

                        <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us</h2>
                        <p className="text-gray-400">                  <p className="text-gray-400">Tel: +91 99111 89318</p>
                        </p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail</h2>
                                <p className="text-gray-400">avcomnetworktechnologies@gmail.com</p>
                            </div>
                       
                        </div>
                    </div>
                    
                    <div className="flex my-4 w-2/3 lg:w-1/2">
                      
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BookComplaint;

// import React, { useState, useEffect, useRef } from 'react';
// import NavBar from '../components/Navbar/NavBar';
// import Footer from '../components/Footer';
// import { useDocTitle } from '../components/CustomHook';
// import Notiflix from 'notiflix';
// import emailjs from '@emailjs/browser';
// import * as THREE from 'three';

// const BookComplaint = () => {
//     useDocTitle('ANT - Book a Complaint')
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [phone, setPhone] = useState('')
//     const [department, setDepartment] = useState('')
//     const [location, setLocation] = useState('')
//     const [complainType, setComplainType] = useState('')
//     const [message, setMessage] = useState('')
//     const [errors, setErrors] = useState([])
//     const [submitStatus, setSubmitStatus] = useState('')
    
//     // Refs for Three.js
//     const mountRef = useRef(null);
//     const sceneRef = useRef(null);
//     const cameraRef = useRef(null);
//     const rendererRef = useRef(null);
//     const globeRef = useRef(null);
//     const mouseX = useRef(0);
//     const mouseY = useRef(0);
//     const windowHalfX = useRef(window.innerWidth / 2);
//     const windowHalfY = useRef(window.innerHeight / 2);

  

//     // Initialize Three.js
//     useEffect(() => {
//         // Create scene
//         sceneRef.current = new THREE.Scene();
        
//         // Create camera
//         cameraRef.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
//         cameraRef.current.position.z = 200;
        
//         // Create renderer
//         rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//         rendererRef.current.setPixelRatio(window.devicePixelRatio);
//         rendererRef.current.setClearColor(0x000000, 0);
        
//         // Add renderer to DOM
//         if (mountRef.current) {
//             mountRef.current.appendChild(rendererRef.current.domElement);
//         }
        
//         // Create globe
//         const globeGeometry = new THREE.SphereGeometry(50, 32, 32);
        
//         // Load texture for the globe
//         const textureLoader = new THREE.TextureLoader();
//         const globeTexture = textureLoader.load('/earth_texture.jpg', () => {
//             // Use a placeholder if the texture doesn't load
//             if (!globeTexture.image) {
//                 globeRef.current.material.color.set(0x3366cc);
//             }
//         });
        
//         // Add bump mapping for more realism
//         const bumpMap = textureLoader.load('/earth_bump.webp');
//         const specularMap = textureLoader.load('/earth_specular.webp');
        
//         const globeMaterial = new THREE.MeshPhongMaterial({
//             map: globeTexture,
//             bumpMap: bumpMap,
//             bumpScale: 1,
//             specularMap: specularMap,
//             specular: new THREE.Color(0x333333),
//             shininess: 25
//         });
        
//         globeRef.current = new THREE.Mesh(globeGeometry, globeMaterial);
//         sceneRef.current.add(globeRef.current);
        
//         // Add lights
//         const ambientLight = new THREE.AmbientLight(0x555555);
//         sceneRef.current.add(ambientLight);
        
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 3, 5);
//         sceneRef.current.add(directionalLight);
        
//         // Add atmosphere glow effect
//         const atmosphereGeometry = new THREE.SphereGeometry(52, 32, 32);
//         const atmosphereMaterial = new THREE.MeshPhongMaterial({
//             side: THREE.BackSide,
//             transparent: true,
//             opacity: 0.5,
//             color: 0x0077ff
//         });
        
//         const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
//         sceneRef.current.add(atmosphere);
        
//         // Handle window resize
//         const handleResize = () => {
//             windowHalfX.current = window.innerWidth / 2;
//             windowHalfY.current = window.innerHeight / 2;
            
//             cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//             cameraRef.current.updateProjectionMatrix();
            
//             rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//         };
        
//         // Handle mouse movement
//         const handleMouseMove = (event) => {
//             mouseX.current = (event.clientX - windowHalfX.current) / 100;
//             mouseY.current = (event.clientY - windowHalfY.current) / 100;
//         };
        
//         // Animation loop
//         const animate = () => {
//             requestAnimationFrame(animate);
            
//             // Auto rotation
//             globeRef.current.rotation.y += 0.002;
            
//             // Mouse interaction
//             globeRef.current.rotation.y += (mouseX.current - globeRef.current.rotation.y) * 0.01;
//             globeRef.current.rotation.x += (mouseY.current - globeRef.current.rotation.x) * 0.01;
            
//             // Render
//             rendererRef.current.render(sceneRef.current, cameraRef.current);
//         };
        
//         // Start animation
//         animate();
        
//         // Add event listeners
//         window.addEventListener('resize', handleResize);
//         document.addEventListener('mousemove', handleMouseMove);
        
//         // Clean up on unmount
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             document.removeEventListener('mousemove', handleMouseMove);
            
//             if (mountRef.current && rendererRef.current) {
//                 mountRef.current.removeChild(rendererRef.current.domElement);
//             }
            
//             // Dispose of Three.js objects
//             globeRef.current.geometry.dispose();
//             globeRef.current.material.dispose();
//             sceneRef.current.remove(globeRef.current);
//         };
//     }, []);

//     const clearErrors = () => {
//         setErrors([])
//     }

//     const clearInput = () => {
//         setName('')
//         setEmail('')
//         setPhone('')
//         setDepartment('')
//         setLocation('')
//         setComplainType('')
//         setMessage('')
//     }

//     const validateForm = () => {
//         let valid = true;
//         const newErrors = {};

//         if (!name.trim()) {
//             newErrors.name = 'Name is required';
//             valid = false;
//         }

//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//             valid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Email is invalid';
//             valid = false;
//         }

//         if (!phone.trim()) {
//             newErrors.phone = 'Phone number is required';
//             valid = false;
//         }

//         if (!department.trim()) {
//             newErrors.department = 'Department is required';
//             valid = false;
//         }

//         if (!location.trim()) {
//             newErrors.location = 'Location is required';
//             valid = false;
//         }

//         if (!complainType) {
//             newErrors.complainType = 'Complaint type is required';
//             valid = false;
//         }

//         if (!message.trim()) {
//             newErrors.message = 'Message is required';
//             valid = false;
//         }

//         setErrors(newErrors);
//         return valid;
//     }

//     const sendEmail = (e) => {
//         e.preventDefault();
        
//         if (!validateForm()) {
//             return;
//         }

//         document.getElementById('submitBtn').disabled = true;
//         document.getElementById('submitBtn').innerHTML = 'Sending...';

//         // Prepare template parameters for EmailJS
//         const templateParams = {
//             from_name: name,
//             reply_to: email,
//             phone_number: phone,
//             department: department,
//             location: location,
//             complain_type: complainType,
//             message: message
//         };

//         // Send email using EmailJS
//         // Replace with your actual service ID and template ID
//         emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
//             .then((response) => {
//                 console.log('SUCCESS!', response.status, response.text);
                
//                 // Clear form and show success message
//                 clearInput();
//                 setSubmitStatus('Thanks for your message... we will get back to you very shortly');
                
//                 // Using Notiflix for notification
//                 Notiflix.Notify.success('Complaint submitted successfully!');
                
//                 // Reset button
//                 document.getElementById('submitBtn').disabled = false;
//                 document.getElementById('submitBtn').innerHTML = 'Submit Complaint';
//             }, (error) => {
//                 console.log('FAILED...', error);
                
//                 // Show error message
//                 setSubmitStatus('There was an error submitting your complaint. Please try again.');
                
//                 // Using Notiflix for error notification
//                 Notiflix.Notify.failure('Failed to send complaint. Please try again.');
                
//                 // Reset button
//                 document.getElementById('submitBtn').disabled = false;
//                 document.getElementById('submitBtn').innerHTML = 'Submit Complaint';
//             });
//     }

//     return (
//         <>
//             <div>
//                 <NavBar />
//             </div>
            
//             {/* Three.js container */}
//             <div 
//                 ref={mountRef} 
//                 style={{ 
//                     position: 'fixed', 
//                     top: 85, 
//                     left: 0, 
//                     width: '100%', 
//                     height: '100%', 
//                     zIndex: -1,
//                     opacity: 0.7
//                 }}
//             />
            
//             <div id='book-complaint' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
//                 <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">

//                 <form onSubmit={sendEmail}>

//                     <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
//                         <div className="flex">
//                             <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Book a Complaint</h1>
//                         </div>
//                         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
//                                 <div>
//                                     <input 
//                                         name="name" 
//                                         className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                         type="text" 
//                                         placeholder="Full Name*" 
//                                         value={name}
//                                         onChange={(e)=> setName(e.target.value)}
//                                         onKeyUp={clearErrors}
//                                     />
//                                     {errors.name && 
//                                         <p className="text-red-500 text-sm">{errors.name}</p>
//                                     }
//                                 </div>
                                
//                                 <div>
//                                     <input
//                                         name="phone" 
//                                         className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                         type="number" 
//                                         placeholder="Phone*"
//                                         value={phone}
//                                         onChange={(e)=> setPhone(e.target.value)}
//                                         onKeyUp={clearErrors}
//                                     />
//                                     {errors.phone && 
//                                         <p className="text-red-500 text-sm">{errors.phone}</p>
//                                     }
//                                 </div>

//                                 <div>
//                                     <input 
//                                         name="email"
//                                         className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                         type="email" 
//                                         placeholder="Email*"
//                                         value={email}
//                                         onChange={(e)=> setEmail(e.target.value)}
//                                         onKeyUp={clearErrors}   
//                                     />
//                                     {errors.email && 
//                                         <p className="text-red-500 text-sm">{errors.email}</p>
//                                     }
//                                 </div>

//                                 <div>
//                                     <input 
//                                         name="department" 
//                                         className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                         type="text" 
//                                         placeholder="Department*"
//                                         value={department}
//                                         onChange={(e)=> setDepartment(e.target.value)}
//                                         onKeyUp={clearErrors}
//                                     />
//                                     {errors.department && 
//                                         <p className="text-red-500 text-sm">{errors.department}</p>
//                                     }
//                                 </div>

//                                 <div>
//                                     <input 
//                                         name="location" 
//                                         className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                         type="text" 
//                                         placeholder="Location*"
//                                         value={location}
//                                         onChange={(e)=> setLocation(e.target.value)}
//                                         onKeyUp={clearErrors}
//                                     />
//                                     {errors.location && 
//                                         <p className="text-red-500 text-sm">{errors.location}</p>
//                                     }
//                                 </div>

//                                 <div>
//                                     <select 
//                                         name="complainType" 
//                                         className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                         value={complainType}
//                                         onChange={(e)=> setComplainType(e.target.value)}
//                                         onKeyUp={clearErrors}
//                                     >
//                                         <option value="">Select Complaint Type*</option>
//                                         <option value="Computer">Computer</option>
//                                         <option value="Printer">Printer</option>
//                                         <option value="Networking">Networking</option>
//                                         <option value="Software">Software</option>
//                                         <option value="Others">Others</option>
//                                     </select>
//                                     {errors.complainType && 
//                                         <p className="text-red-500 text-sm">{errors.complainType}</p>
//                                     }
//                                 </div>
//                         </div>
//                         <div className="my-4">
//                             <textarea 
//                                 name="message" 
//                                 placeholder="Message*" 
//                                 className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//                                 value={message}
//                                 onChange={(e)=> setMessage(e.target.value)}
//                                 onKeyUp={clearErrors}
//                             ></textarea>
//                             {errors.message && 
//                                 <p className="text-red-500 text-sm">{errors.message}</p>
//                             }
//                         </div>
//                         <div className="my-2 w-1/2 lg:w-2/4">
//                             <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-blue-900 hover:bg-blue-800 text-gray-100 p-3 rounded-lg w-full 
//                                     focus:outline-none focus:shadow-outline">
//                                 Submit Complaint
//                             </button>
//                             {submitStatus && (
//                                 <p className="text-green-500 font-medium mt-4">{submitStatus}</p>
//                             )}
//                         </div>
//                 </div>
//                 </form>
//                         <div
//                             className="w-full lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
//                             <div className="flex flex-col text-white">
                                
//                                 <div className="flex my-4 w-2/3 lg:w-3/4">
//                                     <div className="flex flex-col">
//                                         <i className="fas fa-map-marker-alt pt-2 pr-2" />
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <h2 className="text-2xl">Office Address</h2>
//                                         <p className="text-gray-400">  Shiv mandir marg, Badli,<br /> near pancham sweets <br /> 110017, India</p>
//                                     </div>
//                                 </div>
                    
//                     <div className="flex my-4 w-2/3 lg:w-1/2">
//                         <div className="flex flex-col">
//                         <i className="fas fa-phone-alt pt-2 pr-2" />
//                         </div>

//                         <div className="flex flex-col">
//                         <h2 className="text-2xl">Call Us</h2>
//                         <p className="text-gray-400">                  <p className="text-gray-400">Tel: +91 99111 89318</p>
//                         </p>
                        
//                             <div className='mt-5'>
//                                 <h2 className="text-2xl">Send an E-mail</h2>
//                                 <p className="text-gray-400">avcomnetworktechnologies@gmail.com</p>
//                             </div>
                       
//                         </div>
//                     </div>
                    
//                     <div className="flex my-4 w-2/3 lg:w-1/2">
                      
//                         <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
//                         </a>
//                         <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
//                         </a>
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default BookComplaint;