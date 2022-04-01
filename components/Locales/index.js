import React from 'react'
import router, { useRouter } from 'next/router'

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
  const { locale, locales, defaultLocale, asPath } = useRouter()
  const { title, user, launch, content } = welcomes[locale]

  return (
    <div className="items-center text-center">
      <button
        onClick={() => {
          router.push('/nft/id')
        }}
        className=" h-16 items-center justify-center rounded-full bg-gray-100 px-4 text-center text-xl font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      >
        {launch}
      </button>{' '}
      <div className="mt-8">
        <span className="text-2xl text-red-900">{title}</span>
        <div className="flex-grow border-t border-gray-400 p-1"></div>
        {user}
      </div>
    </div>
  )
}

export default Locales
