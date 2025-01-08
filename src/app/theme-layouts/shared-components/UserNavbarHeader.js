import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";

const Root = styled("div")(({ theme }) => ({
  "& .username, & .email": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  "& .avatar": {
    background: theme.palette.background.default,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    "& > img": {
      borderRadius: "50%",
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(selectUser);

  return (
    <Root className="user relative flex flex-col items-center justify-center p-8 pb-24 shadow-0">
      <h1 className="text-[36px] font-bold uppercase text-[#e62335] leading-[47px] tracking-wide">
        DARLING AI
      </h1>
    </Root>
  );
}

export default UserNavbarHeader;
