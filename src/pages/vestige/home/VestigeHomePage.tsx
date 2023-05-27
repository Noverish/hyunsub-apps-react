import { useNaverMap, useNaverMapPolyline } from '../VestigeNaverMapHooks';

export default function VestigeHomePage() {
  const map = useNaverMap('map');

  useNaverMapPolyline(map);

  return (
    <div className="VestigeHomePage">
      <h1>Hello, World!</h1>
      <div id="map" style={{ width: '50vw', height: '50vh' }}></div>
    </div>
  );
}
