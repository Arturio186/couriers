export default interface IRoute {
    path: string
    element: React.ReactNode
    title?: string
    children?: Array<IRoute>
}