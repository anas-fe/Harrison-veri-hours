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

const Dashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <SideBarSkeleton search={search} setSearch={setSearch}>
      <div className={classes.main}>
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
        <div className="stats_cards_wrapper">
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
        <TableStructure />
      </div>
    </SideBarSkeleton>
  );
};

export default Dashboard;
