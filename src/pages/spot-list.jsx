/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Popover, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { parkingSpots } from './parking-spots';

const navigation = {
  categories: [
    {
      name: 'Find a spot',
      featured: [
        { name: 'Munich', href: '/spots' },
        { name: 'Berlin', href: '/spots' },
        { name: 'Cologne', href: '/spots' },
      ],
      categories: [
        { name: 'Bike', href: '/spots' },
        { name: 'Carrier Bike', href: '/spots' },
        { name: 'Car', href: '/spots' },
      ],
    },
  ],
  pages: [
    { name: 'Offer a spot', href: '/offer-a-spot' },
    { name: 'About us', href: '/about-us' },
  ],
};

const filters = [
  {
    id: 'location',
    name: 'Location',
    options: [
      { value: 'indoor', label: 'Indoor' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'private-space', label: 'Private Space' },
    ],
  },
  {
    id: 'amenities',
    name: 'Amenities',
    options: [
      { value: 'electric-charging-available', label: 'Electric Charging Available' },
      { value: '24-7-available', label: '24/7 available' },
      { value: 'power-socket', label: 'Power Socker' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'bike', label: 'Bike' },
      { value: 'cargo-bike', label: 'Cargo Bike' },
      { value: 'car', label: 'Car' },
      { value: 'caravan', label: 'Caravan' },
    ],
  },
];

const footerNavigation = {
  products: [
    { name: 'Munich', href: '/spots' },
    { name: 'Berlin', href: '/spots' },
    { name: 'Cologne', href: '/spots' },
    { name: 'Franfurt', href: '/spots' },
    { name: 'London', href: '/spots' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SpotList() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterSettings, setFilterSettings] = useState({});
  const [filteredParkingSpots, setFilteredParkingSpots] = useState(parkingSpots)
  function applyFilter(sectionId, option) {
    const newFilterSettings = { ...filterSettings };
    if (newFilterSettings[sectionId] == null) newFilterSettings[sectionId] = []
    const optionIndex = newFilterSettings[sectionId].indexOf(option)
    if (optionIndex === -1) newFilterSettings[sectionId].push(option)
    if (optionIndex !== -1) newFilterSettings[sectionId].splice(optionIndex, 1) 
    setFilterSettings(newFilterSettings);
  }
  useEffect(() => {
    console.log(filterSettings)
    let newParkingSpots = [...parkingSpots]
    if (filterSettings.location != null && filterSettings.location.length > 0) {
      newParkingSpots = newParkingSpots.filter(parkingSpot => filterSettings.location.includes(parkingSpot.location))
    }
    if (filterSettings.size != null && filterSettings.size.length > 0) {
      newParkingSpots = newParkingSpots.filter(parkingSpot => filterSettings.size.includes(parkingSpot.size))
    }
    setFilteredParkingSpots(newParkingSpots)
    
  }, [filterSettings])

  return (
    <div className='bg-white'>
      <div>
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog className='relative z-40 lg:hidden' onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                  <div className='flex px-4 pb-2 pt-5'>
                    <button
                      type='button'
                      className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as='div' className='mt-2'>
                    <div className='border-b border-gray-200'>
                      <Tab.List className='-mb-px flex space-x-8 px-4'>
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category, categoryIdx) => (
                        <Tab.Panel key={category.name} className='space-y-12 px-4 pb-6 pt-10'>
                          <div className='grid grid-cols-1 items-start gap-x-6 gap-y-10'>
                            <div className='grid grid-cols-1 gap-x-6 gap-y-10'>
                              <div>
                                <p
                                  id={`mobile-featured-heading-${categoryIdx}`}
                                  className='font-medium text-gray-900'
                                >
                                  Featured
                                </p>
                                <ul
                                  role='list'
                                  aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                  className='mt-6 space-y-6'
                                >
                                  {category.featured.map((item) => (
                                    <li key={item.name} className='flex'>
                                      <a href={item.href} className='text-gray-500'>
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p
                                  id='mobile-categories-heading'
                                  className='font-medium text-gray-900'
                                >
                                  Categories
                                </p>
                                <ul
                                  role='list'
                                  aria-labelledby='mobile-categories-heading'
                                  className='mt-6 space-y-6'
                                >
                                  {category.categories.map((item) => (
                                    <li key={item.name} className='flex'>
                                      <a href={item.href} className='text-gray-500'>
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                    {navigation.pages.map((page) => (
                      <div key={page.name} className='flow-root'>
                        <a href={page.href} className='-m-2 block p-2 font-medium text-gray-900'>
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                    <div className='flow-root'>
                      <a href='#' className='-m-2 block p-2 font-medium text-gray-900'>
                        Create an account
                      </a>
                    </div>
                    <div className='flow-root'>
                      <a href='#' className='-m-2 block p-2 font-medium text-gray-900'>
                        Sign in
                      </a>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className='relative z-10'>
          <nav aria-label='Top'>
            {/* Top navigation */}
            <div className='bg-gray-900'>
              <div className='mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <a href='#' className='text-sm font-medium text-white hover:text-gray-100'>
                    Create an account
                  </a>
                  <span className='h-6 w-px bg-gray-600' aria-hidden='true' />
                  <a href='#' className='text-sm font-medium text-white hover:text-gray-100'>
                    Sign in
                  </a>
                </div>
              </div>
            </div>

            {/* Secondary navigation */}
            <div className='bg-white'>
              <div className='border-b border-gray-200'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                  <div className='flex h-16 items-center justify-between'>
                    {/* Logo (lg+) */}
                    <div className='hidden lg:flex lg:items-center'>
                      <a href='/'>
                        <span className='sr-only'>ParkMe</span>
                        <img className='h-8 w-auto' src='/logo.png' alt='' />
                      </a>
                    </div>

                    <div className='hidden h-full lg:flex'>
                      {/* Mega menus */}
                      <Popover.Group className='ml-8'>
                        <div className='flex h-full justify-center space-x-8'>
                          {navigation.categories.map((category, categoryIdx) => (
                            <Popover key={category.name} className='flex'>
                              {({ open }) => (
                                <>
                                  <div className='relative flex'>
                                    <Popover.Button
                                      className={classNames(
                                        open
                                          ? 'border-indigo-600 text-indigo-600'
                                          : 'border-transparent text-gray-700 hover:text-gray-800',
                                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                                      )}
                                    >
                                      {category.name}
                                    </Popover.Button>
                                  </div>

                                  <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-200'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='transition ease-in duration-150'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                  >
                                    <Popover.Panel className='absolute inset-x-0 top-full text-gray-500 sm:text-sm'>
                                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                      <div
                                        className='absolute inset-0 top-1/2 bg-white shadow'
                                        aria-hidden='true'
                                      />

                                      <div className='relative bg-white'>
                                        <div className='mx-auto max-w-7xl px-8'>
                                          <div className='grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10'>
                                            <div className='grid grid-cols-2 gap-x-8 gap-y-10'>
                                              <div>
                                                <p
                                                  id={`desktop-featured-heading-${categoryIdx}`}
                                                  className='font-medium text-gray-900'
                                                >
                                                  Featured Cities
                                                </p>
                                                <ul
                                                  role='list'
                                                  aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                  className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                                >
                                                  {category.featured.map((item) => (
                                                    <li key={item.name} className='flex'>
                                                      <a
                                                        href={item.href}
                                                        className='hover:text-gray-800'
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                              <div>
                                                <p
                                                  id='desktop-categories-heading'
                                                  className='font-medium text-gray-900'
                                                >
                                                  Categories
                                                </p>
                                                <ul
                                                  role='list'
                                                  aria-labelledby='desktop-categories-heading'
                                                  className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                                >
                                                  {category.categories.map((item) => (
                                                    <li key={item.name} className='flex'>
                                                      <a
                                                        href={item.href}
                                                        className='hover:text-gray-800'
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </Transition>
                                </>
                              )}
                            </Popover>
                          ))}

                          {navigation.pages.map((page) => (
                            <a
                              key={page.name}
                              href={page.href}
                              className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                            >
                              {page.name}
                            </a>
                          ))}
                        </div>
                      </Popover.Group>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className='flex flex-1 items-center lg:hidden'>
                      <button
                        type='button'
                        className='-ml-2 rounded-md bg-white p-2 text-gray-400'
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span className='sr-only'>Open menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                      </button>

                      {/* Search */}
                      <a href='#' className='ml-2 p-2 text-gray-400 hover:text-gray-500'>
                        <span className='sr-only'>Search</span>
                        <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
                      </a>
                    </div>

                    {/* Logo (lg-) */}
                    <a href='/' className='lg:hidden'>
                      <span className='sr-only'>ParkMe</span>
                      <img src='/logo.png' alt='' className='h-8 w-auto' />
                    </a>

                    <div className='flex flex-1 items-center justify-end'>
                      <div className='flex items-center lg:ml-8'>
                        <div className='flex space-x-8'>
                          <div className='hidden lg:flex'>
                            <a href='#' className='-m-2 p-2 text-gray-400 hover:text-gray-500'>
                              <span className='sr-only'>Search</span>
                              <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
                            </a>
                          </div>

                          <div className='flex'>
                            <a href='#' className='-m-2 p-2 text-gray-400 hover:text-gray-500'>
                              <span className='sr-only'>Account</span>
                              <UserIcon className='h-6 w-6' aria-hidden='true' />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog className='relative z-40 lg:hidden' onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>
                  <div className='flex items-center justify-between px-4'>
                    <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                    <button
                      type='button'
                      className='relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500'
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className='mt-4'>
                    {filters.map((section) => (
                      <Disclosure
                        as='div'
                        key={section.name}
                        className='border-t border-gray-200 pb-4 pt-4'
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className='w-full px-2'>
                              <Disclosure.Button className='flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500'>
                                <span className='text-sm font-medium text-gray-900'>
                                  {section.name}
                                </span>
                                <span className='ml-6 flex h-7 items-center'>
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? '-rotate-180' : 'rotate-0',
                                      'h-5 w-5 transform',
                                    )}
                                    aria-hidden='true'
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className='px-4 pb-2 pt-4'>
                              <div className='space-y-6'>
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className='flex items-center'>
                                    <input
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type='checkbox'
                                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label
                                      htmlFor={`${section.id}-${optionIdx}-mobile`}
                                      className='ml-3 text-sm text-gray-500'
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className='mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8'>
          <div className='border-b border-gray-200 pb-10 pt-24'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>Find a spot</h1>
            <p className='mt-4 text-base text-gray-500'>
              Checkout the spots nearby and filter by your preferences.
            </p>
            {/* Search Bar */}
            <div className='grid grid-cols-2 mt-4'>
              <div className='grid-cols-8'>
                <div className='relative rounded-md shadow-sm'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </div>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Location'
                  />
                </div>
              </div>
              <div className='grid-cols-4 ml-4'>
                <a
                  href='/spots'
                  className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-1.5 font-medium text-white hover:bg-indigo-700'
                >
                  Search
                </a>
              </div>
            </div>
          </div>
          <div className='pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
            <aside>
              <h2 className='sr-only'>Filters</h2>

              <button
                type='button'
                className='inline-flex items-center lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='text-sm font-medium text-gray-700'>Filters</span>
                <PlusIcon className='ml-1 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
              </button>

              <div className='hidden lg:block'>
                <form className='space-y-10 divide-y divide-gray-200'>
                  {filters.map((section, sectionIdx) => (
                    <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                      <fieldset>
                        <legend className='block text-sm font-medium text-gray-900'>
                          {section.name}
                        </legend>
                        <div className='space-y-3 pt-6'>
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className='flex items-center'>
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type='checkbox'
                                onClick={() => applyFilter(section.id, option.value)}
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className='ml-3 text-sm text-gray-600'
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            <section
              aria-labelledby='product-heading'
              className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'
            >
              <h2 id='product-heading' className='sr-only'>
                Parking Spots
              </h2>

              <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
                {filteredParkingSpots.map((product) => (
                  <div
                    key={product.id}
                    className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
                  >
                    <div className='aspect-auto bg-gray-200 sm:aspect-auto group-hover:opacity-75 sm:h-96'>
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                      />
                    </div>
                    <div className='flex flex-1 flex-col space-y-2 p-4'>
                      <h3 className='text-sm font-medium text-gray-900'>
                        <a href={`/spots/${product.id}`}>
                          <span aria-hidden='true' className='absolute inset-0' />
                          {product.name}
                        </a>
                      </h3>
                      <p className='text-sm text-gray-500'>{product.description}</p>
                      <div className='flex flex-1 flex-col justify-end'>
                        <p className='text-base font-medium text-gray-900'>{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer aria-labelledby='footer-heading' className='bg-white'>
          <h2 id='footer-heading' className='sr-only'>
            Footer
          </h2>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='border-t border-gray-200'>
              <div className='pb-20 pt-16'>
                <div className='md:flex md:justify-center'>
                  <img
                    src='/logo.png'
                    alt=''
                    className='h-8 w-auto'
                  />
                </div>
                <div className='mx-auto mt-16 max-w-5xl xl:grid xl:grid-cols-2 xl:gap-8'>
                  <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
                    <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                      <div>
                        <h3 className='text-sm font-medium text-gray-900'>Cities</h3>
                        <ul role='list' className='mt-6 space-y-6'>
                          {footerNavigation.products.map((item) => (
                            <li key={item.name} className='text-sm'>
                              <a href={item.href} className='text-gray-500 hover:text-gray-600'>
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className='text-sm font-medium text-gray-900'>Company</h3>
                        <ul role='list' className='mt-6 space-y-6'>
                          {footerNavigation.company.map((item) => (
                            <li key={item.name} className='text-sm'>
                              <a href={item.href} className='text-gray-500 hover:text-gray-600'>
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'></div>
                  </div>
                </div>
              </div>

              <div className='lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8'>
                <div className='flex items-center rounded-lg bg-gray-100 p-6 sm:p-10'>
                  <div className='mx-auto max-w-sm'>
                    <h3 className='font-semibold text-gray-900'>Sign up for our newsletter</h3>
                    <p className='mt-2 text-sm text-gray-500'>
                      The latest news, articles, and resources, sent to your inbox weekly.
                    </p>
                    <form className='mt-4 sm:mt-6 sm:flex'>
                      <label htmlFor='email-address' className='sr-only'>
                        Email address
                      </label>
                      <input
                        id='email-address'
                        type='text'
                        autoComplete='email'
                        required
                        className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                      />
                      <div className='mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0'>
                        <button
                          type='submit'
                          className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white'
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className='relative mt-6 flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:mt-0'>
                  <div className='absolute inset-0 overflow-hidden rounded-lg'>
                    <img
                      src='https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg'
                      alt=''
                      className='h-full w-full object-cover object-center saturate-0 filter'
                    />
                    <div className='absolute inset-0 bg-indigo-600 bg-opacity-90' />
                  </div>
                  <div className='relative mx-auto max-w-sm text-center'>
                    <h3 className='text-2xl font-bold tracking-tight text-white'>
                      Get early access
                    </h3>
                    <p className='mt-2 text-gray-200'>
                      Did you sign up to the newsletter? If so, use the keyword we sent you to get
                      access.{' '}
                      <a
                        href='#'
                        className='whitespace-nowrap font-bold text-white hover:text-gray-200'
                      >
                        Go now<span aria-hidden='true'> &rarr;</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='py-10 md:flex md:items-center md:justify-between'>
              <div className='text-center md:text-left'>
                <p className='text-sm text-gray-500'>&copy; 2024 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

