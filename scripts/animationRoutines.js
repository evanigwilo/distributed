const mapTransitionProperty = {};

const animationlimit = {
    slowest: 'slowest',
    slow: 'slow',
    normal: 'normal',
    fast: 'fast',
    fastest: 'fastest',
    get velocity() {
        const newMax = +slider.max - +slider.min;
        const steps = +slider.value * 5 / newMax; // 0 -> 5
        // console.log(steps, animationlimit.normalizedInversedFor2secs, slider.value);
        if (steps <= 1)
            return animationlimit.slowest;
        else if (steps <= 2)
            return animationlimit.slow;
        else if (steps <= 3)
            return animationlimit.normal;
        else if (steps <= 4)
            return animationlimit.fast;
        else
            return animationlimit.fastest;
    },
    velocityValue: (velocity) => {
        const newMax = +slider.max - +slider.min;
        const steps = newMax / 5;
        if (velocity == animationlimit.slowest)
            return steps * 1 / 2;
        else if (velocity == animationlimit.slow)
            return steps * (1 + 2) / 2;
        else if (velocity == animationlimit.normal)
            return steps * (2 + 3) / 2;
        else if (velocity == animationlimit.fast)
            return steps * (3 + 2) / 2;
        else if (velocity == animationlimit.fastest)
            return steps * (4 + 2) / 2;
    },
    get normalized() {
        const newMax = +slider.max - +slider.min;
        return +slider.value / newMax;// 0...1
    },
    get normalizedInversed() {
        const newMax = +slider.max - +slider.min;
        return inverse = 1 - +slider.value / newMax;// 1...0
    },
    get normalizedInversedFor2secs() {
        const newMax = +slider.max - +slider.min;
        return inverse = 2 * (1 - +slider.value / newMax);// 2...0
    },
};

function animationStart(e, newLi) {
    const index = parseInt(newLi.getAttribute('data-sortindex'));
    sortBoxesConstants[index].animationPlaying = true;
}
function animationEnd(e, newLi) {
    const index = parseInt(newLi.getAttribute('data-sortindex'));
    const constants = sortBoxesConstants[index];

    if (e.animationName == 'moveup') {
        newLi.style.top = newLi.offsetTop - constants.verTop + 'px';
        newLi.style.animation = '';
    }
    else if (e.animationName == 'movedown') {
        newLi.style.top = newLi.offsetTop + constants.verTop + 'px';
        newLi.style.animation = '';
    }
    else if (e.animationName == 'moveright') {
        newLi.style.left = newLi.offsetLeft + constants.boxWidth * constants.horiMul + 'px';
        newLi.style.animation = '';
    }
    else if (e.animationName == 'moveleft') {
        newLi.style.left = newLi.offsetLeft - constants.boxWidth * constants.horiMul + 'px';
        newLi.style.animation = '';
    }
    else if (e.animationName == 'transheight') {
        newLi.style.height = getComputedStyle(sortBoxesContainer[index]).getPropertyValue('--transheight');
        newLi.style.animation = '';
    }

    constants.animationPlaying = false;
}
function transitionEnd(e, newLi) {
    //const index = parseInt(newLi.getAttribute('data-sortindex'));
    const attribute = newLi.getAttribute('data-trans') || '';
    const property = e.propertyName;

    if (attribute == 'moveleft') {
        newLi.style.left = newLi.offsetLeft - boxWidth * horiMul + 'px';
        newLi.classList.remove('moveleft');
    }
    else if (attribute == 'moveright') {
        if (currentItem.classList.contains('resetrotate')) {
            newLi.style.left = newLi.offsetLeft + boxWidth * horiMul + 'px';
            newLi.classList.remove('resetrotate');
            newLi.classList.remove('moveright');
        } else {
            currentItem.classList.add('resetrotate');
        }
    }
    if (property in mapTransitionProperty) {
        newLi.classList.remove('trans' + property.replace('-', ''));
    }
}
function makeTransition(boxNode, sortBoxIndex, transName, transValue, transTime = constDelay) {
    const property = 'trans' + transName.replace('-', '');
    mapTransitionProperty[transName] = transTime + 's' + ' ease-out';
    const transitionConbined = combineTransitionProperty();
    sortBoxesContainer[sortBoxIndex].style.setProperty('--transproperty', transitionConbined);
    sortBoxesContainer[sortBoxIndex].style.setProperty('--' + property, transValue);
    boxNode.classList.add(property);

    const timeOut = setTimeout(() => {
        boxNode.classList.remove(property);
        clearTimeout(timeOut);
    }, transTime * 1000);
}
async function playMotion(sortBoxIndex, boxNode, name, duration) {
    boxNode.setAttribute('data-sortindex', sortBoxIndex);
    boxNode.style.animation = `${name} ${duration}s ${name == 'movedown' ? 'ease-in' : 'ease'} forwards`;
    while (boxNode.style.animation != '') {
        await new Promise(r => setTimeout(r, duration / 2));
    }
    if (sortState.terminated) {
        throw new Error(sortState.terminateMsg);
    }
}
function combineTransitionProperty() {
    let result = '';
    for (const property in mapTransitionProperty) {
        result += `${property} ${mapTransitionProperty[property]}, `;
    }
    return result.slice(0, -2);
}