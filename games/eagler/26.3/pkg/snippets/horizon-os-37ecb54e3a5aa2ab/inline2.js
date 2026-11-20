
let pageModule, pageMemory;
function start(ptr, name, stack) {
    // The page names the script by this build's hashes (main.js), so a cache
    // can't hand a worker another build's glue.
    const worker = new Worker(new URL(globalThis.horizonWorkerScript ?? "worker.js", location.href), { type: "module", name });
    // A thread this worker starts: the page starts it. Its sockets live on
    // the page too (net.rs).
    worker.onmessage = ({ data }) =>
        data.socket ? globalThis.horizonSocket(data) : start(data.ptr, data.name, data.stack);
    worker.onerror = (e) => console.error(`Horizon: thread ${name} failed: ${e.message ?? e}`);
    worker.postMessage({ module: pageModule, memory: pageMemory, ptr, name, stack });
}
export function horizon_spawn_worker(module, memory, ptr, name, stack) {
    if (typeof window === "undefined") {
        self.postMessage({ ptr, name, stack });
    } else {
        pageModule = module;
        pageMemory = memory;
        start(ptr, name, stack);
    }
}
export function horizon_hardware_concurrency() {
    return navigator.hardwareConcurrency || 1;
}
