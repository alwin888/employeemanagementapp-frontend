import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={6} px={2}>
        <Grid container spacing={4} justifyContent="center">
          {/* Welcome Banner */}
          <Grid item xs={12}>
            <Card>
              <MDBox
                p={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <MDTypography variant="h4" gutterBottom>
                  Employee Management System
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  Centralized dashboard to manage employees, departments, promotions, and employment
                  history.
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

          {/* Core Features */}
          <Grid item xs={12} md={3}>
            <Card>
              <MDBox
                p={3}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <MDTypography variant="h6" gutterBottom>
                  Browse Employees
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  View employees by department with paginated results.
                </MDTypography>
                <MDTypography variant="caption" mt={1} color="info">
                  GET /employees?deptNo
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <MDBox
                p={3}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <MDTypography variant="h6" gutterBottom>
                  Find Employee
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  Search for a single employee and view full history.
                </MDTypography>
                <MDTypography variant="caption" mt={1} color="info">
                  GET /employees/{"{"}empNo{"}"}
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <MDBox
                p={3}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <MDTypography variant="h6" gutterBottom>
                  Promote Employee
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  Promote an employee with new title, salary, and department.
                </MDTypography>
                <MDTypography variant="caption" mt={1} color="info">
                  POST /employees/promote
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <MDBox
                p={3}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <MDTypography variant="h6" gutterBottom>
                  Departments
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  Retrieve department information used across the system.
                </MDTypography>
                <MDTypography variant="caption" mt={1} color="info">
                  GET /department
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
