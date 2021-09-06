const { toBlob } = domtoimage;

document.addEventListener("click", (e) => {
  const menuButton = e.target.closest("[role=button]");

  if (
    menuButton == null ||
    menuButton.getAttribute("aria-haspopup") !== "menu"
  ) {
    return;
  }

  const twit = e.target.closest("article");

  setTimeout(() => {
    const menu = document.querySelector("div[role=menu]");
    const lastMenuItem = menu.querySelector('[role="menuitem"]:last-child');

    const button = document.createElement("button");
    button.innerText = "Copy twit as PNG";

    button.addEventListener("click", () => {
      toBlob(twit).then((blob) => {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      });
      menu.remove();
    });

    lastMenuItem.classList.forEach((className) => {
      button.classList.add(className);
    });

    lastMenuItem.after(button);
  }, 100);
});
