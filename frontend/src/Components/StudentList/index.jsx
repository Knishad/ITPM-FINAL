import { useEffect, useState } from "react";
import SiteLoading from "../Common/Siteloading/SiteLoading";
import Swal from "sweetalert2";
import { GetApiCaller, PostApiCaller } from "../../services/ApiCaller";
import GridFunctions from "../Common/Grid/GridFunctions";

const Index = () => {
  const [arrStudents, setStudents] = useState([]);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoad(true);
    const resStd = await GetApiCaller("student/getStudents");
    setLoad(false);
    if (resStd.booStatus) {
      setStudents(resStd.objResponse);
    } else {
      fnAlert(false, resStd.objResponse);
    }
  };

  const fnAlert = (booSucess, msg) => {
    return Swal.fire({
      icon: booSucess ? "success" : "error",
      title: booSucess ? msg : "Something wrong!",
      text: !booSucess ? msg : "",
    });
  };

  const columns = [
    {
      name: "StudentId",
      grow: 1,
      selector: "studentID",
    },
    {
      name: "Name",
      grow: 2,
      selector: "name",
    },
    {
      name: "Email",
      grow: 2,
      selector: "email",
    },
    {
      name: "Grade",
      grow: 1,
      selector: "grade",
    },
    {
      name: "Birthday",
      grow: 1,
      selector: "birthday",
    },
    {
      name: "Register Date",
      grow: 1,
      selector: "registerDate",
    },
    {
      name: "Contact Number",
      grow: 1,
      selector: "contactNumber",
    },
    {
      name: "Action",
      grow: 1,
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => btnOnClickRemove(row)}
          >
            Remove
          </button>
        </>
      ),
    },
  ];

  const btnOnClickRemove = async (row) =>{
      setLoad(true);
      const resRemove = await PostApiCaller("student/removeStudent", {studentID: row.studentID});
      setLoad(false);
      if (resRemove.booStatus) {
        fnAlert(true, resRemove.objResponse);
      } else {
        fnAlert(false, resRemove.objResponse);
      }
  }

  return (
    <>
    {isLoad && <SiteLoading />}
      <div className="row">
        <div className="col-md-12">
          <GridFunctions
            title="Student Details"
            columns={columns}
            dataSet={arrStudents}
            strHeight={"30vh"}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
