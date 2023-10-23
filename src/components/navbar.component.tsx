import flagItaly from "@/assets/img/italy.png";
import logoBlack from "@/assets/img/logo-dark.svg";
import logoWhite from "@/assets/img/logo-light.svg";
import flagUK from "@/assets/img/united-kingdom.png";
import { useTheme } from "@/components/ui/theme-provider";
import { auth } from "@/firebase";
import i18n from "@/i18n";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Moon, Sun } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

  const [logoSrc, setLogoSrc] = useState<string>();

  useEffect(() => {
    window.document.documentElement.classList.contains("dark") ? setLogoSrc(logoWhite) : setLogoSrc(logoBlack);
  }, []);
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
                <ThemeChanger logoSetter={setLogoSrc} />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logoSrc} alt="Logo" />
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
                  <ThemeChanger logoSetter={setLogoSrc} />
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

type ThemeChangerProps = {
  logoSetter: Dispatch<SetStateAction<string | undefined>>;
};

const ThemeChanger = ({ logoSetter }: ThemeChangerProps) => {
  const { setTheme } = useTheme();

  const changeTheme = () => {
    if (window.document.documentElement.classList.contains("dark")) {
      setTheme("light");
      logoSetter(logoBlack);
    } else {
      setTheme("dark");
      logoSetter(logoWhite);
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
  const [language, setLanguage] = useState<string>(i18n.language);

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
          <SelectItem value="it">
            <img src={flagItaly} className="h-4 w-4" />
          </SelectItem>
          <SelectItem value="en">
            <img src={flagUK} className="h-4 w-4" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
