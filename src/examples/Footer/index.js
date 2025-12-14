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
/**
=========================================================
* Employee Management Dashboard
=========================================================
* Internal Application Footer
=========================================================
*/

import PropTypes from "prop-types";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard base styles
import typography from "assets/theme/base/typography";

function Footer({ text = "Digicorp Employee Management System · Internal Use Only" }) {
  const { size } = typography;

  return (
    <MDBox width="100%" display="flex" justifyContent="center" alignItems="center" px={2} py={2}>
      <MDTypography variant="button" color="secondary" fontSize={size.sm} textAlign="center">
        © {new Date().getFullYear()} {text}
      </MDTypography>
    </MDBox>
  );
}

/* Prop types */
Footer.propTypes = {
  text: PropTypes.string,
};

export default Footer;
