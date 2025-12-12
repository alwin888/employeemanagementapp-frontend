import { useState, useEffect } from "react";

/**
 * Custom hook to fetch employees by department and page.
 * Usage: const { rows, hasNext } = useEmployeeTableData(deptNo, page);
 */
export default function useEmployeeTableData(deptNo, page) {
  const [rows, setRows] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    if (!deptNo) return;

    fetch(`http://localhost:8080/employees/by-department?deptNo=${deptNo}&page=${page}`)
      .then((res) => res.json())
      .then((employees) => {
        const mapped = employees.map((emp) => ({
          empNo: emp.empNo,
          firstName: emp.firstName,
          lastName: emp.lastName,
          hireDate: emp.hireDate,
        }));

        setRows(mapped);
        setHasNext(employees.length === 20);
      })
      .catch((err) => console.error("Failed to fetch employees", err));
  }, [deptNo, page]);

  return { rows, hasNext };
}
