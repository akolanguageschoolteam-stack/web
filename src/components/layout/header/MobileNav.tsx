'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PiCaretRight, PiList } from 'react-icons/pi'
import { NavLinksType } from '@/types/GlobalTypes'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ImagePreview from "@/components/storyBook/atoms/ImagePreview"
import { settingsSelector } from "@/redux/reducers/settingsSlice"
import { setIsFromSearch } from "@/redux/reducers/helpersReducer"
import LocalizeLink from '@/components/commonComponents/LocalizeLink'

const MobileNav = ({ navLinks }: { navLinks: NavLinksType[] }) => {

    const settingsData = useSelector(settingsSelector);
    const logo = settingsData?.branding?.logo
    const dispatch = useDispatch();

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // navLinks here are always the public single-hotel nav — no auth required,
    // just reset the search-origin flag when leaving the listing pages.
    const handlePropertyRoomLink = (link: string) => {
        if (link === `/rooms` || link.endsWith('/properties')) {
            dispatch(setIsFromSearch(false));
        }
    }
    return (
        isClient &&
        <div>
            <Sheet>
                <SheetTrigger className='border-black rounded-full text-black border p-1'>
                    <PiList size={24} color='#000' />
                </SheetTrigger>
                <SheetContent className="px-6">
                    <SheetHeader>
                        <SheetTitle className="hidden"></SheetTitle>
                        <div>
                            <LocalizeLink href={`/`} title='WRTeam Logo'>
                                <div className='w-auto! h-[56px]!'>
                                    <ImagePreview src={logo} alt='WRTeam Logo' className='w-auto!' containerClassName="items-start! justify-start!" />
                                </div>
                            </LocalizeLink>
                        </div>
                    </SheetHeader>
                    <nav className='flex flex-col gap-6'>
                        {navLinks.map((item) => (
                            <SheetClose asChild key={item.id}>
                                <LocalizeLink href={item.link} onClick={() => handlePropertyRoomLink(item.link)} className='border rounded-xl p-3 flex items-center justify-between gap-3 textPrimaryColor' activeClassName='primaryLightBg primaryLightBorderColor'>
                                    <span className="flex items-center gap-2">
                                        <span className="text-xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </span>
                                    <span className="text-xl"><PiCaretRight /></span>
                                </LocalizeLink>
                            </SheetClose>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav
