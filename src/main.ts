import h from "hyperscript";
console.log({ h });

document.querySelector<HTMLDivElement>("#app")!.appendChild(h("div", "Hello!"));
