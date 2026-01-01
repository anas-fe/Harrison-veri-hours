import { cn } from "@/helper/HelperFunction";
import classes from "./TabsComponent.module.css";

function TabsComponent({
  data,
  value,
  onClick,
  containerClass,
  variant = "secondary",
  size = "lg",
}) {
  return (
    <div
      className={cn(classes._tabsHeading, containerClass && containerClass)}
      data-variant={variant}
    >
      {data?.map((ele, index) => (
        <div
          key={index}
          className={cn(
            classes._initialTab,
            value?.value === ele?.value && classes._active,
            classes[size]
          )}
          onClick={() => onClick(ele)}
          data-variant={variant}
        >
          <p className={classes.tabText}>{ele?.label}</p>
        </div>
      ))}
    </div>
  );
}

export default TabsComponent;
