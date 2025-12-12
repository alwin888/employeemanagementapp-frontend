/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function departmentTableData() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/department")
      .then((res) => res.json())
      .then((departments) => {
        const mapped = departments.map((dept) => ({
          deptNo: (
            <MDTypography variant="button" fontWeight="medium">
              {dept.deptNo}
            </MDTypography>
          ),
          deptName: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {dept.deptName}
            </MDTypography>
          ),
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="active" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
        }));

        setRows(mapped);
      })
      .catch((err) => console.error("Failed to fetch departments", err));
  }, []);

  return {
    columns: [
      { Header: "Department No", accessor: "deptNo", width: "20%", align: "center" },
      { Header: "Department Name", accessor: "deptName", width: "60%", align: "center" },
    ],
    rows,
  };
}
