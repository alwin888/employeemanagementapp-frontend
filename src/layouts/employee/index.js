// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Custom hook to fetch employee data
import useEmployeeTableData from "./data/employeeTableData";

import { useState, useEffect } from "react";

function Employees() {
  const [deptNo, setDeptNo] = useState("");
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);

  const { rows, refetch } = useEmployeeTableData(deptNo, page);

  // Fetch department list on component mount
  useEffect(() => {
    fetch("http://localhost:8080/department")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        if (data.length > 0 && !deptNo) setDeptNo(data[0].deptNo); // default to first dept
      })
      .catch((err) => console.error("Failed to fetch departments", err));
  }, [deptNo]);

  const columns = [
    { Header: "Emp No", accessor: "empNo", width: "15%", align: "left" },
    { Header: "First Name", accessor: "firstName", width: "25%", align: "left" },
    { Header: "Last Name", accessor: "lastName", width: "25%", align: "left" },
    { Header: "Hire Date", accessor: "hireDate", width: "20%", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Employees by Department
                </MDTypography>
              </MDBox>

              <MDBox p={2}>
                <MDBox display="flex" alignItems="center" mb={2} gap={2}>
                  <TextField
                    select
                    label="Department No"
                    value={deptNo}
                    onChange={(e) => setDeptNo(e.target.value)}
                    size="small"
                    style={{ minWidth: 120 }}
                    InputProps={{
                      style: { height: 35 },
                    }}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.deptNo} value={dept.deptNo}>
                        {dept.deptNo} - {dept.deptName}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Page"
                    type="number"
                    value={page}
                    onChange={(e) => setPage(Math.max(1, Number(e.target.value)))}
                    size="small"
                    style={{ width: 80 }}
                  />
                </MDBox>

                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={{ defaultValue: 20, entries: [20] }}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Employees;
