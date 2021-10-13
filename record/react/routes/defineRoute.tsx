

export const globalRouteViewLink = new Map()





export function defineRoute(path: string, component: any) {
	globalRouteViewLink.set(path, component)
}