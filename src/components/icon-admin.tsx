import { auth } from "@/firebase";
import { isAdminLoggedDataState } from "@/store/admin-store";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function IconAdmin() {
  const navigate = useNavigate();
  const [isAdminLoggedData, setIsAdminLoggedData] = useRecoilState<boolean>(isAdminLoggedDataState);

  const profileImage =
    "https://media.licdn.com/dms/image/C4D03AQEavaj22cXyTg/profile-displayphoto-shrink_800_800/0/1537222123446?e=1701907200&v=beta&t=ob0K8RV-VoP54eBQ2px4EQdFruhSNLHNTB6Phbh0qdU";

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("admin");
      setIsAdminLoggedData(false);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img className="h-8 w-8 rounded-full" src={profileImage} alt="profile" />
      </DropdownMenuTrigger>
      {isAdminLoggedData && (
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
