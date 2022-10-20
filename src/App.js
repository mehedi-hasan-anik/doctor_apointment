import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { commonAction } from "./Action/Action";
import "./App.css";

function App() {
  const authData = useSelector((state: any) => state?.upload_data?.data);
  const [values, setValues] = useState({});
  const [searchData, setSearchData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [monthAndDays, setMonthAndDays] = useState(null);
  const [currentYear, setcurrentYear] = useState(null);
  const dispatch = useDispatch();

  console.log("authData", authData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleMonthAndYearChange = (e) => {
    const monthData = document.getElementById("month").value.split("-");
    const yearData = document.getElementById("year").value;
    const newArray = [];
    for (var i = 1; i <= Number(monthData[0]); i++) {
      newArray.push(i);
    }
    const data = {
      month: monthData,
      year: yearData,
      data: newArray,
    };
    setSearchData(data);
  };

  const fethData = (monthD, yearData) => {
    let monthData = monthD.split("-");
    const newArray = [];
    for (var i = 1; i <= Number(monthData[0]); i++) {
      newArray.push(i);
    }
    const data = {
      month: monthData,
      year: yearData,
      data: newArray,
    };
    setSearchData(data);
  };

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  useEffect(() => {
    fethData(
      `${daysInMonth(
        currentDate?.getMonth() + 1,
        currentDate?.getFullYear()
      )}-${currentDate?.getMonth() + 1}`,
      currentDate?.getFullYear()
    );

    let dayAdmonth = `${daysInMonth(
      currentDate?.getMonth() + 1,
      currentDate?.getFullYear()
    )}-${currentDate?.getMonth() + 1}`;

    setMonthAndDays(dayAdmonth);

    setcurrentYear(currentDate?.getFullYear());
  }, []);

  const handleSubmit = () => {
    if (authData?.length > 0) {
      let newArray = [...authData];
      newArray.push(values);
      dispatch(commonAction(newArray, "UPLOAD"));
      console.log("anik", newArray);
      setValues({});
    } else {
      dispatch(commonAction([values], "UPLOAD"));
      console.log("anik2", values);
      setValues({});
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <div className="container">
        <div className="upload">
          <form onSubmit={handleSubmit}>
            <label className="" htmlFor="name">
              name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={values?.name}
            />
            <br />
            <label className="" htmlFor="age">
              age
            </label>
            <input
              type="text"
              name="age"
              id="age"
              onChange={handleChange}
              value={values?.age}
            />
            <br />
            <label className="" htmlFor="gender">
              {" "}
              gender
            </label>
            <select
              id="gender"
              className="form-select"
              name="gender"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.gender}
            >
              <option selected> select</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <br />
            <label className="" htmlFor="date">
              date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleChange}
              value={values?.date}
            />
            <br />
            <label className="" htmlFor="time">
              time
            </label>
            <input
              type="time"
              id="appt"
              name="time"
              min="09:00"
              max="18:00"
              onChange={handleChange}
              value={values?.time}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <br />
        <br />
        <br />
        <div className="display">
          <select
            className="form-select"
            name="month"
            id="month"
            aria-label="Default select example"
            onChange={handleMonthAndYearChange}
            value={String(monthAndDays)}
          >
            <option value="31-01">January</option>
            <option value="28-02">February</option>
            <option value="31-03">March</option>
            <option value="30-04">April</option>
            <option value="31-05">May</option>
            <option value="30-06">June</option>
            <option value="31-07">July</option>
            <option value="31-08">August</option>
            <option value="30-09">September</option>
            <option value="31-10">October</option>
            <option value="30-11">November</option>
            <option value="31-12">December</option>
          </select>
          <br />
          <br />
          <select
            className="form-select"
            name="year"
            id="year"
            aria-label="Default select example"
            onChange={handleMonthAndYearChange}
            value={currentYear}
          >
            <option selected>2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>

          <br />
          <br />
          {searchData?.data?.map((item) => (
            <div className="border">
              {`${searchData?.year}-${searchData?.month[1]}-${item}`}
              {(() => {
                let x = `${searchData?.year}-${searchData?.month[1]}-${item}`;

                return (
                  <>
                    {authData?.map((item) =>
                      item?.date == x ? (
                        <div onClick={handleShow}>{item.time} </div>
                      ) : (
                        ""
                      )
                    )}
                  </>
                );
              })()}
            </div>
          ))}
        </div>

        <div className="modal">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
