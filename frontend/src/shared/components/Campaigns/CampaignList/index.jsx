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
  CircularProgress
} from "@/shared/components";

import { useAppStore } from "@/stores/AppStore";
import { useCampaignStore } from "@/stores/CampaignStore";
import { useDepartmentStore } from "@/stores/DepartmentStore";
import { enumRoles } from "@/shared/utils/constant.utils";
import { redirectTo } from "@/shared/utils/history";
import { SearchCustomize } from "@/shared/components/Search";

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

export const CampaignList = () => {
  const userInfo = useAppStore((state) => state.userInfo);
  const { campaigns, fetchCampaigns, loading, setLoading } = useCampaignStore(
    (state) => state
  );
  const { departments, fetchDepartments } = useDepartmentStore(
    (state) => state
  );

  const [deparment, setDepartment] = useState("");

  //select department
  const handleChangeDepartment = (e) => {
    setAge(e.target.value);
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        await fetchDepartments();
        await fetchCampaigns();
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
                onChange={handleChangeDepartment}
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
        <Box mt={2} mb={3}>
          <CampaignsWrapper>
            {loading && (
              <Box my={10} mx={"auto"} textAlign="center">
                <CircularProgress color="inherit" size={30} />
              </Box>
            )}

            {!loading &&
              campaigns?.map((campaigns) => {
                return (
                  <CampaignItem
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
                        >{`(${campaigns?.departmentName})`}</span>
                      </CampaignItemContent>
                    </CampaignItemBody>
                    <CampaignItemBottom>
                      <CampaignItemBottomTag>
                        <CampaignItemBottomClosureTime>
                          Fist Closure date:{" "}
                          {dayjs(campaigns?.firstClosureDate).format(
                            "MM/DD/YYYY HH:mm A"
                          )}
                        </CampaignItemBottomClosureTime>
                      </CampaignItemBottomTag>
                      <CampaignItemBottomTag>
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
          <Pagination count={10} color="secondary" />
        </Stack>
      </Box>
    </Box>
  );
};
