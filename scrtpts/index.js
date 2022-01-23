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
    terminated: false,
    terminateMsg: 'Sort Terminated',
    sliderValue: -1,
    firstTimerStop: false,
    get canHover() {
        return !window.matchMedia("(hover: none)").matches;
    }
};

window.addEventListener('DOMContentLoaded', function (e) {
    console.log("DOMContentLoaded");
    document.querySelector("#copyright_date").textContent = (new Date()).getUTCFullYear() + '.';
});