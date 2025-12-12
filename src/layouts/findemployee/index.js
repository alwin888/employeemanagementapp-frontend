import React, { useState } from "react";

// MUI components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom DataTable
import EmployeeDataTable from "./data/employeeDataTable";

function EmployeePage() {
  const [empNo, setEmpNo] = useState("");
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const fetchEmployee = () => {
    if (!empNo) return;
    fetch(`http://localhost:8080/employees/${empNo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Employee not found");
        return res.json();
      })
      .then((data) => {
        setEmployee(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setEmployee(null);
      });
  };

  const salaryColumns = [
    { Header: "From Date", accessor: "fromDate" },
    { Header: "To Date", accessor: "toDate" },
    { Header: "Salary", accessor: "salary" },
  ];

  const titleColumns = [
    { Header: "Title", accessor: "title" },
    { Header: "From Date", accessor: "fromDate" },
    { Header: "To Date", accessor: "toDate" },
  ];

  const managedDepartmentsColumns = [
    { Header: "Dept No", accessor: "deptNo" },
    { Header: "Dept Name", accessor: "deptName" },
    { Header: "From Date", accessor: "fromDate" },
    { Header: "To Date", accessor: "toDate" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card style={{ padding: 20 }}>
              <MDTypography variant="h6" color="info">
                Find Employee
              </MDTypography>

              <MDBox display="flex" alignItems="center" gap={2} mt={2}>
                <TextField
                  label="Employee No"
                  value={empNo}
                  onChange={(e) => setEmpNo(e.target.value)}
                  size="small"
                  style={{ width: 150 }}
                />
                <Button variant="contained" color="info" onClick={fetchEmployee}>
                  Search
                </Button>
              </MDBox>

              {error && (
                <MDTypography color="error" mt={2}>
                  {error}
                </MDTypography>
              )}

              {employee && (
                <MDBox mt={4}>
                  <MDTypography variant="h6">Employee Info</MDTypography>
                  <MDTypography>
                    {employee.firstName} {employee.lastName} ({employee.gender})
                  </MDTypography>
                  <MDTypography>Birth Date: {employee.birthDate}</MDTypography>
                  <MDTypography>Hire Date: {employee.hireDate}</MDTypography>

                  {/* Departments */}
                  {employee.departments && employee.departments.length > 0 && (
                    <EmployeeDataTable
                      title="Departments"
                      columns={[
                        { Header: "Dept No", accessor: "deptNo" },
                        { Header: "Dept Name", accessor: "deptName" },
                        { Header: "From Date", accessor: "fromDate" },
                        { Header: "To Date", accessor: "toDate" },
                      ]}
                      rows={employee.departments}
                    />
                  )}

                  {/* Salary History */}
                  {employee.salaryHistory && employee.salaryHistory.length > 0 && (
                    <EmployeeDataTable
                      title="Salary History"
                      columns={salaryColumns}
                      rows={employee.salaryHistory}
                    />
                  )}

                  {/* Title History */}
                  {employee.titleHistory && employee.titleHistory.length > 0 && (
                    <EmployeeDataTable
                      title="Title History"
                      columns={titleColumns}
                      rows={employee.titleHistory}
                    />
                  )}

                  {/* Manager History */}
                  {employee.managedDepartments && employee.managedDepartments.length > 0 && (
                    <EmployeeDataTable
                      title="Manager History"
                      columns={managedDepartmentsColumns}
                      rows={employee.managedDepartments}
                    />
                  )}
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default EmployeePage;
