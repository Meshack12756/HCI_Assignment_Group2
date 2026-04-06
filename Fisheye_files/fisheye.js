/* ============================================
   Fisheye Interactive Explorer - JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".heuristic-card");
    const lens = document.getElementById("fisheyeLens");
    const overlay = document.getElementById("detailOverlay");
    const closeBtn = document.getElementById("closeBtn");

    const detailNumber = document.getElementById("detailNumber");
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailExample = document.getElementById("detailExample");

    /* ============================================
       DATA FOR NIELSEN HEURISTICS
       ============================================ */

    const heuristics = [
        {
            title: "Visibility of System Status",
            description: "Keep users informed about what is happening through timely and appropriate feedback.",
            example: "A file upload progress bar showing percentage complete."
        },
        {
            title: "Match Between System and Real World",
            description: "Use familiar language and real-world concepts that users understand.",
            example: "Using a trash bin icon for delete."
        },
        {
            title: "User Control and Freedom",
            description: "Users should be able to undo and redo actions easily.",
            example: "Undo button in text editors."
        },
        {
            title: "Consistency and Standards",
            description: "Follow platform and industry conventions.",
            example: "Save icon remains the same across apps."
        },
        {
            title: "Error Prevention",
            description: "Design systems that prevent errors before they occur.",
            example: "Confirm before deleting a file."
        },
        {
            title: "Recognition Rather Than Recall",
            description: "Reduce memory load by making options visible.",
            example: "Dropdown menu instead of remembering commands."
        },
        {
            title: "Flexibility and Efficiency of Use",
            description: "Provide shortcuts for experienced users.",
            example: "Keyboard shortcuts like Ctrl + C."
        },
        {
            title: "Aesthetic and Minimalist Design",
            description: "Avoid unnecessary information and clutter.",
            example: "Clean dashboard with only important data."
        },
        {
            title: "Help Users Recognize and Recover from Errors",
            description: "Error messages should be clear and helpful.",
            example: "Incorrect password message with reset option."
        },
        {
            title: "Help and Documentation",
            description: "Provide accessible help and guidance.",
            example: "Help center or FAQ section."
        }
    ];

    /* ============================================
       FISHEYE LENS MOVEMENT
       ============================================ */

    document.addEventListener("mousemove", (e) => {

        lens.classList.add("active");

        lens.style.left = e.clientX + "px";
        lens.style.top = e.clientY + "px";

        cards.forEach(card => {

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

            const maxDistance = 250;
            const scale = Math.max(1, 1.2 - distance / maxDistance);

            card.style.transform = `scale(${scale})`;
        });
    });

    document.addEventListener("mouseleave", () => {
        lens.classList.remove("active");
    });

    /* ============================================
       HOVER GLOW EFFECT
       ============================================ */

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty("--mouse-x", `${x}%`);
            card.style.setProperty("--mouse-y", `${y}%`);
        });

    });

    /* ============================================
       CLICK TO OPEN DETAILS
       ============================================ */

    cards.forEach((card, index) => {

        card.addEventListener("click", () => {

            /* remove previous active */
            cards.forEach(c => c.classList.remove("active"));

            /* activate current */
            card.classList.add("active");

            /* set details */
            detailNumber.textContent = index + 1;
            detailTitle.textContent = heuristics[index].title;
            detailDescription.textContent = heuristics[index].description;
            detailExample.textContent = heuristics[index].example;

            /* show overlay */
            overlay.classList.add("active");
        });

    });

    /* ============================================
       CLOSE MODAL
       ============================================ */

    closeBtn.addEventListener("click", () => {

        overlay.classList.remove("active");

        cards.forEach(c => c.classList.remove("active"));
    });

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {
            overlay.classList.remove("active");
            cards.forEach(c => c.classList.remove("active"));
        }

    });

    /* ============================================
       ESC KEY CLOSE
       ============================================ */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {
            overlay.classList.remove("active");
            cards.forEach(c => c.classList.remove("active"));
        }

    });

});
