import { useEffect, useState } from "react";
import SiteLoading from "../Common/Siteloading/SiteLoading";
import Swal from "sweetalert2";
import { GetApiCaller, PostApiCaller } from "../../services/ApiCaller";
import moment from 'moment';
import GridFunctions from "../Common/Grid/GridFunctions";

function Index() {
  const [isLoad, setLoad] = useState(false);
  const [checkboxChange, setCheckboxChange] = useState(false);
  const [objInput, setInput] = useState({
    name: "",
    studentID: "",
    grade: "",
    birthday: "",
    registerDate: "",
    contactNumber: ""
  });
  const [arrSubject, setSubject] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fnOnChange = (e) => {
    setInput((objInput) => ({
      ...objInput,
      [e.target.name]: e.target.value,
    }));
  };

  const fnInutField = (type, id, placeholder, value, isDis) => {
    return (
      <div className="form-floating mb-3">
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder}
          name={id}
          onChange={(e) => fnOnChange(e)}
          value={value}
          disabled={isDis}
        />
        <label htmlFor={id}>{placeholder}</label>
      </div>
    );
  };

  const fnAlert = (booSucess, msg) => {
    return Swal.fire({
      icon: booSucess ? "success" : "error",
      title: booSucess ? msg : "Something wrong!",
      text: !booSucess ? msg : "",
    });
  };

  const fetchData = async () => {
    setLoad(true);
    const resInq = await GetApiCaller("student/getData");
    setLoad(false);
    if (resInq.booStatus) {
      setInput(resInq.objResponse.objStudent);
      setSubject(resInq.objResponse.arrSubject);
    } else {
      fnAlert(false, resInq.objResponse);
    }
  };

  const columns = [
    {
      name: "Subject Code",
      grow: 2,
      selector: "subjectCode",
    },
    {
      name: "Subject Name",
      grow: 3,
      selector: "subjectName",
    },
    {
      name: "Action",
      grow: 1,
      cell: (row) => (
        <>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="isEnroll"
              name="isEnroll"
              checked={row.isEnroll ? true : false}
              onClick={() => {
                setCheckboxChange(!checkboxChange);
                row.isEnroll = !row.isEnroll;
                onClickEntrolled(row);
              }}
            />
          </div>
        </>
      ),
    },
  ];

  const onClickEntrolled = (row) =>{
  }

  const btnOnClickSave = async () =>{
    if(objInput.name === ""){
      fnAlert(false, "Please enter name");
    } else{
      const enrolledSubjects = [];
      arrSubject.map((sub)=>{
        if(sub.isEnroll) enrolledSubjects.push({subjectCode: sub.subjectCode, subjectName: sub.subjectName});
      })
      objInput.enrolledSubjects = enrolledSubjects;

      setLoad(true);
      const resUpdate = await PostApiCaller("student/updateStudentInfo", objInput);
      setLoad(false);
      if (resUpdate.booStatus) {
        fnAlert(true, resUpdate.objResponse);
      } else {
        fnAlert(false, resUpdate.objResponse);
      }
    }
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>Student Profile</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            {fnInutField("text", "name", "Name", objInput.name, false)}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            {fnInutField(
              "text",
              "studentID",
              "Student ID",
              objInput.studentID,
              true
            )}
          </div>
          <div className="col-6">
            {fnInutField("text", "grade", "Grade", objInput.grade, false)}
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            {fnInutField(
              "date",
              "birthday",
              "Birthday",
              objInput.birthday,
              false
            )}
          </div>
          <div className="col-4">
            {fnInutField(
              "date",
              "registerDate",
              "RegisterDate",
              objInput.registerDate,
              true
            )}
          </div>
          <div className="col-4">
            {fnInutField(
              "text",
              "contactNumber",
              "Contact Number",
              objInput.contactNumber,
              false
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <GridFunctions
              title="Enrolled Subjects"
              columns={columns}
              dataSet={arrSubject}
              strHeight={"30vh"}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-3">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={btnOnClickSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
