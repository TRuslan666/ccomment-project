export const ROUTES = {
  home: '/',
  classify: '/classify',
  history: '/history',
  login: '/login',
  register: '/register',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]