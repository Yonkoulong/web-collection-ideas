import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  Box,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  NoDataAvailable,
} from "@/shared/components";

import { useAppStore } from "@/stores/AppStore";
import { useCampaignStore } from "@/stores/CampaignStore";
import { useDepartmentStore } from "@/stores/DepartmentStore";
import { SearchCustomize } from "@/shared/components/Search";
import { enumRoles } from "@/shared/utils/constant.utils";
import { redirectTo } from "@/shared/utils/history";

import {
  CampaignsWrapper,
  CampaignItem,
  CampaignItemHead,
  CampaignItemHeadStartTime,
  CampaignItemBottomClosureTime,
  CampaignItemBody,
  CampaignItemContent,
  CampaignItemBottom,
  CampaignItemBottomTag,
} from "./CampaignList.styles";

const MAX_ITEM_PER_PAGE = 5;

export const CampaignList = () => {
  const userInfo = useAppStore((state) => state.userInfo);
  const {
    campaigns,
    fetchCampaigns,
    fetchCampaignsByDepartmentId,
    loading,
    setLoading,
    totalRecord,
  } = useCampaignStore((state) => state);
  const { departments, fetchDepartments } = useDepartmentStore(
    (state) => state
  );
  console.log(userInfo);
  const [deparment, setDepartment] = useState("");
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: MAX_ITEM_PER_PAGE,
  });

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage - 1,
    });
  };

  const handleChangeStatusCampaign = (time) => {
    let now = new Date();

    if (now.getTime() > new Date(time).getTime()) {
      return "red";
    } else {
      return "green";
    }
  };

  //select department
  const handleChangeDepartment = async (e) => {
    try {
      setDepartment(e.target.value);
      await fetchCampaignsByDepartmentId({ departmentId: e.target.value });
    } catch (error) {
      const errorMessage = error?.response?.data?.status || error;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        if (
          userInfo?.role == enumRoles.STAFF ||
          userInfo?.role == enumRoles.QAM
        ) {
          await fetchCampaignsByDepartmentId({
            departmentId: userInfo?.departmentId,
          });
        } else {
          await fetchDepartments();
          await fetchCampaigns();
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);

  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            userInfo.role == enumRoles.ADMIN || userInfo.role == enumRoles.QAM
              ? "space-between"
              : "flex-end",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {userInfo.role == enumRoles.ADMIN ||
          userInfo.role == enumRoles.QAM ? (
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel
                id="select-helper-label"
                sx={{ fontSize: "15px", top: "-8px" }}
              >
                Department
              </InputLabel>
              <Select
                labelId="select-helper-label"
                id="select-helper"
                label="Department"
                value={deparment}
                onChange={(e) => handleChangeDepartment(e)}
                sx={{
                  fontSize: "15px",
                  ".MuiSelect-select": { padding: "8.5px 14px" },
                }}
              >
                {departments?.map((department) => {
                  return (
                    <MenuItem
                      sx={{ fontSize: "15px" }}
                      key={department._id}
                      value={department._id || ""}
                    >
                      {department.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : null}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchCustomize />
        </Box>
      </Box>
      <Box>
        {campaigns.length <= 0 ? (
          <NoDataAvailable />
        ) : (
          <>
            <Box mt={2} mb={3}>
              <CampaignsWrapper>
                {loading && (
                  <Box my={10} mx={"auto"} textAlign="center">
                    <CircularProgress color="inherit" size={30} />
                  </Box>
                )}

                {!loading &&
                  campaigns
                    ?.slice(
                      controller.page * controller.rowsPerPage,
                      controller.page * controller.rowsPerPage +
                        controller.rowsPerPage
                    )
                    ?.map((campaigns) => {
                      return (
                        <CampaignItem
                          key={campaigns?._id}
                          onClick={() =>
                            redirectTo(`/campaigns/${campaigns?._id}/ideas`)
                          }
                        >
                          <CampaignItemHead>
                            <CampaignItemHeadStartTime>
                              Start date:{" "}
                              {dayjs(campaigns?.startTime).format(
                                "MM/DD/YYYY HH:mm A"
                              )}
                            </CampaignItemHeadStartTime>
                          </CampaignItemHead>
                          <CampaignItemBody>
                            <CampaignItemContent>
                              {campaigns?.name}{" "}
                              <span
                                style={{ color: "#000000" }}
                              >{`(${campaigns?.departmentId?.name})`}</span>
                            </CampaignItemContent>
                          </CampaignItemBody>
                          <CampaignItemBottom>
                            <CampaignItemBottomTag
                              sx={{
                                backgroundColor: `${handleChangeStatusCampaign(
                                  campaigns?.firstClosureDate
                                )}`,
                              }}
                            >
                              <CampaignItemBottomClosureTime>
                                First Closure date:{" "}
                                {dayjs(campaigns?.firstClosureDate).format(
                                  "MM/DD/YYYY HH:mm A"
                                )}
                              </CampaignItemBottomClosureTime>
                            </CampaignItemBottomTag>
                            <CampaignItemBottomTag
                              sx={{
                                backgroundColor: `${handleChangeStatusCampaign(
                                  campaigns?.finalClosureDate
                                )}`,
                              }}
                            >
                              <CampaignItemBottomClosureTime>
                                Final Closure date:{" "}
                                {dayjs(campaigns?.finalClosureDate).format(
                                  "MM/DD/YYYY HH:mm A"
                                )}
                              </CampaignItemBottomClosureTime>
                            </CampaignItemBottomTag>
                          </CampaignItemBottom>
                        </CampaignItem>
                      );
                    })}
              </CampaignsWrapper>
            </Box>
            <Stack
              spacing={2}
              sx={{
                ".MuiPagination-root": {
                  display: "flex",
                  justifyContent: "flex-end",
                },
              }}
            >
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(totalRecord / MAX_ITEM_PER_PAGE)}
                color="secondary"
              />
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};
