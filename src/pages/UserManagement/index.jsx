// import StatsCard from '@/components/StatsCard'
import React from "react";
import classes from "./userManagement.module.css";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import statsIcon from "@/assets/images/statsCardLogo.png";
import userImage from "@/assets/images/userImage.png";
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import TableStructure from "@/components/Core/TableStructure";
import Box from "@/components/Core/Box";
import SearchInput from "@/components/Core/SearchInput";
import { DropDown } from "@/components/Core/DropDown";

const data = [
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            },
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            },
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            },
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            },
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            },
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            },
            {
              _id: 1,
              name: "john doe",
              email: "lorem@example.com",
              duration: "2 hours",
              phone: "+123456789",
            }
          ]

function UserManagement() {
    const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const getData = async (page, search, filter) => {
    console.log(page, search, filter);
    //fetch data from api
  }

  return (
    <>
      <SideBarSkeleton search={search} setSearch={setSearch}>
        <div className={classes.user_details_card}>
          <div className={classes.user_card_info_wrapper}>
            <div className={classes.user_card_picture}>
              <img src={userImage} alt="user_picture" />
            </div>
            <div className={classes.user_card_info}>
              <h5 className={classes.user_name}>John Doe</h5>
              <p className={classes.user_contact_info}>
                <span>
                  <MdMailOutline /> john.doe@example.com
                </span>
                <span>
                  <FiPhone /> +1 234 567 890
                </span>
              </p>
              <h6>Software Developer</h6>
            </div>
          </div>
        </div>
        <div className="stats_cards_main">
          {/* <StatsCard />
          <StatsCard />
          <StatsCard /> */}
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h2 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h2>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h2 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h2>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
          <div className={classes.stats_card_wrapper}>
            <div className={classes.stats_card_info}>
              <p className={classes.card_title}>Total Shadows</p>
              <h2 className={classes.card_value}>
                150 <span className={classes.card_value_unit}>Requests</span>
              </h2>
            </div>
            <div className={classes.card_logo}>
              <img src={statsIcon} alt="logo" />
            </div>
          </div>
        </div>
        <TableStructure
        headerTitle="Users"
        headerHandlers={{
            search: <SearchInput placeholder="Search Users"/>,
            dropdown: <DropDown menuPlacement="bottom"/>
        }}
          tableContent={data.map((item) => {
            return {
                ...item,
            }
          })}
          tableHeaders={[
            { label: "Shadow", value: "_id" },
            { label: "Name", value: "name" },
            { label: "Email", value: "email" },
            { label: "Shadow Duration", value: "duration" },
            { label: "Phone", value: "phone" },
          ]}
          page={page}
          setPage={(e) => {
            getData(e, search);
            setPage(e)}}
        />
      </SideBarSkeleton>
    </>
  );
}

export default UserManagement;
