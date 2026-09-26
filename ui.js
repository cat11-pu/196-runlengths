// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，点按钮看等值段。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.segments.forEach(function (segment, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 段";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, segment.length * 20) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "值 " + segment.value + " 出现 " + segment.length + " 次";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "段数 " + view.count + "，最长段 " + view.longest;
    parts.log.textContent = "段长之和 " + view.total;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "切等值段";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一个相同值";
  addButton.addEventListener("click", function () {
    const list = spec.values || [];
    spec.values = list.concat([list[list.length - 1]]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.values = (spec.values || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "5";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { values: (spec.values || []).concat([parsed]) }));
        parts.out.textContent = "加入 " + parsed + " 后段数 " + view.count + "，最长段 " + view.longest;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看段数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "段数 " + view.count + "，最长段 " + view.longest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
