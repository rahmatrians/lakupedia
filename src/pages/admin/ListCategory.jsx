import React, { useEffect, useState } from 'react'
import Menus from '../../components/Menus'
import axios from 'axios'
import { Link, useNavigate } from 'react-router';
import { useToast } from '../../components/ToastContext';

function ListCategory() {
  let nav = useNavigate()
  let accessToken = null
  const { showToast } = useToast()
  const [personalData, setPersonalData] = useState(null);

  useEffect(() => {
    fetchData()
    accessToken = localStorage.getItem("tokenSession")
    console.log(accessToken);

  }, [])

  const fetchData = async () => {
    try {
      const data = await axios.get("http://10.50.0.13:3002/categories",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setPersonalData(data.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <h1>Category</h1>

      <br />

      <div className="w-full max-w-4xl mx-auto">
        {personalData == null ? (
          <p>Data sedang dimuat</p>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                    <th className="py-3 px-4 font-semibold">ID</th>
                    <th className="py-3 px-4 font-semibold">Name</th>

                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {personalData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">
                        <Link to={`/personal-data/${item.id}`} className="text-blue-500 hover:underline">
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4">{item.email}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3">
                          <Link
                            to={`/categories/${item.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ✏️
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <br />

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link to="/categories/add" className="text-white">Tambah Data</Link>
            </button>
          </>
        )}
      </div>

      <br />
    </>
  );

}

export default ListCategory