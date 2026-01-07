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
      'Hours Submitted': 400,
      'Hours Approved': 240,
    },
    {
      name: 'Feb',
      'Hours Submitted': 300,
      'Hours Approved': 139,
    },
    {
      name: 'Mar',
      'Hours Submitted': 200,
      'Hours Approved': 380,
    },
    {
      name: 'Apr',
      'Hours Submitted': 278,
      'Hours Approved': 390,
    },
    {
      name: 'May',
      'Hours Submitted': 189,
      'Hours Approved': 480,
    },
    {
      name: 'Jun',
      'Hours Submitted': 239,
      'Hours Approved': 380,
    },
    {
      name: 'Jul',
      'Hours Submitted': 349,
      'Hours Approved': 430,
    },
    {
      name: 'Aug',
      'Hours Submitted': 340,
      'Hours Approved': 430,
    },
    {
      name: 'Sep',
      'Hours Submitted': 400,
      'Hours Approved': 470,
    },
    {
      name: 'Oct',
      'Hours Submitted': 149,
      'Hours Approved': 230,
    },
    {
      name: 'Nov',
      'Hours Submitted': 209,
      'Hours Approved': 120,
    },
    {
      name: 'Dec',
      'Hours Submitted': 590,
      'Hours Approved': 600,
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

  const [SearchValue, setSearchValue] = useState('');

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
              <p className={classes.card_title}>Pending Verification Requests</p>
              <h5 className={classes.card_value}>
                15 <span className={classes.card_value_unit}>Requests</span>
              </h5>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Users</p>
              <h5 className={classes.card_value}>
                3652 <span className={classes.card_value_unit}>Users</span>
              </h5>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadowing Hours</p>
              <h5 className={classes.card_value}>
                544 <span className={classes.card_value_unit}>Hours</span>
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

          <TableStructure headerTitle=""
            headerHandlers={{
              search: <SearchInput value={SearchValue} setter={setSearchValue} placeholder="Search Users" />,
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
