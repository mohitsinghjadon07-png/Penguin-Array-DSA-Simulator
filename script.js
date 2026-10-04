/* =========================================
   PENGUIN ARRAY LAB
   Interactive Array / DSA Simulator
========================================= */


/* =========================================
   GLOBAL ARRAY
========================================= */

let arr = [
    10,
    25,
    40,
    15,
    30
];


let base = 1000;

let size = 4;


/* =========================================
   ORIGINAL ARRAY COPIES
========================================= */

let originalArray = [...arr];

let binaryOriginalArray = [...arr];

let bubbleOriginalArray = [...arr];


/* =========================================
   LINEAR SEARCH STATE
========================================= */

let linear = {

    i: 0,

    target: null,

    count: 0,

    run: false,

    auto: false,

    timer: null
};


/* =========================================
   BINARY SEARCH STATE
========================================= */

let binary = {

    low: 0,

    high: -1,

    target: null,

    count: 0,

    run: false,

    auto: false,

    timer: null
};


/* =========================================
   BUBBLE SORT STATE
========================================= */

let bubble = {

    i: 0,

    j: 0,

    pass: 1,

    count: 0,

    swaps: 0,

    run: false,

    auto: false,

    timer: null
};


/* =========================================
   HELPER
========================================= */

function $(id) {

    return document.getElementById(id);

}


function log(id, message) {

    const element = $(id);

    if (element) {

        element.textContent = message;

    }

}


function syncInput() {

    $("arrayInput").value =
        arr.join(", ");

}


function stopTimer(state) {

    if (state.timer) {

        clearInterval(state.timer);

        state.timer = null;

    }

    state.auto = false;

}


/* =========================================
   STOP EVERYTHING
========================================= */

function stopAll() {

    stopTimer(linear);

    stopTimer(binary);

    stopTimer(bubble);

    linear.run = false;

    binary.run = false;

    bubble.run = false;

}


/* =========================================
   ARRAY BUILD
========================================= */

function setArray() {

    const values =
        $("arrayInput")
            .value
            .split(/[, ]+/)
            .map(Number)
            .filter(Number.isFinite);


    if (!values.length) {

        log(
            "modifyLog",
            "❄️ Please enter at least one valid number."
        );

        return;
    }


    arr =
        values.slice(0, 14);


    originalArray =
        [...arr];


    binaryOriginalArray =
        [...arr];


    bubbleOriginalArray =
        [...arr];


    stopAll();

    renderArray();


    log(
        "modifyLog",
        `🐧 New penguin colony built with ${arr.length} penguins.`
    );

}


/* =========================================
   RANDOM ARRAY
========================================= */

function randomArray() {

    arr =
        Array.from(
            { length: 7 },
            () =>
                Math.floor(
                    Math.random() * 90
                ) + 10
        );


    originalArray =
        [...arr];


    binaryOriginalArray =
        [...arr];


    bubbleOriginalArray =
        [...arr];


    syncInput();

    stopAll();

    renderArray();


    log(
        "modifyLog",
        "❄️ A fresh penguin colony has arrived!"
    );

}


/* =========================================
   ARRAY VISUALIZATION
========================================= */

function renderArray(
    active = -1,
    compare = [],
    found = -1
) {

    const box =
        $("arrayVisual");


    box.innerHTML = "";


    arr.forEach(
        (value, index) => {

            const cell =
                document.createElement("div");


            cell.className =
                "cell";


            let state = "";


            if (found === index) {

                state = "found";

            }

            else if (
                compare.includes(index)
            ) {

                state = "compare";

            }

            else if (
                index === active
            ) {

                state = "active";

            }


            cell.innerHTML = `

                <div class="addr">

                    📍 ${base + index * size}

                </div>


                <span
                    class="penguin ${state}"
                >

                    🐧

                </span>


                <div class="value">

                    ${value}

                </div>


                <div class="index">

                    INDEX ${index}

                </div>

            `;


            box.appendChild(cell);

        }
    );

}


/* =========================================
   ADDRESS CALCULATOR
========================================= */

function calcAddress() {

    base =
        Number(
            $("base").value
        ) || 0;


    size =
        Number(
            $("size").value
        ) || 1;


    const index =
        Math.max(
            0,
            Number(
                $("addrIndex").value
            ) || 0
        );


    if (
        index >= arr.length
    ) {

        $("addressResult").innerHTML =
            "<strong>Index is outside the current array.</strong>";

        renderArray();

        return;
    }


    const address =
        base +
        index * size;


    $("addressResult").innerHTML = `

        LOC(A[${index}])

        =

        ${base}

        +

        (${index} × ${size})

        =

        <strong>${address}</strong>

        bytes

    `;


    renderArray(index);

}


/* =========================================
   INSERT
========================================= */

function insertAt() {

    stopAll();


    const value =
        Number(
            $("modValue").value
        );


    const position =
        Number(
            $("modPos").value
        );


    if (
        !Number.isFinite(value) ||
        position < 0 ||
        position > arr.length
    ) {

        log(
            "modifyLog",
            "Choose a valid value and position."
        );

        return;
    }


    arr.splice(
        position,
        0,
        value
    );


    originalArray =
        [...arr];


    syncInput();

    renderArray(position);


    log(
        "modifyLog",
        `➕ Inserted 🐧${value} at index ${position}.`
    );

}


/* =========================================
   DELETE
========================================= */

function deleteAt() {

    stopAll();


    const position =
        Number(
            $("modPos").value
        );


    if (
        position < 0 ||
        position >= arr.length
    ) {

        log(
            "modifyLog",
            "Choose a valid existing index."
        );

        return;
    }


    const deleted =
        arr.splice(
            position,
            1
        )[0];


    originalArray =
        [...arr];


    syncInput();


    renderArray(
        Math.min(
            position,
            arr.length - 1
        )
    );


    log(
        "modifyLog",
        `➖ Deleted 🐧${deleted} from index ${position}.`
    );

}


/* =========================================
   LINEAR SEARCH
========================================= */

function startLinear() {

    stopTimer(linear);


    linear = {

        i: 0,

        target:
            Number(
                $("linearTarget").value
            ),

        count: 0,

        run: true,

        auto: false,

        timer: null

    };


    $("linearCount").textContent =
        "0";


    $("linearIndex").textContent =
        "0";


    $("linearStatus").textContent =
        "Searching…";


    $("linearProgress").style.width =
        "0%";


    renderArray(0);


    log(
        "linearLog",
        `🔎 Starting search for ${linear.target} from index 0...`
    );

}


/* =========================================
   LINEAR SEARCH STEP
========================================= */

function linearStep() {

    if (!linear.run) {

        return;

    }


    /* SEARCH FINISHED */

    if (
        linear.i >= arr.length
    ) {

        linear.run = false;

        stopTimer(linear);


        $("linearStatus").textContent =
            "Not Found";


        $("linearIndex").textContent =
            "—";


        $("linearProgress").style.width =
            "100%";


        renderArray();


        log(
            "linearLog",
            `❌ Target ${linear.target} was not found after checking the entire colony.`
        );


        return;
    }


    const index =
        linear.i;


    const value =
        arr[index];


    linear.count++;


    $("linearCount").textContent =
        linear.count;


    $("linearIndex").textContent =
        index;


    const progress =
        (
            (index + 1) /
            arr.length
        ) * 100;


    $("linearProgress").style.width =
        progress + "%";


    /* SHOW CURRENT PENGUIN */

    renderArray(index);


    log(
        "linearLog",
        `👀 Comparing index ${index}: ${value} with target ${linear.target}...`
    );


    /* FOUND */

    if (
        value === linear.target
    ) {

        linear.run = false;

        stopTimer(linear);


        $("linearStatus").textContent =
            "Found ✓";


        renderArray(
            -1,
            [],
            index
        );


        log(
            "linearLog",
            `🎉 FOUND! 🐧${value} matches the target at index ${index}.`
        );


        return;
    }


    /* NOT FOUND */

    setTimeout(
        () => {

            if (!linear.run) {

                return;
            }


            log(
                "linearLog",
                `❄️ ${value} ≠ ${linear.target}. Penguin rejected. Moving to index ${index + 1}...`
            );

        },
        180
    );


    linear.i++;

}


/* =========================================
   LINEAR AUTO PLAY
========================================= */

function toggleLinearAuto() {

    if (!linear.run) {

        startLinear();

    }


    if (linear.auto) {

        stopTimer(linear);


        $("linearAutoBtn").textContent =
            "▶ Auto Play";


        return;
    }


    linear.auto = true;


    $("linearAutoBtn").textContent =
        "⏸ Pause";


    linear.timer =
        setInterval(
            () => {

                linearStep();


                if (!linear.run) {

                    stopTimer(linear);

                    $("linearAutoBtn").textContent =
                        "▶ Auto Play";

                }

            },
            900
        );

}


/* =========================================
   RESET LINEAR
========================================= */

function resetLinear() {

    stopTimer(linear);


    linear.run = false;


    $("linearStatus").textContent =
        "Ready";


    $("linearCount").textContent =
        "0";


    $("linearIndex").textContent =
        "—";


    $("linearProgress").style.width =
        "0%";


    renderArray();


    log(
        "linearLog",
        "Linear search reset. Ready!"
    );

}


/* =========================================
   BINARY SEARCH
========================================= */

function startBinary() {

    stopTimer(binary);


    arr =
        [...binaryOriginalArray].sort(
            (a, b) => a - b
        );


    syncInput();


    binary = {

        low: 0,

        high:
            arr.length - 1,

        target:
            Number(
                $("binaryTarget").value
            ),

        count: 0,

        run: true,

        auto: false,

        timer: null

    };


    $("binaryCount").textContent =
        "0";


    $("binaryStatus").textContent =
        "Searching…";


    updateRange();

    renderArray();


    log(
        "binaryLog",
        "❄️ Array sorted. Binary search begins with the complete range."
    );

}


/* =========================================
   UPDATE LOW MID HIGH
========================================= */

function updateRange() {

    $("low").textContent =
        binary.run
            ? binary.low
            : "—";


    $("high").textContent =
        binary.run
            ? binary.high
            : "—";


    $("mid").textContent =
        binary.run &&
        binary.low <= binary.high

            ? Math.floor(
                (
                    binary.low +
                    binary.high
                ) / 2
            )

            : "—";

}


/* =========================================
   BINARY STEP
========================================= */

function binaryStep() {

    if (!binary.run) {

        return;
    }


    /* RANGE EMPTY */

    if (
        binary.low >
        binary.high
    ) {

        binary.run = false;

        stopTimer(binary);


        $("binaryStatus").textContent =
            "Not Found";


        updateRange();

        renderArray();


        log(
            "binaryLog",
            `❌ ${binary.target} was not found. Search range became empty.`
        );


        return;
    }


    const mid =
        Math.floor(
            (
                binary.low +
                binary.high
            ) / 2
        );


    const value =
        arr[mid];


    binary.count++;


    $("binaryCount").textContent =
        binary.count;


    renderArray(mid);


    log(
        "binaryLog",
        `🎯 LOW = ${binary.low}, MID = ${mid}, HIGH = ${binary.high}. Checking ${value}...`
    );


    /* FOUND */

    if (
        value === binary.target
    ) {

        binary.run = false;

        stopTimer(binary);


        $("binaryStatus").textContent =
            "Found ✓";


        renderArray(
            -1,
            [],
            mid
        );


        log(
            "binaryLog",
            `🎉 FOUND! ${value} equals target ${binary.target} at index ${mid}.`
        );


        updateRange();

        return;
    }


    /* TARGET IS RIGHT */

    if (
        value <
        binary.target
    ) {

        binary.low =
            mid + 1;


        log(
            "binaryLog",
            `➡️ ${value} is smaller than ${binary.target}. Move LOW to ${binary.low}.`
        );

    }


    /* TARGET IS LEFT */

    else {

        binary.high =
            mid - 1;


        log(
            "binaryLog",
            `⬅️ ${value} is larger than ${binary.target}. Move HIGH to ${binary.high}.`
        );

    }


    updateRange();

}


/* =========================================
   BINARY AUTO PLAY
========================================= */

function toggleBinaryAuto() {

    if (!binary.run) {

        startBinary();

    }


    if (binary.auto) {

        stopTimer(binary);


        $("binaryAutoBtn").textContent =
            "▶ Auto Play";


        return;
    }


    binary.auto = true;


    $("binaryAutoBtn").textContent =
        "⏸ Pause";


    binary.timer =
        setInterval(
            () => {

                binaryStep();


                if (!binary.run) {

                    stopTimer(binary);

                    $("binaryAutoBtn").textContent =
                        "▶ Auto Play";

                }

            },
            1000
        );

}


/* =========================================
   RESET BINARY
========================================= */

function resetBinary() {

    stopTimer(binary);


    arr =
        [...binaryOriginalArray];


    syncInput();


    binary.run = false;


    $("binaryStatus").textContent =
        "Ready";


    $("binaryCount").textContent =
        "0";


    updateRange();

    renderArray();


    log(
        "binaryLog",
        "Binary search reset. Original array restored."
    );

}


/* =========================================
   BUBBLE SORT
========================================= */

function startBubble() {

    stopTimer(bubble);


    bubbleOriginalArray =
        [...arr];


    bubble = {

        i: 0,

        j: 0,

        pass: 1,

        count: 0,

        swaps: 0,

        run: true,

        auto: false,

        timer: null

    };


    $("bubbleStatus").textContent =
        "Sorting…";


    $("bubblePass").textContent =
        "1";


    $("bubbleCount").textContent =
        "0";


    $("bubbleSwaps").textContent =
        "0";


    renderArray(
        -1,
        [0, 1]
    );


    log(
        "bubbleLog",
        "🫧 Pass 1 begins. Comparing neighboring penguins..."
    );

}


/* =========================================
   BUBBLE STEP
========================================= */

function bubbleStep() {

    if (!bubble.run) {

        return;
    }


    /* FINISHED */

    if (
        arr.length <= 1 ||
        bubble.i >= arr.length - 1
    ) {

        bubble.run = false;

        stopTimer(bubble);


        $("bubbleStatus").textContent =
            "Sorted ✓";


        renderArray();


        log(
            "bubbleLog",
            `🎉 Colony sorted! ${bubble.count} comparisons and ${bubble.swaps} swaps.`
        );


        return;
    }


    /* END OF CURRENT PASS */

    if (
        bubble.j >=
        arr.length -
        bubble.i -
        1
    ) {

        bubble.j = 0;

        bubble.i++;

        bubble.pass =
            bubble.i + 1;


        $("bubblePass").textContent =
            Math.min(
                bubble.pass,
                arr.length - 1
            );


        if (
            bubble.i >=
            arr.length - 1
        ) {

            bubble.run = false;

            stopTimer(bubble);


            $("bubbleStatus").textContent =
                "Sorted ✓";


            renderArray();


            log(
                "bubbleLog",
                `🎉 Colony sorted! ${bubble.count} comparisons and ${bubble.swaps} swaps.`
            );


            return;
        }


        log(
            "bubbleLog",
            `❄️ Pass ${bubble.pass} begins.`
        );

    }


    const left =
        bubble.j;


    const right =
        left + 1;


    const leftValue =
        arr[left];


    const rightValue =
        arr[right];


    bubble.count++;


    $("bubbleCount").textContent =
        bubble.count;


    /* HIGHLIGHT TWO PENGUINS */

    renderArray(
        -1,
        [left, right]
    );


    /* SWAP */

    if (
        leftValue >
        rightValue
    ) {

        [
            arr[left],
            arr[right]
        ] =
        [
            arr[right],
            arr[left]
        ];


        bubble.swaps++;


        $("bubbleSwaps").textContent =
            bubble.swaps;


        syncInput();


        renderArray(
            -1,
            [left, right]
        );


        log(
            "bubbleLog",
            `🫧 SWAP! ${leftValue} > ${rightValue}. Penguin ${left} moves right.`
        );

    }


    /* NO SWAP */

    else {

        log(
            "bubbleLog",
            `👀 Compare ${leftValue} and ${rightValue}: already in correct order.`
        );

    }


    bubble.j++;

}


/* =========================================
   BUBBLE AUTO PLAY
========================================= */

function toggleBubbleAuto() {

    if (!bubble.run) {

        startBubble();

    }


    if (bubble.auto) {

        stopTimer(bubble);


        $("bubbleAutoBtn").textContent =
            "▶ Auto Play";


        return;
    }


    bubble.auto = true;


    $("bubbleAutoBtn").textContent =
        "⏸ Pause";


    bubble.timer =
        setInterval(
            () => {

                bubbleStep();


                if (!bubble.run) {

                    stopTimer(bubble);

                    $("bubbleAutoBtn").textContent =
                        "▶ Auto Play";

                }

            },
            750
        );

}


/* =========================================
   RESET BUBBLE
========================================= */

function resetBubble() {

    stopTimer(bubble);


    arr =
        [...bubbleOriginalArray];


    syncInput();


    bubble.run = false;


    bubble.i = 0;

    bubble.j = 0;

    bubble.pass = 1;

    bubble.count = 0;

    bubble.swaps = 0;


    $("bubbleStatus").textContent =
        "Ready";


    $("bubblePass").textContent =
        "0";


    $("bubbleCount").textContent =
        "0";


    $("bubbleSwaps").textContent =
        "0";


    renderArray();


    log(
        "bubbleLog",
        "🫧 Sort reset. Original colony restored."
    );

}


/* =========================================
   GLOBAL RESET
========================================= */

function resetView() {

    stopAll();


    arr =
        [...originalArray];


    syncInput();


    renderArray();


    $("linearStatus").textContent =
        "Ready";


    $("binaryStatus").textContent =
        "Ready";


    updateRange();

}


/* =========================================
   TAB SYSTEM
========================================= */

document
    .querySelectorAll(".tab")
    .forEach(
        button => {

            button.onclick = () => {

                document
                    .querySelectorAll(".tab")
                    .forEach(
                        tab =>
                            tab.classList.remove(
                                "active"
                            )
                    );


                document
                    .querySelectorAll(".tab-content")
                    .forEach(
                        section =>
                            section.classList.add(
                                "hidden"
                            )
                    );


                button.classList.add(
                    "active"
                );


                $(
                    button.dataset.tab
                )
                .classList.remove(
                    "hidden"
                );

            };

        }
    );


/* =========================================
   INITIALIZE
========================================= */

renderArray();

updateRange();
