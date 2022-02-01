const root = document.querySelector(':root');
const navButton = document.querySelector("#navbar-collapse");
const generateStopButton = document.querySelector(".controls__generate button");
const sortButton = document.querySelector(".controls__sort");
const slider = document.querySelector(".controls__range__sortspeed input");
const input = document.querySelector('#count');
const controls = document.querySelector('main #controls');
const aside = document.querySelector('aside');
const asideSideinfo = document.querySelector('aside #sideinfo');
const generateOptions = document.querySelector('.controls__generate__options');
const sidebarTitle = document.querySelectorAll('aside dl dd');
const main = document.querySelector('main');
const mainCompare = document.querySelector('main #compare');
const mainsortBox = document.querySelector('main > .sortbox');
const algoTrackerDefaultTop = 'calc(var(--main_algorithm_padding) + var(--main_algorithm_height) * ';

const checkFrequency = 30;
const constDelay = 0.05;

const sortBoxes = [];
const sortBoxesContainer = [];
const sortBoxesNodes = [];
const sortBoxesNumbers = [];
const sortBoxesConstants = [];
const sortBoxesAlgoBoard = [];

const buttonState = {
    generateBox: 'Generate',
    stopSorting: 'Stop'
};
const sortState = {
    sortSelection: null,
    terminated: false, // Triggerd to stop sorting
    terminateMsg: 'Sort Terminated',
    sliderValue: -1, // Used to reset slider to original value when speed is fast/fastest
    firstTimerStop: false, // Triggerd to set time to first sorting method to complete
    get canHover() {
        return !window.matchMedia("(hover: none)").matches;
    }
};

window.addEventListener('DOMContentLoaded', function (e) {
    console.log("DOMContentLoaded");
    updateSliderValues();
    document.querySelector("#copyright_date").textContent = (new Date()).getUTCFullYear() + '.';
});
slider.addEventListener('input', () => {
    updateSliderValues();
});
input.addEventListener('change', () => {
    // Limit slider value to its min and Max Value
    input.value = input.value || input.min;
    input.value = Math.min(input.value, input.max);
});
generateOptions.childNodes.forEach(element => {
    element.addEventListener('click', async () => {

        sortButton.disabled = true;

        sortBoxesConstants.forEach(c => c.sortWatch.reset());

        for (let i = 0; i < sortBoxes.length; i++) {
            sortBoxesContainer[i].style.filter = '';
            await generateBoxNodes(i, element.textContent);
        }

        globalAdjust();

        sortButton.disabled = false;
    });
});
mainCompare.addEventListener('click', () => {
    mainCompare.classList.toggle('compare--move');

    if (sortBoxes.length < 2) {
        const element = mainsortBox.cloneNode(true);
        main.appendChild(element);
        sortBoxes.push(element);
        const container = element.getElementsByClassName('sortbox__container')[0];
        container.textContent = '';
        sortBoxesContainer.push(container);
        sortBoxesNodes.push([]);
        sortBoxesNumbers.push([]);
        const sortInput = element.getElementsByTagName('Input')[0];
        inputDropDownEvents(sortInput);
        const sortTimer = element.getElementsByClassName('sortbox__timer')[0];
        sortBoxesConstants.push({
            sortInput: sortInput,
            sortWatch: new StopWatch(sortBoxesConstants.length, sortTimer, setTimeFirstSortToComplete),
            copyTemp: null,
            elemTemp: null,
            maxNum: 0,
            animationPlaying: false,
        });
        sortBoxesAlgoBoard.push({
            algoBoard: element.getElementsByClassName('algorithm')[0],
            algoTitle: element.getElementsByClassName('algorithm__title')[0],
            algoSteps: element.getElementsByClassName('algorithm__steps')[0],
            algoTracker: element.getElementsByClassName('algorithm__tracker')[0],
            moveToLineConstants: {
                prev: null,
                fontWeight: null,
                transform: null,
                topOnce: false,
            }
        });
    } else {
        main.removeChild(sortBoxes.pop());
        sortBoxesContainer.pop();
        sortBoxesNodes.pop();
        sortBoxesNumbers.pop();
        const popConst = sortBoxesConstants.pop();
        popConst.sortWatch.reset();
        sortBoxesAlgoBoard.pop();
    }
    root.style.setProperty('--main_sortbox_width', 100 / sortBoxes.length + '%');

    generateStopButton.click();
});
function inputDropDownEvents(input) {
    const dropIcon = input.nextElementSibling;
    const dropList = dropIcon.nextElementSibling;
    dropList.childNodes.forEach(element => {
        element.addEventListener('click', () => {
            input.value = element.textContent;
            input.parentElement.click();
            generateStopButton.click();
        });
    });
    input.parentElement.addEventListener('click', (e) => {
        if (e.srcElement.nodeName === 'LI') return;
        dropList.classList.toggle('sortbox__select__dropdown--expand');
        dropIcon.classList.toggle('sortbox__select__dropdown--rotate');
    });
}
function updateSliderValues() {
    const velocity = animationlimit.velocity;
    slider.nextElementSibling.textContent = velocity;
    sortBoxesConstants.forEach(c => {
        if (//generateStopButton.textContent == buttonState.generateBox &&
            (velocity == animationlimit.fast || velocity == animationlimit.fastest))
            c.sortWatch.element.classList.add('sortbox__timer--show');
        else {
            c.sortWatch.element.classList.remove('sortbox__timer--show');
        }
    });
    const newWidth = animationlimit.normalized * 100;
    controls.style.setProperty('--sliderwidth', Math.floor(newWidth) + '%');
}
function setTimeFirstSortToComplete(element) {
    if (!sortState.firstTimerStop) {
        sortState.firstTimerStop = true;
        element.textContent += ' ✓';
        element.style.fontWeight = 'bold';
        // element.style.setProperty('--sortbox__time_display', 'inherit')
    }
}
async function generateBoxNodes(index, method) {
    const constants = sortBoxesConstants[index];
    const container = sortBoxesContainer[index];

    // Print Algorithm Steps
    /**/

    constants.horiMul = 1;
    constants.verTop = Math.floor(container.clientHeight / 2) - 1;
    constants.boxWidth = Math.floor(container.clientWidth / Number(input.value));
    constants.totalBox = Math.floor(container.clientWidth / constants.boxWidth);
    container.style.setProperty('--rightvelocity', constants.boxWidth * constants.horiMul + 'px');
    container.style.setProperty('--leftvelocity', + constants.boxWidth * constants.horiMul * -1 + 'px');
    container.style.setProperty('--upvelocity', constants.verTop * -1 + 'px');
    container.style.setProperty('--downvelocity', constants.verTop + 'px');


    constants.maxNum = sortBoxesNodes[index].length = sortBoxesNumbers[index].length = 0;
    // console.log({ sortBoxesNodes: sortBoxesNodes[index].length, sortBoxesNodes1: sortBoxesNodes[index] })
    container.textContent = '';

    if (index > 0) {
        sortBoxesNumbers[0].forEach(value => {
            sortBoxesNumbers[index].push(value);
            constants.maxNum = Math.max(constants.maxNum, value);
        });
    } else {
        if (method == 'Random') {
            Array.from({ length: constants.totalBox }, (_, i) => i + 1)
                .map(a => ({ value: a, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .forEach(value => {
                    sortBoxesNumbers[index].push(value.value);
                    constants.maxNum = Math.max(constants.maxNum, value.value);
                });
        } else if (method == 'Sorted Ascending') {
            constants.maxNum = constants.totalBox;
            for (let i = 1; i <= constants.totalBox; i++) {
                sortBoxesNumbers[index].push(i);
            }
        } else if (method == 'Sorted Descending') {
            constants.maxNum = constants.totalBox;
            for (let i = constants.totalBox; i >= 1; i--) {
                sortBoxesNumbers[index].push(i);
            }
        }
    }

    // Temp Array for Merge Sort
    constants.copyTemp = Array(constants.totalBox).fill();
    constants.elemTemp = Array(constants.totalBox).fill();

    for (let i = 0; i < constants.totalBox; i++) {
        const value = sortBoxesNumbers[index][i];
        const newLi = document.createElement("li");
        const newContent = document.createElement("p");
        if (constants.boxWidth >= 20) {
            newContent.textContent = value;
        }
        if (constants.boxWidth < 40) {
            newContent.classList.add('sortbox__container--transform');
        }
        newLi.appendChild(newContent);
        newLi.style.height = 35 + (value * constants.verTop / constants.maxNum) + 'px';
        newLi.style.width = constants.boxWidth + 'px';
        newLi.style.left = i * constants.boxWidth + 'px';
        newLi.style.zIndex = 0;
        newLi.style.paddingBottom = '10px';
        newLi.classList.add('transition');

        newLi.addEventListener('animationstart', (e) => animationStart(e, newLi));
        newLi.addEventListener('animationend', (e) => animationEnd(e, newLi));
        newLi.addEventListener('transitionend', (e) => transitionEnd(e, newLi));

        container.appendChild(newLi);

        sortBoxesNodes[index].push(newLi);

        makeTransition(newLi, index, 'opacity', 0);

        //await new Promise(r => setTimeout(r, constDelay));
    }
}

generateStopButton.addEventListener('click', async () => {

    sortBoxesContainer.forEach(c => c.style.filter = 'blur(1px)');

    if (generateStopButton.textContent == buttonState.generateBox) {
        sortButton.disabled = true;

        generateOptions.classList.add('controls__generate__options--transform');
    }
    else {
        sortState.sliderValue = -1;

        const velocity = animationlimit.velocity;
        if (animationlimit.fast || velocity == animationlimit.fastest) {
            sortState.sliderValue = slider.value;
            slider.value = animationlimit.velocityValue(animationlimit.normal);
            updateSliderValues();
        }

        sortState.terminated = true;
    }
});

sortBoxes.push(mainsortBox);
sortBoxesContainer.push(mainsortBox.getElementsByClassName('sortbox__container')[0]);
sortBoxesNodes.push([]);
sortBoxesNumbers.push([]);
const sortInput = mainsortBox.getElementsByTagName('Input')[0];
inputDropDownEvents(sortInput);
const sortTimer = mainsortBox.getElementsByClassName('sortbox__timer')[0];
// Properties for each sort methods
sortBoxesConstants.push({
    sortInput: sortInput,
    sortWatch: new StopWatch(sortBoxesConstants.length, sortTimer, setTimeFirstSortToComplete),
    copyTemp: null,
    elemTemp: null,
    maxNum: 0,
    animationPlaying: false,
});
sortBoxesAlgoBoard.push({
    algoBoard: document.querySelector('.algorithm'),
    algoTitle: document.querySelector('.algorithm__title'),
    algoSteps: document.querySelector('.algorithm__steps'),
    algoTracker: document.querySelector('.algorithm__tracker'),
    moveToLineConstants: {
        prev: null,
        fontWeight: null,
        transform: null,
        topOnce: false,
    }
});
