import { styled } from "@mui/material/styles";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    backgroundColor: theme.palette.background.paper,
  },
  "& .container": {
    borderRadius: 0,

    "& .FusePageCarded-wrapper": {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

function DashboardPage(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Root
      header={<DashboardHeader />}
      content={<DashboardContent />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default DashboardPage;
