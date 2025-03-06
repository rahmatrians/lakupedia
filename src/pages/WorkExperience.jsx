import React from 'react'
import Menus from '../components/Menus'

function WorkExperience() {
    return (
        <>

            <div style={{ textAlign: 'left' }}>
                <h1>Work Experience</h1>

                <p>
                    <b>Back End Engineer</b>
                    <br />
                    PT. Infosys Solusi Terpadu
                </p>

                <p><b>Internet Banking Business for PT. Bank Victoria International, Tbk : IBB Corporate & IBB Portal</b></p>

                <ul>
                    <li>Developing Internet Banking Business Back-End Services using Spring Boot as Java Framework, PostgreSQL Database, Spring Data JPA, etc.</li>
                    <li>Contributed to key business processes, including bank transfers (SKN, RTGS, BI-FAST, Online) to other banks and within the same bank, Payroll (one-to-one and one-to-many), Virtual Accounts, Payments (BPJS, PLN, PDAM, etc.), and Purchases (airline tickets, credit, etc.).</li>
                    <li>Experienced with MinIO cloud object storage and Redis as caching in-memory to support the development process.</li>
                    <li>Familiar with Jenkins and OKD (OpenShift Kubernetes Distribution) for deployment, Docker, and CI/CD.</li>
                    <li>Actively delivered timely and effective communication to cross-functional teams during grooming and daily stand-ups.</li>
                    <li>Tested Endpoints/RESTful APIs using Postman and Swagger UI to identify and resolve bugs.</li>
                    <li>Handled the feature of monitoring data user tokens and managing user accounts for hard tokens (linking token, activate token, replace token, reset & unlock token).</li>
                    <li>Generated and downloaded reports and documents (e.g., Excel, PDF) for data documentation.</li>
                    <li>Managed data master such as holiday schedules and bank branch locations.</li>
                </ul>

                <br />

                <p><b>Internet Banking Business (JConnect) for Bank Jatim : IBB Portal</b></p>

                <ul>
                    <li>Built a Helpdesk ticketing system for customer support.</li>
                    <li>Implemented user authentication binding between the IBB web portal and mobile app.</li>
                    <li>Handled the first-time login process for new user accounts.</li>
                    <li>Developed and managed the Forgot Password functionality for user accounts.</li>
                    <li>Built a reports feature on user activity, roles, login history, and bank activity for monitoring and auditing purposes.</li>
                </ul>

                <br />
                <br />
                <br />

                <p>
                    <b>Back End Developer</b>
                    <br />
                    PT. BTPN Syariah
                </p>

                <p><b>TERRA App</b></p>

                <ul>
                    <li>Developed Back-End Services for main business-web function and mobile application of BTPN Syariah for community officers with dashboard functional features such as billing and membership training for new and old members, built using Spring Boot as a Java Framework.</li>
                    <li>Implemented clean, reusable, and maintainable code, following Agile Methodology for system development.</li>
                    <li>Contributed to Testing Integration with Git CI/CD Pipeline for system development.</li>
                    <li>Tested Endpoints using Postman, identifying and resolving bugs.</li>
                </ul>

            </div>

            <br />

            <Menus />
        </>

    )
}

export default WorkExperience