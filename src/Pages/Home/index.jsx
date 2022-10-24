import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commonAction } from "../../Action/Action";

const Home = () => {
  const authData = useSelector((state) => state?.upload_data?.data);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    gender: "",
    age: "",
    date: "",
    time: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authData?.length > 0) {
      let newArray = [...authData];
      newArray.push(values);
      dispatch(commonAction(newArray, "UPLOAD"));
      dispatch(commonAction(values, "DATE"));
      setValues({ name: "", gender: "", age: "", date: "", time: "" });
      alert("successfully submitted");
      navigate(
        `apointment/year/${values?.date.split("-")[0]}/month/${
          values?.date.split("-")[1]
        }`
      );
    } else {
      dispatch(commonAction([values], "UPLOAD"));
      setValues({ name: "", gender: "", age: "", date: "", time: "" });
      alert("successfully submitted");
      navigate(
        `apointment/year/${values?.date.split("-")[0]}/month/${
          values?.date.split("-")[1]
        }`
      );
    }
  };

  const disablePastDate = () => {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div className="container">
      <div className="upload">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <label className="" htmlFor="name">
                name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={values?.name}
              />
            </div>
            <div className="col-md-4">
              <label className="" htmlFor="age">
                age
              </label>
              <input
                className="form-control"
                type="text"
                name="age"
                id="age"
                onChange={handleChange}
                value={values?.age}
              />
            </div>
            <div className="col-md-4">
              <label className="" htmlFor="gender">
                gender
              </label>
              <select
                id="gender"
                className="form-select form-control"
                name="gender"
                aria-label="Default select example"
                onChange={handleChange}
                value={values?.gender}
              >
                <option selected> select</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label className="" htmlFor="date">
                date
              </label>
              <input
                className="form-control"
                type="date"
                name="date"
                id="date"
                onChange={handleChange}
                value={values?.date}
                min={disablePastDate()}
              />
            </div>
            <div className="col-md-4">
              <label className="" htmlFor="time">
                time
              </label>
              <input
                className="form-control"
                type="time"
                id="appt"
                name="time"
                min="09:00"
                max="18:00"
                onChange={handleChange}
                value={values?.time}
              ></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
