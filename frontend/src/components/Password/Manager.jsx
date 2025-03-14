import React, { useEffect } from 'react'
import { useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", email: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [passwordStrength, setPasswordStrength] = useState({ score: 0 });


    const getPasswords = async () => {
        let req = await fetch("/api/password")
        let passwords = await req.json()
        // console.log(passwords)
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()

    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye_processed.png"
            passwordRef.current.type = "password"

        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }

    }

    const savePassword = async () => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (form.site.length <= 3) {
            toast.error('Error: Site name must be at least 3 characters long!');
            return;
        }
        if (!emailRegex.test(form.email)) {
            toast.error('Error: Enter a valid email address!');
            return;
        }
        // if (!passwordRegex.test(form.password)) {
        //     toast.error(
        //         'Error: Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!'
        //     );
        //     return;
        // }

        const existingId = form.id || uuidv4();
        const updatedPassword = { ...form, id: existingId };
        setpasswordArray([...passwordArray.filter(item => item.id !== existingId), updatedPassword]);
        setform({ site: "", email: "", password: "" });
        await fetch("/api/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPassword),
        });
        setPasswordStrength({score: 0});
    };

    const deletePassword = async (id) => {
        // console.log("Deleting password with id: " + id)
        let c = confirm("Do really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item._id !== id))
            let res = await fetch("/api/password", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            // console.log(res);
            //localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
            toast('Deleting Password ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPassword = (id) => {
        // console.log("Editing password with id: " + id)
        setform({ ...passwordArray.filter(i => i._id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item._id !== id))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value });
        if (name === "password") {
            evaluatePasswordStrength(value);
        }
    };


    const evaluatePasswordStrength = (password) => {
        let score = 0;

        // Check if the password meets specific criteria
        if (/[a-z]/.test(password)) score++; // Contains lowercase letters
        if (/[A-Z]/.test(password)) score++; // Contains uppercase letters
        if (/\d/.test(password)) score++; // Contains numbers
        if (/[@$!%*?&]/.test(password)) score++; // Contains special characters

        setPasswordStrength({
            score: score // Score ranges from 0 (weakest) to 4 (strongest)
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-
        [linear-gradient(to_right,#f0f0f0_1px,transparent_1px),
        linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-
        [size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 
        top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,
        transparent)]"></div></div>
            <div className="p-2 md: p-0 md: mycontainer min-h-[84.6vh]">
                <h1 className='text-3xl text font-bold text-center'>
                    <span className="text-blue-500">&lt;</span>
                    Password
                    <span className="text-blue-500">-Manager/&gt;</span>
                </h1>
                <p className='text-blue-900 text-lg text-center'>Your Own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-5 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL / App Name' className='rounded-full border border-blue-500 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                        <input style={{width: "50%"}} value={form.email} onChange={handleChange} placeholder='Enter Email' className='rounded-full border border-blue-500 px-4 py-1' type="text" name='email' id='email' />
                        <div style={{width: "40%"}} className="relative">

                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-blue-500 w-full px-4 py-1"
                                type="password"
                                name="password"
                                id="password"
                            />
                            <div className="mt-2">
                                <div className="w-full h-2 rounded bg-gray-200">
                                    <div
                                        className={`h-full rounded ${passwordStrength.score === 0
                                            ? "bg-red-500 w-1/5"
                                            : passwordStrength.score === 1
                                                ? "bg-orange-500 w-2/5"
                                                : passwordStrength.score === 2
                                                    ? "bg-yellow-500 w-3/5"
                                                    : passwordStrength.score === 3
                                                        ? "bg-blue-500 w-4/5"
                                                        : "bg-green-500 w-full"
                                            }`}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {passwordStrength.score === 0
                                        ? "Very Weak"
                                        : passwordStrength.score === 1
                                            ? "Weak"
                                            : passwordStrength.score === 2
                                                ? "Fair"
                                                : passwordStrength.score === 3
                                                    ? "Strong"
                                                    : "Very Strong"}
                                </p>
                            </div>

                            <span className="absolute right-0 top-0.5 cursor-pointer " onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye_processed.png" alt="" />
                            </span>
                        </div>


                    </div>

                    <button style={{width: "20%"}} onClick={savePassword} className='bg-blue-500 hover:bg-blue-700 flex justify-center item-center rounded-full px-2 py-2 w-fit border border-blue-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="Passwords">
                    <h2 className='font-bold text-2xl py-4'>
                        Your Passwords
                    </h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-lg overflow-hidden mb-10">
                            <thead className="bg-blue-800 text-white">
                                <tr>
                                    <th className='p-2 text-center'>Site/App</th>
                                    <th className='p-2 text-center'>Email</th>
                                    <th className='p-2 text-center'>Password</th>
                                    <th className="p-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-blue-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px paddingTop:3px paddingLeft:3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                {item.email}
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.email) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px paddingTop:3px paddingLeft:3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                {"*".repeat(item.password.length)}
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px paddingTop:3px paddingLeft:3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item._id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px paddingTop:3px paddingLeft:3px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item._id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px paddingTop:3px paddingLeft:3px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
