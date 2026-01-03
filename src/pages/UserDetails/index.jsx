import React from "react";
import classes from "./userManagement.module.css";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import statsIcon from "@/assets/images/statsCardLogo.png";
import userImage from "@/assets/images/userImage.png";
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import TableStructure from "@/components/Core/TableStructure";
import SearchInput from "@/components/Core/SearchInput";
import { DropDown } from "@/components/Core/DropDown";
import Statuses from "@/components/Core/Statuses";
import { userDetailsData } from "@/data/data";
import { userManagementData } from "@/data/data";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserDetail() {

  const location = useLocation();
  let pathName = location.pathname;
  
  const getPageTitle = (path) => {
    const segment = path.split('/').pop() || '';
    const withSpaces = segment
      .replace(/[-_]+/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .trim();
    return withSpaces
      .split(' ')
      .filter(Boolean)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  };

  const title = getPageTitle(pathName);

  const currentUser = userManagementData.find(user => user._id === Number(title));
  
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const getData = async (page, search, filter) => {
    console.log(page, search, filter);
    //fetch data from api
  };

  return (
    <>
      <SideBarSkeleton search={search} setSearch={setSearch}>
        <div className={classes.user_details_card}>
          <div className={classes.user_card_info_wrapper}>
            <div className={classes.user_card_picture}>
              <img src={userImage} alt="user_picture" />
            </div>
            <div className={classes.user_card_info}>
              <h5 className={classes.user_name}>{currentUser ? currentUser.studentName : 'John Doe'}</h5>
              <p className={classes.user_contact_info}>
                <span>
                  <MdMailOutline /> {currentUser ? currentUser.email : 'john.doe@example.com'}
                </span>
                <span>
                  <FiPhone /> {currentUser ? currentUser.phone : '+1 234 567 890'}
                </span>
              </p>
              <h6>Software Developer</h6>
            </div>
          </div>
        </div>
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
      </SideBarSkeleton>
    </>
  );
}

export default UserDetail;
