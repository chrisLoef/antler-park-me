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
import { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

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
const trendingProducts = [
  {
    id: 1,
    name: 'Machined Pen',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
    imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  // More products...
];
const collections = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];
const testimonials = [
  {
    id: 1,
    quote:
      'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
    attribution: 'Sarah Peters, New Orleans',
  },
  {
    id: 2,
    quote:
      'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
    attribution: 'Kelly McPherson, Chicago',
  },
  {
    id: 3,
    quote:
      'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
    attribution: 'Chris Paul, Phoenix',
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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='bg-white'>
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

      <main>
        {/* Hero */}
        <div className='flex flex-col border-b border-gray-200 lg:border-0'>
          <div className='relative'>
            <div aria-hidden='true' className='absolute hidden h-full w-1/2 bg-gray-100 lg:block' />
            <div className='relative bg-gray-100 lg:bg-transparent'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8'>
                <div className='mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64'>
                  <div className='lg:pr-16'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl'>
                      Focus on what matters
                    </h1>
                    <p className='mt-4 text-xl text-gray-600'>
                      Find a parking spot. Easy. Quick. Without hustle
                    </p>
                    <div className='mt-6'>
                      <a
                        href='/spots'
                        className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700'
                      >
                        Find a Spot
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2'>
              <img src='/hero.jpg' alt='' className='h-full w-full object-cover object-center' />
            </div>
          </div>
        </div>

        {/* Trending products */}
        <section aria-labelledby='trending-heading' className='bg-white'>
          <div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32'>
            <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
              <h2 id='trending-heading' className='text-2xl font-bold tracking-tight text-gray-900'>
                Trending products
              </h2>
              <a
                href='#'
                className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
              >
                See everything
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>

            <div className='relative mt-8'>
              <div className='relative w-full overflow-x-auto'>
                <ul
                  role='list'
                  className='mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0'
                >
                  {trendingProducts.map((product) => (
                    <li
                      key={product.id}
                      className='inline-flex w-64 flex-col text-center lg:w-auto'
                    >
                      <div className='group relative'>
                        <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200'>
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className='h-full w-full object-cover object-center group-hover:opacity-75'
                          />
                        </div>
                        <div className='mt-6'>
                          <p className='text-sm text-gray-500'>{product.color}</p>
                          <h3 className='mt-1 font-semibold text-gray-900'>
                            <a href={product.href}>
                              <span className='absolute inset-0' />
                              {product.name}
                            </a>
                          </h3>
                          <p className='mt-1 text-gray-900'>{product.price}</p>
                        </div>
                      </div>

                      <h4 className='sr-only'>Available colors</h4>
                      <ul
                        role='list'
                        className='mt-auto flex items-center justify-center space-x-3 pt-6'
                      >
                        {product.availableColors.map((color) => (
                          <li
                            key={color.name}
                            className='h-4 w-4 rounded-full border border-black border-opacity-10'
                            style={{ backgroundColor: color.colorBg }}
                          >
                            <span className='sr-only'>{color.name}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='mt-12 px-4 sm:hidden'>
              <a href='#' className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'>
                See everything
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section aria-labelledby='collections-heading' className='bg-gray-100'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
              <h2 id='collections-heading' className='text-2xl font-bold text-gray-900'>
                Collections
              </h2>

              <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
                {collections.map((collection) => (
                  <div key={collection.name} className='group relative'>
                    <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
                      <img
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <h3 className='mt-6 text-sm text-gray-500'>
                      <a href={collection.href}>
                        <span className='absolute inset-0' />
                        {collection.name}
                      </a>
                    </h3>
                    <p className='text-base font-semibold text-gray-900'>
                      {collection.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sale and testimonials */}
        <div className='relative overflow-hidden'>
          {/* Decorative background image and gradient */}
          <div aria-hidden='true' className='absolute inset-0'>
            <div className='absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='absolute inset-0 bg-white bg-opacity-75' />
            <div className='absolute inset-0 bg-gradient-to-t from-white via-white' />
          </div>

          {/* Sale */}
          <section
            aria-labelledby='sale-heading'
            className='relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8'
          >
            <div className='mx-auto max-w-2xl lg:max-w-none'>
              <h2
                id='sale-heading'
                className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'
              >
                Get 25% off during our one-time sale
              </h2>
              <p className='mx-auto mt-4 max-w-xl text-xl text-gray-600'>
                Most of our products are limited releases that won't come back. Get your favorite
                items while they're in stock.
              </p>
              <a
                href='#'
                className='mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto'
              >
                Get access to our one-time sale
              </a>
            </div>
          </section>

          {/* Testimonials */}
          <section
            aria-labelledby='testimonial-heading'
            className='relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32'
          >
            <div className='mx-auto max-w-2xl lg:max-w-none'>
              <h2
                id='testimonial-heading'
                className='text-2xl font-bold tracking-tight text-gray-900'
              >
                What are people saying?
              </h2>

              <div className='mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0'>
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className='sm:flex lg:block'>
                    <svg
                      width={24}
                      height={18}
                      viewBox='0 0 24 18'
                      aria-hidden='true'
                      className='flex-shrink-0 text-gray-300'
                    >
                      <path
                        d='M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z'
                        fill='currentColor'
                      />
                    </svg>
                    <div className='mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10'>
                      <p className='text-lg text-gray-600'>{testimonial.quote}</p>
                      <cite className='mt-4 block font-semibold not-italic text-gray-900'>
                        {testimonial.attribution}
                      </cite>
                    </div>
                  </blockquote>
                ))}
              </div>
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
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
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
                  <h3 className='text-2xl font-bold tracking-tight text-white'>Get early access</h3>
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
  );
}

