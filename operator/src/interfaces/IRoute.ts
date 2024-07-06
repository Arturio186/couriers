import { ReactElement } from "react"

export default interface IRoute {
    path: string
    element: React.ReactNode
    title?: string
    children?: Array<IRoute>
    icon?: ReactElement
}