import { Avatar } from "@mui/material";

function UserAvatar({ user, className }) {
  return user?.photo?.url ? (
    <Avatar
      className={className}
      src={user?.photo?.url}
      alt={user.displayName}
    />
  ) : (
    <Avatar className={className}>
      {(user.displayName[0] || "").toUpperCase()}
    </Avatar>
  );
}

export default UserAvatar;
