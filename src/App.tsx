import AppLayout from "./layout/app-layout";
import Index from "./pages";
import Notulensi from "./pages/notulensi-rapat"
import Perjalanan from "./pages/perjalanan-dinas";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'notulensi-rapat',
        element: <Notulensi />
      },
      {
        path: 'perjalanan-dinas',
        element: <Perjalanan />
      }
    ]
  },
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}