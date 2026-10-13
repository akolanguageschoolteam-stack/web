'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { ComponentProps } from 'react'
import { currentLangCodeSelector } from '@/redux/reducers/languageSlice'
import { languagesSelector } from '@/redux/reducers/settingsSlice'

const LOCALE_RE = /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)/

// Strips a leading /xx locale segment from a pathname, if present.
export function stripLocaleFromPath(pathname: string): string {
    const match = pathname.match(LOCALE_RE)
    if (!match) return pathname || '/'
    return pathname.slice(match[0].length) || '/'
}

interface LocalizeLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
    href: string
    activeClassName?: string
}

// Drop-in <Link> replacement for internal (locale-less) app paths, e.g. href="/properties".
// - Prefixes the href with the current language code, unless it's the default locale
//   (default locale is hidden from the URL — see middleware.ts).
// - Compares against the locale-stripped current pathname so `activeClassName` keeps
//   working no matter which locale is active.
const LocalizeLink = ({ href, className, activeClassName, ...rest }: LocalizeLinkProps) => {
    const pathname = usePathname()
    const currentLangCode = useSelector(currentLangCodeSelector)
    const languages = useSelector(languagesSelector)
    const defaultLangCode = languages?.find(lang => lang.is_default)?.code || 'en'

    const langCode = currentLangCode || defaultLangCode
    const localizedHref = langCode === defaultLangCode ? href : `/${langCode}${href === '/' ? '' : href}`

    const pathWithoutLocale = stripLocaleFromPath(pathname)
    const isActive = pathWithoutLocale === href || (href !== '/' && pathWithoutLocale.startsWith(`${href}/`))

    return (
        <Link
            href={localizedHref}
            className={activeClassName ? `${className || ''} ${isActive ? activeClassName : ''}`.trim() : className}
            {...rest}
        />
    )
}

export default LocalizeLink
