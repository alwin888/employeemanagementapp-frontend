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

// src/layouts/employee/employeeDataTable.js

import React from "react";
import DataTable from "examples/Tables/DataTable";

export default function EmployeeDataTable({ columns, rows, title }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>{title}</h3>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false} // show all rows
        showTotalEntries={false}
        noEndBorder
      />
    </div>
  );
}
