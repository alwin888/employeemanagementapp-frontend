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

      <MDBox py={6}>
        <Grid container spacing={3}>
          {/* Welcome Banner */}
          <Grid item xs={12}>
            <Card className="p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <MDTypography variant="h4" className="mb-2">
                Welcome to the Employee Dashboard
              </MDTypography>
              <MDTypography variant="body1">
                Use the navigation menu to manage employees, departments, promotions, and more.
              </MDTypography>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Card className="p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <MDTypography variant="h6">Total Employees</MDTypography>
              <MDTypography variant="h4" className="mt-2 font-bold">
                12,000
              </MDTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <MDTypography variant="h6">Departments</MDTypography>
              <MDTypography variant="h4" className="mt-2 font-bold">
                9
              </MDTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="p-6 rounded-2xl shadow-md flex flex-col items-right text-right">
              <MDTypography variant="h6">Managers</MDTypography>
              <MDTypography variant="h4" className="mt-2 font-bold">
                50
              </MDTypography>
            </Card>
          </Grid>

          {/* Helpful Info */}
          <Grid item xs={12}>
            <Card className="p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <MDTypography variant="h5" className="mb-3">
                Quick Actions
              </MDTypography>
              <ul className="list-disc ml-6 text-base">
                <li>Find an employee by ID</li>
                <li>Promote an employee</li>
                <li>Browse department employee lists</li>
                <li>View employee histories</li>
              </ul>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
