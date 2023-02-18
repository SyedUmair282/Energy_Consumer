import React,{useState,useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {  Table, Alert } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";
import Pic from "../assets/No_data.png"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const tokenStorage = JSON.parse(localStorage.getItem("User"));
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [previousData,setPreviousData]=useState([]);


    
  const getData=async()=>{
    try {      
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenStorage.token}` } };
      const insert_calulation = await axios.get(
          "http://localhost:5000/api/bill/getUserBill",          
          config
          );
          console.log("previous data==>",insert_calulation.data);
           setPreviousData(insert_calulation.data)           
            setError(false);                                               
    } catch (error) {
      console.log("error",error);   
      setError(true);
    }  
  }

  let data=previousData;  
  const ordersAndPricesByYear = data.reduce((acc, user) => {
    if (acc[user.year]) {
      acc[user.year].year=user.year
      acc[user.year].total_price += user.total_price;
      acc[user.year].consume_units += user.consume_units;
    } 
    else {
      acc[user.year] = { year:user.year,total_price: user.total_price, consume_units: user.consume_units };
    }
    return acc;
  }, {});
  let result=[ordersAndPricesByYear];
  
  //console.log(Object.values(result[0]));
//console.log("check=>",data);
//   const users = [
//     { name: "test1", orders: 20 },
//     { name: "test2", orders: 8 },
//     { name: "test1", orders: 8 },
//     { name: "test4", orders: 10 },
//     { name: "test3", orders: 30 }
//   ];
//   const orderCounts = {};

// users.forEach(user => {
//   if (orderCounts[user.name]) {
//     orderCounts[user.name] += user.orders;
//   } 
//   else {
//     orderCounts[user.name] = user.orders;
//   }
// });
// console.log("check=>",orderCounts[users.name]);

//console.log(orderCounts);
    // let obj={name:"",orders:0}
    // let same_result=[];
    // let unique_result=[];
    // for (let i = 0; i < users.length; i++) {
           
    // }
  // let result=[];
  // let obj={};
  // for (let i = 0; i < users.length; i++) {
  //   if(){
  //     obj={
  //       name:users[i].name,
  //       orders:0
  //     }
  //   }
  //   obj.orders+=users[i].orders;
  //   result.push(obj);
  //   //new_data[i].total_price+=data[i].total_price;
  //   // if(new_data[0].year!==data[i].year){
  //   //   obj={
  //   //     consume_units:0,
  //   //     total_price:0,
  //   //     year:data[i].year
  //   //   }
  //   //   result.push(obj);
  //   //   result[i].consume_units+=data[i].consume_units;
  //   //   result[i].total_price+=data[i].total_price;
  //   // }
  //   // else{

  //   // }
  // }    
  
  //console.log("new_data==>",result);

  // let data=[previousData[0]];
  // // let new_obj={};
  // for (let i = 1; i < previousData.length; i++) {
  //   if(previousData[i].year==data[0].year){
  //     data[0].consume_units+=previousData[i].consume_units;
  //     data[0].total_price+=previousData[i].total_price;
  //   }
  //   else{
  //     data.push(previousData[i]);
  //   }        
  // }
  

  useEffect(() => {    
    if (!tokenStorage) {
      navigate("/");
    }    
    getData()   
  }, []);


  
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ padding: "1%", paddingTop:"0.3%" }}>
   
        <div
          style={{ border: "0px solid black", width: "94%", margin: "0 auto" }}
        >
          {error?
          <Alert variant="danger">
          Something went wrong!
        </Alert>:null
          }
          <h3 style={{ fontFamily: "sans-serif" }}>Dashboard</h3>
          
          <div
            style={{
              height: "240px",
              overflow: "auto",
              scrollbarWidth: "1px",
            }}
          >
            {previousData.length>0 ?
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>No of units</th>
                <th>Month</th>
                <th>Year</th>
                <th>Selected slab</th>
                <th>Total Price</th>
                <th>Difference from previous month</th>               
              </tr>
            </thead>
            <tbody>             
              {previousData.map((v,i,arr)=>{
                return <tr key={i}>
                <td>{i+1}</td>
                <td>
                  {v.consume_units}                 
                </td>
                <td>{v.month}</td>
                <td>{v.year}</td>
                <td>{v.selected_slab}</td>
                <td>{v.total_price}</td>
                <td>
                  {
                    i==0 ? ( Math.abs(0 - v.total_price  / v.total_price * 100)) : 
                    (                                                 
                      Math.round((arr[i].total_price - arr[i-1].total_price)/arr[i].total_price * 100 )                                    
                    )
                  }%
                 
                </td>                
              </tr>
              })}                     
            </tbody>
          </Table>: (<div style={{textAlign:"center",fontSize:"13px"}}>
            <img className="img-fluid" src={Pic} alt="process" style={{height:"200px"}} />
            <p>No previous data</p>
          </div>)
          }
          </div>
          <br />
          {/* ******************************Graph************************************* */}
          
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <BarChart width={1400} height={300} data={Object.values(result[0])}  >
              <XAxis dataKey="year" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="consume_units" fill="yellow" barSize={30} />
              <Bar dataKey="total_price" fill="#8884d8" barSize={30} />
            </BarChart>
          </div>
        
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
