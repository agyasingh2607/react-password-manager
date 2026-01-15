import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }


    }

    const savePassword = () => {
        //   console.log(form)
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('🦄 Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: "Bounce",
            });
        }
        else {
            toast('⚠️ Please fill all fields (min 4 characters)!')
        }
            

    }

        const deletePassword = (id) => {
            console.log("Deleting password with id", id)
            let c = confirm("Do you really want to deete this password?")
            if (c) {
                setPasswordArray(passwordArray.filter(item => item.id !== id))
                localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
                toast('🦄 Password deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "Dark",
                    // transition: "Bounce",
                });
            }
        }

        const editPassword = (id) => {
            console.log("Editing Password with id", id)
            setForm(passwordArray.filter(i => i.id)[0])
            setPasswordArray(passwordArray.filter(item => item.id !== id))
        }


        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
        }

        const copyText = () => {
            toast('🦄 Copied to clipboard!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: "Bounce",
            });
        }





        return (
            <>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition="Bounce"
                />
                <ToastContainer />

                <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgb(76 175 80 / 20%)_100%)]"></div>

                <div className="p-3 md:mycontainer min-h-[84.8vh]">
                    <h1 className='text-4xl text font-bold text-center'>
                        <span className='text-green-500'> &lt; </span>
                        <span>Pass</span>
                        <span className='text-green-500'>OP/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                    <div className="flex flex-col p-4 gap-8 items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='bg-white border border-green-500 rounded-full w-full p-4 py-1' name="site" id="site" type="text" />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white border border-green-500 rounded-full w-full p-4 py-1' name="username" id="username" type="text" />

                            <div className="relative">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white border border-green-500 rounded-full w-full p-4 py-1' name="password" id="password" type="password" />
                                <span className='absolute right-0.75 top-1 cursor-pointer'>
                                    <img ref={ref} onClick={showPassword} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                                </span>
                            </div>
                        </div>

                        <button onClick={savePassword} className='flex justify-center gap-4 items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            Save</button>
                    </div>
                    <div className="passwords">
                        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div> No passwords to show</div>}
                        {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center '>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span> {item.password}</span>

                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
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
