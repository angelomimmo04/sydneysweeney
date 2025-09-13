import { useState, useRef } from "react";

export function useTracking(onLocationChange) {
    const [coords, setCoords] = useState({ lat: null, lon: null, accuracy: null });
    const [locationName, setLocationName] = useState("--");
    const [status, setStatus] = useState("Attendere il rilevamento...");
    const watchId = useRef(null);


    // logica zones
    const zones = [
        {
            name: "Radio Frequenza Libera",
            points: [
                {lat: 41.108692, lon: 16.879609},
                {lat: 41.108730, lon: 16.879755},
                {lat: 41.108786, lon: 16.879728},
                {lat: 41.108755, lon: 16.879577}
            ]
        },
        {
            name: "Cortile",
            points: [
                {lat: 41.108673, lon: 16.879576},
                {lat: 41.108783, lon: 16.879986},
                {lat: 41.108458, lon: 16.879681},
                {lat: 41.108567, lon: 16.880080}
            ]
        },
        {
            name: "Aula Magna",
            points: [
                {lat: 41.108799, lon: 16.879576},
                {lat: 41.108883, lon: 16.879879},
                {lat: 41.109108, lon: 16.879768},
                {lat: 41.109027, lon: 16.879464}
            ]
        },
        {
            name: "Atrio",
            points: [
                {lat: 41.108756, lon: 16.879479},
                {lat: 41.108994, lon: 16.879349},
                {lat: 41.108822, lon: 16.878692},
                {lat: 41.108576, lon: 16.878814}
            ]
        },
        {
            name: "Student",
            points: [
                {lat: 41.107916, lon: 16.879212},
                {lat: 41.107828, lon: 16.879256},
                {lat: 41.107993, lon: 16.879824},
                {lat: 41.108066, lon: 16.879789}
            ]
        },
        {
            name: "Corridoio Aule A-I",
            points: [
                {lat: 41.108545, lon: 16.878755},
                {lat: 41.108572, lon: 16.878882},
                {lat: 41.107832, lon: 16.879246},
                {lat: 41.107794, lon: 16.879114}
            ]
        },
        {
            name: "Corridoio Aule D-L",
            points: [
                {lat: 41.108001, lon: 16.879827},
                {lat: 41.108034, lon: 16.879960},
                {lat: 41.108678, lon: 16.879564},
                {lat: 41.108727, lon: 16.879472}
            ]
        },
        {
            name: "Bar",
            points: [
                {lat: 41.108673, lon: 16.879233},
                {lat: 41.108560, lon: 16.879272},
                {lat: 41.108520, lon: 16.879117},
                {lat: 41.108614, lon: 16.879067}
            ]
        },
        {
            name: "Poli library",
            points: [
                {lat: 41.108125, lon: 16.878818},
                {lat: 41.108101, lon: 16.878692},
                {lat: 41.108560, lon: 16.878464},
                {lat: 41.108583, lon: 16.878589}
            ]
        },
        {
            name: "DEI",
            points: [
                {lat: 41.108722, lon: 16.878216},
                {lat: 41.108694, lon: 16.878092},
                {lat: 41.109402, lon: 16.877741},
                {lat: 41.109439, lon: 16.877872}
            ]
        },
        {
            name: "casa dell'acqua",
            points: [
                {lat: 41.109148, lon: 16.879921},
                {lat: 41.109617, lon: 16.879698},
                {lat: 41.109521, lon: 16.879375},
                {lat: 41.109075, lon: 16.879595}
            ]
        },
        {
            name: "entrata re david",
            points: [
                {lat: 41.109250, lon: 16.877026},
                {lat: 41.109400, lon: 16.877711},
                {lat: 41.108578, lon: 16.878119},
                {lat: 41.108384, lon: 16.877381}
            ]
        },
        {
            name: "entrata orabona",
            points: [
                {lat: 41.107868, lon: 16.880086},
                {lat: 41.108473, lon: 16.879745},
                {lat: 41.108052, lon: 16.880669},
                {lat: 41.108612, lon: 16.880293}
            ]
        },
        {
            name: "architettura",
            points: [
                {lat: 41.109040, lon: 16.878583},
                {lat: 41.109202, lon: 16.879194},
                {lat: 41.109690, lon: 16.878965},
                {lat: 41.109522, lon: 16.878368}
            ]
        },
        {
            name: "classi A-C",
            points: [
                {lat: 41.108621, lon: 16.879055},
                {lat: 41.108577, lon: 16.878891},
                {lat: 41.108258, lon: 16.879048},
                {lat: 41.108314, lon: 16.879241}
            ]
        },
        {
            name: "classi G-I",
            points: [
                {lat: 41.108211, lon: 16.879072},
                {lat: 41.108275, lon: 16.879299},
                {lat: 41.107929, lon: 16.879213},
                {lat: 41.107982, lon: 16.879417}
            ]
        },
        {
            name: "classi D-AM",
            points: [
                {lat: 41.108680, lon: 16.879264},
                {lat: 41.108726, lon: 16.879444},
                {lat: 41.108354, lon: 16.879399},
                {lat: 41.108414, lon: 16.879611}
            ]
        },
        {
            name: "classi L-N",
            points: [
                {lat: 41.108371, lon: 16.879628},
                {lat: 41.108308, lon: 16.879429},
                {lat: 41.108068, lon: 16.879773},
                {lat: 41.108021, lon: 16.879573}
            ]
        },
        {
            name: "control room",
            points: [
                {lat: 41.108735, lon: 16.878516},
                {lat: 41.108624, lon: 16.878130},
                {lat: 41.108487, lon: 16.878194},
                {lat: 41.108519, lon: 16.878317}
            ]
        }
    ];

    function isInsidePolygon(lat, lon, polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].lat, yi = polygon[i].lon;
            const xj = polygon[j].lat, yj = polygon[j].lon;
            const intersect = ((yi > lon) !== (yj > lon)) &&
                (lat < (xj - xi) * (lon - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function pointToSegmentDistance(lat, lon, lat1, lon1, lat2, lon2) {
        const toRad = Math.PI / 180;
        const x0 = lon * toRad, y0 = lat * toRad;
        const x1 = lon1 * toRad, y1 = lat1 * toRad;
        const x2 = lon2 * toRad, y2 = lat2 * toRad;
        const A = x0 - x1, B = y0 - y1;
        const C = x2 - x1, D = y2 - y1;
        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        const param = len_sq !== 0 ? dot / len_sq : -1;
        let xx, yy;
        if (param < 0) { xx = x1; yy = y1; }
        else if (param > 1) { xx = x2; yy = y2; }
        else { xx = x1 + param * C; yy = y1 + param * D; }
        const dx = x0 - xx, dy = y0 - yy;
        return 6371 * Math.sqrt(dx * dx + dy * dy);
    }

    function distanceToPolygon(lat, lon, polygon) {
        let minDist = Infinity;
        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];
            const dist = pointToSegmentDistance(lat, lon, p1.lat, p1.lon, p2.lat, p2.lon);
            if (dist < minDist) minDist = dist;
        }
        return minDist;
    }

    const startTracking = () => {
        if (!navigator.geolocation) {
            setStatus("Geolocalizzazione non supportata");
            return;
        }
        if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);

        setStatus("Monitoraggio attivo...");
        setCoords({ lat: null, lon: null, accuracy: null });
        setLocationName("--");

        let lastZoneName = null;
        let stabilityCounter = 0;
        const stabilityThreshold = 3;

        watchId.current = navigator.geolocation.watchPosition(
            (position) => {
                const lat = 41.107978;
                const lon = 16.879692;
                //const lat = position.coords.latitude;
                //const lon = position.coords.longitude;

                const accuracy = position.coords.accuracy;

                setCoords({ lat, lon, accuracy });


                let insideZones = [];
                let nearZones = [];

                for (const zone of zones) {
                    const inside = isInsidePolygon(lat, lon, zone.points);
                    const edgeDist = distanceToPolygon(lat, lon, zone.points);

                    if (inside) insideZones.push({ zone, edgeDist });
                    else if (edgeDist < 0.02) nearZones.push({ zone, edgeDist });
                }

                let currentZoneName = "Fuori dalle aree conosciute";
                if (insideZones.length > 0) {
                    insideZones.sort((a, b) => a.edgeDist - b.edgeDist);
                    currentZoneName = insideZones[0].zone.name;
                } else if (nearZones.length > 0) {
                    nearZones.sort((a, b) => a.edgeDist - b.edgeDist);
                    currentZoneName = "Vicino a: " + nearZones[0].zone.name;
                }

                if (currentZoneName === lastZoneName) stabilityCounter++;
                else { lastZoneName = currentZoneName; stabilityCounter = 1; }

                if (stabilityCounter >= stabilityThreshold) {
                    setLocationName(currentZoneName);
                    setStatus("✅ Posizione rilevata");
                    if (onLocationChange) onLocationChange(currentZoneName);
                }
            },
            (error) => {
                setCoords({ lat: null, lon: null, accuracy: null });
                setLocationName("--");
                setStatus("❌ Errore posizione");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const stopTracking = () => {
        if (watchId.current !== null) {
            navigator.geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
        setCoords({ lat: null, lon: null, accuracy: null });
        setLocationName("--");
        setStatus("⏹️ Monitoraggio fermato");
    };

    return { coords, locationName, status, startTracking, stopTracking };
}
