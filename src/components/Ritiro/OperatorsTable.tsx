import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Pagination,
  TablePagination,
  Stack,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { RaddOperator } from "model";
import { useState } from "react";

type Props = {
  rows: RaddOperator[];
};
function stableSort(array: any[], comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order: "asc" | "desc", orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function OperatorsTable({ rows }: Readonly<Props>) {
  const [orderBy, setOrderBy] = useState("city");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const sortedRows: RaddOperator[] = stableSort(
    rows,
    getComparator(order, orderBy)
  );

  const keys = ["denomination", "city", "address", "contacts"];
  const columnNames: { [key: string]: string } = {
    denomination: "Denominazione",
    city: "Città",
    address: "Indirizzo",
    contacts: "Contatti",
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: any, page: number | null) => {
    if (page !== null) {
      setPage(page - 1);
    }
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = property === "city" && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "100%", maxWidth: 1092 }}
          aria-label="operators table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
              {keys.map((key) => (
                <TableCell key={key}>
                  <TableSortLabel
                    disabled={key !== "city"}
                    active={key === "city"}
                    direction={key === "city" ? order : "asc"}
                    onClick={() => handleRequestSort(key)}
                  >
                    {columnNames[key]}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index: number) => (
                <TableRow
                  key={`${row.denomination}-${index}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.denomination}
                  </TableCell>
                  <TableCell>
                    {row.city} ({row.province})
                  </TableCell>
                  <TableCell>
                    {row.address} - {row.cap}
                  </TableCell>
                  <TableCell>{row.contacts}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 10 && (
        <Stack
          mt={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TablePagination
            id="ritiroPagination"
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 30]}
          />
          <Pagination
            color="primary"
            count={Math.ceil(rows.length / rowsPerPage)}
            onChange={handleChangePage}
            boundaryCount={1}
            siblingCount={1}
            hidePrevButton
            hideNextButton
          />
        </Stack>
      )}
    </>
  );
}

export default OperatorsTable;