
Hooks.on("ready", () => {
    window.renderTemplate = async function renderTemplate(path, data) {
        const template = await getTemplate(path);
        console.log(`RT: ${path}`);
        const t = template(data || {}, {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }).trim();
        const sI = t.indexOf(" ");
        return `${t.slice(0, sI)} data-template-path=${path} ${t.slice(sI)}`
    }

})
Hooks.on("renderApplication", (app, html) => {
    setTimeout(() => {
        document.querySelectorAll(`[data-template-path], [style*="modules/"]`).forEach(element => {
            const cssEnd = [...element.style.cssText.matchAll(/modules\/[a-zA-Z-\/.0-9]*/gm)].join(",");
            if (!element.getAttribute("data-tooltip")?.endsWith(element.getAttribute("data-template-path") && !element.getAttribute("data-tooltip")?.endsWith(cssEnd))) {
                element.setAttribute("data-tooltip", (element.getAttribute("data-template-tooltip") ?? "") + (element.getAttribute("data-template-path") ?? cssEnd));
            }
        })
    }, 500);
})