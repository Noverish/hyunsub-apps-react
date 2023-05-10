import * as StompJS from '@stomp/stompjs';
import { useEffect, useState } from 'react';

import { isDev } from 'src/utils';

export default function useWebSocket() {
  const [client, setClient] = useState<StompJS.Client>();

  useEffect(() => {
    const stomp = new StompJS.Client({
      brokerURL: `wss://${window.location.host}/socket`,
      debug: function (str) {
        if (isDev()) {
          console.log(str);
        }
      },
    });

    stomp.activate();
    setClient(stomp);

    return () => {
      stomp.deactivate();
      setClient(undefined);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      client?.publish({
        destination: `/ping`,
        body: 'ping',
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [client]);

  return client;
}
