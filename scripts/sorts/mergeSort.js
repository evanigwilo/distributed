
function makeCopy(sortBoxIndex) {
    sortBoxesNodes[sortBoxIndex].forEach((elem, i) => {
        const newLi = elem.cloneNode(true);
        newLi.style.opacity = 0;
        newLi.style.backgroundColor = 'lightgreen';
        newLi.addEventListener('animationstart', (e) => animationStart(e, newLi));
        newLi.addEventListener('animationend', (e) => animationEnd(e, newLi));
        newLi.addEventListener('transitionend', (e) => transitionEnd(e, newLi));
        sortBoxesConstants[sortBoxIndex].elemTemp[i] = newLi;
        sortBoxesContainer[sortBoxIndex].appendChild(newLi);
    });
}
async function moveCopy(index, sortBoxIndex, newDelay) {
    const newLi = sortBoxesConstants[sortBoxIndex].elemTemp[index];
    newLi.style.opacity = 1;
    /*
        const keepValue = updateVertValue(sortBoxIndex, -newLi.offsetTop, 'up')
        await playMotion(sortBoxIndex, newLi, 'moveup', newDelay)
        resetVertValue(sortBoxIndex, keepValue, 'up')
    */
    newLi.style.top = 0;

    makeTransition(newLi, sortBoxIndex, 'opacity', 0.8, animationlimit.normalizedInversed / 2);
}
async function resetCopy(A1, B2, sortBoxIndex) {
    const elemTemp = sortBoxesConstants[sortBoxIndex].elemTemp;
    const boxNodes = sortBoxesNodes[sortBoxIndex];

    for (let i = A1; i <= B2; i++) {
        elemTemp[i].style.opacity = 0;
        elemTemp[i].style.left = boxNodes[i].style.left;
        elemTemp[i].style.top = boxNodes[i].style.top;
        elemTemp[i].style.height = boxNodes[i].style.height;
        elemTemp[i].firstChild.textContent = boxNodes[i].firstChild.textContent;
    }
    if (B2 - A1 + 1 == sortBoxesConstants[sortBoxIndex].totalBox) {
        for (let i = A1; i <= B2; i++) {
            await finalizeValue(boxNodes[i], false);
        }

        sortBoxesConstants[sortBoxIndex].sortWatch.stop();
    }
}
function setLimitMergeSort(absDiv) {
    const value = animationlimit.normalizedInversedFor2secs;
    const newDelay = absDiv > 0 ? value / 4 : value / 3;
    return newDelay;
}
async function copyMove(X, Y, A, B, sortBoxIndex) {
    X[A] = Y[B];

    const container = sortBoxesContainer[sortBoxIndex];
    const boxNodes = sortBoxesNodes[sortBoxIndex];
    const elemTemp = sortBoxesConstants[sortBoxIndex].elemTemp;

    const boxWidth = sortBoxesConstants[sortBoxIndex].boxWidth;

    const div = Math.floor((boxNodes[A].offsetLeft - elemTemp[B].offsetLeft) / boxWidth);
    const absDiv = Math.abs(div);
    let newDelay = setLimitMergeSort(absDiv);
    if (animationlimit.velocity != animationlimit.fast && animationlimit.velocity != animationlimit.fastest) {
        const keepValue = updateVertValue(sortBoxIndex, sortBoxesConstants[sortBoxIndex].verTop - elemTemp[B].clientHeight, 'down');
        await playMotion(sortBoxIndex, elemTemp[B], 'movedown', newDelay);
        resetVertValue(sortBoxIndex, keepValue, 'down');

        if (absDiv > 0) {
            updateHoriValue(sortBoxIndex, absDiv);

            const dir = div < 0 ? 'moveleft' : 'moveright';
            await playMotion(sortBoxIndex, elemTemp[B], dir, newDelay);

            resetHoriValue(sortBoxIndex);
        }
        await playMotion(sortBoxIndex, elemTemp[B], 'movedown', newDelay);
    }
    if (animationlimit.velocity == animationlimit.fastest) {
        boxNodes[A].style.height = elemTemp[B].style.height;
        await new Promise(r => setTimeout(r, constDelay));
    } else {
        if (animationlimit.velocity == animationlimit.fast)
            newDelay = constDelay;

        container.style.setProperty('--transheight', elemTemp[B].style.height);
        await playMotion(sortBoxIndex, boxNodes[A], 'transheight', newDelay);
    }
    boxNodes[A].firstChild.textContent = elemTemp[B].firstChild.textContent;
    /*
        if (sortBoxesConstants[sortBoxIndex].deleteTemp.length == sortBoxesConstants[sortBoxIndex].totalBox) {
            await finalizeValue(boxNodes[A], false);
        }
    */
    return [++A, ++B];
}
async function merge(N, A1, B1, A2, B2, sortBoxIndex) {

    const copyTemp = sortBoxesConstants[sortBoxIndex].copyTemp;
    const elemTemp = sortBoxesConstants[sortBoxIndex].elemTemp;

    await moveToLine(sortBoxIndex, 15);
    for (let i = A1; i <= B2; i++) {
        copyTemp[i] = N[i];
        await moveCopy(i, sortBoxIndex, constDelay / (B2 - A1));
    }
    if (animationlimit.normalized >= 0.5) {
        await new Promise(r => setTimeout(r, checkFrequency));
    }

    const kA1 = A1;
    const kB2 = B2;

    let begin = A1;
    await moveToLine(sortBoxIndex, 16);
    for (let i = 0, j = B2 - A1; i <= j; i++) {

        if (A1 > B1) {
            await moveToLine(sortBoxIndex, 17);
            await moveToLine(sortBoxIndex, 18);
            [begin, A2] = await copyMove(N, copyTemp, begin, A2, sortBoxIndex);
        }
        else if (A2 > B2) {
            await moveToLine(sortBoxIndex, 19);
            await moveToLine(sortBoxIndex, 20);
            [begin, A1] = await copyMove(N, copyTemp, begin, A1, sortBoxIndex);
        }
        else {
            compareValue(elemTemp[A1], elemTemp[A2], sortBoxIndex);
            
            if (copyTemp[A1] > copyTemp[A2]) {
                await moveToLine(sortBoxIndex, 21);
                compareValue(elemTemp[A1], elemTemp[A2], sortBoxIndex);
                await moveToLine(sortBoxIndex, 22);
                [begin, A2] = await copyMove(N, copyTemp, begin, A2, sortBoxIndex);
            }
            else if (copyTemp[A2] >= copyTemp[A1]) {
                await moveToLine(sortBoxIndex, 23);
                compareValue(elemTemp[A1], elemTemp[A2], sortBoxIndex);
                await moveToLine(sortBoxIndex, 24);
                [begin, A1] = await copyMove(N, copyTemp, begin, A1, sortBoxIndex);
            }

        }
        await moveToLine(sortBoxIndex, 25);
    }
    await moveToLine(sortBoxIndex, 26);

    await resetCopy(kA1, kB2, sortBoxIndex);
}
async function mergeSort(N, start, end, sortBoxIndex) {
    await moveToLine(sortBoxIndex, 2);
    if (start >= end) {
        await moveToLine(sortBoxIndex, 3);
        return;
    }
    await moveToLine(sortBoxIndex, 7);
    const div = Math.floor((start + end) / 2);

    //if (div - start > 0) 
    await moveToLine(sortBoxIndex, 9);
    await mergeSort(N, start, div, sortBoxIndex);

    //if (end - (div + 1) > 0)
    await moveToLine(sortBoxIndex, 10);
    await mergeSort(N, div + 1, end, sortBoxIndex);

    await moveToLine(sortBoxIndex, 12);
    await merge(N, start, div, div + 1, end, sortBoxIndex);
    await moveToLine(sortBoxIndex, 27);
}

const algoMergeSort =
    /*
        A1 = start
        A2 = mid + 1
        B1 = mid
        B2 = end
    */
    `
    function merge_sort(list, start, end)
        // If it is only one element in the list it is already sorted, return.
        if  start ≥ end then
            return

        // Recursive case. First, divide the list into equal-sized sublists
        // consisting of the first half and second half of the list.
        // This assumes lists start at index 0.
        mid = (start + end) / 2
    
        // Recursively sort both sublists.
        merge_sort(list, start, mid)
        merge_sort(list, mid + 1, end)

        // Then merge the now-sorted sublists.
        merge(list, start, mid, mid + 1, end)

        // below is the merge function 
        function merge(list, start, mid, mid + 1, end) is
            tempList = copy list from start to end

            while start ≤ end do
                if (start > mid + 1)
                    copy tempList[start] to list[end] 
                else if (mid + 1 > end) 21
                    copy tempList[start] to list[start]
                else if (tempList[start] > tempList[mid + 1]) 
                    copy tempList[start] to list[end]
                else if (tempList[mid + 1] ≥ tempList[start]) 
                    copy tempList[start] to list[start]
                end if 
            end while

        end function
    end function
`;
const infoMergeSort = {
    description: `
        ➾ Merge Sort

        Merge Sort is an efficient, general-purpose, and comparison-based sorting algorithm. 
        Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. 
        Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.
        A detailed description and analysis of bottom-up merge sort appeared in a report by Goldstine and von Neumann as early as 1948
        
        Using the Divide and Conquer technique, we divide a problem into subproblems. 
        When the solution to each subproblem is ready, we 'combine' the results from the subproblems to solve the main problem.
        `,

    complexity: {
        bestCase: "O(n log n)",
        averageCase: "O(n log n)",
        worstCase: "O(n log n)",
        spaceCase: "O(log n)",
        stable: "Yes",
    }
};