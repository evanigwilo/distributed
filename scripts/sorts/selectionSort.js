function setLimitSelectionSort() {
    const value = animationlimit.normalizedInversedFor2secs;
    return value / 2;
}
async function selectionSort(inputArr, sortBoxIndex) {
    let n = inputArr.length;

    await moveToLine(sortBoxIndex, 0);
    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;

        await moveToLine(sortBoxIndex, 2);
        let c = await finalizeValue(sortBoxesNodes[sortBoxIndex][min], false, 'royalblue');
        const cT = c;

        let newDelay = setLimitSelectionSort();
        if (animationlimit.velocity == animationlimit.fastest) {
            sortBoxesNodes[sortBoxIndex][min].style.top = sortBoxesNodes[sortBoxIndex][min].offsetTop - sortBoxesConstants[sortBoxIndex].verTop + 'px';
            await new Promise(r => setTimeout(r, constDelay));
        } else {
            if (animationlimit.velocity == animationlimit.fast)
                newDelay = constDelay;
            await playMotion(sortBoxIndex, sortBoxesNodes[sortBoxIndex][min], 'moveup', newDelay);
        }

        await moveToLine(sortBoxIndex, 4);
        for (let j = i + 1; j < n; j++) {
            await moveToLine(sortBoxIndex, 5);
            compareValue(sortBoxesNodes[sortBoxIndex][j], sortBoxesNodes[sortBoxIndex][min], sortBoxIndex);

            if (inputArr[j] < inputArr[min]) {
                if (min > i) {
                    await finalizeValue(sortBoxesNodes[sortBoxIndex][min], false, c);
                }
                c = await finalizeValue(sortBoxesNodes[sortBoxIndex][j], false);

                value = setLimitSelectionSort();
                if (animationlimit.velocity == animationlimit.fastest) {
                    sortBoxesNodes[sortBoxIndex][min].style.top = sortBoxesNodes[sortBoxIndex][min].offsetTop + sortBoxesConstants[sortBoxIndex].verTop + 'px';
                    await new Promise(r => setTimeout(r, constDelay));
                } else {
                    if (animationlimit.velocity == animationlimit.fast)
                        newDelay = constDelay;
                    await playMotion(sortBoxIndex, sortBoxesNodes[sortBoxIndex][min], 'movedown', newDelay);
                }

                await moveToLine(sortBoxIndex, 6);
                min = j;

                value = setLimitSelectionSort();
                if (animationlimit.velocity == animationlimit.fastest) {
                    sortBoxesNodes[sortBoxIndex][min].style.top = sortBoxesNodes[sortBoxIndex][min].offsetTop - sortBoxesConstants[sortBoxIndex].verTop + 'px';
                    await new Promise(r => setTimeout(r, constDelay));
                } else {
                    if (animationlimit.velocity == animationlimit.fast)
                        newDelay = constDelay;
                    await playMotion(sortBoxIndex, sortBoxesNodes[sortBoxIndex][min], 'moveup', newDelay);
                }
            }
            await moveToLine(sortBoxIndex, 7);
        }
        await moveToLine(sortBoxIndex, 8);

        value = setLimitSelectionSort();
        if (animationlimit.velocity == animationlimit.fastest) {
            sortBoxesNodes[sortBoxIndex][min].style.top = sortBoxesNodes[sortBoxIndex][min].offsetTop + sortBoxesConstants[sortBoxIndex].verTop + 'px';
            await new Promise(r => setTimeout(r, constDelay));
        } else {
            if (animationlimit.velocity == animationlimit.fast)
                newDelay = constDelay;
            await playMotion(sortBoxIndex, sortBoxesNodes[sortBoxIndex][min], 'movedown', newDelay);
        }
        await moveToLine(sortBoxIndex, 10);
        if (min != i) {
            await moveToLine(sortBoxIndex, 11);
            await swap(sortBoxesNodes[sortBoxIndex], sortBoxIndex, inputArr, i, min);
            await finalizeValue(sortBoxesNodes[sortBoxIndex][min], false, cT);

        }
        await moveToLine(sortBoxIndex, 12);
        await finalizeValue(sortBoxesNodes[sortBoxIndex][i], false);
        await moveToLine(sortBoxIndex, 13);
    }

    sortBoxesConstants[sortBoxIndex].sortWatch.stop();
}
const algoSelectionSort = `
    for i = 1 to length(list) do:
        /* set current element as minimum*/
        min = i    
        /* check the element to be minimum */
        for j = i+1 to length(list)
            if list[j] < list[min] then
                min = j
            end if
        end for
        /* swap the minimum element with the current element*/
        if min != i  then
            swap list[min] and list[i]
        end if
    end for
`;

const infoSelectionSort = {
    description: `
            ➾ Selection Sort
    
            Selection Sort is an in-place comparison sorting algorithm. It has an O(n2) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort. 
            Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.

            The algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list.
            Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.
            `,

    complexity: {
        bestCase: "O(n<sup>2</sup>)",
        averageCase: "O(n<sup>2</sup>)",
        worstCase: "O(n<sup>2</sup>)",
        spaceCase: "O(1)",
        stable: "Yes",
    }
};