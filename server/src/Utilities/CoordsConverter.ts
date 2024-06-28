import wkx from 'wkx';
import ICoords from '../Interfaces/ICoord';

interface DecodedCoords {
    type: string;
    coordinates: [number, number]
}

const CoordsConverter = (wkbCoords: string) => {
    const buffer = Buffer.from(wkbCoords, 'hex');
    const geometry = wkx.Geometry.parse(buffer);
    const decodedCoords = geometry.toGeoJSON() as DecodedCoords;

    return {
        lat: decodedCoords.coordinates[1], 
        long: decodedCoords.coordinates[0], 
    } as ICoords;
}

export default CoordsConverter;