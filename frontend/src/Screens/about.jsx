import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';
import Pic from "../assets/about.png"
const About = () => {
  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
        <Header/>
        <div
        className="container-fluid"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="row">
              
              <div className="col-md-6" style={{ display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <p style={{fontWeight:"bold",fontSize:25,padding:"5%"}}>
                  ENERGY CONSUMER WEB APP MONITOR & MANAGE ENERGY USE
                  <span style={{color:"blue"}}>
                    <br />
                    & BE ENVIRONMENTALLY CONSCIOUS.
                  </span>
                </p>
              </div>

              <div className="col-md-6" style={{  textAlign:"center" }}>
                <img className="img-fluid" src={Pic} alt="process" height={500} width={500} />
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
  )
}

export default About