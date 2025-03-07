import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function DetailPersonalData() {
    let { id } = useParams()

    const [detailPersonalData, setDetailPersonalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://localhost:3000/personaldata/" + id);
                console.log(data);
                setDetailPersonalData(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])

    return (
        <div>
            {detailPersonalData == null ? (
                <p>Data sedang dimuat</p>
            ) : (
                <div>
                    <h4>{detailPersonalData.name}</h4>
                    <p>{detailPersonalData.email}</p>
                </div>
            )}
        </div>
    )
}

export default DetailPersonalData