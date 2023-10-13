import { useTheme } from "@/components/ui/theme-provider";
import { AuthContext } from "@/context/auth-context";
import { auth } from "@/firebase";
import i18n from "@/i18n";
import { Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Navbar = () => {
  const { setTheme } = useTheme();
  const [language, setLanguage] = useState<string>(i18n.language);
  const admin = useContext(AuthContext);
  const navigate = useNavigate();
  const rootClassList = window.document.documentElement.classList;
  const [logoSrc, setLogoSrc] = useState<string>(
    "src/assets/img/logo-light.svg",
  );

  const selectLanguage = (e: string) => {
    const valueSelected = e.valueOf();
    i18n.changeLanguage(valueSelected);
    setLanguage(valueSelected);
  };

  const changeTheme = () => {
    if (rootClassList.contains("dark")) {
      setTheme("light");
      setLogoSrc("src/assets/img/logo-dark.svg");
    } else {
      setTheme("dark");
      setLogoSrc("src/assets/img/logo-light.svg");
    }
  };

  const signOut = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div className=" sticky top-0 z-50 mb-5 flex items-center justify-between border-b py-5 dark:bg-zinc-950 lg:max-w-[500px]">
        <a href="/">
          <img className="h-8 w-auto" src={logoSrc} alt="Logo" />
        </a>
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={changeTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Select
            onValueChange={(e) => {
              selectLanguage(e);
            }}
            value={language}
          >
            <SelectTrigger className="ml-2 w-[65px]">
              <SelectValue placeholder="Select a a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="it">
                  <img src="src/assets/img/italy.png" className="h-4 w-4" />
                </SelectItem>
                <SelectItem value="en">
                  <img
                    src="src/assets/img/united-kingdom.png"
                    className="h-4 w-4"
                  />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                className="ml-2 h-8 w-8 rounded-full"
                src="https://media.licdn.com/dms/image/C4D03AQEavaj22cXyTg/profile-displayphoto-shrink_800_800/0/1537222123446?e=1701907200&v=beta&t=ob0K8RV-VoP54eBQ2px4EQdFruhSNLHNTB6Phbh0qdU"
                alt=""
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {admin ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => (window.location.href = "/dashboard")}
                    >
                      <a href="#">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <a href="#">Logout</a>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => (window.location.href = "/login")}
                    >
                      <a href="#">Login</a>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
