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
      const bodyBg = document.body.style.backgroundColor;
      const originalTwitBg = twit.style.backgroundColor;
      const originalTwitTransitionStyle = twit.style.transition;

      twit.style.backgroundColor = bodyBg;
      twit.style.transition = "none";

      toBlob(twit).then((blob) => {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      });
      menu.remove();

      twit.style.backgroundColor = originalTwitBg;
      twit.style.transition = originalTwitTransitionStyle;
    });

    lastMenuItem.classList.forEach((className) => {
      button.classList.add(className);
    });

    lastMenuItem.after(button);
  }, 100);
});
