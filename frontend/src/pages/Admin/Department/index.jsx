import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { SearchCustomize } from "@/shared/components/Search";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
  NoDataAvailable,
  StyledTableRow,
  Paper,
  IconButton,
} from "@/shared/components";
import Button from "@mui/material/Button";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ModalCreateDepartment } from "./Components/CreateDepartmentModal";
import { PopUpConfirm } from "@/shared/components/Popup";
import { redirectTo } from "@/shared/utils/history";
import { useDepartmentStore } from "@/stores/DepartmentStore";
import {
  deleteDepartment,
  getDepartmentDetail,
} from "@/services/admin.services";

const maxHeight = 700;

export const Department = () => {
  const [openCreateDepartmentModal, setOpenCreateDepartmentModal] =
    useState(false);

  const [idSelected, setIdSelected] = useState(0);
  const [editDepartment, setEditDepartment] = useState(null);
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const { departments, fetchDepartments, loading, setLoading, totalRecord } =
    useDepartmentStore((state) => state);

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleClickOpenModalCreateDepartment = (id) => {
    if (id) {
      handleGetDepartmentDetail(id);
    } else {
      setEditDepartment(null);
    }
    setOpenCreateDepartmentModal(true);
  };

  const handleDeleteDepartment = async () => {
    try {
      if (idSelected) {
        await deleteDepartment({ id: idSelected });
        toast.success("Delete department successfully!");
        await fetchDepartments();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
    }
  };

  const handleClickOpenModalDeleteDepartment = (id) => {
    setIdSelected(id);
    setOpenPopupConfirm(true);
  };

  const handleClosePopupDeleteDepartment = () => {
    setOpenPopupConfirm(false);
  };

  const handleGetDepartmentDetail = async (id) => {
    try {
      const resp = await getDepartmentDetail({ id });
      if (resp) {
        setEditDepartment(resp?.data?.data);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchDepartments();
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);
 console.log("quang reponsive");
  return (
    <Box
      sx={{
        padding: "24px 16px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <SearchCustomize />
          </Box>
          <Button
            variant="contained"
            onClick={() => handleClickOpenModalCreateDepartment()}
          >
            Create Department
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <TableContainer
            style={{
              boxShadow: "none",
              maxHeight: maxHeight || "unset",
            }}
            sx={{
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px",
                height: "60px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#D8DDE2",
                bordeRadius: "10px",
                height: "60px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                opacity: "0.8",
              },
            }}
            component={Paper}
          >
            <Table stickyHeader={!!maxHeight} sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell width="30%">Name</TableCell>
                  <TableCell width="60%">Description</TableCell>
                  <TableCell width="10%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  departments
                    ?.slice(controller.page * controller.rowsPerPage, controller.page * controller.rowsPerPage + controller.rowsPerPage)
                    ?.map((department) => (
                    <StyledTableRow key={department?._id}>
                      <TableCell
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            opacity: 0.8,
                          },
                        }}
                        onClick={() =>
                          handleClickOpenModalCreateDepartment(department?._id)
                        }
                      >
                        {department?.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            opacity: 0.8,
                          },
                        }}
                        onClick={() =>
                          handleClickOpenModalCreateDepartment(department?._id)
                        }
                      >
                        {department?.description}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handleClickOpenModalDeleteDepartment(
                              department?._id
                            )
                          }
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            {loading && (
              <Box my={10} mx={"auto"} textAlign="center">
                <CircularProgress color="inherit" size={30} />
              </Box>
            )}
            {!loading && departments.length === 0 && <NoDataAvailable />}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
            component="div"
            onPageChange={handlePageChange}
            page={controller.page}
            count={totalRecord}
            rowsPerPage={controller.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      {/* Popup confirm when delete member */}
      <PopUpConfirm
        open={openPopupConfirm}
        onCancel={handleClosePopupDeleteDepartment}
        onConfirm={() => handleDeleteDepartment()}
        content="Are you sure to delete this account!"
      />

      {/* modal create member */}
      <ModalCreateDepartment
        open={openCreateDepartmentModal}
        onClose={setOpenCreateDepartmentModal}
        editDepartment={editDepartment}
      />
    </Box>
  );
};
