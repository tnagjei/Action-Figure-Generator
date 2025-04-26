'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { languages } from "~/i18n/config";
import { useCommonContext } from '~/context/common-context'
import LoadingModal from "./LoadingModal";
import GeneratingModal from "~/components/GeneratingModal";
import LoginButton from './LoginButton';
import LoginModal from './LoginModal';
import LogoutModal from "./LogoutModal";
import { getLinkHref } from "~/configs/buildLink";

export default function Header({
  locale,
  page
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {
    setShowLoadingModal,
    userData,
    commonText,
    authText,
    menuText
  } = useCommonContext();

  const [pageResult] = useState(getLinkHref(locale, page))

  const checkLocalAndLoading = (lang) => {
    setMobileMenuOpen(false);
    if (locale != lang) {
      setShowLoadingModal(true);
    }
  }

  const checkPageAndLoading = (toPage) => {
    setMobileMenuOpen(false);
    if (page != toPage) {
      setShowLoadingModal(true);
    }
  }

  return (
    <header className="bg-black/50 backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
      <LoadingModal loadingText={commonText.loadingText} />
      <GeneratingModal generatingText={commonText.generateText} />
      <LoginModal
        loadingText={commonText.loadingText}
        redirectPath={pageResult}
        loginModalDesc={authText.loginModalDesc}
        loginModalButtonText={authText.loginModalButtonText}
      />
      <LogoutModal
        logoutModalDesc={authText.logoutModalDesc}
        confirmButtonText={authText.confirmButtonText}
        cancelButtonText={authText.cancelButtonText}
        redirectPath={pageResult}
      />
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href={getLinkHref(locale, '')}
              className="flex items-center"
              onClick={() => checkLocalAndLoading(locale)}>
              <img
                className="h-8 w-auto"
                src="/website.svg"
                width={32}
                height={24}
                alt={process.env.NEXT_PUBLIC_DOMAIN_NAME}
              />
              <span className="ml-2 text-xl font-bold text-white">Action Figure Generator</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href={getLinkHref(locale, '')}
              onClick={() => checkPageAndLoading('')}
              className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link
              href={getLinkHref(locale, 'stickers')}
              onClick={() => checkPageAndLoading('stickers')}
              className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
              Gallery
            </Link>
            <Link
              href={getLinkHref(locale, 'search')}
              onClick={() => checkPageAndLoading('search')}
              className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
              Search
            </Link>
            {userData.email && (
              <Link
                href={getLinkHref(locale, 'my')}
                onClick={() => checkPageAndLoading('my')}
                className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
                My Figures
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                {locale == 'default' ? 'EN' : locale.toUpperCase()}
                <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {languages.map((item) => (
                    <Menu.Item key={item.lang}>
                      <Link
                        href={`/${item.lang}${page ? `/${page}` : ''}`}
                        onClick={() => checkLocalAndLoading(item.lang)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      >
                        {item.language}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            {process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN != '0' && (
              <div className="ml-4">
                <LoginButton buttonType={userData.email ? 1 : 0} loginText={authText.loginText} />
              </div>
            )}

            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link
              href={getLinkHref(locale, '')}
              className="-m-1.5 p-1.5"
              onClick={() => checkLocalAndLoading(locale)}
            >
              <img
                className="h-8 w-auto"
                src="/website.svg"
                width={32}
                height={24}
                alt={process.env.NEXT_PUBLIC_DOMAIN_NAME}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                <Link
                  href={getLinkHref(locale, '')}
                  onClick={() => checkPageAndLoading('')}
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10"
                >
                  Home
                </Link>
                <Link
                  href={getLinkHref(locale, 'stickers')}
                  onClick={() => checkPageAndLoading('stickers')}
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10"
                >
                  Gallery
                </Link>
                <Link
                  href={getLinkHref(locale, 'search')}
                  onClick={() => checkPageAndLoading('search')}
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10"
                >
                  Search
                </Link>
                {userData.email && (
                  <Link
                    href={getLinkHref(locale, 'my')}
                    onClick={() => checkPageAndLoading('my')}
                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10"
                  >
                    My Figures
                  </Link>
                )}
              </div>
              <div className="py-6">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20">
                    <GlobeAltIcon className="h-5 w-5 mr-2" />
                    {locale == 'default' ? 'EN' : locale.toUpperCase()}
                    <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {languages.map((item) => (
                        <Menu.Item key={item.lang}>
                          <Link
                            href={`/${item.lang}${page ? `/${page}` : ''}`}
                            onClick={() => checkLocalAndLoading(item.lang)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          >
                            {item.language}
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
