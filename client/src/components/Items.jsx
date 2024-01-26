import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useItemContext } from '../Context/ConfigItem';
import { MdOutlineModeEdit , MdDeleteOutline } from "react-icons/md";

import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Delete = ({ id , setLoading }) => {
    const {  updateItemValues } = useItemContext();
    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`http://localhost:3000/api/delete/${id}`)
           .then((res) => {
             if (res.status == 200 && res.data.message == 'delete success') {
                updateItemValues(res.data.item)
                setLoading(false)
                // console.log(res.data)
             }
           })
        } catch (err) {
            console.log(`Error deleting item with ID: ${id}`, err);
        }
    }

    return (
        <>
            <button onClick={handleDelete} className='btn btn-ghost text-2xl'><MdDeleteOutline /></button>
        </>
    );
}

function Items() {
    const { itemValues, updateItemValues } = useItemContext();
    const [editvalue, setEdit] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/getshoe');
                updateItemValues(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="mt-32 container mx-auto p-5">
                <div className="flex gap-5 flex-col lg:flex-row">
                    <h2 className="font-bold text-3xl">ITEMS</h2>
                    <button className="btn btn-neutral text-white ms-auto w-full lg:w-fit" onClick={() => document.getElementById('addmodal').showModal()}>เพิ่มสินค้า</button>
                </div>
                <div className="overflow-x-auto mt-5">
                    {loading ? <Skeleton count={5} height={40} /> : (
                        <table className="table table-sm mx-auto">
                            <thead>
                                <tr>
                                    <th>สินค้า</th>
                                    <th>ราคา</th>
                                    <th>คลัง</th>
                                    <th>แก้ไขสินค้า</th>
                                    <th>ลบสินค้า</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemValues.map((v, index) => (
                                    <tr key={index} className={v.stock_count <= 0 ? 'bg-red-100 hover:bg-red-300 rounded-lg transition-colors hover:cursor-pointer' : 'bg-white hover:cursor-pointer hover:bg-gray-100 transition-all'}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img className='min-w-full object-cover' src={`/image/${v.stock_image}`} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{v.stock_name}</div>
                                                    <div className="text-sm opacity-50">{v.stock_category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{v.stock_price} บาท</td>
                                        <td>{v.stock_count > 0 ? `${v.stock_count} ชิ้น` : 'สินค้าหมดแล้ว'}</td>
                                        <td><Link to={`/admin/edititem/${v._id}`} className='btn btn-ghost text-2xl'><MdOutlineModeEdit /></Link></td>
                                        <td><Delete id={v._id}  setLoading = {setLoading}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Items;
