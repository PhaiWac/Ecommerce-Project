import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Datatable() {

    const [costfilter, setCostfilter] = useState(false);

    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)

    const [item , setItem] = useState([]) ;

    const Next = async () => {
        setLoading(true)
        const P = page + 1;

        const res = await axios.post('http://localhost:3000/api/admin/users', { current: P })

        setLoading(false)
        if (res.status == 200) {
            setResult(res.data.docs);
            setPage(page + 1);
        }
    }

    const Before = async () => {
        setLoading(true)
        const P = page - 1;

        const res = await axios.post('http://localhost:3000/api/admin/users', { current: P })

        setLoading(false)
        if (res.status == 200) {
            setResult(res.data.docs);
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const get = async () => {
            try {
                await axios.post('http://localhost:3000/api/admin/users', { current: page, max: 2 }, { withCredentials: true })
                    .then(res => {
                        setResult(res.data.docs)
                        setLoading(false)
                    })
            } catch (err) { console.log('err s', err) }
        }
        get();
    }, [])

    const maxcost_sort = () => {
        return result.sort((a, b) => a.cost - b.cost);
    }

    const mincost_sort = () => {
        return result.sort((a, b) => b.cost - a.cost);
    }

    const filter = () => {
        setCostfilter(!costfilter)
        const Sort = costfilter ? maxcost_sort() : mincost_sort();
        setResult([])
        setResult((prevalue) => [...prevalue, ...Sort])
    }

    const insertitem = (index) => {
         setItem((prevData) => ({ ...prevData, [index]: false}));
    }

    return (
        <>
            <div className="overflow x-auto p-5">
                <button onClick={filter} className="btn mb-5  ms-auto block w-full md:w-fit ">{costfilter ? "จากมากไปน้อย" : "จากน้อยไปมาก"}</button>
                {loading ? (
                    <>
                        <div className="grid gap-5">
                            <div className="skeleton w-full h-5"></div>
                            <div className="skeleton w-full h-5"></div>
                            <div className="skeleton w-full h-5"></div>
                            <div className="skeleton w-full h-5"></div>
                        </div>
                    </>
                )  : (
                    <table className='table table-zebra'>
                    <thead>
                        <tr>
                            {['email', 'username', 'phone', 'address', 'cost'].map(title_val => (
                                <React.Fragment key={title_val} >
                                    <th className='font-bold'>{title_val}</th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {result.map((v2, key2) => (
                        <React.Fragment key={v2.email + key2} >
                            <tr>
                                <td>{v2.email}</td>
                                <td>{v2.username}</td>
                                <td>{v2.phone}</td>
                                <td>{v2.address}</td>
                                <td>{v2.cost}</td>
                                {/* <td><Link to = {`/admin/user/${v2._id}`}  className='btn btn-warning'>แก้ไข</Link></td> */}
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>

                </table>
                )}
               
                <div className="mt-3 flex justify-between md:justify-center md:gap-5">
                    {page > 1 && (
                        <button onClick={Before} className='btn btn-sm'>
                            ย้อนกลับ
                        </button>
                    )}
                    <button onClick={Next} className='btn ms-auto md:ms-0 btn-sm'>
                        หน้าถัดไป
                    </button>
                </div>
            </div>
        </>
    )
}

export default Datatable