<template>
  <div class="bg-surface-0 dark:bg-surface-900">
    <div id="home" class="landing-wrapper overflow-hidden">
      <div class="relative mx-0 flex items-center justify-between px-6 py-6 lg:static lg:mx-20 md:mx-12 lg:px-20">
        <a class="flex items-center" href="#">
          <SvgLogo class="mr-2 h-12" />

          <span class="mr-20 text-2xl text-surface-900 font-medium leading-normal dark:text-surface-0">SAKAI</span>
        </a>
        <Button
          v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-in scale-in',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-out fade-out',
            hideOnOutsideClick: true,
          }"
          class="lg:!hidden"
          text
          severity="secondary"
          rounded
        >
          <i class="pi pi-bars !text-2xl" />
        </Button>
        <div class="absolute left-0 top-full z-20 hidden w-full grow items-center justify-between bg-surface-0 px-12 rounded-border lg:static lg:flex dark:bg-surface-900 lg:px-0">
          <ul class="m-0 flex flex-col cursor-pointer select-none list-none gap-8 p-0 lg:flex-row lg:items-center">
            <li>
              <a class="px-0 py-4 text-xl text-surface-900 font-medium dark:text-surface-0" @click="smoothScroll('#hero')">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a class="px-0 py-4 text-xl text-surface-900 font-medium dark:text-surface-0" @click="smoothScroll('#features')">
                <span>Features</span>
              </a>
            </li>
            <li>
              <a class="px-0 py-4 text-xl text-surface-900 font-medium dark:text-surface-0" @click="smoothScroll('#highlights')">
                <span>Highlights</span>
              </a>
            </li>
            <li>
              <a class="px-0 py-4 text-xl text-surface-900 font-medium dark:text-surface-0" @click="smoothScroll('#pricing')">
                <span>Pricing</span>
              </a>
            </li>
          </ul>
          <div class="mt-4 flex gap-2 border-t py-4 border-surface lg:mt-0 lg:border-t-0 lg:py-0">
            <Button
              label="Login"
              text
              as="router-link"
              to="/login"
              rounded
            />
            <Button label="Register" to="/login" rounded />
          </div>
        </div>
      </div>

      <div
        id="hero"
        class="flex flex-col overflow-hidden px-6 pt-6 lg:px-20"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
      >
        <div class="mx-6 mt-0 md:mx-20 md:mt-6">
          <h1 class="text-6xl text-gray-900 font-bold leading-tight"><span class="block font-light">Eu sem integer</span>eget magna fermentum</h1>
          <p class="text-2xl text-gray-700 font-normal leading-normal md:mt-4">Sed blandit libero volutpat sed cras. Fames ac turpis egestas integer. Placerat in egestas erat...</p>
          <Button
            label="Get Started"
            as="router-link"
            to="/"
            rounded
            class="mt-8 !px-4 !text-xl"
          />
        </div>
        <div class="flex justify-center md:justify-end">
          <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto">
        </div>
      </div>

      <div id="features" class="mx-0 mt-8 px-6 py-6 lg:mx-20 lg:px-20">
        <div class="grid grid-cols-12 justify-center gap-4">
          <div class="col-span-12 mb-6 mt-20 text-center">
            <div class="mb-2 text-4xl text-surface-900 font-normal dark:text-surface-0">Marvelous Features</div>
            <span class="text-2xl text-muted-color">Placerat in egestas erat...</span>
          </div>
          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pb-8 lg:pr-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-yellow-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-users text-yellow-700 !text-2xl" />
                </div>
                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Easy to Use</h5>
                <span class="text-surface-600 dark:text-surface-200">Posuere morbi leo urna molestie.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pb-8 lg:pr-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-cyan-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-palette text-cyan-700 !text-2xl" />
                </div>
                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Fresh Design</h5>
                <span class="text-surface-600 dark:text-surface-200">Semper risus in hendrerit.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pb-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="flex items-center justify-center bg-indigo-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-map text-indigo-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Well Documented</div>
                <span class="text-surface-600 dark:text-surface-200">Non arcu risus quis varius quam quisque.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pb-8 lg:pr-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(145, 210, 204, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-slate-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-id-card text-slate-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Responsive Layout</div>
                <span class="text-surface-600 dark:text-surface-200">Nulla malesuada pellentesque elit.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pb-8 lg:pr-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2), rgba(160, 210, 250, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-orange-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-star text-orange-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Clean Code</div>
                <span class="text-surface-600 dark:text-surface-200">Condimentum lacinia quis vel eros.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pb-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-pink-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-moon text-pink-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Dark Mode</div>
                <span class="text-surface-600 dark:text-surface-200">Convallis tellus id interdum velit laoreet.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pr-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-teal-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-shopping-cart text-teal-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Ready to Use</div>
                <span class="text-surface-600 dark:text-surface-200">Mauris sit amet massa vitae.</span>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0 lg:pr-8">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-blue-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-globe text-blue-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Modern Practices</div>
                <span class="text-surface-600 dark:text-surface-200">Elementum nibh tellus molestie nunc non.</span>
              </div>
            </div>
          </div>

          <div class="lg-4 col-span-12 mt-6 p-0 lg:col-span-4 md:col-span-12 lg:mt-0">
            <div
              style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))"
            >
              <div class="h-full bg-surface-0 p-4 dark:bg-surface-900" style="border-radius: 8px">
                <div class="mb-4 flex items-center justify-center bg-purple-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                  <i class="pi pi-fw pi-eye text-purple-700 !text-2xl" />
                </div>
                <div class="mb-1 mt-6 text-xl text-surface-900 font-semibold dark:text-surface-0">Privacy</div>
                <span class="text-surface-600 dark:text-surface-200">Neque egestas congue quisque.</span>
              </div>
            </div>
          </div>

          <div
            class="col-span-12 mb-20 mt-20 p-2 md:p-20"
            style="border-radius: 20px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)"
          >
            <div class="flex flex-col items-center justify-center px-4 py-4 text-center md:py-0">
              <div class="mb-2 text-3xl text-gray-900 font-semibold">Joséphine Miller</div>
              <span class="text-2xl text-gray-600">Peak Interactive</span>
              <p class="mt-6 text-2xl text-gray-900 md:line-height-4 sm:line-height-2" style="max-width: 800px">
                “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
              </p>
              <img src="/demo/images/landing/peak-logo.svg" class="mt-6" alt="Company logo">
            </div>
          </div>
        </div>
      </div>

      <div id="highlights" class="mx-0 my-12 px-6 py-6 lg:mx-20 lg:px-20">
        <div class="text-center">
          <div class="mb-2 text-4xl text-surface-900 font-normal dark:text-surface-0">Powerful Everywhere</div>
          <span class="text-2xl text-muted-color">Amet consectetur adipiscing elit...</span>
        </div>

        <div class="grid grid-cols-12 mt-20 gap-4 pb-2 md:pb-20">
          <div class="order-1 col-span-12 flex justify-center bg-purple-100 p-0 lg:order-none lg:col-span-6" style="border-radius: 8px">
            <img src="/demo/images/landing/mockup.svg" class="w-11/12" alt="mockup mobile">
          </div>

          <div class="col-span-12 my-auto flex flex-col gap-4 text-center lg:col-span-6 lg:items-end lg:text-right">
            <div class="flex items-center self-center justify-center bg-purple-200 lg:self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
              <i class="pi pi-fw pi-mobile text-purple-700 !text-4xl" />
            </div>
            <div class="text-3xl text-surface-900 font-normal leading-none dark:text-surface-0">Congue Quisque Egestas</div>
            <span
              class="ml-0 text-2xl text-surface-700 leading-normal md:ml-2 dark:text-surface-100"
              style="max-width: 650px"
            >Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Sit amet mattis vulputate enim nulla aliquet.</span>
          </div>
        </div>

        <div class="grid grid-cols-12 my-20 gap-4 pt-2 md:pt-20">
          <div class="col-span-12 my-auto flex flex-col gap-4 text-center lg:col-span-6 lg:items-start lg:text-left">
            <div class="flex items-center self-center justify-center bg-yellow-200 lg:self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
              <i class="pi pi-fw pi-desktop text-yellow-700 !text-3xl" />
            </div>
            <div class="text-3xl text-surface-900 font-normal leading-none dark:text-surface-0">Celerisque Eu Ultrices</div>
            <span
              class="mr-0 text-2xl text-surface-700 leading-normal md:mr-2 dark:text-surface-100"
              style="max-width: 650px"
            >Adipiscing commodo elit at imperdiet dui. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Suspendisse in est ante in. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.</span>
          </div>

          <div class="order-1 col-span-12 flex justify-end bg-yellow-100 p-0 sm:order-2 lg:col-span-6" style="border-radius: 8px">
            <img src="/demo/images/landing/mockup-desktop.svg" class="w-11/12" alt="mockup">
          </div>
        </div>
      </div>

      <div id="pricing" class="my-2 px-6 py-6 md:my-6 lg:px-20">
        <div class="mb-6 text-center">
          <div class="mb-2 text-4xl text-surface-900 font-normal dark:text-surface-0">Matchless Pricing</div>
          <span class="text-2xl text-muted-color">Amet consectetur adipiscing elit...</span>
        </div>

        <div class="grid grid-cols-12 mt-20 justify-between gap-4 md:mt-0">
          <div class="col-span-12 p-0 lg:col-span-4 md:p-4">
            <div class="pricing-card flex flex-col cursor-pointer border-2 border-surface-200 p-4 transition-all duration-300 dark:border-surface-600 hover:border-primary" style="border-radius: 10px">
              <div class="my-8 text-center text-3xl text-surface-900 dark:text-surface-0">Free</div>
              <img src="/demo/images/landing/free.svg" class="mx-auto w-10/12" alt="free">
              <div class="my-8 flex flex-col items-center gap-4">
                <div class="flex items-center">
                  <span class="mr-2 text-5xl text-surface-900 font-bold dark:text-surface-0">$0</span>
                  <span class="text-surface-600 dark:text-surface-200">per month</span>
                </div>
                <Button label="Get Started" class="p-button-rounded ml-4 border-0 bg-blue-500 text-white font-light leading-tight" />
              </div>
              <Divider class="w-full bg-surface-200" />
              <ul class="my-8 flex flex-col list-none p-0 px-8 text-surface-900 dark:text-surface-0">
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Responsive Layout</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Unlimited Push Messages</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">50 Support Ticket</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Free Shipping</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:mt-0 md:p-4">
            <div class="pricing-card flex flex-col cursor-pointer border-2 border-surface-200 p-4 transition-all duration-300 dark:border-surface-600 hover:border-primary" style="border-radius: 10px">
              <div class="my-8 text-center text-3xl text-surface-900 dark:text-surface-0">Startup</div>
              <img src="/demo/images/landing/startup.svg" class="mx-auto w-10/12" alt="startup">
              <div class="my-8 flex flex-col items-center gap-4">
                <div class="flex items-center">
                  <span class="mr-2 text-5xl text-surface-900 font-bold dark:text-surface-0">$1</span>
                  <span class="text-surface-600 dark:text-surface-200">per month</span>
                </div>
                <Button label="Get Started" class="p-button-rounded ml-4 border-0 bg-blue-500 text-white font-light leading-tight" />
              </div>
              <Divider class="w-full bg-surface-200" />
              <ul class="my-8 flex flex-col list-none p-0 px-8 text-surface-900 dark:text-surface-0">
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Responsive Layout</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Unlimited Push Messages</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">50 Support Ticket</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Free Shipping</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-span-12 mt-6 p-0 lg:col-span-4 md:mt-0 md:p-4">
            <div class="pricing-card flex flex-col cursor-pointer border-2 border-surface-200 p-4 transition-all duration-300 dark:border-surface-600 hover:border-primary" style="border-radius: 10px">
              <div class="my-8 text-center text-3xl text-surface-900 dark:text-surface-0">Enterprise</div>
              <img src="/demo/images/landing/enterprise.svg" class="mx-auto w-10/12" alt="enterprise">
              <div class="my-8 flex flex-col items-center gap-4">
                <div class="flex items-center">
                  <span class="mr-2 text-5xl text-surface-900 font-bold dark:text-surface-0">$5</span>
                  <span class="text-surface-600 dark:text-surface-200">per month</span>
                </div>
                <Button label="Get Started" class="p-button-rounded ml-4 border-0 bg-blue-500 text-white font-light leading-tight" />
              </div>
              <Divider class="w-full bg-surface-200" />
              <ul class="my-8 flex flex-col list-none p-0 px-8 text-surface-900 dark:text-surface-0">
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Responsive Layout</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Unlimited Push Messages</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">50 Support Ticket</span>
                </li>
                <li class="py-2">
                  <i class="pi pi-fw pi-check mr-2 text-xl text-cyan-500" />
                  <span class="text-xl leading-normal">Free Shipping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-0 mt-20 px-6 py-6 lg:mx-20">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-2">
            <a class="mb-4 flex flex-wrap cursor-pointer items-center justify-center md:mb-0 md:justify-start" @click="smoothScroll('#home')">
              <SvgLogo class="mr-2 h-14" />

              <h4 class="text-3xl text-surface-900 font-medium dark:text-surface-0">SAKAI</h4>
            </a>
          </div>

          <div class="col-span-12 md:col-span-10">
            <div class="grid grid-cols-12 gap-8 text-center md:text-left">
              <div class="col-span-12 md:col-span-3">
                <h4 class="mb-4 text-2xl text-surface-900 font-medium leading-normal dark:text-surface-0">Company</h4>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">About Us</a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">News</a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Investor Relations</a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Careers</a>
                <a class="block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Media Kit</a>
              </div>

              <div class="col-span-12 md:col-span-3">
                <h4 class="mb-4 text-2xl text-surface-900 font-medium leading-normal dark:text-surface-0">Resources</h4>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Get Started</a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Learn</a>
                <a class="block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Case Studies</a>
              </div>

              <div class="col-span-12 md:col-span-3">
                <h4 class="mb-4 text-2xl text-surface-900 font-medium leading-normal dark:text-surface-0">Community</h4>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Discord</a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Events<img src="/demo/images/landing/new-badge.svg" class="ml-2"></a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">FAQ</a>
                <a class="block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Blog</a>
              </div>

              <div class="col-span-12 md:col-span-3">
                <h4 class="mb-4 text-2xl text-surface-900 font-medium leading-normal dark:text-surface-0">Legal</h4>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Brand Policy</a>
                <a class="mb-2 block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Privacy Policy</a>
                <a class="block cursor-pointer text-xl text-surface-700 leading-normal dark:text-surface-100">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function smoothScroll(id) {
  document.body.click()
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth',
  })
}
</script>
