// add __mswStart to globalThis
interface Window {
	__mswStart: Promise<ServiceWorkerRegistration | undefined>;
}
