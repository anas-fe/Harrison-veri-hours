// import StatsCard from '@/components/StatsCard'

import { userManagementData } from "@/data/data";
import React from "react";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import TableStructure from "@/components/Core/TableStructure";
import SearchInput from "@/components/Core/SearchInput";
import { DropDown } from "@/components/Core/DropDown";
import Statuses from "@/components/Core/Statuses";
import PopperComponent from "@/components/Core/PopperComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Core/Button";
import { TiPlus } from "react-icons/ti";


function UserManagement() {

    const navigate = useNavigate();


  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const getData = async (page, search, filter) => {
    console.log(page, search, filter);
    //fetch data from api
  };

  return (
    <>
      <SideBarSkeleton search={search} setSearch={setSearch}>
        <div className="table_wrapper">
          <TableStructure
            headerTitle={<SearchInput placeholder="Search Users" />}
            headerHandlers={{
              dropdown: <DropDown menuPlacement="bottom" placeholder="Status" />,
              button: <Button data-variant='primary' label='New User' leftIcon={<TiPlus />} data-type="rounded" />
            }}
            tableContent={userManagementData.map((item) => {
              return {
                ...item,
                status: <Statuses status={item?.status} />,
                action: <PopperComponent handleClick={(e) => 
                        navigate('/user-details/' + item._id)
                    } data={[
                        {
                        label: 'View Details',
                        value: 'view Details'
                        }
                    ]} />
              };
            })}
            tableHeaders={[
              { label: "Student Name", value: "studentName" },
              { label: "Email", value: "email" },
              { label: "Phone", value: "phone" },
              { label: "Date Joined", value: "dateJoined" },
              { label: "Status", value: "status" },
              { label: "", value: "action" },
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

export default UserManagement;
