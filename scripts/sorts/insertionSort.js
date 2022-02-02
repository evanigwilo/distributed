function setLimitInsertionSort(j, inputArr, key) {
    const value = animationlimit.normalizedInversedFor2secs;
    const newDelay = j >= 0 && inputArr[j] > key ? value / 3 : value / 2;
    return newDelay;
}
const insertionSort = async (inputArr, sortBoxIndex) => {
    let len = inputArr.length;
    const sortBoxNodes = sortBoxesNodes[sortBoxIndex];

    len > 0 && finalizeValue(sortBoxNodes[0], false);

    await moveToLine(sortBoxIndex, 0);
    for (let i = 1; i < len; ++i) {
        await moveToLine(sortBoxIndex, 2);
        let key = inputArr[i];
        let keyBox = sortBoxNodes[i];

        await finalizeValue(keyBox, false, 'royalblue');

        let j = i - 1;

        let newDelay = setLimitInsertionSort(j, inputArr, key);
        if (animationlimit.velocity == animationlimit.fastest) {
            keyBox.style.top = keyBox.offsetTop - sortBoxesConstants[sortBoxIndex].verTop + 'px';
            await new Promise(r => setTimeout(r, constDelay));
        } else {
            if (animationlimit.velocity == animationlimit.fast)
                newDelay = constDelay;
            await playMotion(sortBoxIndex, keyBox, 'moveup', newDelay);
        }

        let count = 0;

        await moveToLine(sortBoxIndex, 5);
        while (j >= 0 && inputArr[j] > key) {
            compareValue(sortBoxNodes[j], keyBox, sortBoxIndex);
            await moveToLine(sortBoxIndex, 6);
            await moveToLine(sortBoxIndex, 7);
            sortBoxNodes[j + 1] = sortBoxNodes[j];
            inputArr[j + 1] = inputArr[j];

            const temp = sortBoxNodes[j + 1];
            selectValue(temp, sortBoxIndex, 'red');

            temp.style.zIndex = 1;

            value = setLimitInsertionSort(j, inputArr, key);
            if (animationlimit.velocity == animationlimit.fastest) {
                temp.style.left = temp.offsetLeft + sortBoxesConstants[sortBoxIndex].boxWidth * sortBoxesConstants[sortBoxIndex].horiMul + 'px';
                await new Promise(r => setTimeout(r, constDelay));
            } else {
                if (animationlimit.velocity == animationlimit.fast)
                    newDelay = constDelay;
                await playMotion(sortBoxIndex, temp, 'moveright', newDelay);
            }

            temp.style.zIndex = 0;

            j = j - 1;
            count++;

            await moveToLine(sortBoxIndex, 8);
        }

        await moveToLine(sortBoxIndex, 10);
        if (count > 0) {
            updateHoriValue(sortBoxIndex, count);

            value = setLimitInsertionSort(-1, inputArr, key);
            if (animationlimit.velocity == animationlimit.fastest) {
                keyBox.style.left = keyBox.offsetLeft - sortBoxesConstants[sortBoxIndex].boxWidth * sortBoxesConstants[sortBoxIndex].horiMul + 'px';
                await new Promise(r => setTimeout(r, constDelay));
            } else {
                if (animationlimit.velocity == animationlimit.fast)
                    newDelay = constDelay;
                await playMotion(sortBoxIndex, keyBox, 'moveleft', newDelay);
            }

            resetHoriValue(sortBoxIndex);
        }

        value = setLimitInsertionSort(-1, inputArr, key);
        if (animationlimit.velocity == animationlimit.fastest) {
            keyBox.style.top = keyBox.offsetTop + sortBoxesConstants[sortBoxIndex].verTop + 'px';
            await new Promise(r => setTimeout(r, constDelay));
        } else {
            if (animationlimit.velocity == animationlimit.fast)
                newDelay = constDelay;
            await playMotion(sortBoxIndex, keyBox, 'movedown', newDelay);
        }


        inputArr[j + 1] = key;
        sortBoxNodes[j + 1] = keyBox;

        await finalizeValue(keyBox, false);
        await moveToLine(sortBoxIndex, 11);
    }

    sortBoxesConstants[sortBoxIndex].sortWatch.stop();
};
const algoInsertionSort = `
    for i = 1 to length(list) do:
        /* select value to be inserted */
        valueToInsert = list[i]
        holePosition = i
        /*locate hole position for the element to be inserted */
        while holePosition > 0 and list[holePosition-1] > valueToInsert do:
            list[holePosition] = list[holePosition-1]
            holePosition = holePosition -1
        end while
        /* insert the number at hole position */
        list[holePosition] = valueToInsert
    end for
`;
const infoInsertSort = {
    description: `
            ➾ Insert Sort
    
            Insert Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. 
            However, insertion sort provides several advantages:
            • Simple implementation: Jon Bentley shows a three-line C version, and a five-line optimized version
            • Efficient for (quite) small data sets, much like other quadratic sorting algorithms
            • More efficient in practice than most other simple quadratic (i.e., O(n2)) algorithms such as selection sort or bubble sort
            • Adaptive, i.e., efficient for data sets that are already substantially sorted: the time complexity is O(kn) when each element in the input is no more than k places away from its sorted position
            • Stable; i.e., does not change the relative order of elements with equal keys
            • In-place; i.e., only requires a constant amount O(1) of additional memory space
            • Online; i.e., can sort a list as it receives it
            
            Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. 
            At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.
            `,

    complexity: {
        bestCase: "O(n)",
        averageCase: "O(n<sup>2</sup>)",
        worstCase: "O(n<sup>2</sup>)",
        spaceCase: "O(1)",
        stable: "Yes",
    }
};