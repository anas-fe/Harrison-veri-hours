// import StatsCard from '@/components/StatsCard'
import React from 'react'
import classes from './userManagement.module.css'
import SideBarSkeleton from '@/components/Core/SideBarSkeleton'
import statsIcon from '@/assets/images/statsCardLogo.png'
import userImage from '@/assets/images/userImage.png'

function UserManagement() {

    const [search, setSearch] = React.useState("");

  return (
    <>

    <SideBarSkeleton search={search} setSearch={setSearch}>
        <div className={classes.user_details_card}>
            <div className={classes.user_card_info_wrapper}>
                <div className={classes.user_card_picture}>
                    <img src={userImage} alt="user_picture" />
                </div>
                <div className={classes.user_card_info}>
                    <h1 className={classes.user_name}>John Doe</h1>
                    <p className={classes.user_email}>
                        john.doe@example.com
                    </p>
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
                    <h2 className={classes.card_value}>150 <span className={classes.card_value_unit}>Requests</span></h2>
                </div>
                <div className={classes.card_logo}>
                    <img src={statsIcon} alt="logo" />
                </div>
            </div>
            <div className={classes.stats_card_wrapper}>
                <div className={classes.stats_card_info}>
                    <p className={classes.card_title}>Total Shadows</p>
                    <h2 className={classes.card_value}>150 <span className={classes.card_value_unit}>Requests</span></h2>
                </div>
                <div className={classes.card_logo}>
                    <img src={statsIcon} alt="logo" />
                </div>
            </div>
            <div className={classes.stats_card_wrapper}>
                <div className={classes.stats_card_info}>
                    <p className={classes.card_title}>Total Shadows</p>
                    <h2 className={classes.card_value}>150 <span className={classes.card_value_unit}>Requests</span></h2>
                </div>
                <div className={classes.card_logo}>
                    <img src={statsIcon} alt="logo" />
                </div>
            </div>
        </div>
    </SideBarSkeleton>
    </>
  )
}

export default UserManagement
