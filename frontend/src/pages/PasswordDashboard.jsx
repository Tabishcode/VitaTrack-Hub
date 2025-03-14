import { useState } from 'react'
// import './App.css'
import Navbar from '../components/Password/Navbar'
import Manager from '../components/Password/Manager'
import Footer from '../components/Password/Footer'

function App() {
    return (
        <>
            <Navbar />
            <div 
                className="container"
                style={{width: "90%", margin: "auto"}}
            >
                <Manager />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default App
