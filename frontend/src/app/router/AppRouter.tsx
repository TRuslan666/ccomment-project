import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/config/routes'
import { AppLayout } from '../layouts/AppLayout'
import HomePage from '@/pages/HomePage'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { ClassifyPage } from '@/pages/classify'
import { HistoryPage } from '@/pages/history'

/** Таблица маршрутов приложения. Все страницы выводятся внутри общего AppLayout. */
export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route path={ROUTES.classify} element={<ClassifyPage />} />
        <Route path={ROUTES.history} element={<HistoryPage />} />
      </Route>
    </Routes>
  )
}