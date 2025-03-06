import React from 'react'
import { Link } from 'react-router'

function Menus() {
    return (
        <div>
            <button>
                <Link to={"/"}>Ke halaman Utama</Link>
            </button>
            <span> </span>
            <button>
                <Link to={"/profile"}>Ke halaman Profil</Link>
            </button>
            <span> </span>
            <button>
                <Link to={"/work"}>Ke halaman Pekerjaan</Link>
            </button>
            <span> </span>
            <button>
                <Link to={"/education"}>Ke halaman Pendidikan</Link>
            </button>
        </div>
    )
}

export default Menus