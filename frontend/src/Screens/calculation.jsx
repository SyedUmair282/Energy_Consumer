import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Form, Button, Table, Modal, Spinner, Alert } from "react-bootstrap";
import "./calculation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pic from "../assets/No_data.png";

const Calculation = () => {
  const tokenStorage = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [previousData, setPreviousData] = useState([]);
  const [reload, setReload] = useState(false);
  const consume_units = useRef();
  const current_month = useRef();
  const current_year = useRef();
  const selected_slab = useRef();

  const change_slab = () => {
    if (consume_units.current.value <= 100) {
      selected_slab.current.value =
        "100 units, the price is 23 rupees per unit";
    } else if (
      consume_units.current.value > 100 &&
      consume_units.current.value <= 250
    ) {
      selected_slab.current.value =
        "101 to 250, the price is 30 rupees per unit";
    } else if (
      consume_units.current.value > 250 &&
      consume_units.current.value <= 500
    ) {
      selected_slab.current.value =
        "251 to 500, the price is 34 rupees per unit";
    } else if (consume_units.current.value > 500) {
      selected_slab.current.value =
        "Above 500, the price is 38 rupees per unit";
    }
  };

  const insert_data = async () => {
    let obj = {
      consume_units: consume_units.current.value,
      current_month: current_month.current.value,
      current_year: current_year.current.value,
      selected_slab: selected_slab.current.value,
      total_price: function () {
        if (
          this.selected_slab == "100 units, the price is 23 rupees per unit"
        ) {
          return this.consume_units * 23;
        } else if (
          this.selected_slab == "101 to 250, the price is 30 rupees per unit"
        ) {
          return this.consume_units * 30;
        } else if (
          this.selected_slab == "251 to 500, the price is 34 rupees per unit"
        ) {
          return this.consume_units * 34;
        } else if (
          this.selected_slab == "Above 500, the price is 38 rupees per unit"
        ) {
          return this.consume_units * 38;
        }
      },
    };

    let new_obj = {
      consume_units: obj.consume_units,
      month: obj.current_month,
      year: obj.current_year,
      total_price: obj.total_price(),
      selected_slab: obj.selected_slab,
    };
    try {
      if (new_obj.consume_units && new_obj.year) {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenStorage.token}`,
          },
        };
        const insert_calulation = await axios.post(
          "https://fair-plum-ox-vest.cyclic.app/api/bill/userBill",
          new_obj,
          config
        );
        console.log("inserted data==>", insert_calulation);
        setLoading(false);
        setError(false);
        consume_units.current.value = "";
        current_year.current.value = "";
        setReload(true);
      } else {
        alert("Fields are empty..!!");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(true);
    }
  };

  const [update, setUpdate] = useState({
    _id: "",
    consume_units: 0,
    month: "",
    year: 0,
    selected_slab: "",
  });

  const update_slab = () => {
    if (update.consume_units <= 100) {
      setUpdate((pre) => ({
        ...pre,
        selected_slab: "100 units, the price is 23 rupees per unit",
      }));
    } else if (update.consume_units > 100 && update.consume_units <= 250) {
      setUpdate((pre) => ({
        ...pre,
        selected_slab: "101 to 250, the price is 30 rupees per unit",
      }));
    } else if (update.consume_units > 250 && update.consume_units <= 500) {
      setUpdate((pre) => ({
        ...pre,
        selected_slab: "251 to 500, the price is 34 rupees per unit",
      }));
    } else if (update.consume_units > 500) {
      setUpdate((pre) => ({
        ...pre,
        selected_slab: "Above 500, the price is 38 rupees per unit",
      }));
    }
  };

  const edit = (data) => {
    setShow(true);
    setUpdate({
      _id: data._id,
      consume_units: data.consume_units,
      month: data.month,
      year: data.year,
      selected_slab: data.selected_slab,
    });
  };
  const handleClose = () => setShow(false);

  const update_func = async () => {
    try {
      let obj = {
       
        consume_units: update.consume_units,
        month: update.month,
        year: update.year,
        selected_slab: update.selected_slab,
        total_price: function(){
          if(this.selected_slab=="100 units, the price is 23 rupees per unit"){
            return this.consume_units * 23
          }
          else if(this.selected_slab=="101 to 250, the price is 30 rupees per unit"){
            return this.consume_units * 30
          }
          else if(this.selected_slab=="251 to 500, the price is 34 rupees per unit"){
            return this.consume_units * 34
          }
          else if(this.selected_slab=="Above 500, the price is 38 rupees per unit"){
            return this.consume_units * 38
          }
        }
      };
      let new_obj = {
        _id: update._id,
        consume_units: obj.consume_units,
        month: obj.current_month,
        year: obj.current_year,
        total_price: obj.total_price(),
        selected_slab: obj.selected_slab,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage.token}`,
        },
      };
      const insert_calulation = await axios.put(
        "https://fair-plum-ox-vest.cyclic.app/api/bill/updateUserBill",
        new_obj,
        config
      );
      console.log("Updated data==>", insert_calulation.data);
      setError(false);
      setReload(true);
      setShow(false);
    } catch (error) {
      console.log("error", error);
      setError(true);
      setShow(false);
    }
  };

  const getPrevious_data = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage.token}`,
        },
      };
      const insert_calulation = await axios.get(
        "https://fair-plum-ox-vest.cyclic.app/api/bill/getUserBill",
        config
      );
      //console.log("previous data==>", insert_calulation.data);
      setPreviousData(insert_calulation.data);
      setError(false);
      setReload(false);
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };
  const delete_cal = async (id) => {
    try {
      const config = {
        data: { _id: id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage.token}`,
        },
      };
      const insert_calulation = await axios.delete(
        "https://fair-plum-ox-vest.cyclic.app/api/bill/delUserBill",
        config
      );
      //console.log("deleted data==>", insert_calulation.data);
      setError(false);
      setReload(true);
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
    console.log("id==>", id);
  };

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
    getPrevious_data();
  }, [reload]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div>
        <h2 className="head">Calculation of bill</h2>
        {error ? (
          <Alert
            variant="danger"
            style={{
              width: "90%",
              margin: "0 auto",
            }}
          >
            Something went wrong!
          </Alert>
        ) : null}

        <div className="inputs">
          <div className="inputs_width">
            <Form.Group className="mb-3">
              <Form.Label>No of units</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your no of units"
                ref={consume_units}
                onBlur={change_slab}
              />
            </Form.Group>
          </div>
          <div className="inputs_width">
            <Form.Group className="mb-3">
              <Form.Label>Current month</Form.Label>
              <Form.Select ref={current_month}>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="inputs_width">
            <Form.Group className="mb-3">
              <Form.Label>Current year</Form.Label>
              <Form.Control
                type="number"
                placeholder="eg: 2010"
                ref={current_year}
              />
            </Form.Group>
          </div>
          <div className="inputs_width">
            <Form.Group className="mb-3">
              <Form.Label>Selected slab according to your units</Form.Label>
              <Form.Select ref={selected_slab} disabled>
                <option>100 units, the price is 23 rupees per unit</option>
                <option>101 to 250, the price is 30 rupees per unit</option>
                <option>251 to 500, the price is 34 rupees per unit</option>
                <option>Above 500, the price is 38 rupees per unit</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Action</Form.Label>
              <br />
              <Button
                variant="success"
                style={{ width: "100%" }}
                onClick={insert_data}
              >
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Insert"
                )}
              </Button>
            </Form.Group>
          </div>
        </div>
        <br />
        <br />
        {/* --------------------------------TABLE-------------------------------- */}
        <div className="main_table">
          {previousData.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>No of units</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Selected slab</th>
                  <th>Total Price</th>
                  <th>Difference from previous month</th>
                  <th className=".action">Action for delete</th>
                  <th className=".action">Action for edit</th>
                </tr>
              </thead>
              <tbody>
                {previousData.map((v, i, arr) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{v.consume_units}</td>
                      <td>{v.month}</td>
                      <td>{v.year}</td>
                      <td>{v.selected_slab}</td>
                      <td>{v.total_price}</td>
                      <td>
                        {i == 0
                          ? Math.abs(0 - (v.total_price / v.total_price) * 100)
                          : 
                              Math.round(((arr[i].total_price - arr[i - 1].total_price) /
                                (arr[i].total_price)) *
                                (100))
                              }
                          
                        %
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="action_btn"
                          onClick={() => delete_cal(v._id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          className="action_btn"
                          onClick={() => edit(v)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div style={{ textAlign: "center", fontSize: "13px" }}>
              <img
                className="img-fluid"
                src={Pic}
                alt="process"
                style={{ height: "300px" }}
              />
              <p>No previous data</p>
            </div>
          )}

          {/* ---------------------MODAL--------------------------- */}
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update calculation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="inputs_width_modal">
                <Form.Group className="mb-3">
                  <Form.Label>No of units</Form.Label>
                  <Form.Control
                    placeholder="Enter your no of units"
                    type="number"
                    value={update.consume_units}
                    onBlur={update_slab}
                    onChange={(e) =>
                      setUpdate((pre) => ({
                        ...pre,
                        consume_units: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </div>

              <div className="inputs_width_modal">
                <Form.Group className="mb-3">
                  <Form.Label>Current month</Form.Label>
                  <Form.Select
                    value={update.month}
                    onChange={(e) =>
                      setUpdate((pre) => ({ ...pre, month: e.target.value }))
                    }
                  >
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="inputs_width_modal">
                <Form.Group className="mb-3">
                  <Form.Label>Current year</Form.Label>
                  <Form.Control
                    placeholder="eg: 2010"
                    value={update.year}
                    onChange={(e) =>
                      setUpdate((pre) => ({ ...pre, year: e.target.value }))
                    }
                  />
                </Form.Group>
              </div>

              <div className="inputs_width_modal">
                <Form.Group className="mb-3">
                  <Form.Label>Selected slab according to your units</Form.Label>
                  <Form.Control
                    placeholder="eg: 2010"
                    disabled
                    value={update.selected_slab}
                  />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={update_func}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Calculation;
