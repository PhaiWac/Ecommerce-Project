import React, { useEffect, useState ,createContext } from 'react';
import Navbar from '../components/Navbar';
import LeftProfile from '../components/Editprofile/LeftProfile';
import RightProfile from '../components/Editprofile/RightProfile';
import axios from 'axios';

function EditProfile() {
 
    const [session, setSession] = useState(null);
    const ProfileContext = createContext()

    const UpdateSession = (data) => setSession(data) ;

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/user/getdata', { withCredentials: true });
                if (res.status === 200) {
                    setSession(res.data.session);
                } else {
                    console.log('asds');
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        getdata();
    },[]); 

    return (
        <>
            <Navbar />

            <div className="mt-32 container mx-auto">
                <p className={!session ? 'skeleton h-4 w-full mx-auto' : "text-5xl text-center font-bold"}>{session && "Edit Profile"}</p>
                <div className="mt-5 p-5 grid md:flex gap-5">
                    {session ? (
                        <ProfileContext.Provider value={{session,UpdateSession}}>
                            <div className='w-full md:w-3/5'>
                                <LeftProfile context={ProfileContext} />
                            </div>
                            <RightProfile  context={ProfileContext}  />
                        </ProfileContext.Provider>
                    ) : (
                        <div className="flex flex-col gap-4 w-full">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default EditProfile;
