async function initMocks() {
	const { worker } = await import("./browser");
	return await worker.start();
}

window.__mswStart = initMocks();

export {};
