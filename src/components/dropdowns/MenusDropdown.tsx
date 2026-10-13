'use client'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiInfo, PiList, PiPhone, PiQuestion } from 'react-icons/pi'
import { useTranslation } from '@/hooks/useTranslation'
import LocalizeLink from '@/components/commonComponents/LocalizeLink'
import { useState } from "react"
import { getDirection } from "@/utils/helpers"

const MenusDropdown = () => {

    const { t } = useTranslation();
    const direction = getDirection();

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <div>
            <DropdownMenu dir={direction} open={openMenu} onOpenChange={setOpenMenu}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='border-black rounded-full text-black'>
                        <PiList size={24} color='#000' />
                        <span>{t('more')}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='shadow-md! rounded-t-none! rounded-2xl absolute top-7.75 -right-12 border-t-0' onMouseLeave={()=>setOpenMenu(false)}>
                    <DropdownMenuGroup className='py-2'>
                        <DropdownMenuLabel className='font-semibold'>{t('support')}</DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className='p-4 flex flex-col'>
                        <DropdownMenuItem className="hover:primaryLightBg transition-all duration-300 p-3 group">
                            <LocalizeLink href={`/help-support`} className='flexCenter gap-2 text-base text-black group-hover:primaryColor! transition-all duration-300'>
                                <PiQuestion size={24} className="text-black group-hover:primaryColor!" />
                                <span>{t('helpSupport')}</span>
                            </LocalizeLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:primaryLightBg transition-all duration-300 p-3 group">
                            <LocalizeLink href={`/about-us`} className='flexCenter gap-2 text-base text-black group-hover:primaryColor! transition-all duration-300'>
                                <PiInfo size={24} className="text-black group-hover:primaryColor!" />
                                <span>{t('aboutUs')}</span>
                            </LocalizeLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:primaryLightBg transition-all duration-300 p-3 group">
                            <LocalizeLink href={`/contact-us`} className='flexCenter gap-2 text-base text-black group-hover:primaryColor! transition-all duration-300'>
                                <PiPhone size={24} className="text-black group-hover:primaryColor!" />
                                <span>{t('contactUs')}</span>
                            </LocalizeLink>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenusDropdown
