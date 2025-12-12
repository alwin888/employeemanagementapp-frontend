// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useState, useEffect } from "react";
import { promoteEmployee } from "./promoteEmployeeService";

function PromoteEmployee() {
  const [empNo, setEmpNo] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [salary, setSalary] = useState("");
  const [deptNo, setDeptNo] = useState("");
  const [manager, setManager] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch department list on mount
  useEffect(() => {
    fetch("http://localhost:8080/department")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Failed to fetch departments", err));
  }, []);

  const handleSubmit = async () => {
    if (!empNo || !newTitle || !fromDate || !salary || !deptNo) {
      setError("Please fill in all required fields");
      setMessage("");
      return;
    }

    const promotionData = {
      empNo: Number(empNo),
      newTitle,
      fromDate,
      salary: Number(salary),
      deptNo,
      manager,
    };

    try {
      const result = await promoteEmployee(promotionData);
      setMessage(`Employee ${empNo} promoted successfully`);
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

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
                  Promote Employee
                </MDTypography>
              </MDBox>

              <MDBox p={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Employee No"
                  value={empNo}
                  onChange={(e) => setEmpNo(e.target.value)}
                  size="small"
                  type="number"
                />
                <TextField
                  label="New Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  size="small"
                />
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  size="small"
                />
                <TextField
                  select
                  label="Department"
                  value={deptNo}
                  onChange={(e) => setDeptNo(e.target.value)}
                  size="small"
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
                <FormControlLabel
                  control={
                    <Checkbox checked={manager} onChange={(e) => setManager(e.target.checked)} />
                  }
                  label="Check this if the promoted position is a Manager role"
                />

                <Button variant="contained" color="info" onClick={handleSubmit}>
                  Promote
                </Button>

                {message && <MDTypography color="success">{message}</MDTypography>}
                {error && <MDTypography color="error">{error}</MDTypography>}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PromoteEmployee;
