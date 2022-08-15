import React from 'react'
import NavBar from './NavBar'
import logo from '../logo.svg'
import '../App.css'
import WithNavBar from '../components/withnavbar'

const RenderHome = () => (
    <React.Fragment>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    </React.Fragment>
)

const Home: React.FC = (): JSX.Element => (
    <WithNavBar element={<RenderHome />} />
)

export default Home
