"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { HiLightBulb } from "react-icons/hi";
import { motion } from "motion/react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, Logo, SunIcon, MoonIcon } from "@/components/icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { useSettingsStore } from "@/store/useSettingsStore";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { TbBulbOff } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { Switch } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "next-themes";
import { minaAssameseSerif } from "@/config/fonts";
// import CuboidFlip from "./cubeani";
export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [notifications, setNotifications] = useState(true);
  const {romanization, toggleRomanization} = useSettingsStore();
  const { notifications, toggleNotifications } = useSettingsStore();

  // const handleSwitchChange = (settingName: string, currentValue: boolean) => {
  //   switch (settingName) {
  //     case "notifications":
  //       // setNotifications(!currentValue);
  //       break;
  //     case "locationAccess":
  //       toggleRomanization(!currentValue);
  //       break;
  //   }
  // };

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <div className="font-bold text-inherit text-2xl pt-1 ">
                <p className={minaAssameseSerif.className}>লিপিকা</p>
              </div>
             
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full  gap-8"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              color="foreground"
              isExternal
              aria-label="Github"
              href={siteConfig.links.github}
            >
              <GithubIcon />
            </Link>
            <FaInfoCircle className="text-[22px]" onClick={onOpen} />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          className="sm:hidden basis-1 pl-4 flex items-center gap-4"
          justify="end"
        >
          <Link
            color="foreground"
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
          >
            <GithubIcon />
          </Link>

          {/* Dropdown with Settings Icon */}
          <Dropdown>
            <DropdownTrigger>
              <button
                aria-label="Settings"
                className="focus:outline-none focus:ring-0"
              >
                <IoSettings className="text-[22px] cursor-pointer" />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Settings" closeOnSelect={false}>
              <DropdownItem textValue="dark mode" key="darkMode">
                <ThemeSwitch />
              </DropdownItem>

              <DropdownItem textValue="suggestions" key="notifications">
                <Switch
                  isSelected={notifications}
                  onValueChange={toggleNotifications}
                  size="lg"
                  color="secondary"
                  thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                      <HiLightBulb className={className} />
                    ) : (
                      <TbBulbOff className={className} />
                    )
                  }
                >
                  Multi-Suggestions
                </Switch>
              </DropdownItem>

              <DropdownItem textValue="riya somani" key="location">
                <Switch
                  isSelected={romanization}
                  onValueChange={toggleRomanization
                  }
                  size="lg"
                  color="success"
                  thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                      <SunIcon className={className} />
                    ) : (
                      <MoonIcon className={className} />
                    )
                  }
                >
                  Romanization
                </Switch>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <FaInfoCircle className="text-[22px]" onClick={onOpen} />
        </NavbarContent>
      </NextUINavbar>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Members</ModalHeader>
              <ModalBody>
                <h4 className="text-lg text-gray-500">Project Guide</h4>
                <h3 className="text-xl font-semibold">
                  Dr. Shobhanjana Kalita
                </h3>
                <Divider />
                <h4 className="text-lg text-gray-500">Developers</h4>
                <div className="flex justify-between">
                  <h3 className="text-lg">Satyam Sajal</h3>
                  <h3 className="text-lg">সত্যম সজল</h3>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-lg">Aniruddha Mukherjee</h3>
                  <h3 className="text-lg">অনিৰুদ্ধ মুখাৰ্জী</h3>
                </div>
                <br></br>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
