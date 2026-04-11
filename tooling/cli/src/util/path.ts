// Tiny POSIX path helpers so the CLI can avoid depending on `node:path`.
// Scope is limited to what the CLI actually uses: join, dirname, resolve.
// macOS and Linux only — no Windows separator handling.

export function join(...parts: readonly string[]): string {
	const filtered = parts.filter((p) => p.length > 0);
	if (filtered.length === 0) return ".";
	return filtered.join("/").replace(/\/+/g, "/");
}

export function dirname(p: string): string {
	if (p.length === 0) return ".";
	let end = p.length;
	while (end > 1 && p[end - 1] === "/") end--;
	const trimmed = p.slice(0, end);
	const idx = trimmed.lastIndexOf("/");
	if (idx === -1) return ".";
	if (idx === 0) return "/";
	return trimmed.slice(0, idx);
}

export function resolve(...parts: readonly string[]): string {
	let resolved = "";
	let isAbsolute = false;
	for (let i = parts.length - 1; i >= 0 && !isAbsolute; i--) {
		const part = parts[i];
		if (!part) continue;
		resolved = resolved.length === 0 ? part : `${part}/${resolved}`;
		isAbsolute = part.startsWith("/");
	}
	if (!isAbsolute) {
		resolved = resolved.length === 0
			? process.cwd()
			: `${process.cwd()}/${resolved}`;
	}
	const out: string[] = [];
	for (const seg of resolved.split("/")) {
		if (seg === "" || seg === ".") continue;
		if (seg === "..") {
			out.pop();
			continue;
		}
		out.push(seg);
	}
	return `/${out.join("/")}`;
}
