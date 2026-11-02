document.addEventListener("DOMContentLoaded", () => {
  const range = document.getElementById("mobility-range");
  if (!range) return;

  const handle = range.querySelector(".range__handle");
  const fill = range.querySelector(".range__fill");
  const stages = document.querySelectorAll(".mobility__stage");
  const startLeft = handle.offsetLeft; // стартове положення ручки з макету — це перший етап

  // Три етапи фото: показуємо етап, найближчий до положення ручки; зміна — плавна прозорість (CSS)
  const showStages = (progress) => {
    const active = Math.round(progress * (stages.length - 1));
    stages.forEach((img, i) => img.classList.toggle("is-visible", i === active));
  };

  // Ставимо ручку так, щоб її центр був під пальцем; заливка доходить до правого краю ручки
  const setPosition = (clientX) => {
    const rect = range.getBoundingClientRect();
    const handleWidth = handle.offsetWidth;
    const maxLeft = rect.width - handleWidth;
    const left = Math.min(Math.max(clientX - rect.left - handleWidth / 2, 0), maxLeft);

    handle.style.left = (left / rect.width) * 100 + "%";
    fill.style.width = ((left + handleWidth) / rect.width) * 100 + "%";
    showStages(Math.max(0, (left - startLeft) / (maxLeft - startLeft)));
  };

  range.addEventListener("pointerdown", (e) => {
    range.classList.add("is-dragging");
    range.setPointerCapture(e.pointerId);
    setPosition(e.clientX);
  });

  range.addEventListener("pointermove", (e) => {
    if (!range.classList.contains("is-dragging")) return;
    setPosition(e.clientX);
  });

  const stopDrag = () => range.classList.remove("is-dragging");
  range.addEventListener("pointerup", stopDrag);
  range.addEventListener("pointercancel", stopDrag);
});
