'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiBell, PiCaretDown, PiGift, PiHeart, PiSignOut, PiTicket, PiUserCircle, PiWallet } from 'react-icons/pi'
import { useTranslation } from '@/hooks/useTranslation'
import LocalizeLink, { stripLocaleFromPath } from "../commonComponents/LocalizeLink"
import IconLabel from "../storyBook/atoms/IconLabel"
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { userDataSelector } from "@/redux/reducers/userSlice"
import { userDetailsType } from "@/types/GlobalTypes"
import ImagePreview from "../storyBook/atoms/ImagePreview"
import LogoutConfModal from "../modalsAndSheets/LogoutConfModal"
import { referralSettingsSelector } from "@/redux/reducers/settingsSlice"
import { getDirection } from "@/utils/helpers"

interface DropdownItem {
    href: string;
    labelKey: string;
    icon: React.ReactNode;
}

const ProfileDropdown = () => {

    const { t } = useTranslation();
    const pathname = usePathname();
    const pathWithoutLocale = stripLocaleFromPath(pathname);

    const userDetails = useSelector(userDataSelector) as userDetailsType;
    const userName = userDetails?.name;

    const direction = getDirection();
    const referralSettings = useSelector(referralSettingsSelector);

    const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const dropdownItems: DropdownItem[] = [
        { href: `/my-bookings`, labelKey: 'myBooking', icon: <PiTicket size={24} color='#000' /> },
        { href: `/my-profile`, labelKey: 'myProfile', icon: <PiUserCircle size={24} color='#000' /> },
        { href: `/transactions`, labelKey: 'transactions', icon: <PiWallet size={24} color='#000' /> },
        // { href: `/wishlist`, labelKey: 'wishlist', icon: <PiHeart size={24} color='#000' /> },
        ...(referralSettings?.enabled ? [{ href: `/referral-earn`, labelKey: 'refrEarn', icon: <PiGift size={24} color='#000' /> }] : []),
        { href: `/notifications`, labelKey: 'notifications', icon: <PiBell size={24} color='#000' /> },
    ];


    return (
        <>
            <DropdownMenu dir={direction} open={openMenu} onOpenChange={setOpenMenu}>
                <DropdownMenuTrigger                    
                    className="flexCenter gap-2 btn_md border-none shadow-none text-black">
                    {
                        userDetails?.profile ? (
                            <ImagePreview
                                src={userDetails?.profile}
                                alt='Profile'
                                size="xs"
                                rounded="full"
                                objectFit="cover"
                            />
                        ) : (
                            <span className="primaryBg text-white w-8 h-8 text-center flexCenter font-medium rounded-full">{userName.charAt(0).toUpperCase()}</span>
                        )
                    }
                    <PiCaretDown size={18} color='#000' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='!shadow-md !rounded-t-none rounded-2xl absolute top-6 ltr:-right-12 rtl:-left-6 border-t-0 p-0' onMouseLeave={() => setOpenMenu(false)}>
                    <DropdownMenuGroup className='py-2 bg-[#D1E3FA]'>
                        <DropdownMenuLabel className='font-semibold primaryColor'>{t('welcome')}!,  <span className="capitalize">{userName}</span></DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup className='p-2 flex flex-col'>
                        {dropdownItems.map((item) => (
                            <DropdownMenuItem key={item.href}>
                                <LocalizeLink href={item.href} className='w-full'>
                                    <IconLabel
                                        label={t(item.labelKey)}
                                        icon={item.icon}
                                        active={pathWithoutLocale === item.href}
                                        showHoverEffect={true}
                                    />
                                </LocalizeLink>
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator className="relative -left-4 w-[115%] p-0" />
                        <DropdownMenuItem className="p-2">
                            <button className='flexCenter justify-start gap-2 text-base errorBg text-white w-full p-3 rounded-[8px]' onClick={() => setOpenLogoutModal(true)}>
                                <PiSignOut size={24} color="white" className="rtl:rotate-180" />
                                <span>{t('logout')}</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <LogoutConfModal open={openLogoutModal} setOpen={setOpenLogoutModal} />
        </>
    )
}

export default ProfileDropdown
