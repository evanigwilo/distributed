
const deBounceTools = {
    timeout: false, // holder for timeout id
    delay: 500, // delay after event is "complete" to run callback
    calls: 0,
};
window.addEventListener('resize', function () {
    // clear the timeout
    clearTimeout(deBounceTools.timeout);
    // start timing for event "completion"
    deBounceTools.timeout = setTimeout(() => {
        deBounceTools.calls++;
        console.log('Resize Calls: ' + deBounceTools.calls);
        generateStopButton.click();
    }, deBounceTools.delay);
});
const windowState = {
    height: window.innerHeight,
    width: window.innerWidth,
    px_ratio: window.devicePixelRatio || window.screen.availWidth / root.clientWidth,
    get mediaSize() {
        return getComputedStyle(root).getPropertyValue('--mediasize').trim();
    }
};
function globalAdjust() {
   // console.log(windowState.mediaSize);

    if (isZooming()) return;

    generateOptions.classList.remove('controls__generate__options--transform');

    sortBoxesConstants.forEach(c => {
        const dropIcon = c.sortInput.nextElementSibling;
        const dropList = dropIcon.nextElementSibling;
        dropList.classList.remove('sortbox__select__dropdown--expand');
        dropIcon.classList.remove('sortbox__select__dropdown--rotate');
    });
    sortBoxesAlgoBoard.forEach(aBoard => {
        aBoard.algoTitle.style.width = `calc(${aBoard.algoBoard.scrollWidth}px - var(--main_algorithm_padding) * 2)`;
        for (const c of aBoard.algoSteps.children) {
            c.style.width = `calc(${aBoard.algoBoard.scrollWidth}px - var(--main_algorithm_padding) * 2 - var(--main_algorithm_padding))`;
        }
        aBoard.algoTracker.style.width = aBoard.algoTitle.style.width;
    });
}
function isZooming() {
    const newPx_ratio = window.devicePixelRatio || window.screen.availWidth / root.clientWidth;
    if (newPx_ratio != windowState.px_ratio) {
        windowState.px_ratio = newPx_ratio;
        // console.log("zooming");
        return true;
    } else {
        // console.log("just resizing");
        return false;
    }
}