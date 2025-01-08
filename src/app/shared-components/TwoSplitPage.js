import * as PropTypes from "prop-types";
import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { Card } from "@mui/material";
import FuseScrollbars from "@fuse/core/FuseScrollbars/FuseScrollbars";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: 0,
  width: "100%",
  backgroundColor: theme.palette.background.default,

  "& .TwoSplitPage-content": {
    display: "flex",
    flexDirection: "row",
    "&": {
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    minHeight: 0,
    position: "relative",
    whiteSpace: "nowrap",
    transition: ".2s transform cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "& .TwoSplitPage-contentWrapper": {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    maxWidth: "100%",
    minWidth: 0,
    minHeight: 0,
  },

  "& .TwoSplitPage-sideMenu": {
    display: "inline-flex",
    position: "relative",
    height: "100%",
    whiteSpace: "initial",
    "&:not(:last-child)": {
      [theme.breakpoints.up("sm")]: {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
    transition: ".2s width cubic-bezier(0.4, 0, 0.2, 1)",
  },

  "& .TwoSplitPage-sidebarHeader": {
    minHeight: "64px",
    color: theme.palette.primary.contrastText,
    boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
  },

  "& .TwoSplitPage-sidebarContent": {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    overflow: "auto",
    zIndex: 9999,
  },

  "& .TwoSplitPage-detailHeader": {
    minHeight: "64px",
    color: theme.palette.primary.contrastText,
    boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
  },

  "& .TwoSplitPage-detailContent": {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    overflow: "auto",
    zIndex: 9999,
  },
}));

const TwoSplitPage = forwardRef((props, ref) => {
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    transform: (val) => {
      rootRef.current.style.transform = `translateX(${val})`;
    },
  }));

  return (
    <Root className={clsx("TwoSplitPage-root", props.className)}>
      <Card className="flex w-full rounded-none shadow-none md:rounded-8 md:shadow">
        <div className="TwoSplitPage-content w-full" ref={rootRef}>
          <div className="TwoSplitPage-sideMenu w-full sm:w-1/3">
            <div className="TwoSplitPage-contentWrapper">
              {props.sidebarHeader && (
                <div className="TwoSplitPage-sidebarHeader">
                  {props.sidebarHeader}
                </div>
              )}
              <FuseScrollbars className="TwosplitPage-sidebarContent">
                {props.sidebarContent}
              </FuseScrollbars>
            </div>
          </div>
          <div className="TwoSplitPage-sideMenu w-full sm:w-2/3">
            <div className="flex flex-col w-full">
              {props.detailHeader && (
                <div className="TwoSplitPage-detailHeader">
                  {props.detailHeader}
                </div>
              )}
              <FuseScrollbars className="TwoSplitPage-detailContent">
                {props.detailContent}
              </FuseScrollbars>
            </div>
          </div>
        </div>
      </Card>
    </Root>
  );
});

TwoSplitPage.propTypes = {
  sidebarHeader: PropTypes.node,
  sidebarContent: PropTypes.node,
  detailHeader: PropTypes.node,
  detailContent: PropTypes.node,
};

TwoSplitPage.defaultProps = {};

export default memo(styled(TwoSplitPage)``);
