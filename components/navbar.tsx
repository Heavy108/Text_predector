"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { HiLightBulb } from "react-icons/hi";

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
export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const handleSwitchChange = (settingName: string, currentValue: boolean) => {
    switch (settingName) {
      
      case "notifications":
        setNotifications(!currentValue);
        break;
      case "locationAccess":
        setLocationAccess(!currentValue);
        break;
    }
  };

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
              <p className="font-bold text-inherit">Text Predictor</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full  gap-8"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <FaInfoCircle className="text-[22px]" onClick={onOpen} />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          className="sm:hidden basis-1 pl-4 flex items-center gap-4"
          justify="end"
        >
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
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
            <DropdownMenu
              aria-label="Settings"
              
              closeOnSelect={false}
            >
              <DropdownItem key="darkMode">
                
                <ThemeSwitch/>
              </DropdownItem>

              <DropdownItem key="notifications">
                <Switch
                  isSelected={notifications}
                  onValueChange={() =>
                    handleSwitchChange("notifications", notifications)
                  }
                  size="lg"
                  color="secondary"
                  thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                      <HiLightBulb className={className} />
                    ) : (
                      <TbBulbOff className={className}/>
                    )
                  }
                >
                  Multi-Suggestions
                </Switch>
              </DropdownItem>

              <DropdownItem key="location">
                <Switch
                  isSelected={locationAccess}
                  onValueChange={() =>
                    handleSwitchChange("locationAccess", locationAccess)
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
              <ModalHeader className="flex flex-col gap-1">Project</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center text-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Dr. Shobhanjana Kalita
                  </h3>
                  <h4 className="text-lg text-gray-500">
                    Designation: Assistant Professor
                  </h4>
                </div>

                {/* Side by side layout for the other two names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <h4 className="text-lg font-semibold">Satyam Sajal</h4>
                    <p className="text-gray-500">Designation: Student</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <h4 className="text-lg font-semibold">
                      Aniruddha Mukherjee
                    </h4>
                    <p className="text-gray-500">Designation: Student</p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
