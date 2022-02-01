const compareValue = (A, B, sortBoxIndex, color = 'red') => {
    selectValue(A, sortBoxIndex, color);
    selectValue(B, sortBoxIndex, color);
};
const selectValue = (A, sortBoxIndex, color = 'royalblue') => {
    makeTransition(A, sortBoxIndex, 'background-color', color, animationlimit.normalizedInversed / 2);
};
const finalizeValue = async (A, wait = true, color = 'lightgreen') => {
    const c = A.style.backgroundColor;
    A.style.backgroundColor = color;
    if (wait) {
        await new Promise(r => setTimeout(r, constDelay));
    }
    return c;
};

function updateHoriValue(sortBoxIndex, value, option = 'both') {
    const container = sortBoxesContainer[sortBoxIndex];
    const boxWidth = sortBoxesConstants[sortBoxIndex].boxWidth;
    sortBoxesConstants[sortBoxIndex].horiMul = value;
    if (option == 'both' || option == 'right') {
        container.style.setProperty('--rightvelocity', + (boxWidth * sortBoxesConstants[sortBoxIndex].horiMul) + 'px');
    } if (option == 'both' || option == 'left') {
        container.style.setProperty('--leftvelocity', + (boxWidth * sortBoxesConstants[sortBoxIndex].horiMul) * -1 + 'px');
    }
}
function resetHoriValue(sortBoxIndex, value = 1, option = 'both') {
    const container = sortBoxesContainer[sortBoxIndex];
    const boxWidth = sortBoxesConstants[sortBoxIndex].boxWidth;
    sortBoxesConstants[sortBoxIndex].horiMul = value;
    if (option == 'both' || option == 'right') {
        container.style.setProperty('--rightvelocity', + (boxWidth * sortBoxesConstants[sortBoxIndex].horiMul) + 'px');
    } if (option == 'both' || option == 'left') {
        container.style.setProperty('--leftvelocity', + (boxWidth * sortBoxesConstants[sortBoxIndex].horiMul) * -1 + 'px');
    }
}
function updateVertValue(sortBoxIndex, value, option) {
    const container = sortBoxesContainer[sortBoxIndex];
    const keepValue = sortBoxesConstants[sortBoxIndex].verTop;
    sortBoxesConstants[sortBoxIndex].verTop = value;
    if (option == 'both' || option == 'up') {
        container.style.setProperty('--upvelocity', sortBoxesConstants[sortBoxIndex].verTop * -1 + 'px');
    }
    if (option == 'both' || option == 'down') {
        container.style.setProperty('--downvelocity', sortBoxesConstants[sortBoxIndex].verTop + 'px');
    }
    return keepValue;
}
function resetVertValue(sortBoxIndex, value, option) {
    const container = sortBoxesContainer[sortBoxIndex];
    sortBoxesConstants[sortBoxIndex].verTop = value;
    if (option == 'both' || option == 'up') {
        container.style.setProperty('--upvelocity', sortBoxesConstants[sortBoxIndex].verTop * -1 + 'px');
    }
    if (option == 'both' || option == 'down') {
        container.style.setProperty('--downvelocity', sortBoxesConstants[sortBoxIndex].verTop + 'px');
    }
}
function setLimitSwap(absDiv) {
    const value = animationlimit.normalizedInversedFor2secs;
    const newDelay = absDiv > 0 ? value / 6 : value / 2;
    return newDelay;
}
async function swap(boxNodesArray, sortBoxIndex, numberArray, A, B, force = false) {

    if (force || numberArray[A] > numberArray[B]) {

        [numberArray[A], numberArray[B]] = [numberArray[B], numberArray[A]];

        const boxWidth = sortBoxesConstants[sortBoxIndex].boxWidth;
        const div = Math.floor((boxNodesArray[B].offsetLeft - boxNodesArray[A].offsetLeft) / boxWidth);
        const absDiv = Math.abs(div);

        let newDelay = setLimitSwap(absDiv);
        const velocity = animationlimit.velocity;

        if (velocity != animationlimit.fast && velocity != animationlimit.fastest)
            await playMotion(sortBoxIndex, boxNodesArray[A], 'moveup', newDelay);
        else if (velocity == animationlimit.fast) {
            boxNodesArray[A].style.top = boxNodesArray[A].offsetTop - sortBoxesConstants[sortBoxIndex].verTop + 'px';

            await new Promise(r => setTimeout(r, constDelay));
        }
        if (absDiv > 0) {

            if (velocity != animationlimit.fast && velocity != animationlimit.fastest)
                await playMotion(sortBoxIndex, boxNodesArray[B], 'moveup', newDelay);
            else if (velocity == animationlimit.fast) {
                boxNodesArray[B].style.top = boxNodesArray[B].offsetTop - sortBoxesConstants[sortBoxIndex].verTop + 'px';

                await new Promise(r => setTimeout(r, constDelay));
            }

            boxNodesArray[B].style.zIndex = 1;
            updateHoriValue(sortBoxIndex, absDiv);
            if (velocity == animationlimit.fastest) {
                if (div > 0) {
                    boxNodesArray[B].style.left = boxNodesArray[B].offsetLeft - boxWidth * sortBoxesConstants[sortBoxIndex].horiMul + 'px';
                } else {
                    boxNodesArray[B].style.left = boxNodesArray[B].offsetLeft + boxWidth * sortBoxesConstants[sortBoxIndex].horiMul + 'px';
                }
                if (div < 0) {
                    boxNodesArray[A].style.left = boxNodesArray[A].offsetLeft - boxWidth * sortBoxesConstants[sortBoxIndex].horiMul + 'px';
                } else {
                    boxNodesArray[A].style.left = boxNodesArray[A].offsetLeft + boxWidth * sortBoxesConstants[sortBoxIndex].horiMul + 'px';
                }
                await new Promise(r => setTimeout(r, constDelay));
            }
            else {
                if (velocity == animationlimit.fast)
                    newDelay = constDelay;

                await playMotion(sortBoxIndex, boxNodesArray[B], div > 0 ? 'moveleft' : 'moveright', newDelay);
                await playMotion(sortBoxIndex, boxNodesArray[A], div < 0 ? 'moveleft' : 'moveright', newDelay);
            }
            resetHoriValue(sortBoxIndex);
            boxNodesArray[B].style.zIndex = 0;

            if (velocity != animationlimit.fast && velocity != animationlimit.fastest)
                await playMotion(sortBoxIndex, boxNodesArray[B], 'movedown', newDelay);
            else if (velocity == animationlimit.fast) {
                boxNodesArray[B].style.top = boxNodesArray[B].offsetTop + sortBoxesConstants[sortBoxIndex].verTop + 'px';

                await new Promise(r => setTimeout(r, constDelay));
            }
        }

        if (velocity != animationlimit.fast && velocity != animationlimit.fastest)
            await playMotion(sortBoxIndex, boxNodesArray[A], 'movedown', newDelay);
        else if (velocity == animationlimit.fast) {
            boxNodesArray[A].style.top = boxNodesArray[A].offsetTop + sortBoxesConstants[sortBoxIndex].verTop + 'px';

            await new Promise(r => setTimeout(r, constDelay));
        }


        [boxNodesArray[A], boxNodesArray[B]] = [boxNodesArray[B], boxNodesArray[A]];
    }
}