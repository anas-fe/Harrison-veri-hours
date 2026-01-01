"use client";
import { useMediaQuery } from "@/customHooks/useMediaQuery";
import { cn } from "@/helper/HelperFunction";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import classes from "./PopperComponent.module.css";

const PopperComponent = ({
  anchorRef,
  data,
  popperInsideElement,
  handleClick,
  isCloseOnClick = true,
  sideOffset,
  side,
  align = "center",
  children = (
    <div className={classes.children_container}>
      <BsThreeDots />
    </div>
  ),
  arrow,
  boundary,
  asChild,
}) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover.Root modal={false} open={open} onOpenChange={setOpen}>
        <Popover.Trigger className={classes.popperTrigger} asChild={asChild}>
          {children}
        </Popover.Trigger>
        <Popover.Portal
          className={classes.popperPortal}
          container={anchorRef && anchorRef.current ? anchorRef.current : null}
        >
          <Popover.Content
            className={cn(
              classes.popperContent,
              popperInsideElement && classes.popperInsideElement
            )}
            side={isMobile ? "bottom" : side}
            align={align}
            sideOffset={sideOffset}
            sticky="partial"
            collisionBoundary={boundary ? boundary.current : []}
            hideWhenDetached
          >
            {data?.length > 0 && (
              <div className={classes.list}>
                {data?.map((item, i) => {
                  return (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(item);
                        isCloseOnClick && setOpen(false);
                      }}
                      className={classes.menuItem}
                      key={i}
                      style={{ color: item?.color }}
                    >
                      {item?.icon} {item?.label}
                    </span>
                  );
                })}
              </div>
            )}
            {popperInsideElement}
            {arrow && <Popover.Arrow className={classes.popperArrow} />}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default PopperComponent;
