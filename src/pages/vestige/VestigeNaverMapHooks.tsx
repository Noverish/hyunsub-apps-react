import { useEffect, useState } from 'react';

let map: naver.maps.Map | null = null;

export function useNaverMap(elementId: string): naver.maps.Map | null {
  const [state, setState] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!map) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3701185, 127.1156021),
        zoom: 15,
      };

      map = new naver.maps.Map(elementId, mapOptions);
    }

    setState(map);

    return () => {
      if (!map) return;

      map.destroy();
      map = null;
      setState(null);
    };
  }, [elementId]);

  return state;
}

export function useNaverMapPolyline(map: naver.maps.Map | null) {
  useEffect(() => {
    if (!map) {
      return;
    }

    new naver.maps.Polyline({
      map: map,
      path: [
        new naver.maps.LatLng(37.359924641705476, 127.1148204803467),
        new naver.maps.LatLng(37.36343797188166, 127.11486339569092),
        new naver.maps.LatLng(37.368520071054576, 127.11473464965819),
        new naver.maps.LatLng(37.3685882848096, 127.1088123321533),
        new naver.maps.LatLng(37.37295383612657, 127.10876941680907),
        new naver.maps.LatLng(37.38001321351567, 127.11851119995116),
        new naver.maps.LatLng(37.378546827477855, 127.11984157562254),
        new naver.maps.LatLng(37.376637072444105, 127.12052822113036),
        new naver.maps.LatLng(37.37530703574853, 127.12190151214598),
        new naver.maps.LatLng(37.371657839593894, 127.11645126342773),
        new naver.maps.LatLng(37.36855417793982, 127.1207857131958),
      ],
      strokeWeight: 4
    });
  }, [map]);
}
