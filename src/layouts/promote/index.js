// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout
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
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [errors, setErrors] = useState({});

  /* -------------------- Fetch Departments -------------------- */
  useEffect(() => {
    fetch("http://localhost:8080/department")
      .then((res) => res.json())
      .then(setDepartments)
      .catch(() => showSnackbar("Failed to load departments", "error"));
  }, []);

  /* -------------------- Helpers -------------------- */
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!empNo) newErrors.empNo = "Employee number is required";
    else if (!Number.isInteger(Number(empNo))) newErrors.empNo = "Must be a valid integer";

    if (!newTitle) newErrors.newTitle = "New title is required";

    if (!fromDate) newErrors.fromDate = "From date is required";
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(fromDate))
      newErrors.fromDate = "Format must be yyyy-mm-dd";

    if (!salary) newErrors.salary = "Salary is required";
    else if (!Number.isInteger(Number(salary)) || Number(salary) <= 0)
      newErrors.salary = "Must be a positive number";

    if (!deptNo) newErrors.deptNo = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = empNo && newTitle && fromDate && salary && deptNo && !loading;

  /* -------------------- Submit -------------------- */
  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar("Please fix the form errors", "error");
      return;
    }

    const promotionData = {
      empNo: Number(empNo),
      newTitle: newTitle.trim(),
      fromDate,
      newSalary: Number(salary),
      deptNo,
      manager,
    };

    try {
      setLoading(true);
      await promoteEmployee(promotionData);
      showSnackbar(`Employee ${empNo} promoted successfully`);
    } catch (err) {
      showSnackbar(
        err?.message || "Unable to promote employee. Please check your inputs.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
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

              <MDBox p={3} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Employee No"
                  type="number"
                  value={empNo}
                  onChange={(e) => setEmpNo(e.target.value)}
                  error={!!errors.empNo}
                  helperText={errors.empNo}
                />

                <TextField
                  label="New Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  error={!!errors.newTitle}
                  helperText={errors.newTitle}
                />

                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fromDate}
                  helperText={errors.fromDate}
                />

                <TextField
                  label="Salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  error={!!errors.salary}
                  helperText={errors.salary}
                />

                <TextField
                  select
                  label="Department"
                  value={deptNo}
                  onChange={(e) => setDeptNo(e.target.value)}
                  error={!!errors.deptNo}
                  helperText={errors.deptNo}
                  InputProps={{
                    style: { height: 50 },
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
                  label="Manager role"
                />

                <Button
                  variant="contained"
                  color="info"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  startIcon={loading && <CircularProgress size={18} />}
                >
                  {loading ? "Promoting..." : "Promote"}
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </DashboardLayout>
  );
}

export default PromoteEmployee;
