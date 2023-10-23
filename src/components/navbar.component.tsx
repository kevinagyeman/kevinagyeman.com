import flagItaly from "@/assets/img/italy.png";
import flagUK from "@/assets/img/united-kingdom.png";
import { useTheme } from "@/components/ui/theme-provider";
import { auth } from "@/firebase";
import i18n from "@/i18n";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAdminLoggedDataState } from "../store/admin-store";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function Navbar() {
  const isAdminLoggedData = useRecoilValue<boolean>(isAdminLoggedDataState);

  const navigation = isAdminLoggedData
    ? [
        { name: "Home", href: "/" },
        { name: "Contacts", href: "/#contacts" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Edit Project", href: "/dashboard" },
        { name: "Add Project", href: "/dashboard/project-add" },
        { name: "Edit Information", href: "/dashboard/information-edit" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Contacts", href: "/#contacts" },
      ];

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 mb-5 border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:text-black   dark:text-white  dark:hover:text-white ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <ThemeChanger />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Button asChild variant={"ghost"} key={item.name}>
                        <a href={item.href}>{item.name}</a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block">
                  <ThemeChanger />
                </div>
                <LanguageSelector />
                <IconAdmin />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    "text-light hover:text-light block rounded-md px-3 py-2 text-base font-medium hover:bg-zinc-800"
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={changeTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

const IconAdmin = () => {
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
        {isAdminLoggedData ? (
          <img className="h-8 w-8 rounded-full" src={profileImage} alt="profile" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-900"></div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {isAdminLoggedData ? (
            <>
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => (window.location.href = "/login")} className="cursor-pointer">
                Login
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSelector = () => {
  const detectLanguage = (): string => {
    if (i18n.language === "it" || i18n.language === "it-IT") {
      return "it-IT";
    } else {
      return "en-GB";
    }
  };

  const [language, setLanguage] = useState<string>(detectLanguage());

  const selectLanguage = (e: string) => {
    const valueSelected = e.valueOf();
    i18n.changeLanguage(valueSelected);
    setLanguage(valueSelected);
  };

  return (
    <Select
      onValueChange={(e) => {
        selectLanguage(e);
      }}
      value={language}
    >
      <SelectTrigger className="w-[65px] border-none bg-transparent">
        <SelectValue placeholder="Select a a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="it-IT">
            <img src={flagItaly} className="h-4 w-4" />
          </SelectItem>
          <SelectItem value="en-GB">
            <img src={flagUK} className="h-4 w-4" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const Logo = () => {
  const { theme } = useTheme();

  return (
    <svg
      id="Livello_1"
      className="h-8 w-auto"
      fill={theme === "dark" ? "white" : "black"}
      data-name="Livello 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 1080"
    >
      <title>logo-k</title>
      <path d="M1044.35,1079.5H781.48a35.12,35.12,0,0,1-24.86-10.3L540,852.58,323.38,1069.2a35.12,35.12,0,0,1-24.86,10.3H35.65a35.15,35.15,0,0,1-24.85-60L959.48,70.8H793.75L298.93,565.63a35.15,35.15,0,0,1-60-24.86V35.65A35.15,35.15,0,0,1,274.07.5H466.64a35.15,35.15,0,0,1,35.15,35.15V263.34L754.1,11A35.81,35.81,0,0,1,779.19.5h265.16a35.15,35.15,0,0,1,24.85,60L120.52,1009.2H284L645.5,647.66a35.14,35.14,0,0,1,49.35-.35l76.74,74.57.36.35,297.25,297.26a35.15,35.15,0,0,1-24.85,60ZM796,1009.2H959.48L722.41,772.12l-51.7-50.25-81,81ZM309.22,70.8V455.91L431.49,333.64V70.8Z" />
      <path d="M1043.9,781.93a35.58,35.58,0,0,1-25.19-10.43L812.39,565.18a35.61,35.61,0,0,1,0-50.35L834,493.23h0L1018.71,308.5a35.61,35.61,0,0,1,60.79,25.18V746.32a35.6,35.6,0,0,1-35.6,35.61ZM887.93,540l120.35,120.36V419.64Z" />
    </svg>
  );
};
