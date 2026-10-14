import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSelector";

export function useAuth() {
  const { email, password, token, avatarUrl, id } = useSelector(selectUser);

  return {
    isAuth: !!token,
    email,
    password,
    token,
    avatarUrl,
    id,
  };
}
