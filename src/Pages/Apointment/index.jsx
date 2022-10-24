import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Apointment() {
  const authData = useSelector((state: any) => state?.upload_data?.data);
  const dateData = useSelector((state) => state?.date_data?.date);

  const [searchData, setSearchData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [monthAndDays, setMonthAndDays] = useState(null);
  const [currentYear, setcurrentYear] = useState(null);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();

  console.log("currentYear", currentYear);

  const handleYearChange = (e) => {
    setcurrentYear(String(e.target.value));
    const monthData = document.getElementById("month").value.split("-");
    const yearData = document.getElementById("year").value;
    setMonthAndDays(String(e.target.value));

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

    navigate(`/apointment/year/${data?.year}/month/${monthData?.month[1]}`);
  };

  const handleMonthAndYearChange = (e) => {
    const monthData = document.getElementById("month").value.split("-");
    const yearData = document.getElementById("year").value;
    setMonthAndDays(String(e.target.value));

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
    navigate(`/apointment/year/${e.target.value}/month/${monthData?.month[1]}`);
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

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setModalData(item);
    setShow(true);
  };

  return (
    <div className="container">
      <div className="display">
        <div className="mb-3 d-flex align-items-center gap-2">
          <div>
            <select
              className="form-select month"
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
          </div>
          <div>
            <select
              className="form-select year"
              name="year"
              id="year"
              aria-label="Default select example"
              onChange={handleYearChange}
              value={currentYear}
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        <div className="item_wrapper">
          {searchData?.data?.map((item1) => (
            <div className="border single_item">
              {`${searchData?.year}-${searchData?.month[1]}-${item1}`}
              {(() => {
                let x = `${searchData?.year}-${searchData?.month[1]}-${item1}`;

                return (
                  <>
                    {authData?.map((item) =>
                      item?.date == x ? (
                        <>
                          <div>{item.time}</div>
                          <button
                            onClick={() => handleShow(item)}
                            className="btn btn-primary mt-2"
                          >
                            details
                          </button>
                        </>
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
      </div>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h1>{modalData?.name}</h1>
            <p>Gender: {modalData?.gender}</p>
            <p>Age: {modalData?.age}</p>
            <p>Date: {modalData?.date}</p>
            <p>Time: {modalData?.time}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Apointment;
