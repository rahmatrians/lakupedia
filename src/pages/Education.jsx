import React from 'react'
import { Link } from 'react-router'
import Menus from '../components/Menus'

function Education() {
    return (
        <>
            <div style={{ textAlign: 'left' }}>
                <h1>Education</h1>

                <p>
                    <b>Mercu Buana University</b>
                    <br />
                    Bachelor of Computer Science - Information Technology
                </p>

                <ul>
                    <li>🏅 (2022) Winner of National Web Design Competition 2022 hosted by Trunojoyo Madura University</li>
                    <li>🏅 (2021) Winner of National UI/UX INSPACE 2021 hosted by Teknologi Kalimantan Institute</li>
                    <li>🏅 (2021) 6th of National Poster Competition Museum Olahraga Nasional</li>
                    <li>🏅 (2020) Third Place of National UX CODIG 2020 hosted by Mercu Buana University</li>
                    {/* <li>🏅 (2020) Young Influencer of The Month (YIOM) at Mercu Buana University</li> */}
                    <li>🏅 (2019) Third Place of National CSIC hosted by Multimedia Nusantara University</li>
                </ul>

                <br />

                <p>
                    <b>Vocational High School</b>
                    <br />
                    Software Engineering
                </p>
                <ul>
                    <li>🏅 (2018) Runner Up of Cluster Level Graphic Design hosted by Lomba Kompetensi Siswa (LKS)  </li>
                </ul>
            </div>

            <br />

            <Menus />
        </>

    )
}

export default Education