
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

    game.settings.register("what-template", "showFullPath", {
        name: `"what-template-showFullPath`,
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    });
})
Hooks.on("renderApplication", (app, html) => {
    setTimeout(() => {
        document.querySelectorAll(`[data-template-path], [style*="modules/"]`).forEach(element => {
            const cssEnd = [...element.style.cssText.matchAll(/modules\/[a-zA-Z-\/.0-9]*/gm)].join(",");
            let tooltip = (element.getAttribute("data-template-path") ?? cssEnd);
            if (tooltip.includes("modules") && game.settings.get("what-template", "showFullPath")) {
                tooltip = tooltip.split("modules/")[1].split("/")[0];
            }
            if (!element.getAttribute("data-tooltip")?.endsWith(tooltip)) {
                element.setAttribute("data-tooltip", (element.getAttribute("data-template-tooltip") ?? "" + tooltip));
            }
        })
    }, 500);
})