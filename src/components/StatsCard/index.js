import styles from './statsCard.module.css'
import statsIcon from '@/assets/images/statsCardLogo.png'

function StatsCard() {
  return (
    <div className={styles.stats_card_wrapper}>
        <div className={styles.stats_card_info}>
            <p className={styles.card_title}>Total Shadows</p>
            <h2 className={styles.card_value}>150 <span className={styles.card_value_unit}>Requests</span></h2>
        </div>
        <div className={styles.card_logo}>
            <img src={statsIcon} alt="logo" />
        </div>
    </div>
  )
}

export default StatsCard