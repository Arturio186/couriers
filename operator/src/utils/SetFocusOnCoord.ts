const SetFocusOnCoord = (mapRef: React.MutableRefObject<ymaps.Map | null>, lat: number, long: number) => {
    if (lat === -1 || long === -1) {
        return
    }
    
    if (mapRef.current?.setCenter) {
        mapRef.current.setCenter([lat, long], mapRef.current.getZoom(), {
            duration: 300
        })
    }
}

export default SetFocusOnCoord;