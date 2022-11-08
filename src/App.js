import React, { useState, useEffect } from 'react';


const initailLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};
let mounted = true;
function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mouseLocation, setMouseLocation] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState(initailLocationState);

  const handleMouseMove = event => {
    setMouseLocation({ x: event.pageX, y: event.pageY });
  };
  const handleOnline = () => {
    setStatus(true);
  }

  const handleOffline = () => {
    setStatus(false);
  };

  const handleLocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };



  useEffect(() => {
    document.title = `You clicked ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.geolocation.getCurrentPosition(handleLocation);
    const watchId = navigator.geolocation.watchPosition(handleLocation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    }
  }, [count]);




  return (
    <>
      <h2>Counter</h2>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>I was clicked {count} times. </button>
      <h2> Toggle Light</h2>
      <div style={{
        height: '50px',
        width: '50px',
        background: isOn ? 'yellow' : 'grey'
      }} onClick={() => { setIsOn(!isOn) }}></div>
      <h2> Mouse Location</h2>
      <p>X:{mouseLocation.x}</p>
      <p>Y: {mouseLocation.y}</p>
      <h3>User Status</h3>
      <p>{status ? 'Online' : 'Offline'}</p>
      <h2>GeoLocation</h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Speed: {speed ? speed : '0'}</p>
    </>
  );
}

export default App;
