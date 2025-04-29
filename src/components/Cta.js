import React from 'react';
import {Link} from 'react-router-dom';
import * as THREE from 'three';
const Cta = () => {
    return ( 
        <div className="w-full flex items-center justify-center text-white cta">

 {/* Three.js container */}
 <div 
                // ref={mountRef} 
                // style={{ 
                //     position: 'fixed', 
                //     top: 85, 
                //     left: 0, 
                //     width: '100%', 
                //     height: '100%', 
                //     zIndex: -1,
                //     opacity: 0.7
                // }}
            />



            <div className="mx-8 w-full h-96 text-center lg:text-left py-16 px-12 flex lg:justify-between items-center">                    
                <div className="w-full flex flex-col lg:flex-row lg:justify-around">
                    <div className="mb-4">
                        <p className='text-2xl md:text-3xl font-bold mb-4'>Ready to grow your business with a reliable partner for your Computer, IT, Solar, or CCTV needs?</p> <br />
                        <p className="text-lg md:text-1xl">If you're seeking a reliable long-term partner for your Computer, IT, Solar, or CCTV needs with prompt, personalized service,  <span className='font-black'>get in touch with us. Our representative will respond with customized solutions.</span></p>
                    </div>
                    
                    <div className="w-full lg:w-72 pt-6 lg:mx-12">
                        <Link to="/contact" className="bg-transparent border hover:bg-blue-900 hover:border-blue-800 text-white justify-center text-center rounded-lg px-10 py-3 flex items-center group">Send a message
                        <svg className="w-5 h-5 ml-1 group-hover:translate-x-2 duration-500 ease-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cta;