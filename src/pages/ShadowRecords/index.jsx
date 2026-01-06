// import StatsCard from '@/components/StatsCard'
import React from "react";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import statsIcon from "@/assets/images/statsCardLogo.png";
import userImage from "@/assets/images/userImage.png";
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import TableStructure from "@/components/Core/TableStructure";
import SearchInput from "@/components/Core/SearchInput";
import { DropDown } from "@/components/Core/DropDown";
import Statuses from '@/components/Core/Statuses';
import { shadowRecordsData } from "@/data/data";
import PopperComponent from "@/components/Core/PopperComponent";
import { useNavigate } from "react-router-dom";

function ShadowRecords() {

    const navigate = useNavigate();

    const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const getData = async (page, search, filter) => {
    console.log(page, search, filter);
    //fetch data from api
  }

  return (
    <>
      <SideBarSkeleton search={search} setSearch={setSearch}>
        <div className="table_wrapper">
            <TableStructure headerTitle=""   
            headerHandlers={{
                search: <SearchInput placeholder="Search here..."/>,
                dropdown: <DropDown menuPlacement="bottom" placeholder="Status"/>
            }}
            tableContent={shadowRecordsData.map(item => {
                return {
                    ...item,
                    status: <Statuses status={item.status} />,
                    action: <PopperComponent handleClick={(e) => 
                        navigate('user-details/' + item.id)
                    } data={[
                        {
                        label: 'View Details',
                        value: 'view Details'
                        }
                    ]} />
                }
            })}   
            tableHeaders={[
                { label: "Student Name", value: "studentName" },
                { label: "Profession", value: "profession" },
                { label: "Manager Name", value: "managerName" },
                { label: "Manager Email", value: "managerEmail" },
                { label: "Start Date", value: "startDate" },
                { label: "End Date", value: "endDate" },
                { label: "Category", value: "category" },
                { label: "Status", value: "status", dataStyle: { whiteSpace: 'nowrap' } },
                { label: "Action", value: "action" },

            ]}
            page={page}
            setPage={(e) => {
                getData(e, search);
                setPage(e)}}
            />
        </div>
      </SideBarSkeleton>
    </>
  );
}

export default ShadowRecords;
