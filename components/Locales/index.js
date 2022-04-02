import React from 'react'
import router, { useRouter } from 'next/router'

/* <Popover className="mt-16">
          <Popover.Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className=" h-16"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M18 19h6v2h-6zm0-4h12v2H18zm0-4h12v2H18zm-4 10v-2H9v-2H7v2H2v2h8.215a8.591 8.591 0 0 1-2.216 3.977A9.273 9.273 0 0 1 6.552 23H4.333a10.855 10.855 0 0 0 2.145 3.297A14.658 14.658 0 0 1 3 28.127L3.702 30a16.42 16.42 0 0 0 4.29-2.336A16.488 16.488 0 0 0 12.299 30L13 28.127A14.664 14.664 0 0 1 9.523 26.3a10.313 10.313 0 0 0 2.729-5.3zm-2.833-8h2.166L8.75 2H6.583L2 13h2.166L5 11h5.333zM5.833 9l1.833-4.4L9.5 9z"
              />
            </svg>
          </Popover.Button>
          <Popover.Panel className="">
            <div className="flex flex-col space-x-4 text-left text-black underline">
              <Link href={asPath} locale="Español">
                <span className="cursor-pointer font-light no-underline">
                  Español
                </span>
              </Link>
              <Link href={asPath} locale="English">
                <span className="cursor-pointer font-light no-underline">
                  English
                </span>
              </Link>
              <Link href={asPath} locale="Français">
                <span className="cursor-pointer font-light no-underline">
                  Français
                </span>
              </Link>
              <Link href={asPath} locale="Português">
                <span className="cursor-pointer font-light no-underline">
                  Português
                </span>
              </Link>
              <Link href={asPath} locale="русский">
                <span className="cursor-pointer font-light no-underline">
                  русский
                </span>
              </Link>{' '}
              <Link href={asPath} locale="日本">
                <span className="cursor-pointer font-light no-underline">
                  日本
                </span>
              </Link>
            </div>
          </Popover.Panel>
        </Popover>{' '} */

const welcomes = {
  English: {
    title: 'Enter the app to mint.',
    user: 'THE WINSOME TENLEY',
    launch: 'Launch App',
    content: [
      {
        title: '',
        synopsis: 'Sign in with Ethereum to view the application.',
        imageUrl: '',
      },
    ],
  },
  Français: {
    title: 'Entrez lapplication à la menthe.',
    user: 'LE TENLEY GAGNANT',
    launch: 'Démarrer lapplication',
    content: [
      {
        title: '',
        synopsis: "Connectez-vous avec Ethereum pour afficher l'application.",
        imageUrl: '',
      },
    ],
  },
  Español: {
    title: 'Ingrese a la aplicación para menta.',
    user: 'EL GANADOR TENLEY',
    launch: 'Ejecutar aplicación',
    content: [
      {
        title: '',
        synopsis: 'Inicie sesión con Ethereum para ver la aplicación.',
        imageUrl: '',
      },
    ],
  },
  Português: {
    title: 'Entre no aplicativo para cunhar.',
    user: 'O LINDO TENLEY',
    launch: 'Lançamento do Aplicativo',
    content: [
      {
        title: '',
        synopsis: 'Inicie sesión con Ethereum para ver la aplicación.',
        imageUrl: '',
      },
    ],
  },
  русский: {
    title: 'Войдите в приложение для монетного двора.',
    user: 'ПРИВЛЕКАТЕЛЬНЫЙ ТЕНЛИ',
    launch: 'Запустить приложение',
    content: [
      {
        title: '',
        synopsis: 'Inicie sesión con Ethereum para ver la aplicación.',
        imageUrl: '',
      },
    ],
  },
  日本: {
    title: 'ミントするアプリを入力してください。',
    user: 'ウィンサムテンリー',
    launch: 'アプリを起動',
    content: [
      {
        title: '',
        synopsis: 'Inicie sesión con Ethereum para ver la aplicación.',
        imageUrl: '',
      },
    ],
  },
}

export const Locales = () => {
  const { locale } = useRouter()
  const { title, user, launch } = welcomes[locale]

  return (
    <div className="items-center text-center">
      <div className="mt-8">
        <span className="text-2xl text-red-900">{title}</span>
        <div className="flex-grow border-t border-gray-400 p-1"></div>
        {user}
      </div>
    </div>
  )
}

export default Locales
