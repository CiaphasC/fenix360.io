import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginRegistered = false;

export function useGsapSetup(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    setIsReady(true);
  }, []);

  return isReady;
}
