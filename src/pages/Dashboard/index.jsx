import { useState } from "react";
import classes from "./Dashboard.module.css";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import Box from "@/components/Core/Box";
import LineChart from "@/components/Core/Charts/LineChart";
import { Button } from "@/components/Core/Button";
import Carousel from "@/components/Core/Carousel";
import { Checkbox } from "@/components/Core/Checkbox";
import PhoneNumberInput from "@/components/Core/CustomPhoneInput";
import DateInput from "@/components/Core/DateInput";
import { DropDown } from "@/components/Core/DropDown";
import HeadingComponent from "@/components/Core/HeadingComponent";
import { Input } from "@/components/Core/Input";
import { Label } from "@/components/Core/Label";
import { Loader } from "@/components/Core/Loader";
import MultiFileUpload from "@/components/Core/MultiFileUpload";
import NoData from "@/components/Core/NoData/NoData";
import PaginationComponent from "@/components/Core/PaginationComponent";
import PopperComponent from "@/components/Core/PopperComponent";
import { ProfileWithEditButton } from "@/components/Core/ProfileWithEditButton";
import QuillInput from "@/components/Core/QuillInput";
import { Radio } from "@/components/Core/Radio";
import { ScoreRange } from "@/components/Core/ScoreRange";
import SearchInput from "@/components/Core/SearchInput";
import Separator from "@/components/Core/Separator";
import ShowMoreShowLessText from "@/components/Core/ShowMoreShowLess";
import { Switch } from "@/components/Core/Switch";
import TableStructure from "@/components/Core/TableStructure";
import TabsComponent from "@/components/Core/TabsComponent";
import { TextArea } from "@/components/Core/TextArea";
import TimeInput from "@/components/Core/TimeInput";
import { ToastProvider } from "@/components/Core/ToastProvider";
import UploadImageBox from "@/components/Core/UploadImageBox";
import UserPopover from "@/components/Core/UserPopover";
import StatsCard from '../../components/StatsCard'

import React from "react";
import statsIcon from "@/assets/images/statsCardLogo.png";
import Statuses from "@/components/Core/Statuses";
import { userDetailsData } from "@/data/data";
import PieChart from "@/components/Core/Charts/PieChart";


const Dashboard = () => {

  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const getData = async (page, search, filter) => {
    console.log(page, search, filter);
    //fetch data from api
  };

  function getChartData() {
    const data = [
    {
      name: 'Jan',
      'Hours Submitted': 4000,
      'Hours Approved': 2400,
    },
    {
      name: 'Feb',
      'Hours Submitted': 3000,
      'Hours Approved': 1398,
    },
    {
      name: 'Mar',
      'Hours Submitted': 2000,
      'Hours Approved': 9800,
    },
    {
      name: 'Apr',
      'Hours Submitted': 2780,
      'Hours Approved': 3908,
    },
    {
      name: 'May',
      'Hours Submitted': 1890,
      'Hours Approved': 4800,
    },
    {
      name: 'Jun',
      'Hours Submitted': 2390,
      'Hours Approved': 3800,
    },
    {
      name: 'Jul',
      'Hours Submitted': 3490,
      'Hours Approved': 4300,
    },
    {
      name: 'Aug',
      'Hours Submitted': 3490,
      'Hours Approved': 4300,
    },
    {
      name: 'Sep',
      'Hours Submitted': 1000,
      'Hours Approved': 4700,
    },
    {
      name: 'Oct',
      'Hours Submitted': 1490,
      'Hours Approved': 2300,
    },
    {
      name: 'Nov',
      'Hours Submitted': 2090,
      'Hours Approved': 1200,
    },
    {
      name: 'Dec',
      'Hours Submitted': 590,
      'Hours Approved': 8000,
    },
  ];
    return data;
  }

function getPieChartData() {
    const data = [
    {
      name: 'Shadow Approved',
      value : 100,
      color : '#1789C9',
      label : 'Shadow Approved'
    },
    {
      name: 'Shadow Rejected',
      value : 250,
      color : '#023878',
      label : 'Shadow Rejected'
    },
  ];
    return data;
  }

  return (
    <SideBarSkeleton search={search} setSearch={setSearch}>
      {/* <div className={classes.main}> */}
        {/* <Box />
        <Button />
        <Carousel />
        <Checkbox />
        <PhoneNumberInput />
        <DateInput />
        <DropDown />
        <HeadingComponent />
        <Input />
        <Label />
        <Loader />
        <MultiFileUpload />
        <NoData />
        <PaginationComponent />
        <PopperComponent />
        <ProfileWithEditButton />
        <QuillInput />
        <Radio />
        <ScoreRange />
        <SearchInput />
        <Separator />
        <ShowMoreShowLessText />
        <Switch />
        <TableStructure />
        <TabsComponent />
        <TextArea />
        <TimeInput />
        <ToastProvider />
        <UploadImageBox />
        <UserPopover /> */}
        {/* <LineChart /> */}
        <div className="stats_cards_main">
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h5 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h5>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h5 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h5>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h5 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h5>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h5 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h5>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
        </div>
        <div className={classes.charts_wrapper}>
          <Box className={classes.line_chart_wrapper}>
            <h5>Shadow Hours Statistics</h5>
          <LineChart data={getChartData()}/>
          </Box>
          <Box className={classes.doughnet_chart_wrapper}>
            <h5>Statistics</h5>
          <PieChart data={getPieChartData()} />
          </Box>
        </div>
        <div className="table_wrapper">
          <h5>Shadowing History</h5>

          <TableStructure
            headerHandlers={{
              search: <SearchInput placeholder="Search Users" />,
              dropdown: <DropDown menuPlacement="bottom" />,
            }}
            tableContent={userDetailsData.map((item) => {
              return {
                ...item,
                status: <Statuses status={item?.status} />,
              };
            })}
            tableHeaders={[
              { label: "Manager Name", value: "managerName" },
              { label: "Manager Email", value: "managerEmail" },
              { label: "Company Name", value: "companyName" },
              { label: "Start Date", value: "startDate" },
              { label: "End Date", value: "endDate" },
              { label: "Status", value: "status" },
            ]}
            page={page}
            setPage={(e) => {
              getData(e, search);
              setPage(e);
            }}
          />
        </div>
      {/* </div> */}
    </SideBarSkeleton>
  );
};

export default Dashboard;
