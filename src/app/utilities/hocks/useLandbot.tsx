// hooks/useLandbot.ts
import { useEffect, useRef } from 'react';

interface LandbotConfig {
  configUrl: string;
  autoLoad?: boolean; // Si debe cargar inmediatamente o esperar interacción
}

interface UseLandbotReturn {
  initLandbot: () => void;
  isLoaded: boolean;
}

const useLandbot = (config: LandbotConfig): UseLandbotReturn => {
  const landbotInitialized = useRef<boolean>(false);
  const isLoadedRef = useRef<boolean>(false);

  const initLandbot = () => {
    if (!landbotInitialized.current) {
      landbotInitialized.current = true;
      
      const script = document.createElement('script');
      script.type = 'module';
      script.async = true;
      
      script.addEventListener('load', () => {
        try {
          const LandbotClass = (window as any).Landbot;
          if (LandbotClass && LandbotClass.Livechat) {
            new LandbotClass.Livechat({
              configUrl: config.configUrl,
            });
            isLoadedRef.current = true;
          }
        } catch (error) {
          console.error('Error inicializando Landbot:', error);
          landbotInitialized.current = false;
        }
      });
      
      script.addEventListener('error', () => {
        console.error('Error cargando script de Landbot');
        landbotInitialized.current = false;
      });
      
      script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    }
  };

  useEffect(() => {
    if (config.autoLoad) {
      initLandbot();
    } else {
      const handleMouseOver = () => {
        initLandbot();
        cleanup();
      };

      const handleTouchStart = () => {
        initLandbot();
        cleanup();
      };

      const cleanup = () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('touchstart', handleTouchStart);
      };

      document.addEventListener('mouseover', handleMouseOver, { once: true });
      document.addEventListener('touchstart', handleTouchStart, { once: true });

      return cleanup;
    }
  }, [config.configUrl, config.autoLoad]);

  return {
    initLandbot,
    isLoaded: isLoadedRef.current
  };
};

export default useLandbot;