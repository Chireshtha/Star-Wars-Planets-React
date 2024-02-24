import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import './App.css';

const Navbar = () => {
  const [text] = useTypewriter({
    words: ['Star Wars Planets!'],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1500,
  })
  return (
    <>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <h1 className="navbar-brand">Star Wars Planets</h1>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
      <div className='typewriter'>
        <h1>Welcome To  <span>{text} <Cursor /></span> </h1>
      </div>
    </>
  )
}

export default Navbar
