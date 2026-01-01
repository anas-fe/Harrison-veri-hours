"use client";
import { useEffect, useRef, useState } from "react";
import classes from "./Carousel.module.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Container } from "react-bootstrap";
import { Button } from "../Button";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { cn } from "@/helper/HelperFunction";

export default function Carousel({
  slides,
  title,
  description,
  header,
  slidesPerView,
  spaceBetween = 20,
  showNavigation = false,
  showPagination = false,
  navigationColor,
  speed,
  autoplay,
  loop,
  centeredSlides,
  textColor,
  swiperMaxWidth,
  breakpoints,
  navigationOnRight = false,
  navigationOnLeft = false,
  isCustomNavigation = false,
  btnPrevClass,
  btnNextClass,
  customNavigationStyle,
  customNavigationContainerStyle,
  customStyle,
  customPagination,
  btnDisableClass,
  wrapperClass,
  swiperClassName,
  autoHeight,
}) {
  const swiperRef = useRef();
  const [swipperStatus, setSwipperStatus] = useState({
    isBeginning: false,
    isEnd: false,
  });
  const handleSlideChange = (swiper) => {
    setSwipperStatus({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  return (
    <>
      {(title || description) && (
        <div className={classes.headings} style={{ "--text-color": textColor }}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}

      {header && header}
      <div
        className={`${classes.carouselWrapper} ${
          swiperMaxWidth ? classes.maxWidthEnable : ""
        }`}
        style={{ "--max-width": swiperMaxWidth }}
      >
        {isCustomNavigation && (
          <div
            className={`${btnPrevClass && btnPrevClass} ${
              classes._buttonsDiv
            } ${classes._btnPrev} ${
              swipperStatus.isBeginning
                ? [
                    classes.btn_disabled,
                    btnDisableClass && btnDisableClass,
                  ].join(" ")
                : ""
            }`}
            style={customNavigationContainerStyle}
          >
            <Button
              className={classes.btnRef}
              onClick={() => swiperRef?.current?.slidePrev()}
              customStyle={customNavigationStyle}
            >
              <MdOutlineChevronLeft />
            </Button>
          </div>
        )}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setSwipperStatus({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
          navigation={showNavigation}
          speed={speed && speed}
          autoplay={autoplay && autoplay}
          loop={loop && loop}
          autoHeight={autoHeight && autoHeight}
          modules={[Navigation, Pagination, Autoplay]}
          centeredSlides={centeredSlides && centeredSlides}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  renderBullet: customPagination && customPagination,
                  dynamicBullets: true,
                }
              : false
          }
          wrapperClass={wrapperClass}
          className={cn(
            classes.carouselSwiper,
            showPagination && classes.hasPagination,
            showNavigation && classes.hasNavigation,
            navigationOnRight && classes.navigationOnRight,
            navigationOnLeft && classes.navigationOnLeft,
            swiperClassName && swiperClassName
          )}
          slidesPerView={slidesPerView}
          onSlideChange={handleSlideChange}
          style={{
            "--btn-color": navigationColor,
            "--disabled-btn-color": navigationColor ? "transparent" : "#C4C4C4",
            ...(navigationColor && {
              "--border": "1px solid var(--white-color)",
            }),
            ...customStyle,
          }}
          {...(breakpoints !== null && {
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: spaceBetween,
              },
              ...breakpoints,
            },
          })}
        >
          {slides?.length !== 0 &&
            Array.isArray(slides) &&
            slides?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "170px", marginRight: "40px" }}
              >
                {item}
              </SwiperSlide>
            ))}
        </Swiper>
        {isCustomNavigation && (
          <div
            className={`${btnNextClass && btnNextClass} ${
              classes._buttonsDiv
            } ${classes._btnNext} ${
              swipperStatus.isEnd
                ? [
                    classes.btn_disabled,
                    btnDisableClass && btnDisableClass,
                  ].join(" ")
                : ""
            }`}
            style={customNavigationContainerStyle}
          >
            <Button
              className={classes.btnRef}
              onClick={() => swiperRef?.current?.slideNext()}
              customStyle={customNavigationStyle}
            >
              <MdOutlineChevronRight />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
