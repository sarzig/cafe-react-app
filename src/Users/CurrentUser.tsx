import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useEffect } from "react";
export default function CurrentUser({ children }: { children: any }) {
  const dispatch = useDispatch();
  const guest = {_id: "guest", firstName: "Coffee", lastName: "Guest", password: "",
    userRole: "guest", history: []};
  const fetchCurrentUser = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (error) {
      dispatch(setCurrentUser(guest));
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return children;
}