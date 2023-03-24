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
import { ModalCreateCategory } from "./components/CreateCategoryModal";
import { PopUpConfirm } from "@/shared/components/Popup";
import { redirectTo } from "@/shared/utils/history";
import { useCategoryStore } from "@/stores/categoryStore";
import {
  deleteCategory,
  getCategoryDetail,
} from "@/services/qam.services";

const maxHeight = 700;

export const Category = () => {
  const [openCreateCategoryModal, setOpenCreateCategoryModal] =
    useState(false);

  const [idSelected, setIdSelected] = useState(0);
  const [editCategory, setEditCategory] = useState(null);
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const { categorys, fetchCategorys, loading, setLoading, totalRecord } =
    useCategoryStore((state) => state);

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

  const handleClickOpenModalCreateCategory = (id) => {
    if (id) {
      handleGetCategoryDetail(id);
    } else {
      setEditCategory(null);
    }
    setOpenCreateCategoryModal(true);
  };

  const handleDeleteCategory = async () => {
    try {
      if (idSelected) {
        await deleteCategory({ id: idSelected });
        toast.success("Delete Category successfully!");
        await fetchCategorys();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
    }
  };

  const handleClickOpenModalDeleteCategory = (id) => {
    setIdSelected(id);
    setOpenPopupConfirm(true);
  };

  const handleClosePopupDeleteCategory = () => {
    setOpenPopupConfirm(false);
  };

  const handleGetCategoryDetail = async (id) => {
    try {
      const resp = await getCategoryDetail({ id });
      if (resp) {
        setEditCategory(resp?.data?.data);
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
        await fetchCategorys();
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);

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
            onClick={() => handleClickOpenModalCreateCategory()}
          >
            Create Category
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
                  categorys
                    ?.slice(controller.page * controller.rowsPerPage, controller.page * controller.rowsPerPage + controller.rowsPerPage)
                    ?.map((category) => (
                    <StyledTableRow key={category?._id}>
                      <TableCell
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            opacity: 0.8,
                          },
                        }}
                        onClick={() =>
                          handleClickOpenModalCreateCategory(category?._id)
                        }
                      >
                        {category?.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            opacity: 0.8,
                          },
                        }}
                        onClick={() =>
                          handleClickOpenModalCreateCategory(category?._id)
                        }
                      >
                        {category?.description}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handleClickOpenModalDeleteCategory(
                              category?._id
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
            {!loading && categorys.length === 0 && <NoDataAvailable />}
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
        onCancel={handleClosePopupDeleteCategory}
        onConfirm={() => handleDeleteCategory()}
        content="Are you sure to delete this Category!"
      />

      {/* modal create member */}
      <ModalCreateCategory
        open={openCreateCategoryModal}
        onClose={setOpenCreateCategoryModal}
        editCategory={editCategory}
      />
    </Box>
  );
};
