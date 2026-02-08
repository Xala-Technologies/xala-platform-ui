/**
 * Type declarations for react-map-gl/mapbox
 *
 * react-map-gl is a peer dependency and may not always be installed.
 * These declarations provide minimal types for compilation.
 */

declare module 'react-map-gl/mapbox' {
  import type { FC, RefObject } from 'react';

  export interface LngLatBoundsLike {
    0: [number, number]; // Southwest [lng, lat]
    1: [number, number]; // Northeast [lng, lat]
  }

  export interface FitBoundsOptions {
    padding?: number | { top?: number; bottom?: number; left?: number; right?: number };
    maxZoom?: number;
    minZoom?: number;
    duration?: number;
    offset?: [number, number];
  }

  export interface MapRef {
    getMap(): mapboxgl.Map;
    getCenter(): { lng: number; lat: number };
    getZoom(): number;
    flyTo(options: { center: [number, number]; zoom?: number; duration?: number }): void;
    fitBounds(bounds: [[number, number], [number, number]], options?: FitBoundsOptions): void;
  }

  export interface ViewState {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch?: number;
    bearing?: number;
  }

  export interface MapProps {
    mapboxAccessToken?: string;
    mapStyle?: string;
    initialViewState?: ViewState;
    style?: React.CSSProperties;
    ref?: RefObject<MapRef>;
    onMove?: (evt: { viewState: ViewState }) => void;
    onLoad?: () => void;
    reuseMaps?: boolean;
    children?: React.ReactNode;
  }

  export interface MarkerEvent {
    originalEvent: MouseEvent;
  }

  export interface MarkerProps {
    longitude: number;
    latitude: number;
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    onClick?: (e: MarkerEvent) => void;
    children?: React.ReactNode;
  }

  export interface NavigationControlProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }

  const Map: FC<MapProps>;
  export default Map;

  export const Marker: FC<MarkerProps>;
  export const NavigationControl: FC<NavigationControlProps>;
}
