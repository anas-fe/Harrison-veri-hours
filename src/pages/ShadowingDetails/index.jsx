import Box from '@/components/Core/Box';
import SideBarSkeleton from '@/components/Core/SideBarSkeleton'
import React, { useState } from 'react'
import classes from './shadowingDeatils.module.css'
import userImage from '@/assets/images/userImage.png'
import { userManagementData } from '@/data/data';
import { FiPhone } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';

function ShadowingDetails() {

    const [search, setSearch] = React.useState("");
    // const [CurrentUser, setCurrentUser] = useState(null)



    // setCurrentUser(userManagementData.find(user => user._id === Number(title)))


  return (
    <>
      <SideBarSkeleton search={search} setSearch={setSearch}>
        <Box>
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
        </Box>
      </SideBarSkeleton>
    </>
  )
}

export default ShadowingDetails