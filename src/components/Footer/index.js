"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import styles from "./footer.module.css";
import { Container } from "react-bootstrap";
import SubscribeForm from "@/components/SubscribeForm";
import { useSelector } from "react-redux";

export default function Footer() {
  const { footerData } = useSelector((state) => state.commonReducer);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Search", href: "/#search" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    // { name: "Pricing", href: "/pricing" },
    // { name: "How it works", href: "/how-it-works" },
    // { name: "Contact Us", href: "/contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__content}>
          <div className={styles.logoSection}>
            <Logo variant="footer" type="footer" />
          </div>

          <div className={styles.linksSection}>
            <p className={styles.link__title}>Pages</p>
            {quickLinks
              ?.slice(0, Math.floor(quickLinks?.length / 2))
              ?.map((item, index) => (
                <Link key={index} href={item?.href} className={styles.link}>
                  {item?.name}
                </Link>
              ))}
          </div>
          <div className={styles.linksSection}>
            <p className={styles.link__title}>More Pages</p>
            {quickLinks
              ?.slice(Math.floor(quickLinks?.length / 2), quickLinks?.length)
              ?.map((item, index) => (
                <Link key={index} href={item?.href} className={styles.link}>
                  {item?.name}
                </Link>
              ))}
          </div>
          <div className={styles.subscribeSection}>
            <SubscribeForm />
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.copyright}>
              <p>© {currentYear} All rights reserved by PostingNotes.</p>
            </div>
            <div className={styles.socialLinks}>
              {footerData?.socials?.map((social, index) => (
                <SocialIcon
                  key={index}
                  url={social}
                  style={{
                    height: 30,
                    width: 30,
                    margin: "0 8px",
                    cursor: "pointer",
                  }}
                  fgColor="var(--text-color-dark)"
                  bgColor="var(--text-color)"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
