declare function print(...args: string[]): void;

declare function registerShortcut(
  name: string,
  description: string,
  keySequence: string,
  callback: () => void
): void;


// Geometry type for rectangles and points
declare class Geometry {
  x: number;
  y: number;
  width: number;
  height: number;
}


// Signal connection interface to mimic signal.connect(fn)
declare class Signal<TArgs extends any[] = any[]> {
  connect(fn: (...args: TArgs) => void): void;
}



declare class Client {
  resourceClass: string;       // WM_CLASS resource class string
  resourceName: string;
  windowRole: string;
  windowType: number;          // Enum value for window type
  desktop: number;             // Virtual desktop number
  screen: number;              // Screen number
  geometry: Geometry;
  frameGeometry: Geometry;
  normalGeometry: Geometry;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFullScreen: boolean;
  isOnAllDesktops: boolean;
  isMovable: boolean;
  isResizable: boolean;
  opacity: number;             // Opacity (0 to 1)
  hasAlpha: boolean;
  clientMachine: string;       // Hostname from WM_CLIENT_MACHINE
  caption: string;
  closed: Signal<[]>;
  geometryChanged: Signal<[]>;

  // METHODS
  static move(x: number, y: number): void;
  static resize(width: number, height: number): void;
  static raise(): void;
  static activate(): void;
  static close(): void;
  static kill(): void;
  static showOutline(): void;
  static hideOutline(): void;
  static isWaylandClient(): boolean;
  static isX11Client(): boolean;
}

declare const workspace: {
  // PARAMS
  activeClient: Client | null;
  activeScreen: number;
  activeDesktop: number;
  numberOfDesktops: number;
  numberOfScreens: number;
  keysPressed: string[];
  clientAdded: Signal<[Client]>;
  clientRemoved: Signal<[Client]>;
  activeClientChanged: Signal<[]>;

  // METHODS
  raiseWindow(client: Client): void;
  activateClient(client: Client, option?: boolean): void;
  moveClientToDesktop(client: Client, desktop: number): void;
  moveClientToScreen(client: Client, screen: number): void;
  sendClientToScreen(client: Client, screen: number): void;
  switchDesktop(desktop: number): void;
  switchScreen(screen: number): void;
  windowList(): Client[];
  tiledClients(): Client[];
  raiseWindowToTop(client: Client): void;
  clientFilter(filterFn: (client: Client) => boolean): Client[];
}
