import { styled } from "@mui/material/styles";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import BackgroundAIHeader from "./BackgroundAIHeader";
import BackgroundAIContent from "./BackgroundAIContent";

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

function BackgroundAIPage(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Root
      header={<BackgroundAIHeader />}
      content={<BackgroundAIContent />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default BackgroundAIPage;
