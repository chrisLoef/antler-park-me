import { Fragment, useState } from 'react'
import { Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import { Routes, Route, useParams } from 'react-router-dom';
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
}

const policies = [
  {
    name: 'Free service all year long',
    description:
      'Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: '24/7 Customer Support',
    description:
      'Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Fast Booking',
    description:
      "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Gift Cards',
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
  },
]
const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
}
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
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SpotDetail() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  let { spotId } = useParams()
  const parkingSpot = parkingSpots.find(spot => spot.id === spotId)

  return (
    <div className="bg-gray-50">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
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
                      <Tab.Panel key={category.name} className="space-y-12 px-4 pb-6 pt-10">
                        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                            <div>
                              <p id={`mobile-featured-heading-${categoryIdx}`} className="font-medium text-gray-900">
                                Featured
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                className="mt-6 space-y-6"
                              >
                                {category.featured.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a href={item.href} className="text-gray-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p id="mobile-categories-heading" className="font-medium text-gray-900">
                                Categories
                              </p>
                              <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
                                {category.categories.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a href={item.href} className="text-gray-500">
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

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create an account
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                  Create an account
                </a>
                <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                  Sign in
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <a href="/">
                      <span className="sr-only">ParkMe</span>
                      <img
                        className="h-8 w-auto"
                        src="/logo.png"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category, categoryIdx) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                      <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                            <div>
                                              <p
                                                id={`desktop-featured-heading-${categoryIdx}`}
                                                className="font-medium text-gray-900"
                                              >
                                                Featured Cities
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.featured.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            <div>
                                              <p id="desktop-categories-heading" className="font-medium text-gray-900">
                                                Categories
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-categories-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.categories.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
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
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="/" className="lg:hidden">
                    <span className="sr-only">ParkMe</span>
                    <img
                      src="/logo.png"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>

                        <div className="flex">
                          <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Account</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
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
        {/* Product */}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product details */}
            <div className="lg:max-w-lg lg:self-end">

              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{parkingSpot.name}</h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>

                <div className="flex items-center">
                  <p className="text-lg text-gray-900 sm:text-xl">{parkingSpot.price}</p>

                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500">{parkingSpot.address}</p>
                </div>
                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500">{parkingSpot.description}</p>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <img
                  src={parkingSpot.imageSrc}
                  alt={parkingSpot.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product form */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>

                <form>
                  
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Book now
                    </button>
                  </div>
                  <div className="mt-6 text-center">
                    <a href="#" className="group inline-flex text-base font-medium">
                      <ShieldCheckIcon
                        className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="text-gray-500 hover:text-gray-700">Frequenty asked questions?</span>
                    </a>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          {/* Policies section */}
          <section aria-labelledby="policy-heading" className="mt-16 lg:mt-24">
            <h2 id="policy-heading" className="sr-only">
              Our policies
            </h2>
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
              {policies.map((policy) => (
                <div key={policy.name}>
                  <img src={policy.imageSrc} alt="" className="h-24 w-auto" />
                  <h3 className="mt-6 text-base font-medium text-gray-900">{policy.name}</h3>
                  <p className="mt-3 text-base text-gray-500">{policy.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="reviews-heading" className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
            <div className="lg:col-span-4">
              <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                Customer Reviews
              </h2>

              <div className="mt-3 flex items-center">
                <div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
                <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Review data</h3>

                <dl className="space-y-3">
                  {reviews.counts.map((count) => (
                    <div key={count.rating} className="flex items-center text-sm">
                      <dt className="flex flex-1 items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {count.rating}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                          <StarIcon
                            className={classNames(
                              count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />

                          <div className="relative ml-3 flex-1">
                            <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                            {count.count > 0 ? (
                              <div
                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                        {Math.round((count.count / reviews.totalCount) * 100)}%
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                <p className="mt-1 text-sm text-gray-600">
                  If you’ve used this product, share your thoughts with other customers
                </p>

                <a
                  href="#"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                >
                  Write a review
                </a>
              </div>
            </div>

            <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <h3 className="sr-only">Recent reviews</h3>

              <div className="flow-root">
                <div className="-my-12 divide-y divide-gray-200">
                  {reviews.featured.map((review) => (
                    <div key={review.id} className="py-12">
                      <div className="flex items-center">
                        <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                        <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                  'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">{review.rating} out of 5 stars</p>
                        </div>
                      </div>

                      <div
                        className="mt-4 space-y-6 text-base italic text-gray-600"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-white">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200">
            <div className="pb-20 pt-16">
              <div className="md:flex md:justify-center">
                <img
                  src="/logo.png"
                  alt=""
                  className="h-8 w-auto"
                />
              </div>
              <div className="mx-auto mt-16 max-w-5xl xl:grid xl:grid-cols-2 xl:gap-8">
                <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                  <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Cities</h3>
                      <ul role="list" className="mt-6 space-y-6">
                        {footerNavigation.products.map((item) => (
                          <li key={item.name} className="text-sm">
                            <a href={item.href} className="text-gray-500 hover:text-gray-600">
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Company</h3>
                      <ul role="list" className="mt-6 space-y-6">
                        {footerNavigation.company.map((item) => (
                          <li key={item.name} className="text-sm">
                            <a href={item.href} className="text-gray-500 hover:text-gray-600">
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
              <div className="flex items-center rounded-lg bg-gray-100 p-6 sm:p-10">
                <div className="mx-auto max-w-sm">
                  <h3 className="font-semibold text-gray-900">Sign up for our newsletter</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    The latest news, articles, and resources, sent to your inbox weekly.
                  </p>
                  <form className="mt-4 sm:mt-6 sm:flex">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      type="text"
                      autoComplete="email"
                      required
                      className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="relative mt-6 flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center saturate-0 filter"
                  />
                  <div className="absolute inset-0 bg-indigo-600 bg-opacity-90" />
                </div>
                <div className="relative mx-auto max-w-sm text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-white">Get early access</h3>
                  <p className="mt-2 text-gray-200">
                    Did you sign up to the newsletter? If so, use the keyword we sent you to get access.{' '}
                    <a href="#" className="whitespace-nowrap font-bold text-white hover:text-gray-200">
                      Go now<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">&copy; 2024 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
